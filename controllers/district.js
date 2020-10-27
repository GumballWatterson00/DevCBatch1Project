const District = require("../models/District");
const Ward = require("../models/Ward");
ObjectId = require('mongodb').ObjectID;

exports.getDistricts = async (req, res) => {
    await District.find({}).exec((err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error: ' + err);
        }

        res.status(200);
        res.json({districts: result});
    });
}

exports.getWardByDistrict = async (req, res) => {
    const id = req.query.district_id;
    if (id === null || id === undefined) {
        return res.status(400).send('District ID is not defined!');
    }
    await Ward.find({districtId: ObjectId(id)}).exec((err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal server error: ' + err);
        }

        res.status(200);
        res.json({wards: result});
    })
}