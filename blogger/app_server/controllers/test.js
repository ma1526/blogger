/* GET index  page */
module.exports.index = function(req, res){
  res.render('index' );
};

/* GET blog list  page */
module.exports.blogList = function(req, res){
  res.render('blogList', {
    blogs: [{

        "blogTitle" : "First Blog Title",
        "blogText" : "First Blog Text",
        "dateOfCreation" : new Date("3030-02-24T03:24:00Z")
    },{
        "blogTitle" : "2nd Blog Title",
        "blogText" : "2nd Blog Text",
        "dateOfCreation" : new Date("3040-02-24T03:24:00Z")
    },{
        "blogTitle" : "3rd Blog Title",
        "blogText" : "3rd Blog Text",
        "dateOfCreation" : new Date("3050-02-24T03:24:00Z")
    }],
  
  testTitle: "hello his work"
  });
};

/* GET home page */
module.exports.blogAdd= function(req, res){
  res.render('blogAdd' );
};

/* GET edit page */
module.exports.blogEdit= function(req, res){
  res.render('blogEdit' );
};

/* GET delete page */
module.exports.blogDelete= function(req, res){
  res.render('blogDelete' );
};

