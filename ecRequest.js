const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');

const ecRequest = class {
	static request(options, cb) {
		return new Promise((resolve, reject) => {
			let operator;
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
			const crawler = operator.request(options, function (res) {
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
					if(typeof(cb) === 'function') {
						cb(null, rs);
					}
					resolve(rs);
				})
			});
			crawler.on('error', function (e) { cb(e); })
			const body = options.post || options.data;
			if(body) { crawler.write(JSON.stringify(body)); }
			crawler.end();
		});
	}
	static get(options, cb) {
		if(typeof(options) == 'string') { options = url.parse(options); }
		options = options || {};
		options.method = 'GET';
		return this.request(options, cb);
	}
	static put(options, cb) {
		if(typeof(options) == 'string') { options = url.parse(options); }
		options = options || {};
		options.method = 'PUT';
		return this.request(options, cb);
	}
	static post(options, cb) {
		if(typeof(options) == 'string') { options = url.parse(options); }
		options = options || {};
		options.method = 'POST';
		return this.request(options, cb);
	}
	static delete(options, cb) {
		if(typeof(options) == 'string') { options = url.parse(options); }
		options = options || {};
		options.method = 'DELETE';
		return this.request(options, cb);
	}
}

module.exports = ecRequest;