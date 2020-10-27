const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    wardIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ward'
    }]
});

const District = mongoose.model('District', districtSchema);

module.exports = District;
