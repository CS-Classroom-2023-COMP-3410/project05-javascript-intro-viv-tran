const storyData = {
    start: {
      text: "You find yourself at a crossroads. Where will you go?",
      choices: [
        { text: "Go left", next: "forest" },
        { text: "Go right", next: "village" }
      ]
    },
    forest: {
      text: "You enter a dark forest. Do you want to explore further?",
      choices: [
        { text: "Keep going", next: "cave" },
        { text: "Turn back", next: "start" }
      ]
    },
    village: {
      text: "You arrive at a small village. What do you want to do?",
      choices: [
        { text: "Visit the market", next: "market" },
        { text: "Talk to the locals", next: "locals" }
      ]
    },
    cave: {
      text: "You discover a hidden cave. Inside, you find treasure!",
      choices: [
        { text: "Take the treasure", next: "end" },
        { text: "Leave it", next: "start" }
      ]
    },
    market: {
      text: "The market is bustling. Do you want to buy something?",
      choices: [
        { text: "Buy food", next: "start" },
        { text: "Leave the market", next: "start" }
      ]
    },
    locals: {
      text: "The locals tell you about a hidden cave in the forest.",
      choices: [{ text: "Go to the forest", next: "forest" }]
    },
    end: {
      text: "Congratulations! You've completed the adventure.",
      choices: [{ text: "Play again", next: "start" }]
    }
  };
  
  let currentNode = "start";
  const progressBar = document.getElementById("progress-bar");
  const storySection = document.getElementById("story-text");
  const choicesSection = document.getElementById("choices-section");
  
  function loadGame() {
    const savedNode = localStorage.getItem("currentNode");
    currentNode = savedNode ? savedNode : "start";
    updateStory();
  }
  
  function saveGame() {
    localStorage.setItem("currentNode", currentNode);
    alert("Progress saved!");
  }
  
  function resetGame() {
    localStorage.clear();
    currentNode = "start";
    updateStory();
  }
  
  function updateStory() {
    const node = storyData[currentNode];
    storySection.textContent = node.text;
  
    choicesSection.innerHTML = "";
    node.choices.forEach(choice => {
      const button = document.createElement("button");
      button.textContent = choice.text;
      button.onclick = () => {
        currentNode = choice.next;
        updateProgress();
        updateStory();
      };
      choicesSection.appendChild(button);
    });
  }
  
  function updateProgress() {
    const progressNodes = Object.keys(storyData).length;
    const progress = (Object.keys(storyData).indexOf(currentNode) / progressNodes) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  document.getElementById("reset-button").addEventListener("click", resetGame);
  document.getElementById("save-button").addEventListener("click", saveGame);
  document.getElementById("resume-button").addEventListener("click", loadGame);
  
  loadGame();
  