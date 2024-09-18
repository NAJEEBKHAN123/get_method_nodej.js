const http = require("http");

const server = http.createServer((req, res) =>{
    res.end("hello this is server")
})

server.listen(3000, () =>{
    console.log("server was run on port 3000")
})