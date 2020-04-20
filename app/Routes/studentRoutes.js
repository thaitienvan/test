var studentController = require('../Controller/studentController.js');
var accountController = require('../Controller/accountController.js');
module.exports = (app) => {
    //account route
    app.post('/login', accountController.login);
    // student route
    app.get('/studentlist', accountController.authentication, studentController.list_all_student);
    app.get('/studentdetail/:id', studentController.studentdetail);
    app.get('/studentDel/:id', studentController.deleteStudent);
    //app.post('/student', accountController.authentication, studentController.create_student);
    app.post('/student', studentController.create_student);
    app.post('/tokenabc', studentController.token);
    /// account
    app.get('/authenication', accountController.authentication);
    app.get('/student/:studentnum', studentController.demo);
    app.get('/accountbyid/:id', accountController.getAccountByID);
    app.get('/accountdelete/:id', accountController.deleteAccount);

    app.get('/addmore', accountController.addmore);

}