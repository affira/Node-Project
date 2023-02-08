const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');


/////////////////////
//SERVER

const tempOverview = fs.readFileSync(`${__dirname}/templates/temp-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/temp-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/temp-card.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {


    const { query, pathname } = (url.parse(req.url, true))


    //OVERVIEW
    if (pathname === '/' || pathname === '/overview') {

        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);

        res.end(output);
    }
    //PRODUCT PAGE
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);


        res.end(output);
    }
    //API
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    //NOT FOUND
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'Hello world'

        });
        res.end('<h1>PAGE NOT FOUND!</h1>');
    }
});

server.listen(8000, '127.0.0.9', () => {
    console.log('Listening to requests on port 8000');
})




// const express = require('express');
// const mongoose = require('mongoose');

// //const router = express.Router();

// const app = express();
// app.use("/", function (req, res, next) {
//     //console.log('blah blah blah');
//     //console.log(req);
//     res.send('helo world')

//     next();

// });


// app.use("/abc", (req, res, next) => {
//     console.log('Afeeera');
// });

// app.listen(3000, () => {
//     console.log(`SERVER LISTENING AT ${3000}`);
// });




