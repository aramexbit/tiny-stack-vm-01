# tiny-stack-vm-01

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/aramexbit/tiny-stack-vm-01/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/aramexbit/tiny-stack-vm-01/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A tiny stack virtual machine for make.fun's [tiny-stack-vm-01-run-20261122](https://make.fun/bounty/tiny-stack-vm-01-run-20261122) bounty. One program (`main.ts`, Node 22) runs each instance's bytecode program and writes its output bytes plus exit code. It implements the full ISA: 32-bit wrapping arithmetic, unsigned division, all ten traps, and the step and output limits.

Run: `MAKEFUN_INPUT_DIR=<input> MAKEFUN_OUTPUT_DIR=<output> node main.ts`
