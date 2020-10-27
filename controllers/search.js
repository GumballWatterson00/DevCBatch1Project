/**
 * GET /
 * Search page.
 */
exports.search = (req, res) => {
    res.render('api/google-maps', {
        title: 'Google Maps API',
        google_map_api_key: process.env.GOOGLE_MAP_API_KEY
      });
};
