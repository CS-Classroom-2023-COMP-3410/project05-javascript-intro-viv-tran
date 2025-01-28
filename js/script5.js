// ====================
// Global Variables
// ====================
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// HTML element references
const brushColorInput = document.getElementById('brushColor');
const brushSizeInput = document.getElementById('brushSize');
const brushSizeValue = document.getElementById('brushSizeValue');
const backgroundColorInput = document.getElementById('backgroundColor');
const undoBtn = document.getElementById('undoBtn');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

// Default settings
let currentBrushColor = brushColorInput.value;
let currentBrushSize = brushSizeInput.value;
let currentBackgroundColor = backgroundColorInput.value;

// We will keep an array of strokes. Each stroke will be an object like:
// { color: '...', size: 5, points: [{x, y}, {x, y}, ...] }
let strokes = [];

// Temporary stroke being drawn
let currentStroke = null;

// Flag to track whether the user is drawing
let isDrawing = false;

// ====================
// Initialization
// ====================

// Set the initial background color
ctx.fillStyle = currentBackgroundColor;
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Update displayed brush size value
brushSizeValue.textContent = currentBrushSize;

// ====================
// Event Listeners
// ====================

// Brush color change
brushColorInput.addEventListener('change', (e) => {
  currentBrushColor = e.target.value;
});

// Brush size change
brushSizeInput.addEventListener('input', (e) => {
  currentBrushSize = e.target.value;
  brushSizeValue.textContent = currentBrushSize;
});

// Background color change
backgroundColorInput.addEventListener('change', (e) => {
  currentBackgroundColor = e.target.value;
  redrawCanvas();
});

// Mouse events on canvas
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Undo button
undoBtn.addEventListener('click', undoLastStroke);

// Clear button
clearBtn.addEventListener('click', clearCanvas);

// Save button
saveBtn.addEventListener('click', saveCanvasAsImage);

// ====================
// Drawing Functions
// ====================

function startDrawing(e) {
  isDrawing = true;

  // Create a new stroke
  currentStroke = {
    color: currentBrushColor,
    size: currentBrushSize,
    points: []
  };
  strokes.push(currentStroke);

  // Record the current mouse position
  const { x, y } = getMousePos(e);
  currentStroke.points.push({ x, y });
}

function draw(e) {
  if (!isDrawing) return;

  const { x, y } = getMousePos(e);
  currentStroke.points.push({ x, y });

  // Redraw everything each time the mouse moves
  redrawCanvas();
}

function stopDrawing(e) {
  if (isDrawing) {
    isDrawing = false;
  }
}

// Helper to get mouse position relative to canvas
function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

function redrawCanvas() {
  // Clear canvas with the current background color
  ctx.fillStyle = currentBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Redraw all strokes
  strokes.forEach((stroke) => {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    // Move to the first point of the stroke
    if (stroke.points.length > 0) {
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    }
    // Draw lines to subsequent points
    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.stroke();
  });
}

// ====================
// Button Functions
// ====================

function undoLastStroke() {
  strokes.pop();  // remove the last stroke
  redrawCanvas(); // redraw the canvas
}

function clearCanvas() {
  // Reset strokes
  strokes = [];
  
  // Reset background color to default (you can change this if you want to keep current color)
  backgroundColorInput.value = '#FFFFFF';
  currentBackgroundColor = '#FFFFFF';
  
  // Clear the canvas with default background
  redrawCanvas();
}

function saveCanvasAsImage() {
  // Convert canvas to a data URL
  const dataURL = canvas.toDataURL('image/png');
  
  // Create a temporary link to download the image
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'myDrawing.png';
  link.click();
}
