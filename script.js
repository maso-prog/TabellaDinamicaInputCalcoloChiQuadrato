function createTable() {
    var rows = document.getElementById("rows").value;
    var columns = document.getElementById("columns").value;
    var table = document.getElementById("myTable");
    table.innerHTML = "";

    // Itera sul numero di righe e colonne per creare la tabella
    for (var i = 0; i <= rows; i++) {
        var row = table.insertRow();
        for (var j = 0; j <= columns; j++) {
            var cell = row.insertCell();
            // Aggiungi input per ogni cella
            if(i==0 || j==0)
            {
                var div = document.createElement("div");
                div.classList.add("gruppo-movimento");

                var input = document.createElement("input");
                input.required = true;
                input.type = "text";
                input.classList.add("input");
                div.appendChild(input);

                var span = document.createElement("span");
                span.classList.add("barra");
                div.appendChild(span);

                var label = document.createElement("label");
                label.classList.add("etichetta");
                if(i==0 && j==0)
                {
                    var characters = ["C", "a", "m", "p", "i", "o", "n","i"];
                    for (var k = 0; k < characters.length; k++) {
                        var spanChar = document.createElement("span");
                        spanChar.classList.add("carattere-etichetta");
                        spanChar.style.setProperty("--indice", k);
                        spanChar.textContent = characters[k];
                        label.appendChild(spanChar);
                    }

                    div.appendChild(label);
                    cell.appendChild(div);
                }
                else
                {
                    var characters = ["N", "o", "m", "e", " ", "D", "a","t","o"];
                    for (var k = 0; k < characters.length; k++) {
                        var spanChar = document.createElement("span");
                        spanChar.classList.add("carattere-etichetta");
                        spanChar.style.setProperty("--indice", k);
                        spanChar.textContent = characters[k];
                        label.appendChild(spanChar);
                    }
                    div.appendChild(label);
                    cell.appendChild(div);
                }
                
            }
            else{
                var input = document.createElement("input");
                input.type = "number";
                input.placeholder = "Inserisci valore";
                input.step = "any";
                cell.appendChild(input);
            }
        }
    }

    // Calcola le somme iniziali
    calculateSums();
}

function calculateColumnSums() {
    var table = document.getElementById("myTable");
    var numRows = table.rows.length;
    var numCols = table.rows[0].cells.length;

    var sums = [];
    for (var i = 0; i < numCols; i++) {
        sums.push(0);
    }

    // Itera sulle celle della tabella per calcolare le somme delle colonne
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var input = table.rows[i].cells[j].querySelector("input");
            if (input && input.value !== "" && i !== 0) { // Salta la prima riga
                sums[j] += parseFloat(input.value);
            }
        }
    }

    // Visualizza le somme delle colonne
    var columnSumsDiv = document.getElementById("columnSums");
    columnSumsDiv.innerHTML = "<strong>Somme delle colonne:</strong><br>";
    for (var k = 1; k < numCols; k++) { // Inizia da 1 per saltare la prima colonna
        columnSumsDiv.innerHTML += sums[k].toFixed(2) + "<br>";
    }

    return sums;
}

function calculateRowSums() {
    var table = document.getElementById("myTable");
    var numRows = table.rows.length;
    var numCols = table.rows[0].cells.length;

    var sums = [];
    for (var i = 0; i < numRows; i++) {
        sums.push(0);
    }

    // Itera sulle celle della tabella per calcolare le somme delle righe
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var input = table.rows[i].cells[j].querySelector("input");
            if (input && input.value !== "" && j !== 0) { // Salta la prima colonna
                sums[i] += parseFloat(input.value);
            }
        }
    }

    // Visualizza le somme delle righe
    var rowSumsDiv = document.getElementById("rowSums");
    rowSumsDiv.innerHTML = "<strong>Somme delle righe:</strong><br>";
    for (var k = 1; k < numRows; k++) { // Inizia da 1 per saltare la prima riga
        rowSumsDiv.innerHTML += sums[k].toFixed(2) + "<br>";
    }

    return sums;
}

