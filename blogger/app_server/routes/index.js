var express = require('express');
var router = express.Router();
///var ctrlMain = require('../controllers/blog.js');
//var ctrlLocations = require('../controllers/locations');
//var ctrlOthers = require('../controllers/others');
var ctrMain = require('../controllers/blog');


router.get('/', ctrMain.index);
router.get('/blogList', ctrMain.blogList);
router.get('/blogAdd', ctrMain.blogAdd);

module.exports = router;
