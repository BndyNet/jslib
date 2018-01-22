'use strict';

/**
 * The jQuery plugins.
 * @author Bendy Zhang <zb@bndy.net>
 * @copyright BNDY.NET 2017
 * @see {@link http://bndy.net|Home Page}
 */

$.extend({
    /**
     * @external jQuery
     */

    /**
     * Enables/disables window scrolling.
     * @function external:jQuery.toggleScroll
     * @example
     * $.toggleScroll();
     */
    toggleScroll: function() {
        $('body').toggleScroll();
    },
});

(function ($) {
    /**
     * @external "jQuery.fn"
     */

    /**
     * Highlights the text using HTML mark.
     * @function external:"jQuery.fn"#highlightText
     * @param {string} text - The text needs to highlight.
     * @returns {jQuery} The elements matched.
     * @example
     *  $('p').highlightText('text');
     */
    $.fn.highlightText = function (text) {
        $(this).each(function() {
            if ($(this).children().length === 0) {
                $(this).html($(this).text().replace(
                    new RegExp('(' + text + ')', "ig"),
                    '<mark class="highlight">$1</mark>'
                ));
            }
        });
        return $(this);
    }

    /**
     * Enables/disables element scrolling.
     * @function external:"jQuery.fn"#toggleScroll
     * @example
     * $('.box').toggleScroll();
     */
    $.fn.toggleScroll = function() {
        if ($(this).css('overflow') === 'hidden') {
            $(this).css('overflow', 'auto');
        } else {
            $(this).css('overflow', 'hidden');
        }
    }

    /**
     * Sets a cover for current element.
     * @function external:"jQuery.fn"#cover
     * @param {string} msg - The cover html content.
     * @returns {jQuery} The cover element if msg is not false, otherwise nothing.
     * @example
     * var loading = $('.box').cover('Loading...');
     * loading.cover(false);    // remove cover
     */
    $.fn.cover = function(msg) {
        var parent = $(this);
        if (parent.hasClass('loading-wrapper')) {
            parent = parent.parent();
        }

        if (msg || typeof msg === 'undefined') {
            parent.css({position: 'relative'});
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
    }
})(jQuery);
