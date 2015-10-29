## Movie Search

# Task

Provide a NodeJS server and Angular UI which allows a customer to search for movies which they might like to watch.

# Assumptions

Based on the requirements provided, a few assumptions where made regarding the functionality of the results from the search.

- Once a search is completed  (i.e. the customer enters the word 'the'), the search displays the results accordingly.  If then the customer deletes up to 2 characters from the search, the original results will persist (since the total number of search characters is less than 3 but greater than 0).  Only when the number of characters is 0 or greater than 2 will the search results change.  NOTE: 0 characters will reset the results back to the original first 20 movies ordered alphabetically.

- Server-side paging was implemented instead of client-side due to the fact that there was a requirement to implement skip/limit type pagination on the server-side.  On a production environment, this would be best practise since the number of movies might be in there thousands anyway.

- Page design wasn't a priority only due to the time spent on the main test.  Again in production we'd want to make this pretty.

# Architecture

Server
On the server, I seperated out the repository for ease of unit testing and good coding seperation practises.  A POST method was chosen for the express REST end-point since we're sending filter type information across the wire.

Client UI
For this test I kept the service, directive and controller within the same app.js file, but normally I would seperate these out into seperate JS files and bring them together using (Module.Export/Require) with something like Babel/WebPack, etc.

Testing
I've added tests to all three areas, (server-unit, unit and protractor) using the same commands and setup which came with the test.

# Commands to run:

Please run "npm install" after cloning the project to install the node modules.

 npm run start - starts local server
 npm run unit - run the karma unit tests
 npm run e2e - run the protractor tests 
 npm run server-unit - run the backend mocha tests