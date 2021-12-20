import frida
import sys, codecs, os, time

def callback(message, data):
    if 'payload' in message or message['type'] == 'send':
        print("[!] callback -> {0}".format(message['payload']))
    else:
        print(message)

def main():
    if len(sys.argv) < 3:
        print("wrapper.py <appname> <agent>")
        os.exit(0)

    source = None
    with codecs.open(sys.argv[2], "r", "utf-8") as f:
        source = f.read()

    if source:
        device = frida.get_usb_device()
        pid = device.spawn([sys.argv[1]])
        device.resume(pid)
        time.sleep(1)
        session = device.attach(pid)
        script = session.create_script(source)
        script.on('message', callback)
        script.load()
        
        sys.stdin.read()

    else:
        print("failed to read the frida agent")
        os.exit(1)


if __name__ == '__main__':
    main()
