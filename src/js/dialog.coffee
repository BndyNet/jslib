###!
# dialog v1.0.0
# http://www.bndy.net
#
# Copyright (c) 2016 Bndy.Net, released under the MIT license
#
# Requires: jQuery, layer
###

((window)->
    if typeof jQuery is 'undefined'
        throw new Error('Dialog component requires jQuery')
    if typeof layer is 'undefined'
        throw new Error('Dialog component requires layer')


    Dialog = ->
        @.VERSION = "1.0.0"
        @.options =
            useAlertify: false
            logPosition: "bottom right"
            closeLogOnClick: false
        @.init()

    Dialog.prototype =
        init: ->
            if not $
                console.error "jQuery Required"
            if @.options.useAlertify and typeof alertify is "undefined"
                console.error "alertify Required"

            if typeof alertify isnt "undefined"
                alertify.logPosition(@.options.logPosition)
                alertify.closeLogOnClick(@.options.closeLogOnClick)
            return

        _wrapSize: (size) ->
            if size and $.isArray size
                size[0] = size[0] + 'px' if $.isNumeric size[0]
                size[1] = size[1] + 'px' if $.isNumeric size[1]
            else
                size = ['50%', '50%']
            return size

        set: (options) ->
            @.options = $.extend {}, @.options, options
            @.init()

        alert: (msg, callback)  ->
            root = @
            options = $.extend {}, root.options, {
                btn: root.options.btn[0]
            }
            layer.alert msg, options, callback

        success: (msg, callback) ->
            root = @
            if not root.options.useAlertify
                options = $.extend {}, root.options, {
                    icon: 1
                    btn: root.options.btn[0]
                }
                layer.alert msg, options, callback
            else
                alertify.success msg
        info: (msg, callback) ->
            root = @
            if not root.options.useAlertify
                options = $.extend {}, root.options, {
                    icon: 0
                    btn: root.options.btn[0]
                }
                layer.alert msg, options, callback
            else
                alertify.log msg

        error: (msg, callback) ->
            root = @
            if not root.options.useAlertify
                options = $.extend {}, root.options, {
                    icon: 2
                    btn: root.options.btn[0]
                }
                layer.alert msg, options, callback
            else
                alertify.error msg

        confirm: (msg, fnYes, fnCancel) ->
            root = @
            options = $.extend {}, root.options, {
                icon: 3
            }
            layer.confirm msg, options, (index) ->
                if fnYes
                    fnYes(index)
                layer.close index
            ,(index) ->
                if fnCancel
                    fnCancel(index)

        prompt: (title, fnYes, formType) ->
            root = @
            options = $.extend {}, root.options, {
                title: title
                formType: formType||1
            }
            layer.prompt options, fnYes

        tip: (msg, selector, options) ->
            layer.tips msg, selector, $.extend {}, @.options, {
                shade: false
                btn: null
                closeBtn: 0
                time: @.options.tipsTime
            }

        show: (selector, title, size) ->
            root = @
            size = ['50%', '50%'] if not size or not $.isArray size
            options = $.extend {}, root.options, {
                type: 1
                btn: null
                area: root._wrapSize size
                content: $(selector)
            }
            layer.open options
        iframe: (url, title, size) ->
            root = @
            size = ['50%', '50%'] if not size or not $.isArray size
            options = $.extend {}, root.options, {
                type: 2,
                btn: null
                area: root._wrapSize size
                content: url,
            }
            layer.open options

        loading: (selector, options) ->
            root = @
            if selector
                options = $.extend {}, {text: 'Loading...'}, options
                html = $('<div class="bn-dialog-loading"><i class="icon fa fa-spin fa-spinner"></i><span class="text">' + options.text + '</span></div>')
                $(selector).each ->
                    $(this).find('.bn-dialog-loaded').remove()
                    if $(this).find('.bn-dialog-loading').length > 0
                        $(this).find('.bn-dialog-loading').show()
                    else
                        h = html.clone()
                        $(this).height $(this).height()
                            .css 'position', 'relative'
                        h.width $(this).outerWidth()
                        h.height $(this).outerHeight()
                        h.css 'padding-top', h.height() / 2 - 10
                        $(this).append h
            else
                options = $.extend {}, root.options, {
                    # time: second * 1000
                    btn: null,
                    shade: root.options.loadingShade
                }
                layer.load root.options.loadingIcon, options
            return
        loaded: (selector, selectorContent) ->
            if selector
                $(selector).each ->
                    if selectorContent
                        $(this).children(':not(.bn-dialog-loading)').remove()
                        $(this).find('.bn-dialog-loading')
                          .removeClass('bn-dialog-loading')
                          .addClass('bn-dialog-loaded')
                          .html(selectorContent)
                    else
                        $(this).find('.bn-dialog-loading').remove()
            else
                layer.closeAll "loading"
            return

    window.dialog = new Dialog()
) window
