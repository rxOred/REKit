'use strict';

let flag = false;

Interceptor.attach(ptr(0x403570), {
    onEnter: function (args) {
        let backtrace = Thread.backtrace(this.context, Backtracer.ACCURATE).join('\n\t').split('\n\t');       
        let msg;
        if (args[1] == 0x102 && args[2] == 0x20){
            msg = 'SPACE';
            flag = true;
        } else {
            flag = false;
        }
        
        if (msg != undefined) {
            console.log(backtrace[0] + "called [*] 0x403570 => params (" +
            "\n\t Hwnd      -> " + args[0] + 
            "\n\t Msg       -> " + msg + 
            "\n\t wParam    -> " + args[2] + 
            "\n\t lParam    -> " + args[3] +
            "\n\t)" 
            );
        }
    },

    onLeave: function (retval) {
        if (flag) {
            console.log("retval => " + retval +
            "\n----------------------------------------------------------------------------------------");
        }
    }
})
