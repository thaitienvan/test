var mysql = require('../Utils/mysqlconnection.js');
var table = require('../Utils/Table.js');
const xlsx = require('node-xlsx')
const fs = require("fs");
var Student = function(student) {
    this.name = student.name;
    this.dob = student.dob;
    this.address = student.address;
    this.phone = student.phone;
};
Student.getAllStudent = async(limit, offset, result) => {

    await mysql.query(`select * from ${table.STUDENT} limit ? offset ?`, [limit, offset], (err, row, fields) => {
        if (err) {
            result(null, err);
        } else {
            // const data = json2Array(row, fields)
            // const buffer = xlsx.build([{ name: 'Users', data: data }])
            //     // Write the buffer to a file
            // fs.writeFile('users.xlsx', buffer, (fs_err) => {
            //     if (fs_err) throw fs_err
            //     console.log('Excel file created...');
            // });
            result(null, row);
        }
    });
};
Student.studentDetail = async(id, result) => {
    console.log("model", "student");
    console.log("get STudentDetail = id ", id);
    try {
        await mysql.query(`select * from ${table.STUDENT} where id = ?`, [id], (err, row, fields) => {
            if (err) {
                result(err, null);
            } else {
                result(null, row);
            }
        });
    } catch (err) {
        result(null, err);
    }
}
Student.createStudent = (student, result) => {
    student.dob = new Date();
    mysql.query(`insert into ${table.STUDENT} set ?`, student, (err, row) => {
        if (err)
            result(null, err);
        result(null, row);
    });
}
Student.deleteStudent = async(id, result) => {
    await mysql.query(`delete from ${table.STUDENT} where id = ?`, [id], (err, row) => {
        if (err) {
            result(err, null);
        } else
            result(null, row);
    });
}




module.exports = Student;

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
        out.push([item.id, item.name, item.dob, item.address, item.phone])
    })
    return out;
}