const http = require('http');
const fs = require('fs');

const PORT = 8080;

const renderContactPage = (req, res) => {
    fs.readFile(`../html/contact.html`, (err, data) => {
        if (err) {
            throw error
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        }
    })
};

const renderContactSubmittedPage = (req, res) => {
    let requestData = "";

    req.on('data', (data) => 
        requestData += data
    );

    let myHTML = `
    <html>
    <body>
    <code>${requestData}</code>
    </body>
    </html>`;

    req.on('end', ()=>{
        console.log(`You used ${req.method} request.method to get data: ${requestData}`); 
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(myHTML);
    })
};

const handleRequest = (req, res) => {
    const path = req.url;
    switch(path) {
        case '/':
           return renderContactPage(req, res);
        case '/contact-submitted':
            return renderContactSubmittedPage(req, res)
   }
};

const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
});