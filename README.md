## jquery.checkall

**Dependencies:** jQuery

Check all for `checkbox`.

Optional: [iCheck](https://github.com/fronteed/icheck), use `icheckAll` instead of `checkAll`.

### Example
```js
$('#chkAll').checkAll('.child', {
       inverse: true,  // true to reverse the checkbox, otherwise all or none
       end: function(){
           var checked = $(this).prop('checked');
           console.debug(checked ? 'Checked' : 'Unchecked');
       }
   });
```

## [Form & Validation (UI)](http://bndy.net/html/demo_form.html)

**Dependencies:** jQuery, jQuery Validation, Bootstrap

![](src/images/demo_form.png)


## [Dialog Component](http://bndy.net/html/demo_dialog.html)

**Dependencies:** jQuery, layer

dialogs about alert, success, warn, error, form, iframe and so on.

```html
  <button class="btn btn-primary"
            onclick="dialog.alert('alert', function () { dialog.alert('callback'); })">
        alert
    </button>
    <button class="btn btn-success"
            onclick="dialog.success('success', function () { dialog.alert('callback'); })">
        success
    </button>
    <button class="btn btn-warning"
            onclick="dialog.warn('warn', function () { dialog.alert('callback'); })">
        warn
    </button>
    <button class="btn btn-danger"
            onclick="dialog.error('error', function () { dialog.alert('callback'); })">
        error
    </button>

    <hr />

    <button class="btn btn-default"
            onclick="dialog.confirm('Are you OK?', function (idx) { dialog.success('Yes: ' + idx)}, function (idx) { dialog.alert('No: ' + idx) })">
        confirm
    </button>

    <button class="btn btn-default"
            onclick="dialog.prompt('Input:', function (val) { dialog.success('value: ' + val)}, 1)">
        prompt textbox
    </button>

      <button class="btn btn-default"
            onclick="dialog.prompt('Input:', function (val) { dialog.success('value: ' + val)}, 2)">
        prompt textarea
    </button>

    <hr />

    <button class="btn btn-default"
            onclick="dialog.loading(3)">
        loading
    </button>

    <hr />

    <div id="dialogForm" style="display:none;">
        <form style="margin: 20px;">
            <div class="form-group">
                <label>Username</label>
                <input class="form-control" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input class="form-control" />
            </div>
        </form>
    </div>
    <button class="btn btn-default"
            onclick="dialog.show('#dialogForm', 'Form', ['30%', 248])">
        Show Form
    </button>

    <button class="btn btn-default"
            onclick="dialog.iframe('http://www.bing.com', 'Bing Search', ['80%', '80%'])">
        Bing
    </button>

    <hr />

    <button class="btn btn-default"
            onclick="dialog.tip('dialog.tip', this)">
        tip
    </button>
```