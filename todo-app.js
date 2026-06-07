// Get the input field and button from the HTML
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Add task when button is clicked
addButton.addEventListener('click', addTask);

// Also allow adding task by pressing Enter key
taskInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Function to add a task
function addTask() {
  // Get the value from the input field
  const taskText = taskInput.value;
  
  // Check if the input is empty or just spaces
  if (taskText.trim() === '') {
    alert('Please enter a task!');
    return;
  }
  
  // Create a new list item element
  const listItem = document.createElement('li');
  listItem.textContent = taskText;
  
  // Create a delete button for each task
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-btn';
  
  // Add click event to delete button
  deleteButton.addEventListener('click', function() {
    listItem.remove();
  });
  
  // Add the delete button to the list item
  listItem.appendChild(deleteButton);
  
  // Add the list item to the task list
  taskList.appendChild(listItem);
  
  // Clear the input field
  taskInput.value = '';
  
  // Focus back on the input field for better user experience
  taskInput.focus();
}
