const request = require('supertest');
const server = require('../src/server');

test('it should be show detail of book whed id found', done => {
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
						.get(`/books/${expectedId}`)
						.expect(200)
						.expect(res => {
							const expectedBookData = {
					            "name": "Buku A Revisi",
					            "year": 2011,
					            "author": "Jane Doe",
					            "summary": "Lorem Dolor sit Amet",
					            "publisher": "Dicoding",
					            "pageCount": 200,
					            "readPage": 26,
					            "finished": false,
					            "reading": false,
					        }

					        expect(res.body.data.book.id).toBe(expectedId);
					        expect(res.body.data.book.name).toBe(expectedBookData.name);
					        expect(res.body.data.book.year).toBe(expectedBookData.year);
					        expect(res.body.data.book.author).toBe(expectedBookData.author);
					        expect(res.body.data.book.summary).toBe(expectedBookData.summary);
					        expect(res.body.data.book.publisher).toBe(expectedBookData.publisher);
					        expect(res.body.data.book.pageCount).toBe(expectedBookData.pageCount);
					        expect(res.body.data.book.readPage).toBe(expectedBookData.readPage);
					        expect(res.body.data.book.finished).toBe(expectedBookData.finished);
					        expect(res.body.data.book.reading).toBe(expectedBookData.reading);
					        expect(res.body.data.book).toHaveProperty('insertedAt');
					        expect(res.body.data.book).toHaveProperty('updatedAt');

					        expect(res.body.status).toBe('success');
						})
						.end((err, res) => {
							if (err) return done(err);
							return done();
						});
				});
		});
});

test('it should return 404 when resource not found', done => {
	request(server.listener)
		.get('/books/SALAH')
		.expect(404)
		.expect(res => {
			expect(res.body.status).toBe('fail');
			expect(res.body.message).toBe('Buku tidak ditemukan');
		})
		.end(done);
});