'use strict';

Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function(args) {
        this.flag = false;
        var filename = Memory.readCString(ptr(args[0])); 
        if (filename.endsWith(".xml")) {
            send("[*] open called => (\""+ filename + "\")");
            this.flag = true;
            var backtrace = Thread.backtrace(this.Context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n\t");
            send("[-] traced ["+ Memory.readCString(ptr(args[0])) + "]\nBacktrace => "+ backtrace);
        }
    }
});
