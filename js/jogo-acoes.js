//var memory_array = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H', 'I', 'I', 'J', 'J', 'K', 'K', 'L', 'L'];
var memory_array = [
    '01', '05', '09', '13', '17', '21', '25', '29', '33', '37', '41', '45', '49', '53', '57', '61', '65', '69', '73', '77', '81', '85', '89', '93', '97',
    '02', '06', '10', '14', '18', '22', '26', '30', '34', '38', '42', '46', '50', '54', '58', '62', '66', '70', '74', '78', '82', '86', '90', '94', '98',
    '03', '07', '11', '15', '19', '23', '27', '31', '35', '39', '43', '47', '51', '55', '59', '63', '67', '71', '75', '79', '83', '87', '91', '95', '99',
    '04', '08', '12', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '56', '60', '64', '68', '72', '76', '80', '84', '88', '92', '96', '100'
];
var quadrante1 = [
    '01', '05', '09', '13', '17',
    '21', '25', '29', '33', '37',
    '41', '45', '49', '53', '57',
    '61', '65', '69', '73', '77',
    '81', '85', '89', '93', '97'
];
var quadrante2 = [
    '02', '06', '10', '14', '18',
    '22', '26', '30', '34', '38',
    '42', '46', '50', '54', '58',
    '62', '66', '70', '74', '78',
    '82', '86', '90', '94', '98'
];
var quadrante3 = [
    '03', '07', '11', '15', '19',
    '23', '27', '31', '35', '39',
    '43', '47', '51', '55', '59',
    '63', '67', '71', '75', '79',
    '83', '87', '91', '95', '99'
];
var quadrante4 = [
    '04', '08', '12', '16', '20',
    '24', '28', '32', '36', '40',
    '44', '48', '52', '56', '60',
    '64', '68', '72', '76', '80',
    '84', '88', '92', '96', '100'
];

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var mostrar_quadrantes = false;

var proximo_card = '01';

function criaLinhas() {
    quadrante1 = _.shuffle(quadrante1);
    quadrante2 = _.shuffle(quadrante2);
    quadrante3 = _.shuffle(quadrante3);
    quadrante4 = _.shuffle(quadrante4);

    linha1Col1 = quadrante1.slice(0, 5);
    linha1Col2 = quadrante2.slice(0, 5);
    linha1 = linha1Col1.concat(linha1Col2);

    linha2Col1 = quadrante1.slice(5, 10);
    linha2Col2 = quadrante2.slice(5, 10);
    linha2 = linha2Col1.concat(linha2Col2);
    
    linha3Col1 = quadrante1.slice(10, 15);
    linha3Col2 = quadrante2.slice(10, 15);
    linha3 = linha3Col1.concat(linha3Col2);
    
    linha4Col1 = quadrante1.slice(15, 20);
    linha4Col2 = quadrante2.slice(15, 20);
    linha4 = linha4Col1.concat(linha4Col2);

    linha5Col1 = quadrante1.slice(20, 25);
    linha5Col2 = quadrante2.slice(20, 25);
    linha5 = linha5Col1.concat(linha5Col2);

    linha6Col1 = quadrante3.slice(0, 5);
    linha6Col2 = quadrante4.slice(0, 5);
    linha6 = linha6Col1.concat(linha6Col2);

    linha7Col1 = quadrante3.slice(5, 10);
    linha7Col2 = quadrante4.slice(5, 10);
    linha7 = linha7Col1.concat(linha7Col2);

    linha8Col1 = quadrante3.slice(10, 15);
    linha8Col2 = quadrante4.slice(10, 15);
    linha8 = linha8Col1.concat(linha8Col2);

    linha9Col1 = quadrante3.slice(15, 20);
    linha9Col2 = quadrante4.slice(15, 20);
    linha9 = linha9Col1.concat(linha9Col2);

    linha10Col1 = quadrante3.slice(20, 25);
    linha10Col2 = quadrante4.slice(20, 25);
    linha10 = linha10Col1.concat(linha10Col2);

    matriz = linha1.concat(linha2, linha3, linha4, linha5, linha6, linha7, linha8, linha9, linha10);
}

