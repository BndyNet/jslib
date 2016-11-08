((win) -> 
    win.mergeUrl = (root, relativeUrl)->
        arr = root.split("/")
        result = ""
        if relativeUrl and relativeUrl.indexOf("http") isnt 0
            if relativeUrl.indexOf("/") is 0
                result = result + item + "/" for item in arr[0..2]
                return result + relativeUrl.substring(1)
            else if relativeUrl.indexOf("../") is 0
                tmp = relativeUrl.split("../").length
                result = result + item + "/" for item in arr[0..(-tmp-1)]
                return result + relativeUrl.replace(/\.\.\//g, "")
            else
                result = result + item + "/" for item in arr[0..-2]
                return result + relativeUrl
        else
            return relativeUrl

    win.setUrl = ->
        url = location.href
        key = arguments[0]
        value = arguments[1]
        if arguments.length > 2
            url = arguments[0]
            key = arguments[1]
            value = arguments[2]
        reg = new RegExp("#{key}=[^&]*", "ig")
        if reg.test(url)
            return url.replace(reg, "#{key}=#{value}")
        else if url.indexOf("?") > 0
            return "#{url}&#{key}=#{value}"
        else
            return "#{url}?#{key}=#{value}"
) window 