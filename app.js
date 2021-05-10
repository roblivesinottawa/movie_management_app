const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const PORT = process.env.PORT || 8000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => res.json({ message: 'Welcome to Video Database' }))


const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1029mysql",
	database: "myvideosDB"
})

connection.connect(err => {
	err ? err : console.log("CONNECTED!")
	let sql = `CREATE TABLE IF NOT EXISTS movies (
	id int(11) NOT NULL AUTO_INCREMENT,
	movie_name VARCHAR(255) NOT NULL,
	year_released int(10) NOT NULL,
	country VARCHAR(255) NOT NULL,
	Created_on datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	Updated_on datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;`
connection.query(sql, (err, results) => err ? err : console.log("TABLE CREATED!"))
});

app.get('/movie', (req, res) => {
	connection.query(`SELECT * FROM movies`, (err, results, fields) => err ? err : res.end(JSON.stringify(results)))
});

app.get('/movie/:id', (req, res) => {
	connection.query(`SELECT * FROM movies WHERE id=?`, [req.params.id], (err, results, fields) => err ? err : res.end(JSON.stringify(results)))
});






app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`))
