
// const http = require('http');

// const Server = http.createServer((req, res) => {
//     res.status = 200;
//     res.setHeader('Content-Type' , 'text/plain');
//     res.end('hello world');
// });

// Server.listen(3500, ()=> {
//     console.log('Serve on port 3000');
// });

const express = require('express');
const morgan = require('morgan');
const app = express();


// function logger (req, res, next) {
//     console.log(`Route Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
//     next();
// };

// Settings
app.set('appName', 'Enproduccion nombre de la app');
app.set('port', 3000);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
// app.use(logger);
app.use(morgan('dev'));

// app.all('/user', (req , res, next)=> {
//     console.log('Por aqui paso');
//     next;
// })

app.get('/',(req, res) => { 
    const data = [{firstname: 'jhon'},{firstname: 'joe'}, {firstname:'cameron'}];
    res.render('./views/index.ejs',{people:data});
});

app.get('/user', (req , res) =>{
    res.json({
        username: 'cameron',
        lastname: 'Home'
    });
});
app.post('/user/:id', (req , res)=> {
    console.log(req.body);
    console.log(req.params);
    res.send('POST REQUEST RECEIVED');
});
app.put('/user/:id', (req , res)=> {
    console.log(req.body);
    res.send(`User ${req.params.userId} deleted`);
});
app.delete('/user/:userId', (req , res)=> {
    res.send(`<h1>User ${req.params.userId} deleted</h1>`);
});

app.listen(app.get('port'), () => {
    console.log(app.get('appName'));
    console.log('Server on port', app.get('port'));
});

app.use(express.static('public'));
