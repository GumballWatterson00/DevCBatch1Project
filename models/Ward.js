const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
    name: {type: String},
    districtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District'
    },
    value: {type: Number}
});

const Ward = mongoose.model('Ward', wardSchema);

module.exports = Ward;
