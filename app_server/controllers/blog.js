var request = require('request');
//sets up URL 
var apiOptions = {
  server : "http://localhost:80"
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = "https://getting-mean-loc8r.herokuapp.com";
}
//
var _showError = function (req, res, status) {
  var title, content;
  if (status === 404) {
    title = "404, page not found";
    content = "Oh dear. Looks like we can't find this page. Sorry.";
  } else if (status === 500) {
    title = "500, internal server error";
    content = "How embarrassing. There's a problem with our server.";
  } else {
    title = status + ", something's gone wrong";
    content = "Something, somewhere, has gone just a little bit wrong.";
  }
  res.status(status);
  res.render('generic-text', {
    title : title,
    content : content
  });
};

/* GET index  page */
module.exports.index = function(req, res){
  res.render('index' );
};

module.exports.blogList = function(req, res){
  var requestOptions, path;
  path = '/api/blogs';//
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
    qs : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;
      renderHomepage(req, res, data);
    }
    );
};

var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render('blogList', {
    blogs: responseBody
  });
};

/* GET add blog form */
module.exports.getBlogAdd= function(req, res){
  res.render('blogAdd' );
};
//post new blog
module.exports.postBlogAdd=function(req, res){

  var requestOptions, path;
  path = "/api/blogs/";

  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : {
     blogTitle: req.body.blogTitle,
     blogText: req.body.blogText
   }
 };

 console.log("path = " + path ); 
 request(
  requestOptions,
  function(err, response, body) {
    console.log("new post body = " + JSON.stringify (body) );
    if ( response.statusCode== 201){
      res.redirect('/blogList');
      console.log("new post body = " + JSON.stringify (body) );
    } else{
      _showError(req, res, response.statusCode);
    }
  }
  );
};

/* 
module.exports.blogEdit = function(req, res) {
    var requestOptions, path;
    path = "/api/blogs/" + req.params.blogid;
    requestOptions = {
        url : apiOptions.server + path,
        method : "GET",
        json : {}
    };
    console.log("path = " + path ); 
    request(
        requestOptions,
        function(err, response, body) {
        renderShowPage(req, res, body);
        console.log("body = " + JSON.stringify (body) );
        }
    );
};
*/
module.exports.getBlogEdit = function (req, res) {
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      res.render('blogEdit', {
        blog : body
      });
    }
    );
};

/* Blog edit post */
module.exports.postBlogEdit = function (req, res) {
  console.log("postBlogEdit is called and res.body = " + JSON.stringify (req.body) +" req.body.blogTitle = "+ req.body.blogTitle +" req.body.blogText"+ req.body.blogText+ " req.params.blogid = " + req.params.blogid);
  var requestOptions, path, postdata;
  var blogid = req.params.blogid;
  path = '/api/blogs/' + blogid;
  postdata = {
    blogTitle : req.body.blogTitle,
    blogText : req.body.blogText
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "PUT",
    json : postdata
  };
  request(
    requestOptions,
    function(err, response, body) {
       console.log("body = " + JSON.stringify (body));
       console.log("response.statusCode = " + response.statusCode);
      if (response.statusCode === 200) {
        res.redirect('/blogList');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );
};

module.exports.getBlogDelete= function(req, res){
  console.log(" req.params.blogid = " + req.params.blogid );
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {}
  };
  request(
    requestOptions,
    function(err, response, body) {
      res.render('blogDelete', {
        blog : body
      });
    }
  );

};
///
/* GET delete page */
module.exports.postBlogDelete= function(req, res){
  console.log(" req.params.blogid = " + req.params.blogid );
  var requestOptions, path;
  path = "/api/blogs/" + req.params.blogid;
  requestOptions = {
    url : apiOptions.server + path,
    method : "DELETE",
    json : {}
  };
  //need work
  request(
    requestOptions,
    function(err, response, body) {
       console.log("body = " + JSON.stringify (body));
       console.log("response.statusCode = " + response.statusCode);
      if (response.statusCode === 204) {
        res.redirect('/blogList');
      } else {
        _showError(req, res, response.statusCode);
      }
    }
  );

};
