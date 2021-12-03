const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://userone:userone@snehacluster.5dwmo.mongodb.net/LibraryApp?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewAuthorSchema = new Schema({
  
    name : String,
    nationality : String,
    image : String
});

var Authordata = mongoose.model('authordata', NewAuthorSchema);                        //UserData is the model and NewBookData is the schema

module.exports = Authordata;