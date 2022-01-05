'use strict';

let registerClass = Module.findExportByName("user32.dll", 
    "RegisterClassExW");
let createWindow = Module.findExportByName("user32.dll", 
    "CreateWindowExW");

let flag = false;

/*
ATOM RegisterClassExW(
    [in] const WNDCLASSEXW *unnamedParam1
);

typedef struct tagWNDCLASSEXW { // offset
    UINT      cbSize;           // 0x0      0
    UINT      style;            // 0x4      1
    WNDPROC   lpfnWndProc;      // 0x8      2
    int       cbClsExtra;       // 0xc      3
    int       cbWndExtra;       // 0x10     4
    HINSTANCE hInstance;        // 0x14     5
    HICON     hIcon;            // 0x18     6
    HCURSOR   hCursor;          // 0x1c     7
    HBRUSH    hbrBackground;    // 0x20     8
    LPCWSTR   lpszMenuName;     // 0x24     9
    LPCWSTR   lpszClassName;    // 0x28     10
    HICON     hIconSm;          // 0x2c     11
} WNDCLASSEXW, *PWNDCLASSEXW, *NPWNDCLASSEXW, *LPWNDCLASSEXW;
*/

Interceptor.attach(registerClass, {
    onEnter: function (args) {
        if (args[0]) {
            let wndw_classex = new NativePointer(args[0]);
            let backtrace = Thread.backtrace(this.context, Backtracer.ACCURATE).join('\n\t').split('\n\t');
            let class_name =  Memory.readUtf16String(wndw_classex.add(40).readPointer());
            if (class_name == 'FlappyClass') {
                console.log(backtrace[0] + " called [*] RegisterClassExW  => params (" + 
                "\n\t sizeof WNDCLASSEXW    -> " + wndw_classex.readPointer() +
                "\n\t style                 -> " + wndw_classex.add(4).readPointer() +
                "\n\t lpfnWndProc           -> " + wndw_classex.add(8).readPointer() +
                "\n\t cbClsExtra            -> " + wndw_classex.add(12).readPointer() +
                "\n\t cbWndExtra            -> " + wndw_classex.add(16).readPointer() +
                "\n\t lpszMenuName          -> " + Memory.readUtf16String(wndw_classex.add(36).readPointer())  + 
                "\n\t lpszClassName         -> " + class_name +
                "\n\t)");
                flag = true;
            } else {
                flag = false;
            }
        }
    }
});

/*
HWND CreateWindowExW(
  [in]           DWORD     dwExStyle,
  [in, optional] LPCWSTR   lpClassName,
  [in, optional] LPCWSTR   lpWindowName,
  [in]           DWORD     dwStyle,
  [in]           int       X,
  [in]           int       Y,
  [in]           int       nWidth,
  [in]           int       nHeight,
  [in, optional] HWND      hWndParent,
  [in, optional] HMENU     hMenu,
  [in, optional] HINSTANCE hInstance,
  [in, optional] LPVOID    lpParam
);
*/

Interceptor.attach(createWindow, {
    onEnter: function (args) {
        if (flag) {
            // send the parameters to frida wrapper
            let backtrace = Thread.backtrace(this.context, Backtracer.ACCURATE).join("\n\t").split("\n\t");
            console.log(backtrace[0] + " called [*] CreateWindowExW => params (" +
            "\n\t dwExStyle         -> " + args[0] +
            "\n\t lpClassName       -> " + Memory.readUtf16String(args[1]) + 
            "\n\t lpWindowName      -> " + Memory.readUtf16String(args[2]) +
            "\n\t x offset          -> " + args[4] + 
            "\n\t y offset          -> " + args[5] +
            "\n\t width             -> " + args[6] +
            "\n\t height            -> " + args[7] +
            "\n\t)");
        }    
    }
});
