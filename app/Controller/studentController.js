var Account = require('../Model/accountModel.js');
var jwt = require('jsonwebtoken');
exports.login = (req, res) => {
    let { username, password } = req.body;
    Account.login(username, password, (err, account) => {
        if (err)
            res.send({ 'err': 4000, 'message': 'Username not exits' });
        if (account.length == 0) {
            res.send({ 'err': 4000, 'message': 'Accountname or password not correct!', 'data': {} });
        } else {
            var acc = account[0];
            var token_auth = jwt.sign({ id: acc.id }, 'abcs', {
                expiresIn: 10 // expires in 24 hours
            });
            //res.send({ 'err': 200, 'message': 'Login Successful', 'data': account[0] });
            Account.getTokenByAccountId(acc.id, (err, accToken) => {
                if (err) {
                    res.send(err);
                } else {
                    var createddate = new Date();
                    var cur_date = new Date();
                    cur_date.setMinutes(cur_date.getMinutes() + 5);
                    var exprieddate = cur_date;
                    var account_token = { 'token': token_auth, 'createddate': createddate, 'exprieddate': exprieddate, 'accountid': acc.id };
                    //insert token if not exist
                    if (accToken.length == 0) {
                        Account.insertToken(account_token, (err, status) => {
                            if (err)
                                res.send(err);
                            else {
                                res.send({ 'err': 0, 'Message': 'Login Successfully.', 'data': { 'token': token_auth } });
                            }
                        });
                    } else {
                        //update token
                        Account.updateToken(account_token, (err, status) => {
                            if (err)
                                res.send(err);
                            else {
                                res.send({ 'err': 0, 'Message': 'Login Successfully.', 'data': { 'token': token_auth } });
                            }

                        });
                    }
                }
            });
        }

    });
}
exports.authentication = (req, res, next) => {
    var authorization = req.headers['authorization'];
    if (!authorization) {
        res.send({ 'err': 400, 'message': "User Unauthorized!" });
    } else {
        var auths = authorization.split(" ");
        let bearer = auths[0];
        let token = auths[1];
        if (auths.length != 2 || bearer.trim().toLowerCase() != 'bearer') {
            res.send({ 'err': 400, 'message': "User Unauthorized!" });
        } else {
            Account.getToken(token, (err, rows) => {
                if (err) {
                    res.send(err);
                }
                if (rows.length == 0) {
                    res.send({ 'err': 400, 'message': "User Unauthorized!" });
                } else {
                    var acc_token = rows[0];
                    var cur_date = new Date();
                    if (cur_date >= acc_token.createddate && cur_date <= acc_token.exprieddate) {
                        next();
                    } else {
                        res.send({ 'err': 400, 'message': "Token expried!" });
                    }
                }
            });
        }
    }
};
exports.studentdetail = (req, res) => {
    var id = req.params.id;
    console.log(id);
    Student.studentDetail(id, (err, student) => {
        if (err)
            return res.send({ 'err': 0, 'message': 'Something error' });
        else if (!student[0]) {
            return res.send({ 'err': 0, 'message': 'Data cannot found!' });
        }
        res.json({ 'err': 0, 'message': 'Success full', 'data': student });
    });
}
exports.deleteStudent = (req, res) => {
    var id = req.params.id;
    Student.deleteStudent(id, (err, student) => {
        if (err)
            return res.json({ err: 200, 'message': 'Some thing error!' });
        return res.json({ err: 0, 'message': "Delete successful", data: student });
    })
}
exports.demo = (req, res) => {
    console.log("Student Demo");
    console.log("token " + req.headers.token);
    console.log("params " + req.params.studentnum);
    res.send({ "err": 200, "Message": "Success full" });
};
exports.token = (req, res) => {
    console.log("header");
    var token = req.headers.tokenapi;
    console.log("token " + req.headers.tokenapi);
    res.send({ "err": 200, "Message": "Success fulldfdfdf", "token: ": token });
};
const json2Array = function(result, fields) {
    let out = [];
    let temp = [];
    // Create headers array
    fields.forEach(item => {
        temp.push(item.name)
    });
    // temp array works as column headers in .xlsx file
    out.push(temp)

    result.forEach(item => {
        out.push([item.id, item.name, item.phone, item.address, item.email])
    })
    return out;
}
exports.abc = (req, res) => {
    console.log("abcef");
}
exports.abcef = (req, res) => {
    console.log("abcef");
}