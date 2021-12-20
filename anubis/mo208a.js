'use strict';

if (Java.available) {
    Java.perform(function() {
        var some_http_class = Java.use("wocwvy.czyxoxmbauu.slsa.b");
        some_http_class.a.overload("java.lang.String", "java.lang.String", "java.lang.String").implementation = function(x, y, z) { 
            send("[*] method called SomeHttpClass.mo208a(\""+ x +"\", " +y+ "\", "+z+"\")");
            var ret = this.a(x, y, z); 
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
