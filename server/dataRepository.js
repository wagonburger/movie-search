var fs = require('fs')
var _ = require('lodash')

module.exports = {
	getMovies: function(filter, skip, limit){
		return new Promise(function(resolve, reject) {

			var dataFile = './server/data.json';
			fs.readFile(dataFile, 'utf8', (err, response) => {
				if (err){
					reject(err);
					return;
				}

				var data = JSON.parse(response);

				if (data && data.hasOwnProperty('movies')) {
					var movies = data.movies;

					if (filter) {
						movies = _.filter(movies, (m) => { return m.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1; });
					}

					var totalMoviesFromSearch = movies.length;
					movies = _.sortBy(movies, 'title');

					if (skip) {
						movies = _.slice(movies, skip);
					}
					if (limit) {
						movies = _.slice(movies, 0, limit);
					}

					resolve({
						total: data.movies.length,
						totalInSearch: totalMoviesFromSearch,
						movies: movies
					});

				} else {
					reject('Unable to retrieve movies from source');
				}
			});

		});
	}
}