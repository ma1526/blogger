var app = angular.module('bloggerApp', ['ngRoute']);

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
    .otherwise({ redirectTo: '/' });
}
);

// REST Web API functions
function getAllBlogs($http) {
  return $http.get('/api/blogs');
}

function addBlog($http, data) {
  return $http.post('/api/blogs/', data);
}

function getBlogById($http, id) {
  return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, id, data) {
  return $http.put('/api/blogs/' + id, data);
}

function deleteBlogById($http, id) {
  return $http.delete('/api/blogs/' + id);
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
app.controller('ListController', function ListController($http) {
  var vm = this;
  vm.pageHeader = {
    title: "Blogs List"
  };
  getAllBlogs($http)
    .success(function (data) {
      vm.blogs = data;
      vm.message = "Blogs data found!";
    })
    .error(function (e) {
      vm.message = "Could not get list of blogs.";
    });
});

//checked
app.controller('AddController', ['$http', '$location', function AddController($http, $location) {
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
    addBlog($http, data)
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
app.controller('EditController', ['$http', '$routeParams', '$location', function EditController($http, $routeParams, $location) {
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

    updateBlogById($http, vm.id, data)
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
app.controller('DeleteController', ['$http', '$routeParams', '$location', function DeleteController($http, $routeParams, $location) {
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
    deleteBlogById($http, vm.id)
      .success(function (data) {
        vm.message = "Blog deleted.";
        $location.path('/blogList').replace();
      })
      .error(function (e) {
        vm.message = "Could not delete blog with id of " + vm.id;
      });
  }
}]);