function calculateTotalSum() {
    var table = document.getElementById("myTable");
    var numRows = table.rows.length;
    var numCols = table.rows[0].cells.length;

    var totalSum = 0;
    // Itera sulle celle della tabella per calcolare la somma totale
    for (var i = 1; i < numRows; i++) {
        for (var j = 1; j < numCols; j++) {
            var input = table.rows[i].cells[j].querySelector("input");
            if (input && input.value !== "") {
                totalSum += parseFloat(input.value);
            }
        }
    }

    // Visualizza la somma totale
    var totalSumDiv = document.getElementById("totalSum");
    totalSumDiv.innerHTML = "<strong>Somma totale:</strong><br>" + totalSum.toFixed(2);

    return totalSum;
}

function calculateSums() {
    calculateColumnSums();
    calculateRowSums();
    calculateTotalSum();
}

function calculateChiSquare() {
    var table = document.getElementById("myTable");
    var tableContingency = document.getElementById("tabellaContingenza");
    var numRows = tableContingency.rows.length;
    var numCols = tableContingency.rows[0].cells.length;

    var chiSquare = 0;
    // Itera attraverso le celle delle tabelle per calcolare il chi quadrato
    for (var i = 0; i < numRows; i++) {
        for (var j = 0; j < numCols; j++) {
            var obs = table.rows[i + 1].cells[j + 1].querySelector("input").value; // Utilizza i + 1 e j + 1 per compensare la riga delle intestazioni
            var exp = tableContingency.rows[i].cells[j].textContent;
            // Converte le stringhe in numeri solo se non sono vuote
            if (obs !== "" && exp !== "") {
                obs = parseFloat(obs);
                exp = parseFloat(exp);
                chiSquare += Math.pow(obs - exp, 2) / exp;
            }
        }
    }

    // Visualizza il risultato del chi quadrato
    var chiSquareResultDiv = document.getElementById("chiSquareResult");
    chiSquareResultDiv.textContent = "Chi Quadrato: " + chiSquare.toFixed(5);

    // Calcola il numero di gradi di libertà
    if(numRows>=numCols)
    {
        var degreesOfFreedom = numRows;
    }
    else
    {
        var degreesOfFreedom = numCols;
    }

    // Calcola e visualizza il chi quadrato normalizzato
    var normalizedChiSquare = chiSquare / (degreesOfFreedom*calculateTotalSum())*2;
    chiSquareResultDiv.innerHTML += "<br>Chi Quadrato Normalizzato: " + normalizedChiSquare.toFixed(5);

    return chiSquare;
}

function createTabellaContingenza() {
    var table = document.getElementById("myTable");
    var columnSums = calculateColumnSums();
    var rowSums = calculateRowSums();
    var totalSum = calculateTotalSum();

    var tabellaContingenza = document.getElementById("tabellaContingenza");
    tabellaContingenza.innerHTML = ""; // Svuota la tabella di contingenza

    // Itera attraverso le somme delle righe e delle colonne per calcolare i valori della tabella di contingenza
    for (var i = 1; i < rowSums.length; i++) {
        var row = tabellaContingenza.insertRow();
        for (var j = 1; j < columnSums.length; j++) {
            var cell = row.insertCell();
            // Calcola il valore della cella utilizzando la formula (somma riga * somma colonna) / somma totale
            var valoreCella = (rowSums[i] * columnSums[j]) / totalSum;
            cell.textContent = valoreCella.toFixed(2); // Visualizza il valore nella cella
        }
    }
}

