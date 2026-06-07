// ─── localStorage helpers ────────────────────────────────────────────────────

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ─── DOM references ──────────────────────────────────────────────────────────

const taskInput      = document.getElementById('new-task');
const addButton      = document.querySelector('.todo-submit');
const taskList       = document.querySelector('.task-list');
const filterButtons  = document.querySelectorAll('.todo-controls button');

// ─── Active filter state ─────────────────────────────────────────────────────

let currentFilter = 'all'; // 'all' | 'active' | 'completed'

// ─── Bootstrap: render saved tasks on page load ──────────────────────────────

window.addEventListener('DOMContentLoaded', function () {
  getTasks().forEach(function (task) {
    renderTask(task.id, task.text, task.completed);
  });
  applyFilter(currentFilter);
});

// ─── Add task ────────────────────────────────────────────────────────────────

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);

  renderTask(task.id, task.text, task.completed);
  applyFilter(currentFilter); // respect active filter after adding

  taskInput.value = '';
  taskInput.focus();
}

// ─── Render one task item into the DOM ───────────────────────────────────────

function renderTask(id, text, completed) {
  const listItem = document.createElement('li');
  listItem.className = 'task-item' + (completed ? ' completed' : '');
  listItem.dataset.id = id;

  const taskSpan = document.createElement('span');
  taskSpan.textContent = text;

  const actionDiv = document.createElement('div');
  actionDiv.className = 'task-action';

  const completeButton = document.createElement('button');
  completeButton.type = 'button';
  completeButton.textContent = completed ? 'Undo' : 'Complete';

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.textContent = 'Edit';

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.textContent = 'Delete';

  actionDiv.appendChild(completeButton);
  actionDiv.appendChild(editButton);
  actionDiv.appendChild(deleteButton);

  listItem.appendChild(taskSpan);
  listItem.appendChild(actionDiv);

  taskList.appendChild(listItem);
}

// ─── Filter logic ─────────────────────────────────────────────────────────────

function applyFilter(filter) {
  currentFilter = filter;

  // Update active button style
  filterButtons.forEach(function (btn) {
    const btnFilter = btn.textContent.toLowerCase(); // 'all' | 'active' | 'completed'
    btn.classList.toggle('active-filter', btnFilter === filter);
  });

  // Show / hide task items
  const items = taskList.querySelectorAll('.task-item');
  items.forEach(function (item) {
    const isCompleted = item.classList.contains('completed');

    if (filter === 'all') {
      item.style.display = '';
    } else if (filter === 'active') {
      item.style.display = isCompleted ? 'none' : '';
    } else if (filter === 'completed') {
      item.style.display = isCompleted ? '' : 'none';
    }
  });
}

// ─── Filter button clicks ─────────────────────────────────────────────────────

filterButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    applyFilter(btn.textContent.toLowerCase());
  });
});

// ─── Event delegation: complete / delete / edit ──────────────────────────────

taskList.addEventListener('click', function (event) {
  const target   = event.target;
  const taskItem = target.closest('.task-item');
  if (!taskItem) return;

  const id = Number(taskItem.dataset.id);

  // ── Complete / Undo ───────────────────────────────────────────────────────
  if (target.textContent === 'Complete' || target.textContent === 'Undo') {
    taskItem.classList.toggle('completed');
    const isCompleted = taskItem.classList.contains('completed');
    target.textContent = isCompleted ? 'Undo' : 'Complete';

    const tasks = getTasks().map(function (t) {
      return t.id === id ? { ...t, completed: isCompleted } : t;
    });
    saveTasks(tasks);

    applyFilter(currentFilter); // re-apply filter after status change
  }

  // ── Delete ────────────────────────────────────────────────────────────────
  if (target.textContent === 'Delete') {
    taskItem.remove();

    const tasks = getTasks().filter(function (t) { return t.id !== id; });
    saveTasks(tasks);
  }

  // ── Edit / Save ───────────────────────────────────────────────────────────
  if (target.textContent === 'Edit' || target.textContent === 'Save') {
    const taskSpan    = taskItem.querySelector('span');
    const currentText = taskSpan.textContent;

    const editInput = document.createElement('input');
    editInput.type      = 'text';
    editInput.value     = currentText;
    editInput.className = 'task-edit-input';

    taskSpan.replaceWith(editInput);
    editInput.focus();
    target.textContent = 'Save';

    function saveEdit() {
      const newText = editInput.value.trim();

      if (newText === '') {
        alert('Task cannot be empty!');
        editInput.focus();
        return;
      }

      const newSpan = document.createElement('span');
      newSpan.textContent = newText;
      editInput.replaceWith(newSpan);
      target.textContent = 'Edit';

      const tasks = getTasks().map(function (t) {
        return t.id === id ? { ...t, text: newText } : t;
      });
      saveTasks(tasks);
    }

    editInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') saveEdit();
    });

    editInput.addEventListener('blur', saveEdit);
  }
});