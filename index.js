const http = require("http")

const server = http.createServer((req, res) =>{
  if(req.method === "GET" && req.url === '/'){
   res.writeHead(200, {'content-Type' : 'application/json'})
   res.end(JSON.stringify({message: 'Success! GET request on Home page'}))
  }
  else if(req.method === "GET" && req.url === '/about'){
   res.writeHead(200, {'content-Type' : 'application/json'})
   res.end(JSON.stringify({message: 'Success! GET request on About page'}))
  }
  else {
   res.writeHead(404, {'content-Type' : 'application/json'})
   res.end(JSON.stringify({message: '404 Not Found!'}))
  }
})
const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});