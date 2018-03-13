var jsdom = require('jsdom');
var window = new jsdom.JSDOM('<html><body></body></html>').window;
jQuery = $ = require('jquery')(window);
require('../jquery.ext');

describe('instance methods:', function() {
    afterEach(function() {
        $('body').html('');
    });

    it('jQuery.fn.templateRender(data):', function() {
        $('body').append('<h1 id="title">{{name}}</h1>');
        var data = { name: 'Bendy Zhang'};
        $('#title').bindData(data);
        expect($('#title').text()).toBe('Bendy Zhang');
    });

    it('jQuery.fn.templateRender(data, targetId):', function() {
        $('body').append('<script id="template" type="text/x-handlebars-template"><h1>{{name}}</h1></script><div id="container"></div>');
        var data = { name: 'Bendy Zhang'};
        $('#template').bindData(data, 'container');
        expect($('#container').html()).toBe('<h1>Bendy Zhang</h1>');
    });
});