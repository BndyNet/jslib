require('../common');

describe("Test for type Object", function() {
    it('should own property', function() {
        var obj = {person: {name: 'zhang'}};
        var result = false;
        obj.ifHasProperty('person', function(pv) {
            expect(pv).toBe(obj.person);
            result = true;
        });
        expect(result).toBe(true);
    });
    it('should not own property', function() {
        var obj = {person: {name: 'zhang'}};
        var result = false;
        obj.ifHasProperty('person1', function() {
            result = true;
        });
        expect(result).toBe(false);
    });
});

describe("Test for type String", function() {
    it('method:capitalize', function() {
        expect('bendy zhang'.capitalize()).toBe('Bendy Zhang');
    });
    it('method:dasherize', function() {
        expect('bendy zhang'.dasherize()).toBe('bendy-zhang');
    });
    it('method:title2Url', function(){
        expect('Hello World!'.title2Url()).toBe('hello-world-');
    });
});