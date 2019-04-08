var express = require('express');
var router = express.Router();
///var ctrlMain = require('../controllers/blog.js');
//var ctrlLocations = require('../controllers/locations');
//var ctrlOthers = require('../controllers/others');
var ctrMain = require('../controllers/blog');


router.get('/', ctrMain.index);
router.get('/blogList', ctrMain.blogList);
router.get('/blogAdd', ctrMain.blogAdd);
router.get('/blogEdit', ctrMain.blogEdit);
router.get('/blogDelete', ctrMain.blogDelete);


var port = process.env.PORT || 80;
module.exports = router;
