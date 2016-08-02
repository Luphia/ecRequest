# ecRequest #
An easy way to request http and https

## Install ##
```shell
npm install errequest
```

## Use ##
```node
const ecrequest = require('ecrequest');
var url = 'https://www.google.com';

### request ###
ecrequest.request(url, console.log);

### get ###
ecrequest.get(url, console.log);

### post ###
ecrequest.post(url, console.log);

### put ###
ecrequest.put(url, console.log);

### delete ###
ecrequest.delete(url, console.log);
```