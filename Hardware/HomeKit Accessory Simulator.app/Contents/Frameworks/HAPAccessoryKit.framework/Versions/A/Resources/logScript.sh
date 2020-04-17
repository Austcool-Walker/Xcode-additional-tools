#!/bin/sh

#  logScript.sh
#  HAPAccessoryKit
#
#  Copyright © 2016 Apple Inc. All rights reserved.

# Arguments Main Process PID - NSTask Process created in main process
# Find the processID of the log stream process

if [ "$#" -ne 2 ]; then
    echo "Invalid arguments. Need to call \"./logScript.sh PID1 PID2\""
    exit 1
fi

if [[ "$1" != "" ]]; then
    PID="$1"
fi

if [[ "$2" != "" ]]; then
    LOG_PID=`pgrep -P $2`
fi

# Check every minute to make sure the main process is dead
while true
do
    sleep 60
    if ! (kill -0 $PID >/dev/null) then
        break
    fi
done

# Counter to keep count of how many seconds have passed
WAIT_SECONDS=10
count=0
while kill $LOG_PID > /dev/null
do
    # Wait for one second
    sleep 1
    # Increment the second counter
    ((count++))

    # Chek if the process was killed
    if ! ps -p $LOG_PID > /dev/null ; then
        break
    fi

    # Kill the process if still active
    if [ $count -gt $WAIT_SECONDS ]; then
        kill -9 $LOG_PID
        break
    fi
done
