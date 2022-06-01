#!/bin/bash
echo Copying custom patches to patches folder...
echo "Platform: " $1

if [ $1 = 'ios' ]; then
  cp -f customPatches/ios/* patches/
elif [ $1 = 'android' ]; then
  cp -f customPatches/android/* patches/
else
  echo Platform not detected!
fi

echo Custom patches copied correctly