const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // request
    // console.log(`req.url = `, req.url);
    // console.log(`req.headers = `, req.headers);
    // console.log(`req.method = `, req.method);
    if (req.method === 'GET' && req.url == '/proxy.pac') {
        const filePath = path.resolve(__dirname, "./proxy.js");
        const data = fs.readFileSync(filePath);
        res.setHeader("Content-Type", "application/x-ns-proxy-autoconfig");
        res.end(data);
        return;
    }  
    res.end("无效的请求");
});

server.listen(1089, 'localhost', () => {
    console.log(`创建服务器完成`);
});