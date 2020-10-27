const axios = require('axios');
/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  axios.get('http://localhost:8080/api/district/list').then(resp => {
      res.render('home', {
        title: 'Home',
        data: resp.data
      });
    });
};
