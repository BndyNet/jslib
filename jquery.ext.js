/**
 * The jQuery plugins.
 * @author Bendy Zhang <zb@bndy.net>
 * @copyright BNDY.NET 2017
 * @see {@link http://bndy.net|Home Page}
 */

'use strict';

(function ($) {
    //==================================================================
    /**
     * @external jQuery
     */
    $.extend({
        /**
         * Enables/disables window scrolling.
         * @function external:jQuery.toggleScroll
         * @example
         * $.toggleScroll();
         */
        toggleScroll: function () {
            $('body').toggleScroll();
        },

        /**
         * Gets a single Promise that resolves all $.ajax functions.
         * @function external:jQuery.ajaxAll
         * @param {jqXhr} argument - A jqXhr such as $.ajax({})
         * @param {jqXhr} ... - more
         * @returns {Promise} A single promise.
         * @example
         * $.ajaxAll($.get(...), $.post(...), $.ajax(...)).then(function(values){}, function(rejections){});
         * $.ajaxAll($.get(...));
         */
        ajaxAll: function () {
            var promises = [];
            for (var idx = 0; idx < arguments.length; idx++) {
                var jqXhr = arguments[idx];
                promises.push(new Promise(function (resolve, reject) {
                    jqXhr.done(resolve).fail(reject);
                }));
            }

            return Promise.all(promises);
        },
    });


    //==================================================================
    /**
     * @external "jQuery.fn"
     */
    $.fn.extend({

        /**
         * Highlights the text using HTML mark.
         * @function external:"jQuery.fn"#highlightText
         * @param {string} text - The text needs to highlight.
         * @returns {jQuery} The elements matched.
         * @example
         * <p>Hello World!</p>
         * $('p').highlightText('e');
         * // => <p>H<mark class="highlight">e</mark>llo World!</p>
         */
        highlightText: function (text) {
            $(this).each(function () {
                if ($(this).children().length === 0) {
                    $(this).html($(this).text().replace(
                        new RegExp('(' + text + ')', "ig"),
                        '<mark class="highlight">$1</mark>'
                    ));
                }
            });
            return $(this);
        },

        /**
         * Enables/disables element scrolling.
         * @function external:"jQuery.fn"#toggleScroll
         * @example
         * $('.box').toggleScroll();
         */
        toggleScroll: function () {
            if ($(this).css('overflow') === 'hidden') {
                $(this).css('overflow', 'auto');
            } else {
                $(this).css('overflow', 'hidden');
            }
        },

        /**
         * Sets a cover for current element.
         * @function external:"jQuery.fn"#cover
         * @param {string} msg - The cover html content.
         * @returns {jQuery} The cover element if msg is not false, otherwise nothing.
         * @example
         * var loading = $('.box').cover('Loading...');
         * loading.cover(false);    // remove cover
         */
        cover: function (msg) {
            var parent = $(this);
            if (parent.hasClass('loading-wrapper')) {
                parent = parent.parent();
            }

            if (msg || typeof msg === 'undefined') {
                parent.css({
                    position: 'relative'
                });
                var elem = $('<div class="loading-wrapper"><span style="display: table-cell;vertical-align: middle;text-align: center;"></span></div>');
                elem.find('span').html(msg);
                elem.css({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'table',
                    width: parent.outerWidth(),
                    height: parent.outerHeight(),
                    backgroundColor: 'rgba(255,255,255, .8)',
                    textAlgin: 'center',
                });
                parent.append(elem);
                return elem;
            } else {
                parent.find('.loading-wrapper').remove();
            }
        },

        /**
         * Animates css for target.
         * @function external:"jQuery.fn"#animateCss
         * @param {string} animationName - The animation name in https://github.com/daneden/animate.css
         * @param {function} callback - The callback function.
         * @example
         * $('.box').animateCss('bounce', function() {});
         */
        animateCss: function (animationName, callback) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);
                if (callback) {
                    callback();
                }
            });
            return this;
        },

        /**
         * Renders the html with specified data. 
         * Supports Handelbars engine or lodash for deeper level binding.
         * @function external:"jQuery.fn"#bindData
         * @param {object} data - The data model used to bind.
         * @param {targetId=} targetId - The id of target element which is used to include the html bound data.
         * @example
         * $('<h1>{{name}}</h1>').bindData({name: 'Bendy'});
         * // => '<h1>Bendy</h1>'
         * <script id="tpl" type="text/x-handlebars-template">
         *  <h1>{{name}}</h1>
         * </script>
         * <div id="container"></div>
         * $('#tpl').bindData({name: 'Bendy'}, 'container');
         * <div id="container"><h1>Bendy</h1></div>
         * @returns {string} The html string with bound data.
         */
        bindData: function(data, targetId) {
            var templateHtml = $(this).html();
            var html = templateHtml;
            if (typeof Handlebars !== 'undefined') {
                // Handlebars
                var compile = Handlebars.compile(templateHtml);
                html = compile(data);
            } else {
                if (typeof _ !== 'undefined') {
                    // use lodash to parse the variables
                    var binds = html.match(/{{[^}]+}}/g);
                    _.forEach(binds, function(bind) {
                        var key = bind.replace(/[{}]/g, '');
                        var val = _.get(data, key);
                        html = html.replace(new RegExp(bind.replace(/([\[\]\.])/g, '\\$1'), 'g'), val||'');
                    });
                } else {
                    var keys = Object.keys(data);
                    for (var idx = 0; idx < keys.length; idx++) {
                        var key = keys[idx];
                        html = html.replace('{{' + key + '}}', data[key]);
                    }
                }
                html = html.replace(/\{\{.+\}\}/g, '');
            }

            if (targetId) {
                $('#' + targetId).html(html);
            } else {
                $(this).html(html);
            }
            return html;
        },

        /**
         * Renders a Markdown Editor using editor.md
         * @function external:"jQuery.fn"#mdEditor
         * @param {object} options - The options for editor.md
         * @returns {object} An instance of editormd and attached `html()`, `markdown()` methods.
         * @example
         * <div id="mdEditorDiv"></div>
         * 
         * var editor = $('#mdEditorDiv').mdEditor({
         *      with: '50%',                                    // default 100%
         *      height: 400,                                    // default 640
         *      path: '../node_modules/editor.md/lib/'          // required, the path which includes all dependencies
         * });
         * editor.html();       // get html content
         * editor.markdown();   // get markdown content
         */
        mdEditor: function(options) {
            var id = $(this).attr('id');
            if (!id) {
                throw new Error('Not found element or No `id` defined for editor.md.');
            }
            if (!options.path) {
                throw new Error('Please specify `path` value for editor.md dependencies folder in `options`. `options` example: {path: `../node_modules/editor.md/lib/`}');
            }
            if (!editormd) {
                throw new Error('Requires editor.md (http://pandao.github.io/editor.md/)');
            }

            var defaultOptions = {
                width   : "100%",
                height  : 640,
                syncScrolling : "single",
                saveHTMLToTextarea : true,
            };
            options = $.extend({}, defaultOptions, options);
            var editor = editormd(id, options); 
            return $.extend(editor, {
                originHtml: editor.getHTML,
                markdown: editor.getMarkdown,
                html: editor.getPreviewedHTML,
            });
        },
    });
})(jQuery);