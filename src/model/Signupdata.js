const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://userone:userone@snehacluster.5dwmo.mongodb.net/LibraryApp?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
  
    name : String,
    username : String,
     pwd : String
});

var Userdata = mongoose.model('signupdata', NewUserSchema);                        //UserData is the model and NewBookData is the schema



module.exports = Userdata;