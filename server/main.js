let WebSocketServer = require("ws").Server,
Express = require( "express" ),
HTTP = require("http"),
App = Express(),
Server = HTTP.createServer(App),
cors = require('cors');

App.use(cors()); // modify to allow just 3000

App.get("/test", (req, res) => {
    console.log('call recieved on login');
    res.send("hello")
});
Server.listen(8000, () => {
    console.log('App listening on 8000')
});

let wss = new WebSocketServer({
    server: Server //,
    // path: "/hereIsWS"
});

// list of open connections
let clients = [];

let currentVideoInfo = {
    videoId: "",
    seekTo: 0,
    clientNames: []
}

wss.on("connection", function (ws) {
    clients.push(ws); 
    ws.on('open', (e)=>{
        console.log(e, "open")
    })
    
    // Video time or url change
    ws.on('message', function incoming(message) {
        message = JSON.parse(message)
        if(message.username)
            currentVideoInfo.clientNames.push(message.username)
        else {
            currentVideoInfo = { ...currentVideoInfo, ...message}        
            clients.forEach( c => c.send(JSON.stringify(currentVideoInfo)));
        } 
    });
    
    ws.on('close', () => { //remove client on socket closure
        const indexOfQuitter = clients.indexOf(ws)
        clients.splice(indexOfQuitter, 1);
        currentVideoInfo.clientNames.splice(indexOfQuitter, 1)
        clients.forEach( c => c.send("Client left video broadcast"));
        console.log("connection closed")
    })
    
});