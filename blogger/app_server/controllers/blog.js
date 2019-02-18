/* GET index  page */
module.exports.index = function(req, res){
  res.render('index' );
};

/* GET blog list  page */
module.exports.blogList = function(req, res){
  res.render('blogList');
};

/* GET home page */
module.exports.blogAdd= function(req, res){
  res.render('blogAdd' );
};