function newBoard() {
    tiles_flipped = 0;
    criaLinhas();

    var output = '';
    _.forEach(matriz, function (memory_array_value, index) {
        if (memory_array_value != '01') {
            output += '<div class="block" id="tile_' + index + '" onclick="memoryFlipTile(this,\'' + memory_array_value + '\')">' + memory_array_value + '</div>';
        } else {
            output += '<div class="block first" id="tile_' + index + '" onclick="memoryFlipTile(this,\'' + memory_array_value + '\')">' + memory_array_value + '</div>';
        }
    });
    
    document.getElementById('memory_board').innerHTML = output;
}

function canFlipCard(tile) {
    return tile.innerHTML == "" && memory_values.length < 2;
}

function isOneCardFlipped() {
    return memory_values.length == 1
}

function areNoCardsFlipped() {
    return memory_values.length == 0;
}

function setCardAsFlipped(tile, value) {
    memory_values.push(value);
    memory_tile_ids.push(tile.id);
}

function isThereIsAMatch() {
    return memory_values[0] == memory_values[1];
}

function matchCards() {
    tiles_flipped += 2;
    // Clear both arrays
    memory_values = [];
    memory_tile_ids = [];
}

function isGameOver() {
    // Check to see if the whole board is cleared
    return tiles_flipped == memory_array.length;
}

function gameIsOver() {
    alert("Board cleared... generating new board");
    document.getElementById('memory_board').innerHTML = "";
    newBoard();
}

function cardsDoNotMatch() {
    setTimeout(flipCardBack, 700);
}

function flipCard(tile, value) {
    //tile.style.background = '#87CEFA';
    console.log(value);
    console.log(proximo_card);
    if (value == proximo_card) {
        tile.style.background = '#90EE90';
        proximo_card = parseInt(proximo_card) + 1;
        proximo_card = "" + proximo_card;
        if (proximo_card < 10) {
            proximo_card = "0" + proximo_card;
        } else if (value == "100") {
            alert(":)")
        }
        document.getElementById('player').innerHTML = value;
    }
}

function flipCardBack() {
    // Flip the 2 tiles back over
    var tile_1 = document.getElementById(memory_tile_ids[0]);
    var tile_2 = document.getElementById(memory_tile_ids[1]);
    tile_1.style.background = '#FF3399';
    tile_1.innerHTML = "";
    tile_2.style.background = '#FF3399';
    tile_2.innerHTML = "";

    // Clear both arrays
    memory_values = [];
    memory_tile_ids = [];
}

function memoryFlipTile(tile, value) {
    flipCard(tile, value);
    /*
    if (canFlipCard(tile)) {
        flipCard(tile, value);
        if (areNoCardsFlipped()) {
            setCardAsFlipped(tile, value);
        } else if (isOneCardFlipped()) {
            setCardAsFlipped(tile, value);
            if (isThereIsAMatch()) {
                matchCards();
                if (isGameOver()) {
                    gameIsOver();
                }
            } else {
                cardsDoNotMatch();
            }
        }
    }
    */
}

function memoryFlipTile2(tile, value) {
    if (canFlipCard(tile)) {
        console.log('e1');
        flipCard(tile, value);
        setCardAsFlipped(tile, value);
        if (isOneCardFlipped()) {
            console.log('e2');
            if (isThereIsAMatch()) {
                console.log('e3');
                matchCards();
                if (isGameOver()) {
                    console.log('e4');
                    gameIsOver();
                }
            } else {
                cardsDoNotMatch();
            }
        }
    }
}

function mostrar() {
    if (document.getElementById("memory_board").classList.contains('quadrantes')) {
        document.getElementById("memory_board").classList.toggle('quadrantes');
    } else {
        document.getElementById("memory_board").classList.add('quadrantes');
    }
}