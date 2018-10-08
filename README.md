## A command-line address-book program with Node.Js and MongoDB


  Usage: contact-cli [options] [command]


  Options:

    -h, --help  output usage information


  Commands:

    addContact <fname> <lname> <phone> <email>          Add new contact
    updateContact <Id> <fname> <lname> <phone> <email>  update a contact
    getContact <name>                                   Get contact
    getAllContacts                                      Get All contacts
    deleteContact <_id>                                 Delete contact

  Examples

	$ contact-cli addContact  bereket Gebredingle  098547545  bereketgebredinlge@gmail.com
	$ contact-cli getContact bereket
	$ contact-cli updateContact 1524515667854  bereket Gebredingle  0922847962  bereketgebredinlge@gmail.com
	$ contact-cli deleteContact 1524515667854

