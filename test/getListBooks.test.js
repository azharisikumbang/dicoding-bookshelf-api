const request = require('supertest');
const server = require('../src/server');

test('it should return empty array when there is no book', done => {
	request(server.listener)
		.get('/books')
		.expect(200)
		.expect((res) => {
			res.body.status = "success";
			expect(res.body.data).toHaveProperty('books');
			expect(res.body.data.books.length).toBe(0);
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
		});
});

test('it should have 201 code and valid response value', (done) => {
	const requestPayloads = [
		{
		    "name": "Buku A",
		    "year": 2010,
		    "author": "John Doe",
		    "summary": "Lorem ipsum dolor sit amet",
		    "publisher": "Dicoding Indonesia",
		    "pageCount": 100,
		    "readPage": 25,
		    "reading": false,
		},
		{
		    "name": "Buku B",
		    "year": 2010,
		    "author": "John Doe",
		    "summary": "Lorem ipsum dolor sit amet",
		    "publisher": "Dicoding Indonesia",
		    "pageCount": 100,
		    "readPage": 25,
		    "reading": false,
		},
		{
		    "name": "Buku C",
		    "year": 2010,
		    "author": "John Doe",
		    "summary": "Lorem ipsum dolor sit amet",
		    "publisher": "Dicoding Indonesia",
		    "pageCount": 100,
		    "readPage": 25,
		    "reading": false,
		}
	];

	requestPayloads.map(payload => {
		request(server.listener)
			.post('/books')
			.send(payload)
			.end((err, res) => {
				if (err) return done(err);
				return done();
			});
	});

	request(server.listener)
		.get('/books')
		.expect(200)
		.expect((res) => {
			expect(res.body.status).toBe("success");

			expect(res.body.data.books[0]).toHaveProperty("id");
			expect(res.body.data.books[1]).toHaveProperty("id");
			expect(res.body.data.books[2]).toHaveProperty("id");

			expect(res.body.data.books[0].name).toBe("Buku A");
			expect(res.body.data.books[1].name).toBe("Buku B");
			expect(res.body.data.books[2].name).toBe("Buku C");

			expect(res.body.data.books[0].publisher).toBe("Dicoding Indonesia");
			expect(res.body.data.books[1].publisher).toBe("Dicoding Indonesia");
			expect(res.body.data.books[2].publisher).toBe("Dicoding Indonesia");
		})
		.end((err, res) => {
			if (err) return done(err);
			return done();
		});
});