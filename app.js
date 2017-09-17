const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tasklist'
	// host: '209.90.88.139',
	// user: 'mwisniew_root',
	// password: 'mwisniew_root',
	// database: 'mwisniew_tasks'
});

// Connect
db.connect((err) => {
	if (err) throw err;
	console.log('MySql Connected...');
});

const app = express();

// Support CORS and json encoded bodies
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Start server
app.listen(process.env.PORT || '3000', () => {
	console.log('Server started...');
});



// Get tasks
app.post('/gettasks/', (req, res) => {
	console.log(req.body);
	let sortType = req.body.sortType;
	let filterDifficultyType = (req.body.filterDifficultyType) ? '= ' + req.body.filterDifficultyType : 'IS NOT NULL';
	let filterDeadlineType = (req.body.filterDeadlineType) ? '= ' + req.body.filterDeadlineType : 'IS NOT NULL';
	let sql = 'SELECT * FROM tasks WHERE difficulty ' + filterDifficultyType + ' AND deadline ' + filterDeadlineType + ' ORDER BY ' + sortType;
	let query = db.query(sql, (err, results) => {
		if (err) throw err;
		res.send(results);
	});
});

// Add task
app.post('/addtask', (req, res) => {
	let task = {
		description: req.body.description,
		difficulty: req.body.difficulty,
		deadline: req.body.deadline,
		done: req.body.description
	};
	let sql = 'INSERT INTO tasks SET ?';
	let query = db.query(sql, task, (err, result) => {
		if (err) throw err;
		res.send('Task added...');
	});
});

// Update task
app.post('/updatetask/', (req, res) => {
	let newDescription = req.body.description;
	let newDifficulty = req.body.difficulty;
	let newDeadline = req.body.deadline;
	let sql = `UPDATE tasks SET description = '${newDescription}', difficulty = '${newDifficulty}', deadline = '${newDeadline}' WHERE id = ${req.body.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send('Task updated...');
	});
});

// Complete task
app.get('/completetask/:id', (req, res) => {
	let sql = `UPDATE tasks SET done = "1" WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send('Task completed...');
	});
});

// Undo task
app.get('/undotask/:id', (req, res) => {
	let sql = `UPDATE tasks SET done = "0" WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send('Task not completed...');
	});
});

// Delete task
app.get('/deletetask/:id', (req, res) => {
	let sql = `DELETE FROM tasks WHERE id = ${req.params.id}`;
	let query = db.query(sql, (err, result) => {
		if (err) throw err;
		res.send('Task deleted...');
	});
});




// Create table
app.get('/createtasktable', (req, res) => {
	let sql = 'CREATE TABLE yeti (id int(11) NOT NULL, description varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL, difficulty tinyint(4) NOT NULL, deadline tinyint(4) NOT NULL, done tinyint(1) NOT NULL)';
	db.query(sql, (err, result) => {
		if (err) throw err;
		res.send('Tasks table created...');
	});
});
