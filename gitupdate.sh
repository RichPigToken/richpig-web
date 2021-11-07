#!/bin/bash

git status
echo -n "Add all changes? [Y/n] (default: Y): "
read ADD
if [ "$ADD" == 'Y' ] || [ "$ADD" == 'y' ] || [ "$ADD" == '' ]
then
 git add *
 git status
 echo -n "Enter commit message: "
 read MESS
 git commit -m "$MESS" --no-verify
 git push
 git status
fi
