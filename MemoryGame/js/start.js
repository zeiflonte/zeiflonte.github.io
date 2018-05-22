// Array contains a card name and a path to an image
const cardsArray = [{
        'name': 'al-aqsa',
        'img': 'img/al-aqsa.jpg',
    },
    {
        'name': 'al-haram',
        'img': 'img/al-haram.jpg',
    },
    {
        'name': 'al-nabawi',
        'img': 'img/al-nabawi.jpg',
    },
    {
        'name': 'blue-mosque',
        'img': 'img/blue-mosque.jpg',
    },
    /* {
        'name': 'bursa-grand',
        'img': 'img/bursa-grand.jpg',
    }, */
    {
        'name': 'crystal',
        'img': 'img/crystal.jpg',
    },
    {
        'name': 'zahir',
        'img': 'img/zahir.jpg',
    },
    /* {
        'name': 'nusrat-djahan',
        'img': 'img/nusrat-djahan.jpg',
    }, */
    {
        'name': 'puchong-perdana',
        'img': 'img/puchong-perdana.jpg',
    },
    {
        'name': 'rock-mosque',
        'img': 'img/rock-mosque.jpg',
    },
    {
        'name': 'shah-faisal',
        'img': 'img/shah-faisal.jpg',
    },
    {
        'name': 'sheikh-zayed',
        'img': 'img/sheikh-zayed.jpg',
    },
];

const skirtsArray = [{
    'name': 'green',
        'img': 'img/skirts/green.jpg',
    },
    {
        'name': 'stamp',
        'img': 'img/skirts/stmp.jpg',
    },
    {
        'name': 'tower',
        'img': 'img/skirts/tower.jpg',
    },
];

let records = window.localStorage;

var cardsNumber = 6;

function updateLevel() {
//document.getElementById('selectedLevel').onclick = function() {
    let selectLevel = document.getElementById('selectLevel');
    let selectedLevel = selectLevel.options[selectLevel.selectedIndex].value;
    
    switch(selectedLevel) {
        case 'easy':
            cardsNumber = 6;
            break;
        case 'medium':
            cardsNumber = 8;
            break;
        case 'hard':
            cardsNumber = 10;
            break;
    }
}

const cardSkirts = document.getElementById('cardSkirts');
//const skirts = document.createElement('div');
//cardSkirts.appendChild(skirts);
skirtsArray.forEach(item => {
    const skirt = document.createElement('div');
    skirt.classList.add('skirt');
    skirt.dataset.name = item.name;
    skirt.style.backgroundImage = `url(${item.img})`;
    chosenSkirt = skirt.style.backgroundImage; //!ERASE
    cardSkirts.appendChild(skirt);
});

const resetSelection = () => {
    //!!!
    var selected = document.querySelectorAll('.selectedSkirt');
    selected.forEach(skirt => {
        skirt.classList.remove('selectedSkirt');
    });
};

cardSkirts.addEventListener('click', function (event) {
    // The event target is our clicked item
    let clicked = event.target;
    if (clicked.classList.contains('skirt')) {
        resetSelection();
        clicked.classList.add('selectedSkirt');
        let chosenSkirt = `url(${clicked.style.backgroundImage})`;
    }
});

//let chosenSkirt = `url(${item.img})`;

//function startGame() {
{
    // Randomize array with cards on each load
    cardsArray.sort(() => 0.5 - Math.random());
    
    // 
    let gameGrid = cardsArray.slice(0, cardsNumber);
    
    // Duplicate array to create a match for each card
    gameGrid = gameGrid.concat(gameGrid);
    
    // Randomize game grid on each load
    //gameGrid.sort(() => 0.5 - Math.random());

    // Grab the div with an id of root
    const game = document.getElementById('game');
    
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timerContainer');
    game.appendChild(timerContainer);
    const minutesLabel = document.createElement('label');
    const separator = document.createElement('span');
    separator.textContent = ':';
    const secondsLabel = document.createElement('label');
    minutesLabel.classList.add('minutes');
    secondsLabel.classList.add('seconds');
    timerContainer.appendChild(minutesLabel);
    timerContainer.appendChild(separator);
    timerContainer.appendChild(secondsLabel);
    
    // Timer for game duration control
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }

    // Create a section with a class of grid
    const grid = document.createElement('section');
    grid.classList.add('grid');

    game.appendChild(grid);

    // For each item in the cardsArray array
    gameGrid.forEach(item => {
        // Create a div which poses a card element
        const card = document.createElement('div');

        // Apply a card class to that div
        card.classList.add('card');

        // Set the data-name attribute of the div to the cardsArray name
        card.dataset.name = item.name;

        // Create front of card
        const front = document.createElement('div');
        front.classList.add('front');
        front.style.backgroundImage = chosenSkirt;

        // Create back of card, which contains 
        const back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = `url(${item.img})`;

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });

    // Set initial values
    let amountOfOpened = 0;
    let count = 0;
    let delay = 900;
    let firstGuess = '';
    let secondGuess = '';

    const resetGuesses = () => {
        firstGuess = '';
        secondGuess = '';
        count = 0;
        previousTarget = null;

        //!!!
        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.remove('selected');
        });
    };

    // Add match CSS
    const match = () => {
        var selected = document.querySelectorAll('.selected');
        selected.forEach(card => {
            card.classList.add('matched');
            //card.style.backgroundImage = 'none';
            card.firstChild.style.backgroundImage = 'none';
      });
    }

    const isGameOver = () => {
        amountOfOpened++;
        if (amountOfOpened == cardsNumber) {
            endGame();
            return;
        }
    }

    // Add event listener to grid
    grid.addEventListener('click', function (event) {
        // The event target is our clicked item
        let clicked = event.target;
        
        // Do not allow the grid section itself to be selected; only select divs inside the grid
        if (clicked.nodeName === 'SECTION' ||
            // Do not allow to match the same card
            clicked.parentNode.classList.contains('selected') ||
            // Do not allow to match already opened cards
            clicked.parentNode.classList.contains('matched')) {
        return;
        }

        if (count < 2) {
            count++; 

            if (count === 1) {
                firstGuess = clicked.parentNode.dataset.name;
            }
            else {
                secondGuess = clicked.parentNode.dataset.name;
            }
            // Add selected class
            clicked.parentNode.classList.add('selected');

            // If both guesses are not empty
            if (firstGuess !== '' && secondGuess !== '') {
                // and the first guess matches the second match
                if (firstGuess === secondGuess) {
                    setTimeout(match, delay);
                   // resetGuesses();
                    setTimeout(resetGuesses, delay);
                    isGameOver();
                } else {
                    setTimeout(resetGuesses, delay);
                }
            }
        }
     });
}

function endGame() {
    
}





