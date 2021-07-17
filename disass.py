#!/usr/bin/python

from elftools.elf.elffile import ELFFile
from capstone import *

with open('./chall.elf', 'rb') as f:
    elf = ELFFile(f)
    code = elf.get_section_by_name('.text')
    ops = code.data()
    addr = code['sh_addr']
    md = Cs(CS_ARCH_X86, CS_MODE_64)
#    md.details = True
    try:
        for i in md.disasm(ops, addr):
            print("0x%x:\t%s\t%s" %(i.address, i.mnemonic, i.op_str))

    except Exception as e:
        print(e)
