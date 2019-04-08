var mongoose = require( 'mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/blogger';
mongoose.connect( dbURI);

//monitoring the connection
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err){
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

//closing the mongoose connection 
gracefulShutdown = function ( msg, callback) {
  mongoose.connention.close(function () { 
    console.log( 'Mongoose disconnected through ' + msg);
    callback();
  });
};

//listen for nodemon
process.once( 'SIGUSR2', function () {
  gracefulShutdown( 'nodemon restart', function() {
    process.exit(0);
  });
});

//listen for application termination
process.on( 'SIGINT', function () {
  gracefulShutdown( 'app termination', function() {
    process.exit(0);
  });
});

//listen for Heroku
process.on( 'SIGTERM', function () {
  gracefulShutdown( 'Heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./blogs');
