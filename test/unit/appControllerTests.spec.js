
describe('Main Controller Tests', function(){

    var createController, scope, httpBackend, mockMovie;

	beforeEach(module("app"));

	beforeEach(inject(function ($rootScope, $controller, $httpBackend, movieService) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;

        createController = function() {
            return $controller('mainController', {
                '$scope': scope,
                'movieService': movieService
            });
        };

        mockMovie = {
            "title": "20,000 Leagues Under The Sea",
            "directors": { "list": [{ "name": "Richard Fleischer" }] },
            "actors": { "list": [{ "name": "James Mason" }, { "name": "Kirk Douglas" }, { "name": "Paul Lukas" }, { "name": "Peter Lorre" }] },
            "duration": 7260,
            "rating": 4,
            "year": 1954
        };
	}));

    it('does getActors return the correct response for a movie', function(){
        var expectedResponse = 'James Mason, Kirk Douglas, Paul Lukas, Peter Lorre';

        var controller = createController();
        var result = scope.Vm.getActors(mockMovie);

        expect(result).toEqual(expectedResponse);
    });

    it('does getMovies update the controller scope with the valid movies after mock HTTP POST via movieService', function(){
        var mockMovieResponse = {
            total: 1,
            totalInSearch: 1,
            movies: [ mockMovie ]
        };
        httpBackend.when('POST', '/api/movies', function(postData) { return true; }).respond(200, mockMovieResponse );

        var controller = createController();

        scope.Vm.getMoviesForPage(0);
        httpBackend.flush();

        expect(scope.Vm.totalMovies).toEqual(mockMovieResponse.total);
        expect(scope.Vm.movies.length).toEqual(mockMovieResponse.movies.length);
    });
});
