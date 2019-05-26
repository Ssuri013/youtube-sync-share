// const WebSocket = require('ws');

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });
// });




var WebSocketServer = require("ws").Server,
express = require("express"),
http = require("http"),
app = express(),
server = http.createServer(app);
var cors = require('cors');


app.use(cors()); //modify to allow just 3000
app.get("/login", (req, res) => {
    console.log('call recieved on login');
    res.send("hello")
});


server.listen(8000, () => {
    console.log('App listening on 8000')
});

var wss = new WebSocketServer({
    server: server //,
    // path: "/hereIsWS"
});

var clients = []; // code to remove clients
currentVideoInfo = {
    videoId: "",
    seekTo: 0,
    clientNames: []
}


wss.on("connection", function (ws) {
    clients.push(ws);    
    ws.on('open', (e)=>{
        console.log(e, "open")
    })
    
    ws.on('message', function incoming(message) {
        message = JSON.parse(message);
        currentVideoInfo = { ...currentVideoInfo, ...message}
        clients.forEach( c => c.send(JSON.stringify(currentVideoInfo))); 
    });
    
    ws.on('close', () => { //works
        clients.splice(clients.indexOf(ws), 1);
        clients.forEach( c => c.send("Client left video broadcast"));
        console.log("connection closed")
    })
    
});