const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');

var ecRequest = function () {};

ecRequest.request = function (options, cb) {
	var operator;
	if(typeof(options) == 'string') { options = url.parse(options); }
	options = options || {};
	options.method = options.method || 'GET';

	switch(options.protocol) {
		case 'https:':
			operator = https;
			options.rejectUnauthorized = false;
			break;
		default:
			operator = http;
	}
	var crawler = operator.request(options, function (res) {
		var rs = {
			headers: res.headers,
			data: new Buffer([])
		};
		res.on('data', function (chunk) {
			rs.data = Buffer.concat([rs.data, chunk]);
		});
		res.on('end', function () {
			switch(options.datatype) {
				case 'json':
					try { rs.data = JSON.parse(rs.data); } catch(e) { return cb(e); }
					break;
			}
			cb(null, rs)
		})
	});
	crawler.on('error', function (e) { cb(e); })
	if(options.post) {crawler.write(JSON.stringify(options.post));}
	crawler.end();
};

ecRequest.get = function (options, cb) {
	if(typeof(options) == 'string') { options = url.parse(options); }
	options = options || {};
	options.method = 'GET';
	this.request(options, cb);
};
ecRequest.put = function (options, cb) {
	if(typeof(options) == 'string') { options = url.parse(options); }
	options = options || {};
	options.method = 'PUT';
	this.request(options, cb);
};
ecRequest.post = function (options, cb) {
	if(typeof(options) == 'string') { options = url.parse(options); }
	options = options || {};
	options.method = 'POST';
	this.request(options, cb);
};
ecRequest.delete = function (options, cb) {
	if(typeof(options) == 'string') { options = url.parse(options); }
	options = options || {};
	options.method = 'DELETE';
	this.request(options, cb);
};

module.exports = ecRequest;