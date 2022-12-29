# bornozFly

# Actividad NODEMON
- FORK= nodemon index.js -p 3101 -m fork
- CLUSTER= nodemon index.js -p 3102 -m cluster

# Actividad FOREVER
- FORK= forever -w start index.js -p 3101 -m fork
- CLUSTER= forever -w start index.js -p 3102 -m cluster
- LISTAR= forever list

# Actividad PM2
- FORK= pm2 start ./index.js --name="i01" --watch -- -p 3101
- CLUSTER=  pm2 start ./index.js --name="i02" --watch -i max -- -p 3102
- LISTAR= pm2 monit

# Actividad Proxy 1
- pm2 start ./index.js --name="i01" -- -p 3101 -m cluster
- pm2 start ./index.js --name="i02" -- -p 3102

# Actividad Proxy 2
- pm2 start ./index.js --name="i01"  -- -p 3100
- pm2 start ./index.js --name="i02"  -- -p 3102
- pm2 start ./index.js --name="i03"  -- -p 3102
- pm2 start ./index.js --name="i04"  -- -p 3102
- pm2 start ./index.js --name="i05"  -- -p 3102
