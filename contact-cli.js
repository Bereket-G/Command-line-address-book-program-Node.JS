
/**
 * Module dependencies.
 */
 
var program = require('commander');
const { prompt } = require('inquirer'); // require inquirerjs library

var log = console.log;

const ContactModel = require('./Contact-Model');

program
.command('addContact')
.description('Add new contact')
.arguments('-fn, --fname  <fname>', 'First Name')
.arguments('-ln, --lname  <lname>', 'Last Name')
.arguments('-p, --phone  <phone>', 'Phone Number')
.arguments('-e, --email  <email>', 'Email')
.action(() => addContact());

program
.command('updateContact')
.description('update a contact')
.arguments('-fn, --Id  <Id>', 'Contact Id')
.arguments('-fn, --fname  <fname>', 'First Name')
.arguments('-ln, --lname  <lname>', 'Last Name')
.arguments('-p, --phone  <phone>', 'Phone Number')
.arguments('-e, --email  <email>', 'Email')
.action(() => updateContact());

program
  .command('getContact <name> ')
  .description('Get contact')
  .action(name => getContact(name));

program
.command('getAllContacts ')
.description('Get All contacts')
.action(() => getAllContacts());


program
.command('deleteContact <_id> ')
.description('Delete contact')
.action(_id => deleteContact(_id));

program.on('--help', function(){
    log('  contact-cli <cmd> help    List options available for <cmd>');
    log('');
    log('  Examples');
    log('');
    log('\t$ contact-cli addContact  bereket Gebredingle  0922847962  bereketgebredinlge@gmail.com');
    log('\t$ contact-cli getContact bereket');
    log('\t$ contact-cli updateContact 1524515667854  bereket Gebredingle  0922847962  bereketgebredinlge@gmail.com');
    log('\t$ contact-cli deleteContact bereket');
    log('');
  });
  

function addContact(){
    
    if (program.rawArgs.length < 7){
        console.log("Plz pass all necessary contact informations");
    }

    var _new_contact = {
        fname:       program.rawArgs[3],
        lname:       program.rawArgs[4],
        phone:      program.rawArgs[5],
        email:      program.rawArgs[6],
    };

    ContactModel.addContact(_new_contact, (err, data) => {
        if(err) {
            console.log("Error" + err.message);
            return;
          }
        
        console.info('New contact added');
        process.exit();
    });
}

function getContact(_contact_name){

    ContactModel.getContact(_contact_name, (err, data)=>{
        if(err) {
            console.log("Error" + err.message);
            return;
          }

        console.log(data);
        process.exit();
    });
}

function deleteContact(_id){
    ContactModel.deleteContact(_id, (err, data)=>{
        if(err) {
            console.log("Error" + err.message);
            return;
          }

        console.log("Contact deleted");
        process.exit();
    });
}

function updateContact(){
    if (program.rawArgs.length < 7){
        console.log("Plz pass all necessary contact informations");
    }

    const id = program.rawArgs[3];
    var _new_contact = {
        fname:       program.rawArgs[4],
        lname:       program.rawArgs[5],
        phone:      program.rawArgs[6],
        email:      program.rawArgs[7],
    };

    ContactModel.updateContact(id, _new_contact, (err, data) => {
        if(err) {
            console.log("Error" + err.message);
            return;
          }
        
        console.info('Contact Updated');
        process.exit();
    });

}

function getAllContacts(){
    ContactModel.getAllContact({}, (err, data)=>{
        if(err) {
            console.log("Error" + err.message);
            return;
          }
        
        console.log(data);
        process.exit();
    });
}

program.parse(process.argv);

