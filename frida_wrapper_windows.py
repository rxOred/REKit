import frida
import sys, codecs, os, time

def callback(message, data):
    if 'payload' in message or message['type'] == 'send':
        print("--> {0}".format(message['payload']))
    else:
        print(message)

def main():
    if len(sys.argv) < 2:
        print("wrapper.py <agent.js>")
        sys.exit(0)
    
    source = None
    with codecs.open(sys.argv[1], "r", "utf-8") as f:
        source = f.read()
        
    if source: 
        pid = frida.spawn("HackyBird.exe")
        session = frida.attach(pid)
        script = session.create_script(source)
        frida.resume(pid)
        script.on('message', callback)
        script.load()
        sys.stdin.read()
    else:
        print("failed to read agent")
        sys.exit(1)

if __name__ == '__main__':
    main()
