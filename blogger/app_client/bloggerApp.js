var app = angular.module('bloggerApp', ['ngRoute']); //same name as in index

//checked
//*** Router Provider ***
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
    .when('/blogList', {
      templateUrl: 'pages/blogList.html',
      controller: 'ListController',
      controllerAs: 'vm'
    })
    .when('/blogAdd', {
      templateUrl: 'pages/blogAdd.html',
      controller: 'AddController',
      controllerAs: 'vm'
    })
    .when('/blogEdit/:id', {
      templateUrl: 'pages/blogEdit.html',
      controller: 'EditController',
      controllerAs: 'vm'
    })
    .when('/blogDelete/:id', {
      templateUrl: 'pages/blogDelete.html',
      controller: 'DeleteController',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: 'pages/register.html',
      controller: 'RegisterController',
      controllerAs: 'vm'
    })
    .when('/login', {
      templateUrl: 'pages/login.html',
      controller: 'LoginController',
      controllerAs: 'vm'
    })
    .otherwise({ redirectTo: '/' });
}
);

// REST Web API functions
function getAllBlogs($http) {
  return $http.get('/api/blogs');
}

function addBlog($http, data, authentication) {
  console.log("test");
  console.log( { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
  return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data, authentication) {
  return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlogById($http, id, authentication) {
  return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

// Controllers
//checked
app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.pageHeader = {
    title: "Meireg Ayanto"
  };
  vm.message = "Welcome to my blog site";
});

//checked
app.controller('ListController', ['$http','authentication',function ListController($http, authentication) {
  var vm = this;
  vm.pageHeader = {
    title: "Blogs List"
  };
  vm.isLoggedIn = function(){
    return authentication.isLoggedIn();
  }
  getAllBlogs($http)
    .success(function (data) {
      vm.blogs = data;
      vm.message = "Blogs data found!";
    })
    .error(function (e) {
      vm.message = "Could not get list of blogs.";
    });
}]);

//checked
//forgot to add authentincation
app.controller('AddController', ['$http', '$location','authentication', function AddController($http, $location,authentication) {
  //same eidt
  var vm = this;
  vm.blog = {}
  vm.pageHeader = {
    title: "Add Blog"
  };
  //changes here
  vm.submit = function () {
    var data = vm.blog;
    data.blogTitle = addForm.blogTitle.value; //from form to vm
    data.blogText = addForm.blogText.value;
    //forgot to pass in authentication
    console.log({ headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
    addBlog($http, data, authentication)
      .success(function (data) {
        vm.message = "Blog data added.";
        $location.path('/blogList').replace();
      })
      .error(function (e) {
        vm.message = "Could not add blog given id of" + addForm.blogTitle.text + " " + addForm.blogText.text;
      });
  }
}]);

//checked: used $location for now instead of $state
app.controller('EditController', ['$http', '$routeParams', '$location','authentication', function EditController($http, $routeParams, $location, authentication) {
  var vm = this;
  vm.blog = {}; // Start with a blank book
  vm.id = $routeParams.id; // Get id from $routParams which must be injected and passed into controller
  vm.pageHeader = {
    title: "Blog Edit"
  };

  // Get blog data so it may be displayed on edit page
  getBlogById($http, vm.id)
    .success(function (data) {
      vm.blog = data;
      vm.message = "Blog data found!";
    })
    .error(function (e) {
      vm.message = "Could not get blog given id of" + vm.id;
    });

  // Submit function attached to ViewModel for use in form
  vm.submit = function () {
    var data = vm.blog;
    data.blogTitle = editForm.blogTitle.value; //from to form to vm
    data.blogText = editForm.blogText.value;

    updateBlogById($http, vm.id, data, authentication)
      .success(function (data) {
        vm.message = "Blog data updated.";
        $location.path('/blogList').replace(); // Refer to book for info on StateProvder
      })
      .error(function (e) {
        vm.message = "Could not update blog given id of " + vm.id + editForm.blogTitle.text + " " + editForm.blogText.text;
      });
  }
}]);

//checked
app.controller('DeleteController', ['$http', '$routeParams', '$location','authentication', function DeleteController($http, $routeParams, $location, authentication) {
  //same as edit
  var vm = this;
  vm.blog = {};
  vm.id = $routeParams.id;
  vm.pageHeader = {
    title: "Blog Delete"
  };
  getBlogById($http, vm.id)
    .success(function (data) {
      vm.blog = data;
      vm.messsage = "Blog data found.";
    })
    .error(function (e) {
      vm.message = "Could not get blog with id of " + vm.id;
    });
  //changes from eidt here
  vm.submit = function () {
    deleteBlogById($http, vm.id, authentication)
      .success(function (data) {
        vm.message = "Blog deleted.";
        $location.path('/blogList').replace();
      })
      .error(function (e) {
        vm.message = "Could not delete blog with id of " + vm.id;
      });
  }
}]);