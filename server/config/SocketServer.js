const socketServer = (socket) => {
  console.log(socket.id + " connected");

  socket.on("JoinRoom", (id) => {
    socket.join(id);
  });

  socket.on("OutRoom", (id) => {
    socket.leave(id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconneted");
  });
};
module.exports = socketServer;
