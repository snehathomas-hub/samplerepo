const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@snehacluster.5dwmo.mongodb.net/LibraryApp?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
  
    title : String,
    author : String,
    genre : String,
    image : String
});

var Bookdata = mongoose.model('bookdata', NewBookSchema);                        //UserData is the model and NewBookData is the schema



module.exports = Bookdata;