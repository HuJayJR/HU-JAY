const express = require('express');
const app = express();
const path = require('path');
const { exec } = require('child_process');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html.html'));
});

const HOST = 'hujay.com';
const PORT = 3000;
app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
});

exec('ipconfig', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`ipconfig output: ${stdout}`);
    if (stderr) {
        console.error(`ipconfig stderr: ${stderr}`);
    }
});

require('child_process').exec('node server.js');
