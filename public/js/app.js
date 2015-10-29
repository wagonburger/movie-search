(function() {

    var app = angular.module('app', [])

    app.factory('movieService', ['$http', function($http) {

    	var getMovieData = function(criteria) {
    		return $http.post('/api/movies', criteria);
    	}

    	return {
    		getMovieData: getMovieData
    	}
    }]);

    app.directive('searchFilter', ['$timeout', function($timeout) {
    	return {
    		restrict: 'E',
    		replace: true,
    		template: '<input />',
    		require: 'ngModel',
    		scope: {
    			onFilterChanged: '&'
    		},
    		link: function($scope, element, attrs, ngModel) {
    			var filterTimeout;

				var modelWatch = $scope.$watch(function () { return ngModel.$modelValue }, function(newVal, oldVal) {
					if (newVal !== oldVal) {
						updateFilterState(newVal);
					}
				});

				function updateFilterState(value) {
					if (value.length === 0 || value.length >= 3){ 
						if (filterTimeout) $timeout.cancel(filterTimeout);

						filterTimeout = $timeout(function() {
							$scope.onFilterChanged({filter: value});
				        }, 250);
					}
				}

				$scope.$on('$destroy', function() {
					modelWatch();
				});
    		}
    	};
    }]);

    app.controller('mainController', ['$scope', 'movieService', function($scope, movieService) {
    	var _vm = $scope.Vm = {
    		filter: {
    			filterText: null,
    			filterTimeout: null,
    			filterWarning: null
    		},
    		movies: [],
    		totalMovies: null,
   			totalMoviesInSearch: null,
    		pagination: {
    			pageSize: 20,
    			currentPage: 0,
    			previousPageVisible: false,
    			nextPageVisible: true,
    			numberOfPages: numberOfPages.bind(this)
    		},
    		onFilterChanged: onFilterChanged.bind(this),
    		getActors: getActors.bind(this),
    		getMoviesForPage: getMoviesForPage.bind(this)
    	};

		function numberOfPages() {
			return Math.ceil(_vm.totalMoviesInSearch/_vm.pagination.pageSize); 
		}

		function getActors(movie) {
			if (!movie.hasOwnProperty('actors')) { 
				return null;
			}
			
			return movie.actors.list
				.map(function(item){
					return item.name;
				})
				.reduce(function(p, n){
					if (p) { 
						return p + ', ' + n;
					}
					return n;
				}, null);
		}

		function onFilterChanged(filter) {
			_vm.filter.filterText = filter;
			_vm.getMoviesForPage(filter, 0);
		}

		function getMoviesForPage(filter, newPage) {
			_vm.pagination.currentPage = newPage;

			var criteria = { 
				filter: filter,
				skip: (newPage * _vm.pagination.pageSize),
				limit: _vm.pagination.pageSize
			};

	     	return movieService.getMovieData(criteria).then(function(response) {
	    		_vm.movies = response.data.movies;
	    		_vm.totalMovies = response.data.total;
	    		_vm.totalMoviesInSearch = response.data.totalInSearch;

				_vm.pagination.previousPageVisible = (newPage !== 0);
				_vm.pagination.nextPageVisible = (newPage < (_vm.pagination.numberOfPages() - 1));
			});
		}

		_vm.getMoviesForPage(null, 0);
    }]);

})();