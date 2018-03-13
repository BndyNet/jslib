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
         * Renders the html with specified data. Supports Handelbars engine just include handlebars.js
         * @function external:"jQuery.fn"#bindData
         * @param {object} data - The data model used to bind.
         * @param {targetId=} - The id of target element which is used to include the html bound data.
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
            if (typeof Handlebars === 'undefined') {
                var keys = Object.keys(data);
                for (var idx = 0; idx < keys.length; idx++) {
                    var key = keys[idx];
                    html = html.replace('{{' + key + '}}', data[key]);
                }

                html = html.replace(/\{\{.+\}\}/g, '');
            } else {
                var compile = Handlebars.compile(templateHtml);
                html = compile(data);
            }

            if (targetId) {
                $('#' + targetId).html(html);
            } else {
                $(this).html(html);
            }
            return html;
        },
    });
})(jQuery);