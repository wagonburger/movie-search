var expect = require('chai').expect;
var dataRepository = require('../../server/dataRepository');

describe('dataRepository Tests', function(){
    
    it('nowtv.com contains nowtv', function(){
        expect('nowtv.com').to.contain('nowtv');
    });

    it('dataRepository returns a total of 160 movies with no filter, limit or skip', function(done){
		var filter = null;
		var skip = null;
		var limit = null;

		dataRepository.getMovies(filter, skip, limit)
			.then(data => {
				expect( data.total ).to.equal( 160 );
		        done();
		    },
		    (ex) => {
		    	done(ex);
		    });
    });

    it('dataRepository total field matches the actual movies returned with no filter', function(done){
		var filter = null;
		var skip = null;
		var limit = null;

		dataRepository.getMovies(filter, skip, limit)
			.then(data => {
				expect( data.total ).to.equal( data.movies.length );
		        done();
		    },
		    (ex) => {
		    	done(ex);
		    });
    });

    it('dataRepository returns 61 movies when you filter on the word "the"', function(done){
		var filter = 'the';
		var skip = null;
		var limit = null;

		dataRepository.getMovies(filter, skip, limit)
			.then(data => {
				expect( data.movies.length ).to.equal( 61 );
		        done();
		    },
		    (ex) => {
		    	done(ex);
		    });
    });

    it('dataRepository returns 20 movies when limit is applied to 20 and also check total in search with "the" filter', function(done){
		var filter = 'the';
		var skip = null;
		var limit = 20;

		dataRepository.getMovies(filter, skip, limit)
			.then(data => {
				expect( data.movies.length ).to.equal( 20 );
				expect( data.totalInSearch ).to.equal( 61 );
		        done();
		    },
		    (ex) => {
		    	done(ex);
		    });
    });

});