// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const clearCompletedBtn = document.getElementById('clearCompleted');
const clearAllBtn = document.getElementById('clearAll');

// Task array to store all tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
    updateStats();
});

// Add task functionality
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        showNotification('Please enter a task!', 'error');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    updateStats();
    
    taskInput.value = '';
    taskInput.focus();
    
    showNotification('Task added successfully!', 'success');
}

// Render all tasks
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks yet. Add one above!</li>';
        return;
    }
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <button class="delete-btn">Delete</button>
        `;
        
        // Add event listeners
        const checkbox = li.querySelector('.task-checkbox');
        const deleteBtn = li.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => toggleTask(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(li);
    });
}

// Toggle task completion
function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        updateStats();
        
        const message = task.completed ? 'Task completed!' : 'Task marked as incomplete!';
        showNotification(message, 'info');
    }
}

// Delete a task
function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const deletedTask = tasks[taskIndex];
        tasks.splice(taskIndex, 1);
        saveTasks();
        renderTasks();
        updateStats();
        
        showNotification(`Task "${deletedTask.text}" deleted!`, 'warning');
    }
}

// Clear completed tasks
function clearCompleted() {
    const completedCount = tasks.filter(task => task.completed).length;
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    updateStats();
    
    if (completedCount > 0) {
        showNotification(`${completedCount} completed task(s) cleared!`, 'info');
    } else {
        showNotification('No completed tasks to clear!', 'info');
    }
}

// Clear all tasks
function clearAll() {
    if (tasks.length === 0) {
        showNotification('No tasks to clear!', 'info');
        return;
    }
    
    if (confirm('Are you sure you want to delete all tasks?')) {
        const taskCount = tasks.length;
        tasks = [];
        saveTasks();
        renderTasks();
        updateStats();
        
        showNotification(`All ${taskCount} task(s) cleared!`, 'warning');
    }
}

// Update statistics
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .empty-state {
        text-align: center;
        color: #666;
        font-style: italic;
        padding: 20px;
    }
`;
document.head.appendChild(style);

// Event listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

clearCompletedBtn.addEventListener('click', clearCompleted);
clearAllBtn.addEventListener('click', clearAll);

// Add some sample tasks on first visit
if (tasks.length === 0 && !localStorage.getItem('hasVisited')) {
    const sampleTasks = [
        { id: Date.now() - 3, text: 'Welcome to your To-Do List!', completed: false, createdAt: new Date().toISOString() },
        { id: Date.now() - 2, text: 'Click the checkbox to mark tasks complete', completed: false, createdAt: new Date().toISOString() },
        { id: Date.now() - 1, text: 'Use the delete button to remove tasks', completed: false, createdAt: new Date().toISOString() }
    ];
    
    tasks = sampleTasks;
    saveTasks();
    renderTasks();
    updateStats();
    localStorage.setItem('hasVisited', 'true');
} 