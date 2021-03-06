#!/usr/bin/python

import sys
from elftools.elf.elffile import ELFFile
from elftools.elf.relocation import RelocationSection

with open("./chall.elf", "rb") as f:
    e = ELFFile(f)
    for section in e.iter_sections():
        if isinstance(section, RelocationSection):
            print(f'{section.name}:')
            symtab = e.get_section(section['sh_link'])
            for relocation in section.iter_relocations():
                sym = symtab.get_symbol(relocation['r_info_sym'])
                addr = hex(relocation['r_offset'])
                print(f'{sym.name} {addr}')
