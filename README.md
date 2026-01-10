Wigo
=========

Wigo, aka "What Is Going On" is a light pull/push monitoring tool written in Golang.

Main features
  - Write probes in any language you want
  - Notifications when a probe status change (http,email)
  - Proxy mode for hosts behind NAT/Gateways
  - Graphing probes metrics to OpenTSDB instances

[Install Wigo Monitoring browser extention for Chrome or Firefox](https://github.com/carsso/wigo-browser-extension)

#### Screenshots:

##### Web UI Main view:
![Main view](https://user-images.githubusercontent.com/666182/98400230-f9384e00-2063-11eb-9f82-01138f87942d.png)

##### Web UI Group view:
![Group view](https://user-images.githubusercontent.com/666182/98400233-fa697b00-2063-11eb-955a-e9f165a90bef.png)

##### Web UI Host view:
![Host view](https://user-images.githubusercontent.com/666182/98400236-fb021180-2063-11eb-8605-9dd65d26f7ac.png)


### Installation

##### Debian :
Deb packages are available for Debian >= 12
```sh
apt-get install lsb-release
sudo mkdir -p /etc/apt/keyrings
wget -qO- http://deb.carsso.com/deb.carsso.com.key | gpg --dearmor | sudo tee /etc/apt/keyrings/deb.carsso.com.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/deb.carsso.com.gpg] http://deb.carsso.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/deb.carsso.com.list
apt-get update
apt-get install wigo
```

### Configuration / Setup

- Wigo configuration is in `/etc/wigo/wigo.conf`
- Probes configurations are in `/etc/wigo/conf.d/`

##### PULL
The master fetch remote clients over the http api.
Communications should be secured using firewall rules, TLS and http basic authentication.

##### PUSH
Clients send their data to a remote master over a persistent tcp connection.
Communications should be secured using firewall rules and TLS.

##### TLS
Wigo needs a key pair to enable HTTPS api.
You can generate a self signed key pair by running this command:
```
/usr/local/wigo/bin/generate_cert -ca=false -duration=87600h0m0s -host "hostnames,ips,..." --rsa-bits=4096
```

Wigo needs a CA key pair to secure PUSH communications.
You can generate a CA self signed key pair by running this command on the push server :
```
/usr/local/wigo/bin/generate_cert -ca=true -duration=87600h0m0s -host "hostnames,ips,..." --rsa-bits=4096
```


##### Default probes 

The directory name is the interval of check in seconds

```sh
/usr/local/wigo/probes
├── 120
├── 300
│   ├── apt-security -> ../../probes-examples/apt-security
│   └── smart -> ../../probes-examples/smart
└── 60
    ├── check_mdadm -> ../../probes-examples/check_mdadm
    ├── check_processes
    ├── hardware_disks -> ../../probes-examples/hardware_disks
    ├── hardware_load_average -> ../../probes-examples/hardware_load_average
    ├── hardware_memory -> ../../probes-examples/hardware_memory
    ├── ifstat -> ../../probes-examples/ifstat
    ├── supervisord
    └── needrestart

```

### Building from sources

##### Environment
To build from sources, you need:
- `golang` and `gcc` installed
- `node.js` and `npm` for the frontend
- The `$GOPATH` environment variable should also be set on your system

##### Dependencies

Install all dependencies:
```sh
make deps
```

##### Building

```sh
make clean release
```

##### Building for all supported archs (amd64 & armhf)
You will need `arm-linux-gnueabihf-gcc`
```sh
make clean releases
```

##### Build debian packages
You will need `dpkg-deb`
```sh
make debs
```

##### Development mode

To run Wigo in development mode with hot-reload for both backend and frontend:

```sh
make run-dev
```

The web interface will be available at `http://localhost:4400/` (or the port configured in `etc/wigo-dev.conf`).

To stop the development server, press `Ctrl+C` - this will gracefully stop both the Go server and the frontend watcher.

**Note:** The development mode requires `sudo` privileges to run the Wigo server. The development files are stored in the `dev/` directory.

### Usage

##### Wigo web interface

`http://[your-ip]:4000/` (by default)


##### Wigo CLI

```sh
# /usr/local/wigo/bin/wigocli
Wigo v0.51.5 running on backbone.root.gg 
Local Status    : 100
Global Status   : 250

Remote Wigos : 

    1.2.3.4:4000 ( ns2 ) - Wigo v0.51.5: 
        apt-security              : 100  No security packages availables
        hardware_disks            : 250  Highest occupation percentage is 93% in partition /dev/md0
        hardware_load_average     : 100  0.09 0.04 0.05
        hardware_memory           : 100  Current memory usage is 19.32%
        ifstat                    : 100  tap0 0.00/0.01 mbps , eth1 0.00/0.00 mbps , eth0 0.01/0.01 mbps , 
        smart                     : 100  /dev/sdc : PASSED /dev/sdb : PASSED 

```


##### Write your own probes !

Probes are binaries, written in any language you want, that output a json string with at least Status param :
```sh

$ /usr/local/wigo/probes/examples/hardware_load_average
{
   "Detail" : "",
   "Version" : "0.11",
   "Message" : "0.38 0.26 0.24",
   "Status" : 100,
   "Metrics" : [
      {
         "Value" : 0.38,
         "Tags" : {
            "load" : "load5"
         }
      },
      {
         "Value" : 0.26,
         "Tags" : {
            "load" : "load10"
         }
      },
      {
         "Value" : 0.24,
         "Tags" : {
            "load" : "load15"
         }
      }
   ]
}
```

##### Status codes :
```
    100         OK
    101 to 199  INFO
    200 to 299  WARN
    300 to 499  CRIT
    500+        ERROR
```

