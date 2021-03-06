const { 
	addBookHandler, 
	getListBooksHandler, 
	getBookByIdHandler, 
	updateBookByIdHandler,
	removeBookByIdHandler
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBookHandler
	},
	{
		method: 'GET',
		path: '/books',
		handler: getListBooksHandler
	},
	{
		method: 'GET',
		path: '/books/{bookId}',
		handler: getBookByIdHandler
	},
	{
		method: 'PUT',
		path: '/books/{bookId}',
		handler: updateBookByIdHandler
	},
	{
		method: 'DELETE',
		path: '/books/{bookId}',
		handler: removeBookByIdHandler
	}
];

module.exports = routes;