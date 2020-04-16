var Student = require('../Model/studentModel.js');
exports.list_all_student = (req, res) => {
    if (!req.query.limit || !req.query.offset) {
        req.query.limit = 100;
        req.query.offset = 0;
    }
    Student.getAllStudent(Number(req.query.limit), Number(req.query.offset), (err, students) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ "err": 0, "message": "", "data": students });
        }

    });
};
exports.create_student = (req, res) => {
    let { name, address, phone } = req.body;
    if (!name || !address || !phone) {
        res.send({ 'errcocde': 9999, 'message': 'Missing params!', 'data': {} });
    } else {
        Student.createStudent(req.body, (err, students) => {
            if (err)
                res.send(err);
            log(`Student Request ${JSON.stringify(req.body)} - Student Response ${JSON.stringify(students)}`, './log/my-log.log')
            res.send({ 'errcocde': 0, 'message': 'Create Successfully!', 'data': students });
        });
    }
}
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