let log = require('../helper/dev-logger');

module.exports = function(server, origin) {

  let io = require('socket.io').listen(server);

  if(origin) {
    io.set("origins", ":");
  }

  io.on('connection', (socket) => {
    log('connected');

    socket.on('joinBoard', (boardId) => {
      log('joined board', boardId);
      socket.join(boardId);
    });

    socket.on('leaveBoard', (boardId) => {
      log('left board', boardId);
      socket.leave(boardId);
    });

    socket.on('addColumn', (data) => {
      log('addColumn', data);
      socket.broadcast.to(data.boardId)
        .emit('addColumn', data);
    });

    socket.on('addCard', function(data) {
      log('addCard: ', data);
      socket.broadcast.to(data.boardId)
        .emit("addCard", data);
    });

    socket.on('updateColumn', function(data) {
      log('updateColumn: ', data);
      socket.broadcast.to(data.boardId)
        .emit("updateColumn", data);
    });

    socket.on('updateCard', function(data) {
      log('updateCard: ', data);
      socket.broadcast.to(data.boardId)
        .emit("updateCard", data);
    });

    socket.on('disconnect', function() {
      log('disconnecting');
    });
  });

};
