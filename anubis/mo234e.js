'use strict';

if (Java.available) { 
    Java.perform(function() {
        var some_http_class = Java.use("wocwvy.czyxoxmbauu.slsa.b");
        some_http_class.e.overload("android.content.Context", "java.lang.String").implementation = function(x, y) {
            var ret = this.e(x, y);
            if (ret != null)
            send("[*] method called SomeHttpClass.mo234e(\""+ y +"\") => return: "+ ret.toString());
            return ret;
        }
    })
}
