# ecRequest #
An easy way to request http and https

## Install ##
```shell
npm install ecrequest
```

## Use ##
```node
const ecrequest = require('ecrequest');
const opt = {
  protocol: 'https:',
  host: 'www.google.com',
  port: 80,
  hostname: 'www.google.com',
  pathname: '/',
  path: '/' };

### request ###
ecrequest.request(opt).then(console.log);

### get ###
ecrequest.get(opt).then(console.log);

### post ###
opt.data = { post: 'body' };
ecrequest.post(opt).then(console.log);

### put ###
opt.data = { put: 'body' };
ecrequest.put(opt).then(console.log);

### delete ###
opt.headers = { 'content-type': 'application/json' };
ecrequest.delete(opt).then(console.log);
```
