
var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

// since mongoose defalut promise library is depreceated
mongoose.Promise = require('bluebird');

const db = mongoose.connect("mongodb://localhost/Contact_DB", {
    useMongoClient: true
});

//~ listen to connection event ~//
mongoose.connection.on('error',function mongodbErrorListener(){
    console.log('Connection to Mongodb Failed!!');
});

// Define Contact Attributes
var ContactSchema = new Schema({
    fname:       { type: String },
    lname:       { type: String },
    phone:      { type: Number },
    email:      { type: String },
});


// Export Contact Model
const Contact = mongoose.model('Contact', ContactSchema);


exports.addContact = function addContact(contact, cb) {
    var newContact = new Contact(contact);

    newContact.save( (err, data) => {
      if(err) {
          cb(err, null);
        }
      cb(null,data);
      return;
    });
  };

exports.getContact = function getContact(name, cb){

    // Regex to search with like 
    const search = new RegExp(name, 'i');

    Contact.find({$or: [{fname: search }, {lname: search }]}, (err, data) => {
        if(err) {
            cb(err, null);
          }
        cb(null,data);
        return;
    });

}

exports.getAllContact = function getAllContact(query, cb){
    Contact.find(query, (err, data) => {
        if(err) {
            cb(err, null);
          }
        cb(null,data);
        return;
    });
}

exports.deleteContact = function deleteContact(_id, cb){
    Contact.deleteOne({_id : _id}, (err, data) => {
        if(err) {
            cb(err, null);
          }
        cb(null,data);
        return;
    });
}


exports.updateContact = function updateContact(id, contact, cb) {
    
    Contact.findOneAndUpdate( {'_id' : id} , contact , (err, data) => {
      if(err) {
          cb(err, null);
        }
      cb(null,data);
      return;
    });
  };
