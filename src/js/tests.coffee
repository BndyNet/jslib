QUnit.test "mergeUrl", (assert) =>
    check = (root, relative, result) =>
        assert.equal mergeUrl(root, relative), result, "#{root} | #{relative} => #{result}"
        
    check "http://www.bndy.net/root/sub/index.html", "detail.html", "http://www.bndy.net/root/sub/detail.html"
        
    check "http://www.bndy.net/root/sub/index.html", "/detail.html", "http://www.bndy.net/detail.html"
        
    check "http://www.bndy.net/root/sub/index.html", "../detail.html", "http://www.bndy.net/root/detail.html"
        
    check "http://www.bndy.net/root/sub/index.html", "../../detail.html", "http://www.bndy.net/detail.html"
        
    check "http://www.bndy.net/root/sub/index.html", "http://www.bndy.net/detail.html", "http://www.bndy.net/detail.html"
    
    
QUnit.test "setUrl", (assert) =>
    checkLocal = (key, value, result)=>
        assert.ok setUrl(key, value).indexOf(result) > 0, "#{key} | #{value} => #{setUrl(key, value)}"
    check = (url, key, value, result) =>
        assert.equal setUrl(url, key, value), result, "#{url} | #{key} | #{value} => #{setUrl(url, key, value)}"
        
   
    checkLocal "page", 3, "page=3"
    check "http://www.bndy.net/index", "page", 3, "http://www.bndy.net/index?page=3"
    check "http://www.bndy.net/index?page=1", "page", 3, "http://www.bndy.net/index?page=3"
    check "http://www.bndy.net/index?k=bndy&page=1", "page", 3, "http://www.bndy.net/index?k=bndy&page=3"
    check "http://www.bndy.net/index?page=1&k=bndy", "page", 3, "http://www.bndy.net/index?page=3&k=bndy"