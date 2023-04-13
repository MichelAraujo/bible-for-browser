# bible-for-browser
This project has the aim to be an easy way to search and seek through the whole Bible

### Setup to run in WSL2
- export DISPLAY=172.19.48.1:0 // Only in Windows10
- sudo service dbus start
- export XDG_RUNTIME_DIR=/run/user/$(id -u)
- sudo mkdir $XDG_RUNTIME_DIR
- sudo chmod 700 $XDG_RUNTIME_DIR
- sudo chown $(id -un):$(id -gn) $XDG_RUNTIME_DIR
- export DBUS_SESSION_BUS_ADDRESS=unix:path=$XDG_RUNTIME_DIR/bus
- dbus-daemon --session --address=$DBUS_SESSION_BUS_ADDRESS --nofork --nopidfile --syslog-only &
