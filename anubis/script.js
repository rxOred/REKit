'use strict';

if (Java.available) {

    Java.perform(function(){
        var dex_class_loader = Java.use('dalvik.system.DexClassLoader');
        dex_class_loader.$init.implementation = function(a, b, c, d) {
            var ret = this.$init(a, b, c, d);
            send("[*] constructor called DexClassLoad(\""+ a +", "+b+", "+c+"\");");
            return ret;
        }
        /*
        dex_class_loader.getMethod.overload('Java.lang.String', 'android.app.Service', 'Java.lang.String', 'Java.lang.String').implementation = function(a, b, c, d) {
            var ret = this.getMethod(a, b, c, d);
            send("[*] getMethod called => (\""+ a +", "+c+", "+d+"\");");
            return ret;
        }
        */
    });
   Interceptor.attach(Module.findExportByName(null, "open"), {
        onEnter: function(args) {
            var filename = Memory.readCString(ptr(args[0]));
            send("[*] open called => (\""+ filename + "\")");
            if (filename.endsWith(".class") || filename.endsWith(".dex")) {
                this.flag = true;
                var backtrace = Thread.backtrace(this.Context, Backtracer.ACCURATE).mao(DebugSymbol.fromAddress).join("\n\t");

            }
        },
        onLeave: function(ret) {
            if (this.flag) {
                send("return => "+ ret);
            }       
        }
    }) 
}
