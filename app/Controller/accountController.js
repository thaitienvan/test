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

exports.getAccountByID = (req, res) => {
    var id = req.params.id;
    Account.getAccountByID(id, (err, row) => {
        if (err) {
            return res.send({ err: 9990, 'message': 'error na', data: "error" });
        }
        if (!row[0]) {
            return res.send({ err: 9999, 'message': 'data cannot found' });
        }
        return res.send({ err: 0, 'message': 'Successfull', data: row[0] });
    });
}
exports.deleteAccount = (req, res) => {
    var id = req.params.id;
    Account.delete(id, (err, result) => {
        if (err)
            return res.send({ err: 200, 'message': 'Something Error' });
        if (result.affectedRows === 0) {
            return res.send({ err: 300, 'message': 'Data connot found', data: result });
        }
        return res.send({ err: 0, 'message': 'Successfully', data: result });

    });
}
exports.addmore = (req, res) => {
    console.log("abcef");
}
exports.moreadd = (req, res) => {
    console.log("abcef");
}
exports.abc = (req, res) => {
    console.log("abcef");
}
exports.abcef = (req, res) => {
    console.log("abcef");
}