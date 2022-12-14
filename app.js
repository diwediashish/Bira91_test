// Libraries that are required for initial setup
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// Libraries that are required for initial setup


//Routes used in the app
const loginRoutes = require('./routes/loginRoutes');
const accountRoutes = require('./routes/accountRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reportRoutes = require('./routes/reportRoutes');
const contentRoutes = require('./routes/contentRoutes');
//Routes used in the app



//Creating an express app
const app = express();
//Creating an express app


// Serving your app on the client browser
app.use(express.static(path.join(__dirname,'public')));

// Body parser for fetching request body through fetch 
app.use(bodyParser.json({limit : '50mb'}));

// for CORS Setup code 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
// for CORS setup code 


//Routing the incoming request
app.use(loginRoutes);
app.use(accountRoutes);
app.use(eventRoutes);
app.use(reportRoutes);
app.use(contentRoutes);
//Routing the incoming request

// Initial setup for index page
app.use('/',(req,res,next) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});



app.listen(process.env.PORT || 3400);
