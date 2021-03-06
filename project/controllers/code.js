var express = require('express');
var router = express.Router();
var Code = require('../models/code.js');

router.get('/fordisplay', function (req, res) {
    var offset = req.query["offset"];
    Code.getForDisplay(null, function (err, rows) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'codes': rows});
    }, offset);
});

router.get('/code_count', function (req, res) {
    Code.getCount(function (err, count) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'count': count});
    });
});

router.get('/by_filter', function (req, res) {
    var offset = req.query["offset"];
    var filterTxt = req.query["filter_txt"];
    var filter_date = req.query["filter_date"];
    Code.getByFilter(filterTxt, filter_date, offset, function (err, rows) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'codes': rows});
    }, offset);
});

router.get('/', function (req, res) {
    //console.log("get req params for get single are " + JSON.stringify(req.query));
    Code.getForEdit(req.query.id, function (err, rows) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'codes': rows});
    });
});

router.post('/create_explicit', function (req, res) {
    var code = req.body["code"];
    var cat = req.body["cat"];
    var desc = req.body["desc"];
    var req_array = req.body["req_array[]"];
    var elem_id = req.body["elem_id"];
    if (code == null || code == "") {
        res.json({'Error': "Code not specified"});
    }
    if (elem_id == "" || elem_id == "null") {
        elem_id = null;
    }
    //console.log("Code create explicit post request body object is " + JSON.stringify(req.body));
    Code.createExplicit(code, cat, desc, elem_id, function (err, inserted_code) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'new_code': inserted_code});
    });
});

router.post('/', function (req, res) {
    var cat = req.body["cat"];
    var desc = req.body["desc"];
    var req_array = req.body["req_array[]"];
    var elem_id = req.body["elem_id"];
    if (elem_id == "" || elem_id == "null") {
        elem_id = null;
    }
    //console.log("Code create post request body object is " + JSON.stringify(req.body));
    Code.create(cat, desc, elem_id, function (err, inserted_code) {
        if (err) {
            res.json({'Error': err});
        }
        res.json({'new_code': inserted_code});
    });
});

router.put('/', function (req, res) {
    //console.log("The code update request body is " + JSON.stringify(req.body) + "\n");
    var record_id = req.body["record_id"];
    var is_cancelled = req.body["is_cancelled"];
    var rldc_ids = req.body["rldc_ids[]"];
    var rldc_codes = req.body["other_codes[]"];
    var cat = req.body["cat"];
    var elemId = req.body["element_id"];
    var entity_ids = req.body["req_entity_ids[]"];
    var desc = req.body["desc"];
    var code_time = req.body["code_time"];
    if (elemId == "" || elemId == "null") {
        elemId = null;
    }
    Code.update(record_id, is_cancelled, rldc_ids, rldc_codes, cat, elemId, entity_ids, desc, code_time, function (err, result) {
        if (err) {
            res.json({'Error': err});
        }
        //console.log("code update success query result returned is " + JSON.stringify(result));
        res.json({'updated_code': record_id});
    });
});

module.exports = router;
