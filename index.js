const http = require("http");

let storedData = {
  name: "Initial Name",
  password: "Initial Password"
};

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Success! GET request on Home page' }));
  }
  else if (req.method === "GET" && req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Success! GET request on About page' }));
  }
  else if (req.method === "GET" && req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Success! GET request on Contact page' }));
  }
  // POST request to add data
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
          storedData.name = name;
          storedData.password = password;
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
  }
  // PUT request to update data
  else if (req.method === 'PUT' && req.url === '/data') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsedData = JSON.parse(body);
        const { name, password } = parsedData;

        if (name && password) {
          storedData.name = name;
          storedData.password = password;
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Data updated successfully!',
            updatedData: storedData
          }));
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Bad Request: Name and password are required for update!'
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
  }
  // DELETE request to delete data
  else if (req.method === 'DELETE' && req.url === '/data') {
    storedData = {}; // Clear the stored data
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Data deleted successfully!' }));
  }
  // If route not found
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
