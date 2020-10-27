const validator = require('validator');
const nodemailer = require('nodemailer');
const axios = require('axios');
/**
 * GET /contact
 * Contact form page.
 */
exports.getPredict = (req, res) => {
  axios.get('http://localhost:8080/api/district/list').then(resp => {
      console.log(resp.data);
      res.render('predict', {
        title: 'Predict',
        data: resp.data
      });
    });
  }

