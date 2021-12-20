'use strict';

var fds = {};
Interceptor.attach(Module.findExportByName(null, "open"), {
    onEnter: function(args) {
        var filename = Memory.readCString(ptr(args[0]));
        if (filename.endsWith('.xml')) {
            send("[*] open called => (\""+ filename + "\")");
            this.flag = true;
            this.fname = filename;
        }
    },
    onLeave: function(retval) {
        if (this.flag) {
            fds[retval] = this.fname;
        }
    }
});
['read', 'write', 'pread', 'pwrite', 'readv', 'writev'].forEach(func => {
    Interceptor.attach(Module.findExportByName(null, func), {
        onEnter: function(args) {
            var fd = args[0];
            if (fd in fds) {
                send(`${func}: ${fds[fd]} \t`);
                if (args[1] != null) {
                    if (func == 'write') {
                        var buffer = Memory.readCString(ptr(args[1]));
                        send("\tbuffer => "+buffer);
                    }
                }
            }
        }
    });
});
