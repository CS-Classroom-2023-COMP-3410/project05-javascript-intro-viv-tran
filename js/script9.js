let array = [];
const container = document.getElementById("array-container");
const explanation = document.getElementById("explanation");

function generateArray() {
    array = [];
    container.innerHTML = "";
    for (let i = 0; i < 10; i++) {
        let value = Math.floor(Math.random() * 100) + 1;
        array.push(value);
        let box = document.createElement("div");
        box.innerText = value;
        box.classList.add("array-box");
        container.appendChild(box);
    }
}

generateArray();

async function startSorting() {
    let algorithm = document.getElementById("algorithm").value;
    if (algorithm === "bubble") {
        await bubbleSort();
    } else if (algorithm === "insertion") {
        await insertionSort();
    }
}

async function bubbleSort() {
    explanation.innerText = "Bubble Sort: Repeatedly swapping adjacent elements if they are in the wrong order.";
    let boxes = document.getElementsByClassName("array-box");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                
                // Swap animation
                boxes[j].innerText = array[j];
                boxes[j + 1].innerText = array[j + 1];
                boxes[j].classList.add("swapping");
                boxes[j + 1].classList.add("swapping");
                await new Promise(resolve => setTimeout(resolve, 300));
                boxes[j].classList.remove("swapping");
                boxes[j + 1].classList.remove("swapping");
            }
        }
    }
    explanation.innerText = "Sorting Complete!";
}

async function insertionSort() {
    explanation.innerText = "Insertion Sort: Build the sorted array one item at a time by inserting into the correct position.";
    let boxes = document.getElementsByClassName("array-box");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            boxes[j + 1].innerText = array[j];
            boxes[j + 1].classList.add("swapping");
            j--;
            await new Promise(resolve => setTimeout(resolve, 300));
            boxes[j + 1].classList.remove("swapping");
        }
        array[j + 1] = key;
        boxes[j + 1].innerText = key;
    }
    explanation.innerText = "Sorting Complete!";
}
