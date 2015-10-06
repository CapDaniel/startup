(function() {
  var movie_app = angular.module('movie_app', ['ngRoute', 'LocalStorageModule']);
  movie_app.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('movies');
  });
  movie_app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/movie_list.html',
      controller: 'MovieListController'
    }).when('/movie_add', {
      templateUrl: 'templates/movie_add.html',
      controller: 'AddMovieController'
    }).when('/:movieName', {
      templateUrl: 'templates/movie_details.html',
      controller: 'MovieDetailsController'
    }).when('/:movieName/movie_edit', {
      templateUrl: 'templates/movie_edit.html',
      controller: 'EditMovieController'
    }).otherwise({
      redirectTo: '/'
    });
  }]);
  movie_app.filter('trustUrl', function($sce) {
    return function(url) {
      return $sce.trustAsResourceUrl(url);
    };
  });
  movie_app.controller('MovieListController', ['$scope', 'localStorageService', function($scope, localStorageService) {
    $scope.movies = localStorageService.get('movies');
    $scope.sortBy = 'name';
  }]);
  movie_app.controller('AddMovieController', ['$scope', 'localStorageService', '$location', function($scope, localStorageService, $location) {
    var moviesInStore = localStorageService.get('movies');
    $scope.movies = moviesInStore || [];
    $scope.$watch('movies', function() {
      localStorageService.set('movies', $scope.movies);
    }, true);
    $scope.movie_add = function() {
      $scope.movies.push({
        "name": $scope.name,
        "description": $scope.description,
        "image": $scope.image,
        "trailer": $scope.trailer,
        "imdb": $scope.imdb,
        "year": $scope.year,
        "director": $scope.director,
        "duration": $scope.duration,
        "genre": $scope.genre,
        "actors": [$scope.actor0, $scope.actor1, $scope.actor2]
      });
      $location.path('/');
    };
  }]);
  movie_app.controller('MovieDetailsController', ['$scope', '$routeParams', 'localStorageService', function($scope, $routeParams, localStorageService) {
    $scope.name = $routeParams.movieName;
    var moviesInStore = localStorageService.get('movies');
    $scope.movie = moviesInStore.filter(function(entry) {
      return entry.name === $scope.name;
    })[0];
  }]);
  movie_app.controller('EditMovieController', ['$scope', '$routeParams', 'localStorageService', '$location',
    function($scope, $routeParams, localStorageService, $location) {
      $scope.name = $routeParams.movieName;
      var moviesInStore = localStorageService.get('movies');
      $scope.movie = moviesInStore.filter(function(entry) {
        return entry.name === $scope.name;
      })[0];
      $scope.movies = moviesInStore || [];
      var i = $scope.movies.indexOf($scope.movie);
      $scope.movies.splice(i, 1);
      $scope.$watch('movies', function() {
        localStorageService.set('movies', $scope.movies);
      }, true);
      $scope.movie_edit = function() {
        $scope.movies.push({
          "name": $scope.movie.name,
          "description": $scope.movie.description,
          "image": $scope.movie.image,
          "trailer": $scope.movie.trailer,
          "imdb": $scope.movie.imdb,
          "year": $scope.movie.year,
          "director": $scope.movie.director,
          "duration": $scope.movie.duration,
          "genre": $scope.movie.genre,
          "actors": [$scope.movie.actor0, $scope.movie.actor1, $scope.movie.actor2]
        });
        $location.path('/');
      };
    }
  ]);
  movie_app.controller('DeleteMovieController', ['$scope', '$location', 'localStorageService', function($scope, $location, localStorageService) {
    $scope.$watch('movies', function() {
      localStorageService.set('movies', $scope.movies);
    }, true);
    $scope.deleteMovie = function(movie) {
      var i = $scope.movies.indexOf(movie);
      $scope.movies.splice(i, 1);
      $location.path('/');
    };
  }]);
})();
