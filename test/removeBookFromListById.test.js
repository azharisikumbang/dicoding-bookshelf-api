const request = require('supertest');
const server = require('../src/server');

test('it should be deleted', done => {
	const requestPayload = {
	    "name": "Buku A Revisi",
	    "year": 2011,
	    "author": "Jane Doe",
	    "summary": "Lorem Dolor sit Amet",
	    "publisher": "Dicoding",
	    "pageCount": 200,
	    "readPage": 26,
	    "reading": false,
	}

	request(server.listener)
		.post('/books')
		.send(requestPayload)
		.end((err, res) => {
			if (err) return done(err);

			request(server.listener)
				.get('/books')
				.end((err, res) => {
					if (err) return done(err);

					const expectedId = res.body.data.books[0].id;

					request(server.listener)
						.delete(`/books/${expectedId}`)
						.expect(200)
						.expect(res => {
							expect(res.body.status).toBe('success');
							expect(res.body.message).toBe('Buku berhasil dihapus');
						})
						.end((err, res) => {
							if (err) return done(err);
							request(server.listener)
								.get(`/books/${expectedId}`)
								.expect(404)
								.end((err, res) => {
									if (err) return done(err);

									return done();
								});
						});
			});
		});
});

test('it should return 404 for unexisting resource', done => {
	request(server.listener)
		.delete('/books/SALAH')
		.expect(404)
		.expect(res => {
			expect(res.body.status).toBe('fail');
			expect(res.body.message).toBe('Buku gagal dihapus. Id tidak ditemukan');
		})
		.end((err, res) => {
			if (err) return done(err);

			return done();
		});
});