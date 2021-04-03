const socketIO = (io) => {
  var activeUser = new Set();

  io.on("connection", (socket) => {
    console.log("Socket Connected !");

    socket.on("user_connected", ({ id }) => {
      console.log(id);
      activeUser.add(id);
      io.emit("user_connected", [...activeUser]);
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected !");
      activeUser.delete(socket.id);
      io.emit("user_disconnected", socket.id);
    });
  });
};

module.exports = socketIO;
