/**
 * Created by jianglinj on 2016/4/13.
 */
var utils = {
    getSingle: function (fn) {
        var ret;
        return function () {
            return ret || (ret = fn.apply(this, arguments));
        }
    }
}
