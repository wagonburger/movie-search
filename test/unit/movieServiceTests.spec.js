
describe('Movie Service', function(){

    var $httpBackend, originalTimeout, movieService, mockMovieResponse;

    beforeEach(function() {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

	beforeEach(module("app"));

	beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        movieService = $injector.get('movieService');

        mockMovieResponse = {
            total: 2,
            totalInSearch: 1,
            movies: [ { "title": "2 Days in the Valley", "duration": 6000, "rating": 3, "year": 1996 }]
        };
	}));

    it('movieService returns a valid result from mock HTTP POST', function(){
        var criteria = {
            filter: 'test',
            skip: 5,
            limit: 10
        };
      
        $httpBackend.when('POST', '/api/movies',
            function(postData) {
                var jsonData = JSON.parse(postData);
                expect(jsonData.filter).toEqual(criteria.filter);
                expect(jsonData.skip).toEqual(criteria.skip);
                expect(jsonData.limit).toEqual(criteria.limit);
                return true;
            }
        ).respond(200, mockMovieResponse );

        movieService.getMovieData(criteria).then(response => {
            expect(response.data.total).toEqual(mockMovieResponse.total);
            expect(response.data.totalInSearch).toEqual(mockMovieResponse.totalInSearch);
        });

        $httpBackend.flush();
    });

	afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
