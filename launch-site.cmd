@echo off
cd /d "%~dp0"
echo Starting Looking2FlyyByMKash...
echo.
echo If this window closes or shows an error, send a screenshot of the message.
echo.
cmd /k "npm.cmd install && npm.cmd run dev -- --host 127.0.0.1"
