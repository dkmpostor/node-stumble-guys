@echo off
set /p authc=Enter Auth Code:
echo %authc% > auth.txt
node index.js
