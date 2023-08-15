const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const handlebars = require("express-handlebars");

const app = express();
const server = http.createServer(app);
const io = new Server(server);


const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine("handlebars", handlebars.engine())

app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "/src/public")))



app.get("/", (req, res) => {
  res.render("index.hbs")
})


//Config Socket.IO

let products = [];

io.on("connection",(socket) =>{
  console.log("conectado")
  socket.on("newProduct", (product) =>{   
    io.emit("newProduct", product)
    socket.emit("productsList", product)
  })

})


server.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
});