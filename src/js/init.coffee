$ ->
    # jquery
    if $
        if $.fn.iCheck
            $("input:checkbox, input:radio").iCheck 
                checkboxClass: "icheckbox_minimal"
                radioClass: "iradio_minimal"
                increaseArea: "20%" # optional
                
        if $.fn.slimScroll
            $('.slim-scroll').each ->
                $(this).slimScroll height: $(this).height()
            
        
    # dialog
    if typeof dialog isnt "undefined"
        dialog.set 
            title: "INFO"
            shade: [0.2, "#000"]
            shadeClose: false
            shift: 0    # 0-9
            maxmin: true
            fix: true
            btn: ["OK", "Cancel"]
            closeBtn: 1     #0-2
            tips: [1, '#f0ad4e']
            tipsTime: 3000
            loadingIcon: 1      #0-2
            loadingShade: [0.6, "#fff"]
            useAlertify: true
        
    # read-only form
    $("form.readonly").find("input,select,button").each ->
        tag = $(this)[0].tagName
        tagType = $(this).attr "type"
        val = ""
        switch tag
            when "INPUT"
                $(this).attr "readonly", true
                $(this).attr "disabled", true
                switch tagType
                    when "radio", "checkbox"
                        wrapper = $(this).parent()
                        wrapper = wrapper.parent() if wrapper.parent().hasClass "checkbox" or wrapper.parent().hasClass "radio"
                        if $(this).is ":checked"
                            val = wrapper.text()
                            wrapper.after "<div class='form-control-static'>#{val}</div>"
                        wrapper.remove()
                    when "file"
                        wrapper = $(this).parents('.form-group')
                        wrapper.remove()
                    else
                        val = $(this).val()
                        $(this).after "<div class='form-control-static'>#{val}</div>"
                        $(this).remove()
            when "SELECT"
                val = $(this).val()
                $(this).after "<div class='form-control-static'>#{val}</div>"
                $(this).remove()
    $("form.readonly:not(:visible)").show()
    
    
    return