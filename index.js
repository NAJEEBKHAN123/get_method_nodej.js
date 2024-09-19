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
  else if(req.method === "GET" && req.url === '/contact'){
   res.writeHead(200, {'content-Type' : 'applicaion/json'})
   res.end(JSON.stringify({message: 'Success! GET request on Contact page'}))
  }
  else if (req.method === 'POST' && req.url === '/data') {
   let body = '';

   req.on('data', chunk => {
     body += chunk.toString(); 
   });
   req.on('end', () => {
     try {
       const parsedData = JSON.parse(body); 
       const { name, password } = parsedData;
       if (name && password) {
         res.writeHead(200, { 'Content-Type': 'application/json' });
         res.end(JSON.stringify({
           message: 'Data received successfully!',
           receivedData: { name, password }
         }));
       } else {
         res.writeHead(400, { 'Content-Type': 'application/json' });
         res.end(JSON.stringify({
           message: 'Bad Request: Name and password are required!'
         }));
       }
     } catch (error) {
       res.writeHead(400, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({
         message: 'Invalid JSON format!',
         error: error.message
       }));
     }
   });

 } else {
   res.writeHead(404, { 'Content-Type': 'application/json' });
   res.end(JSON.stringify({ message: 'Not Found' }));
 }
});

const port = 3000;
server.listen(port, () => {
 console.log(`Server is running on http://localhost:${port}`);
});

