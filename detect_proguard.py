import re, os
from pathlib import Path

def non_ascii_in_string(string):
    regexp = re.compile(r'[^\x00-\xff]')
    if regexp.search(string):
        return True
    else:
        return False

def scan_file(filepath):
    try:
        with open(filepath, mode='r') as f: 
            i = 0
            for line in f: 
                i+=1
                if non_ascii_in_string(line):
                    print "line [{lno}] {line} - {file}".format(lno=i, line=line, file=filepath)

    except:
        return

def main():
    pathlist = Path("smali").rglob("*.smali")
    for path in pathlist:
        scan_file(str(path))

if __name__ == '__main__':
    main()
