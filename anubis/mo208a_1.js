'use strict';

if (Java.available) {
    Java.perform(function() {
        var java_string = Java.use("java.lang.String");
        var some_http_class = Java.use("wocwvy.czyxoxmbauu.slsa.b");
        some_http_class.a.overload("java.lang.String", "java.lang.String", "java.lang.String").implementation = function(x, y, z) { 
            send("[*] method called SomeHttpClass.mo208a(\""+ x +"\", " +y+ "\", "+z+"\")");
            send("[*] calling method with 123456789abcdefhijklmnoqpuvwz");
            var ret = this.a(java_string.$new("123456789abcdefhijklmnoqpuvwz"), java_string.$new('123456'), java_string.$new('noqpuvwz')); 
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
