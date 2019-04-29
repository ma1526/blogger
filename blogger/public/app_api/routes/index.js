var express = require('express');
var router = express.Router();

if( express  === require('express') )
{
 console.log("true");
}

if( express != require('express')  ){
 console.log("flase");
}

var ctrlBlogs = require('../controllers/blogs');

// blogs
router.get('/blogs', ctrlBlogs.blogsList);
router.post('/blogs', ctrlBlogs.blogsCreate);
router.get('/blogs/:blogid', ctrlBlogs.blogsReadOne);
router.put('/blogs/:blogid', ctrlBlogs.blogsUpdateOne);
router.delete('/blogs/:blogid', ctrlBlogs.blogsDeleteOne);

module.exports = router;
