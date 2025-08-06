# To-Do List Web App

A beautiful, responsive To-Do List application built with vanilla JavaScript, HTML, and CSS.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete individual tasks
- ✅ Clear all completed tasks
- ✅ Clear all tasks
- ✅ Real-time statistics (total and completed tasks)
- ✅ Local storage persistence
- ✅ Responsive design for mobile and desktop
- ✅ Beautiful animations and notifications
- ✅ Keyboard support (Enter key to add tasks)

## How to Run

### Option 1: Using Live Server (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. The app will open in your default browser

### Option 2: Direct File Opening
1. Simply double-click on `index.html` to open it in your browser
2. Note: Some features might be limited due to browser security restrictions

### Option 3: Using Python (if available)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

## How to Use

1. **Adding Tasks**: Type a task in the input field and click "Add Task" or press Enter
2. **Completing Tasks**: Click the checkbox next to any task to mark it as complete
3. **Deleting Tasks**: Click the "Delete" button next to any task to remove it
4. **Clearing Completed**: Click "Clear Completed" to remove all completed tasks
5. **Clearing All**: Click "Clear All" to remove all tasks (with confirmation)

## File Structure

```
task2/
├── index.html      # Main HTML structure
├── style.css       # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technical Details

- **Frontend Only**: No backend required, uses browser's localStorage
- **Vanilla JavaScript**: No frameworks or libraries needed
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern CSS**: Uses CSS Grid, Flexbox, and animations
- **Accessibility**: Keyboard navigation and screen reader friendly

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Local Storage

The app automatically saves your tasks to the browser's localStorage, so your tasks will persist between browser sessions.

## Customization

You can easily customize the app by modifying:
- Colors in `style.css` (look for CSS custom properties)
- Animations and transitions
- Layout and spacing
- Add new features in `script.js`

## Troubleshooting

- If tasks don't save, make sure you're using a modern browser
- If the app doesn't load, check that all three files are in the same directory
- Clear browser cache if you experience any issues

Enjoy your new To-Do List app! 🎉 