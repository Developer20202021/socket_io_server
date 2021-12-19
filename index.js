const express = require('express');
const { Server, Socket } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());
const http = require('http');
const server = http.createServer(app);

const mongoose = require('mongoose');
const { info } = require('console');
mongoose.connect('mongodb://<username>:Mahadihasan1435!@cluster0-shard-00-00.l9s4l.mongodb.net:27017,cluster0-shard-00-01.l9s4l.mongodb.net:27017,cluster0-shard-00-02.l9s4l.mongodb.net:27017/socketmessage?ssl=true&replicaSet=atlas-rb992z-shard-0&authSource=admin&retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,   },()=>{
  

console.log('connection successfull');
})





const IdSchema = new mongoose.Schema({
  socketId:{
    type:String
  }
})


const idModel = mongoose.model('socket', IdSchema);





















const io = new Server(server,{
  cors:{
    origin:"http://localhost:5000/",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
   }
  
  
});
const array = [];


const userInfo = []

io.on('connection',  (socket)=>{
  console.log(socket.id);
  








  array.push(socket.id);
  console.log(array);
  console.log('new user connected');
  socket.emit('data','mahadi');
  socket.on('name', data=>{
    console.log(data);
  })

  socket.on('user', data=>{

    userInfo.push({name:data, id:socket.id})
    console.log(data);
    console.log(userInfo);
  })
  // setInterval(()=>{
  //   socket.emit('hello', 'My name is mahadi hasan')
  // },10000)
  io.to(array[array.length-1]).emit('hello', array[array.length-1])



  socket.on('message', data=>{
    
    console.log(data);

    const email = data.split(',')[0];

    for(let info of userInfo){
      if (info?.name==email) {
        socket.to(info?.id).emit('send',data.split(',')[1])
      }
    }


   
   
  })



 


  socket.on('disconnect', ()=>{
    console.log('user disconnected');
   const id =  array.indexOf(socket.id)
   delete array[id]
    console.log(array);
  })






})







console.log();















app.get('/hello', (req, res)=>{

  
  res.json({msg:'hello'})
})




app.post('/postuser', (req, res)=>{







})





app.get('/', (req, res) => {
io.emit('connection','hello')
  res.send('<h1>Hello world</h1>');
});






server.listen(5000, () => {
  console.log('listening on *:5000');
});