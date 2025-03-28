const ws = new require('ws');

const wsServer = new ws.Server({ port: 4000 });

const users = [];

wsServer.on('connection', (newUser) => {
  users.push(newUser);

  newUser.on('message', (message) => {
    console.log(message);
    users.forEach((user) => {
      if (user !== newUser) {
        user.send(message);
      }
    });
  });

  newUser.on('close', () => {
    const idx = users.findIndex((user) => user === newUser);
    users.splice(idx, 1);
  });
});
