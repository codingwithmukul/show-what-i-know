// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Add task when button is clicked
addTaskBtn.addEventListener('click', addTask);

// Add task when Enter key is pressed
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Check if input is empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create list item
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    // Add delete functionality
    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
    });
    
    // Add task to list
    taskList.appendChild(li);
    
    // Clear input field
    taskInput.value = '';
    taskInput.focus();
}
