const request = require('supertest');
const server = require('../src/server');

test('it should have property name on request', done => {
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
					const newBookPayload = {
					    "year": 2012,
					    "author": "John Doe",
					    "summary": "Lorem Dolor Amet",
					    "publisher": "Dicoding Indonesia",
					    "pageCount": 200,
					    "readPage": 30,
					    "reading": true,
					}

					request(server.listener)
						.put(`/books/${expectedId}`)
						.send(newBookPayload)
						.expect(400)
						.expect(res => {
							expect(res.body.status).toBe('fail');
							expect(res.body.message).toBe('Gagal memperbarui buku. Mohon isi nama buku');
						})
						.end((err, res) => {
							if (err) return done(err);
							request(server.listener)
								.get(`/books/${expectedId}`)
								.expect(200)
								.expect(res => {
									expect(res.body.data.book.id).toBe(expectedId);
							        expect(res.body.data.book.name).toBe(requestPayload.name);
							        expect(res.body.data.book.year).toBe(requestPayload.year);
							        expect(res.body.data.book.author).toBe(requestPayload.author);
							        expect(res.body.data.book.summary).toBe(requestPayload.summary);
							        expect(res.body.data.book.publisher).toBe(requestPayload.publisher);
							        expect(res.body.data.book.pageCount).toBe(requestPayload.pageCount);
							        expect(res.body.data.book.readPage).toBe(requestPayload.readPage);
							        expect(res.body.data.book.reading).toBe(requestPayload.reading);
							        expect(res.body.data.book.finished).toBe(false);
							        expect(res.body.data.book).toHaveProperty('insertedAt');
							        expect(res.body.data.book).toHaveProperty('updatedAt');
								})
								.end((err, res) => {
									if (err) return done(err);

									return done();
								});
						});
			});
		});
});

test('read page cannot more than page count', done => {
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
					const newBookPayload = {
						"name": "Buku A Revisi",
					    "year": 2012,
					    "author": "John Doe",
					    "summary": "Lorem Dolor Amet",
					    "publisher": "Dicoding Indonesia",
					    "pageCount": 200,
					    "readPage": 300,
					    "reading": true,
					}

					request(server.listener)
						.put(`/books/${expectedId}`)
						.send(newBookPayload)
						.expect(400)
						.expect(res => {
							expect(res.body.status).toBe('fail');
							expect(res.body.message).toBe('Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount');
						})
						.end((err, res) => {
							if (err) return done(err);
							request(server.listener)
								.get(`/books/${expectedId}`)
								.expect(200)
								.expect(res => {
									expect(res.body.data.book.id).toBe(expectedId);
							        expect(res.body.data.book.name).toBe(requestPayload.name);
							        expect(res.body.data.book.year).toBe(requestPayload.year);
							        expect(res.body.data.book.author).toBe(requestPayload.author);
							        expect(res.body.data.book.summary).toBe(requestPayload.summary);
							        expect(res.body.data.book.publisher).toBe(requestPayload.publisher);
							        expect(res.body.data.book.pageCount).toBe(requestPayload.pageCount);
							        expect(res.body.data.book.readPage).toBe(requestPayload.readPage);
							        expect(res.body.data.book.reading).toBe(requestPayload.reading);
							        expect(res.body.data.book.finished).toBe(false);
							        expect(res.body.data.book).toHaveProperty('insertedAt');
							        expect(res.body.data.book).toHaveProperty('updatedAt');
								})
								.end((err, res) => {
									if (err) return done(err);

									return done();
								});
						});
			});
		});
});

test('return 404 on non existing resource', done => {
	const newBookPayload = {
		"name": "Buku A Revisi",
		"year": 2012,
		"author": "John Doe",
		"summary": "Lorem Dolor Amet",
		"publisher": "Dicoding Indonesia",
		"pageCount": 200,
		"readPage": 26,
		"reading": true,
	}

	request(server.listener)
		.put('/books/SALAH')
		.send(newBookPayload)
		.expect(404)
		.expect(res => {
			expect(res.body.status).toBe('fail');
			expect(res.body.message).toBe('Gagal memperbarui buku. Id tidak ditemukan');
		})
		.end((err, res) => {
			if (err) return done(err);

			return done();
		});
});

test('it should be replaced', done => {
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
					const newBookPayload = {
					    "name": "Buku A Edit",
					    "year": 2012,
					    "author": "John Doe",
					    "summary": "Lorem Dolor Amet",
					    "publisher": "Dicoding Indonesia",
					    "pageCount": 200,
					    "readPage": 30,
					    "reading": true,
					}

					request(server.listener)
						.put(`/books/${expectedId}`)
						.send(newBookPayload)
						.expect(200)
						.expect(res => {
							expect(res.body.status).toBe('success');
							expect(res.body.message).toBe('Buku berhasil diperbarui');
						})
						.end((err, res) => {
							if (err) return done(err);
							request(server.listener)
								.get(`/books/${expectedId}`)
								.expect(200)
								.expect(res => {
									expect(res.body.data.book.id).toBe(expectedId);
							        expect(res.body.data.book.name).toBe(newBookPayload.name);
							        expect(res.body.data.book.year).toBe(newBookPayload.year);
							        expect(res.body.data.book.author).toBe(newBookPayload.author);
							        expect(res.body.data.book.summary).toBe(newBookPayload.summary);
							        expect(res.body.data.book.publisher).toBe(newBookPayload.publisher);
							        expect(res.body.data.book.pageCount).toBe(newBookPayload.pageCount);
							        expect(res.body.data.book.readPage).toBe(newBookPayload.readPage);
							        expect(res.body.data.book.reading).toBe(newBookPayload.reading);
							        expect(res.body.data.book.finished).toBe(false);
							        expect(res.body.data.book).toHaveProperty('insertedAt');
							        expect(res.body.data.book).toHaveProperty('updatedAt');
								})
								.end((err, res) => {
									if (err) return done(err);

									return done();
								});
						});
			});
		});
});

