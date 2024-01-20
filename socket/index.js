const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: "http://localhost:5173"
});

let onlineUsers = [];

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    socket.on("addNewUser", (userId)=>{
        !onlineUsers.some(user => user.userId === userId) && onlineUsers.push({
            userId,
            socketId: socket.id
        });
        console.log("onlineUsers", onlineUsers);

        io.emit("getOnlineUsers", onlineUsers);
    });

    //nova zprava
    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(
            (user) => user.userId === message.recipientId
        );

        if(user){
            io.to(user.socketId).emit("getMessage", message);
        }
    });
    
    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

        io.emit("getOnlineUsers", onlineUsers);
    });
});

httpServer.listen(3000);