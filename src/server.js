const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
	const server = Hapi.server({
		port: 5000,
		host: 'localhost',
		routes: {
			cors: {
				origin: ['*']
			}
		}
	});

	server.route(routes);
	server.start();

	console.log('server is running !');
}

init();
// module.exports = server;