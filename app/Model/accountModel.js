var mysql = require('../Utils/mysqlconnection.js');
var table = require('../Utils/Table.js');
var account = (account) => {
    this.id = account.id;
    this.accountname = account.accountname;
    this.password = account.password;
}

account.login = (accountname, password, result) => {
    mysql.query(`select * from ${table.ACCOUNT} where accountname = ? and password = ?`, [accountname, password], (err, row) => {
        if (err)
            result(null, err);
        result(null, row);
    });
}
account.getTokenByAccountId = (id, result) => {
    mysql.query(`select * from ${table.USER_TOKEN} where accountid = ?`, [id], (err, row) => {
        if (err)
            result(null, err);
        result(null, row);
    });
}
account.insertToken = (account, result) => {
    mysql.query(`insert into ${table.USER_TOKEN} set ?`, account, (err, row) => {
        if (err)
            result(null, err);
        result(null, row);
    });
}

account.updateToken = (account, result) => {
    mysql.query(`update ${table.USER_TOKEN} set token = ?, createddate = ?, exprieddate=? where accountid = ?`, [account.token, account.createddate, account.exprieddate, account.accountid], (err, row) => {
        if (err)
            result(null, err);
        result(null, row);
    });
}

account.getToken = (token, result) => {
    mysql.query(`select * from ${table.USER_TOKEN} where token = ?`, [token], (err, rows) => {
        if (err)
            result(null, err);
        else {
            result(null, rows);
        }
    });
}
module.exports = account;