function createTabellaDifferenze() {
    var table = document.getElementById("myTable");
    var tableContingency = document.getElementById("tabellaContingenza");
    var numRows = tableContingency.rows.length;
    var numCols = tableContingency.rows[0].cells.length;

    var tabellaDifferenze = document.getElementById("tabellaDifferenze");
    tabellaDifferenze.innerHTML = ""; // Svuota la tabella delle differenze

    // Itera attraverso le celle delle tabelle per calcolare e visualizzare le differenze
    for (var i = 0; i < numRows; i++) {
        var row = tabellaDifferenze.insertRow();
        for (var j = 0; j < numCols; j++) {
            var cell = row.insertCell();
            var obs = parseFloat(tableContingency.rows[i].cells[j].textContent);
            var exp = parseFloat(table.rows[i + 1].cells[j + 1].querySelector("input").value); // Utilizza i + 1 e j + 1 per compensare la riga delle intestazioni
            var difference = exp - obs;
            cell.textContent = difference.toFixed(2); // Visualizza la differenza nella cella
        }
    }
}




/*sfondo*/



document.addEventListener('DOMContentLoaded', function() {
    const numCount = 20; // Numero di numeri casuali da generare
    const container = document.getElementById('randomNumbers');
    let resizeListener; // Variabile per l'ascoltatore dell'evento di ridimensionamento

    // Funzione per creare e posizionare casualmente i numeri
    function createRandomNumbers() {
        container.innerHTML = ''; // Cancella i numeri esistenti prima di aggiornarli

        // Calcola le dimensioni massime disponibili per posizionare i numeri
        const maxWidth = window.innerWidth;
        const maxHeight = window.innerHeight;

        for (let i = 0; i < numCount; i++) {
            createRandomElement(container, maxWidth, maxHeight);
        }
    }

    // Aggiorna la disposizione dei numeri quando la finestra viene ridimensionata
    window.addEventListener('resize', function() {
        // Rimuovi l'ascoltatore dell'evento di ridimensionamento durante il movimento
        window.removeEventListener('resize', resizeListener);
        
        // Crea e posiziona i numeri casuali durante il ridimensionamento
        createRandomNumbers();

        // Aggiungi nuovamente l'ascoltatore dell'evento di ridimensionamento dopo il movimento
        resizeListener = window.addEventListener('resize', createRandomNumbers);
    });

    // Crea e posiziona i numeri casuali al caricamento della pagina
    createRandomNumbers();
});

// Funzione per creare un numero casuale e posizionarlo
function createRandomElement(container, maxWidth, maxHeight) {
    const element = document.createElement('div');
    element.classList.add('number');
    element.textContent = getRandomSymbol();
    container.appendChild(element);

    // Imposta la posizione casuale dell'elemento
    const xPos = Math.random() * maxWidth;
    const yPos = Math.random() * maxHeight;
    element.style.left = xPos + 'px';
    element.style.top = yPos + 'px';

    // Sposta l'elemento casualmente
    moveRandomly(element, xPos, yPos);
}

// Funzione per spostare l'elemento casualmente
function moveRandomly(element, startX, startY) {
    const targetX = Math.random() * window.innerWidth;
    const targetY = Math.random() * window.innerHeight;
    const speed = 20; // Velocità del movimento (più bassa è la velocità, più lento è il movimento)

    const deltaX = targetX - startX;
    const deltaY = targetY - startY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY); // Distanza tra i punti di partenza e destinazione

    const duration = distance / speed * 1000; // Durata del movimento (calcolata in base alla velocità)

    const startTime = performance.now();

    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Assicura che il progresso sia compreso tra 0 e 1

        const newX = startX + deltaX * progress;
        const newY = startY + deltaY * progress;

        element.style.left = newX + 'px';
        element.style.top = newY + 'px';

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            moveRandomly(element, newX, newY);
        }
    }

    requestAnimationFrame(animate);
}

// Funzione per ottenere un simbolo casuale
function getRandomSymbol() {
    const symbols = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '√', '+', '-', '×', '÷', 'π', 'e', 'x', 'y', '<', '>', '∫','∑', 'Δ']; // Aggiungi altri simboli se necessario
    return symbols[Math.floor(Math.random() * symbols.length)];
}
