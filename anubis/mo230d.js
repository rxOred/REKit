'use strict';

if (Java.available) {
    Java.perform(function() {
        var java_string = Java.use("java.lang.String");
        var some_http_class = Java.use("wocwvy.czyxoxmbauu.slsa.b");
        some_http_class.d.overload('java.lang.String').implementation = function(x) {
            send("[*] method called SomeHttpClass.mo230d(\""+x+"\")");
            var ret = this.d(x);
            if (ret != undefined) {
                send(" => return: "+ ret);
                return ret;
            }
            else {
                send(" => return: undefined");
                return Java.use('java.lang.String').$new("undefined");
            }
        }
    });
}
