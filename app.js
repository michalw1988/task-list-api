const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

// Create connection
const db = mysql.createConnection({
	// host: 'localhost',
	// user: 'root',
	// password: '',
	// database: 'tasklist'
	host: 'sql11.freesqldatabase.com',
	port: '3306',
	user: 'sql11194951',
	password: 'htvwchFuIM',
	database: 'sql11194951'
});

// Connect to database
db.connect((err) => {
	if (err) throw err;
	console.log('MySql Connected...');
});

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
app.post('/gettasks', (req, res) => {
	let sortType = req.body.sortType;
	let filterDifficultyType = (req.body.filterDifficultyType) ? '= ' + req.body.filterDifficultyType : 'IS NOT NULL';
	let filterDeadlineType = (req.body.filterDeadlineType) ? '= ' + req.body.filterDeadlineType : 'IS NOT NULL';
	let sql = `SELECT * FROM tasks WHERE difficulty ${filterDifficultyType} AND deadline ${filterDeadlineType} ORDER BY ${sortType}`;
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
		done: 0
	};
	let sql = 'INSERT INTO tasks SET ?';
	let query = db.query(sql, task, (err, result) => {
		if (err) throw err;
		res.send('Task added...');
	});
});

// Update task
app.post('/updatetask', (req, res) => {
	let id = req.body.id;
	let newDescription = req.body.newDescription;
	let newDifficulty = req.body.newDifficulty;
	let newDeadline = req.body.newDeadline;
	let sql = `UPDATE tasks SET description = "${newDescription}", difficulty = ${newDifficulty}, deadline = ${newDeadline} WHERE id = ${id}`;
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