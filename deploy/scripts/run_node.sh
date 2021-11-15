#!/bin/bash
set -e

echo "Starting validator and mytoncore"
systemctl start validator
systemctl start mytoncore

echo "Check logs, wait for Accept"
cat /var/ton-work/log

echo "Run /bin/bash"
/bin/bash
