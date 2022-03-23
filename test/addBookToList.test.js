const request = require('supertest');
const server = require('../src/server');

test('it should have 201 code and valid response value', (done) => {
	const requestPayload = {
	    "name": "Buku A",
	    "year": 2010,
	    "author": "John Doe",
	    "summary": "Lorem ipsum dolor sit amet",
	    "publisher": "Dicoding Indonesia",
	    "pageCount": 100,
	    "readPage": 25,
	    "reading": false,
	}

	request(server.listener)
		.post('/books')
		.send(requestPayload)
		.expect(201)
		.expect((res) => {
			expect(res.body.status).toBe("success");
			expect(res.body.message).toBe("Buku berhasil ditambahkan");
			expect(res.body.data).toHaveProperty('bookId');
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
		});
});

test('readPage cannot be more than pageCount', (done) => {
	const requestPayload = {
	    "name": "Buku A",
	    "year": 2010,
	    "author": "John Doe",
	    "summary": "Lorem ipsum dolor sit amet",
	    "publisher": "Dicoding Indonesia",
	    "pageCount": 100,
	    "readPage": 101,
	    "reading": false,
	}

	request(server.listener)
		.post('/books')
		.send(requestPayload)
		.expect(400)
		.expect((res) => {
			expect(res.body.status).toBe("fail");
			expect(res.body.message).toBe("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount");
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
		});
});

test('book should have name', (done) => {
	const requestPayload = {
	    "year": 2010,
	    "author": "John Doe",
	    "summary": "Lorem ipsum dolor sit amet",
	    "publisher": "Dicoding Indonesia",
	    "pageCount": 100,
	    "readPage": 101,
	    "reading": false,
	}

	request(server.listener)
		.post('/books')
		.send(requestPayload)
		.expect(400)
		.expect((res) => {
			expect(res.body.status).toBe("fail");
			expect(res.body.message).toBe("Gagal menambahkan buku. Mohon isi nama buku");
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
		});
});

// test('it should have 500 on generic error', (done) => {
// 	request(server.listener)
// 		.post('/books')
// 		.expect(500)
// 		.expect((res) => {
// 			expect(res.body.status).toBe("error");
// 			expect(res.body.message).toBe("Buku gagal ditambahkan");
// 		})
// 		.end(done);
// });
