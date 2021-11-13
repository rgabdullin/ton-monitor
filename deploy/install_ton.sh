#!/bin/bash
set -e

config="https://newton-blockchain.github.io/global.config.json"
telemetry=true
ignore=true

# На OSX нет такой директории по-умолчанию, поэтому создаем...
SOURCES_DIR=/usr/src
BIN_DIR=/usr/bin
mydir=$(pwd)

# cpus and memory
cpus=$(lscpu | grep "CPU(s)" | head -n 1 | awk '{print $2}')
memory=$(cat /proc/meminfo | grep MemTotal | awk '{print $2}')
user=root

# install 
cd /tmp
wget https://raw.githubusercontent.com/igroman787/mytonctrl/master/scripts/toninstaller.sh
bash toninstaller.sh -c ${config}
