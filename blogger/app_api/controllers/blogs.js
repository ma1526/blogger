var mongoose = require('mongoose');
var BlogModel = mongoose.model('Blog');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET a list of all blogs */
module.exports.blogsList = function(req, res) {
  console.log('Getting blogs list');
  BlogModel
      .find()
      .exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {
            "message": "no blogs found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(results);
        sendJSONresponse(res, 200, buildLocationList(req, res, results));
      }); 
};
//need to update lab7
var buildLocationList = function(req, res, results) {
  var blogs = [];
  results.forEach(function(obj) {
    blogs.push({
      blogTitle: obj.blogTitle,
      blogText: obj.blogText,
      blogEmail: obj.blogEmail,
      blogAuthor: obj.blogAuthor,
      dateOfCreation: obj.dateOfCreation,
      blogLike: obj.blogLike,
      blogDislike: obj.blogDislike,
      _id: obj._id
    });
  });
  return blogs;
};

/* POST a new blog */
/* /api/blogs */
module.exports.blogsCreate = function(req, res) {
  console.log(req.body);
  BlogModel
   .create({
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      blogAuthor: req.body.blogAuthor,
      blogEmail: req.body.blogEmail,
      dateOfCreation: req.body.dateOfCreation,
      blogLike: 0,
      blogDislike: 0,
     }, function(err, blog) {
       if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
       } else {
          console.log(blog);
          sendJSONresponse(res, 201, blog);
       }
     }
   );
};

module.exports.blogsReadOne = function(req, res) {
  console.log('Finding blog details', req.params);
  if (req.params && req.params.blogid) {
    BlogModel
      .findById(req.params.blogid)
      .exec(function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(blog);
        sendJSONresponse(res, 200, blog);
      });
  } else {
    console.log('No blogid specified');
    sendJSONresponse(res, 404, {
      "message": "No blogid in request"
    });
  }
};

/* PUT /api/blogs/:blogid */
module.exports.blogsUpdateOne = function(req, res) {
  if (!req.params.blogid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, blogid is required"
    });
    return;
  }
  BlogModel
    .findById(req.params.blogid)
    .exec(
      function(err, blog) {
        if (!blog) {
          sendJSONresponse(res, 404, {
            "message": "blogid not found"
          });
          console.log(blogid);
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        blog.blogTitle = req.body.blogTitle;
        blog.blogText = req.body.blogText;
        blog.dateOfCreation = req.body.dateOfCreation;
        blog.blogLike = req.body.blogLike;
        blog.blogDislike = req.body.blogDislike;
        blog.save(function(err, blog) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, blog);
          }
        });
      }
  );
};

/* DELETE /api/locations/:locationid */
module.exports.blogsDeleteOne = function(req, res) {
  console.log("Deleting blog entry with id of " + req.params.blogid);
  console.log(req.body);
  var blogid = req.params.blogid;
  if (blogid) {
    BlogModel
      .findByIdAndRemove(blogid)
      .exec(
        function(err, response) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("blogid " + blogid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No locationid"
    });
  }
};
