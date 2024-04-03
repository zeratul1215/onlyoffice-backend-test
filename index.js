const express = require('express');
const app = express();

const request = require('request');
const fs = require('fs');

const path = require('path');

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.post('/onlyoffice-callback',(req,res) => {
    try{
        if(req.body.status === 2 || req.body.status === 3){
            const fileURL = req.body.url;
    
            request.get(fileURL).pipe(fs.createWriteStream('./files/file.docx'));
    
            res.send({error: 0});
        }
    }
    catch(err){
        console.log(err);
    }
});

app.get('/document/:filename',(req,res) => {
    try{
        const filename = req.params.filename;
        console.log(filename);
        const directoryPath = path.join(__dirname,'files');
        const filePath = path.join(directoryPath,filename);
        console.log(filePath);
        res.sendFile(filePath,(err) => {
            if (err) {
                // 如果发生错误，发送一个错误响应
                res.status(500).send("Error sending file: " + err.message);
            }
        });
    }
    catch(err){
        console.log(err);
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});