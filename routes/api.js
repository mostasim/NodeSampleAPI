var express = require('express');
var router = express.Router();

/* GET api listing. */
router.get('/', function(req, res, next) {
    res.send('api sample');
});

module.exports = router;
