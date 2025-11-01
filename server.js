const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Load tasks from JSON file
function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync('data.json'));
  } catch (err) {
    return [];
  }
}

// Save tasks to JSON file
function saveTasks(tasks) {
  fs.writeFileSync('data.json', JSON.stringify(tasks, null, 2));
}

// Routes
app.get('/', (req, res) => {
  const tasks = loadTasks();
  res.render('index', { tasks });
});

app.post('/add', (req, res) => {
  const { task } = req.body;
  if (!task) return res.redirect('/');
  const tasks = loadTasks();
  tasks.push({ text: task, done: false });
  saveTasks(tasks);
  res.redirect('/');
});

app.post('/toggle/:index', (req, res) => {
  const tasks = loadTasks();
  const i = req.params.index;
  if (tasks[i]) {
    tasks[i].done = !tasks[i].done;
    saveTasks(tasks);
  }
  res.redirect('/');
});

app.post('/delete/:index', (req, res) => {
  const tasks = loadTasks();
  tasks.splice(req.params.index, 1);
  saveTasks(tasks);
  res.redirect('/');
});

app.post('/edit/:index', (req, res) => {
  const tasks = loadTasks();
  const i = req.params.index;
  const { newText } = req.body;
  if (tasks[i] && newText) {
    tasks[i].text = newText;
    saveTasks(tasks);
  }
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
