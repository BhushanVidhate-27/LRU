#!/bin/bash

cd client || exit
npm run dev &

cd ../server || exit
nodemon index.js