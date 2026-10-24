@echo off
title The Human Mind Museum Portal
echo ==========================================================
echo   THE HUMAN MIND MUSEUM - ARCHITECTURE ONLINE
echo   Starting local museum server on port 3000...
echo ==========================================================
start http://localhost:3000
node server.js
pause
