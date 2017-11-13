var express  = require("express"),
app      = express(),
http     = require("http"),
bodyParser  = require("body-parser"),
methodOverride = require("method-override");
server   = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
 
app.use(express.static(__dirname + '/public'));
var server_port = process.env.PORT || 5000;

var routerUser = require("./config/userRoutes");
app.use('/api',routerUser);

var routerBudget = require("./config/budgetRoutes");
app.use('/api',routerBudget);


app.listen(server_port, function() {
    console.log("Node server running on port "+ server_port);
    });