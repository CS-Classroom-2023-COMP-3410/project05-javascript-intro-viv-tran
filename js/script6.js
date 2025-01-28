const elements = [
    { atomicNumber: 1, symbol: "H", name: "Hydrogen", group: "Nonmetals" },
    { atomicNumber: 2, symbol: "He", name: "Helium", group: "Noble Gases" },
    { atomicNumber: 3, symbol: "Li", name: "Lithium", group: "Alkali Metals" },
    { atomicNumber: 4, symbol: "Be", name: "Beryllium", group: "Alkaline Earth Metals" },
    // Add all elements as needed
];

const tableContainer = document.getElementById("periodic-table");
const infoPanel = document.getElementById("element-details");
const searchBar = document.getElementById("search-bar");

function renderTable() {
    tableContainer.innerHTML = "";
    elements.forEach(element => {
        const elementDiv = document.createElement("div");
        elementDiv.classList.add("element");
        elementDiv.dataset.atomicNumber = element.atomicNumber;
        elementDiv.dataset.group = element.group;
        elementDiv.textContent = element.symbol;
        elementDiv.addEventListener("click", () => displayElementDetails(element));
        tableContainer.appendChild(elementDiv);
    });
}

function displayElementDetails(element) {
    document.querySelectorAll(".element").forEach(el => el.classList.remove("highlight"));
    const selectedElement = document.querySelector(`[data-atomic-number="${element.atomicNumber}"]`);
    selectedElement.classList.add("highlight");

    const groupElements = document.querySelectorAll(`[data-group="${element.group}"]`);
    groupElements.forEach(el => el.classList.add("highlight"));

    infoPanel.innerHTML = `
        <p><strong>Name:</strong> ${element.name}</p>
        <p><strong>Symbol:</strong> ${element.symbol}</p>
        <p><strong>Atomic Number:</strong> ${element.atomicNumber}</p>
        <p><strong>Group:</strong> ${element.group}</p>
    `;
}

function filterTable(query) {
    const filteredElements = elements.filter(element =>
        element.name.toLowerCase().includes(query) ||
        element.symbol.toLowerCase().includes(query) ||
        element.atomicNumber.toString().includes(query)
    );

    document.querySelectorAll(".element").forEach(el => el.style.display = "none");
    filteredElements.forEach(element => {
        const el = document.querySelector(`[data-atomic-number="${element.atomicNumber}"]`);
        el.style.display = "flex";
    });
}

searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filterTable(query);
});

renderTable();
