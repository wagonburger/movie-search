describe('user searching iceburg movies', function(){

    beforeEach( function(){
        browser.driver.get('http://localhost:8000');
    });

    it('user can search for term "the" which returns 61 of the available 160 movies', function() {
    	element(by.model('typeAhead')).sendKeys('the');

    	var ele = element(by.css('.matched'));
    	ele.getText().then(function( value ) {
    		expect( value ).toEqual( 'Matched 61 of 160 movies total' );
    	});
    });

});