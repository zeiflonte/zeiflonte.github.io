// Array contains card names and paths to images
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
    {
        'name': 'bursa-grand',
        'img': 'img/bursa-grand.jpg',
    }, 
    {
        'name': 'crystal',
        'img': 'img/crystal.jpg',
    },
    {
        'name': 'zahir',
        'img': 'img/zahir.jpg',
    },
    {
        'name': 'nusrat-djahan',
        'img': 'img/nusrat-djahan.jpg',
    },
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

// Array contains skirts skins for cards
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

// Initial settings
let records = window.localStorage;
let cardsNumber = 6; // easy level by default
let selectedLevel = 'easy';
let chosenSkirt = '';

// Event handler for changing a game level
function updateLevel() {
    let selectLevel = document.getElementById('selectLevel');
    selectedLevel = selectLevel.options[selectLevel.selectedIndex].value;
    
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

// Append card skirts to the page
const cardSkirts = document.getElementById('cardSkirts');
skirtsArray.forEach(item => {
    const skirt = document.createElement('div');
    skirt.classList.add('skirt');
    skirt.dataset.name = item.name;
    skirt.style.backgroundImage = `url(${item.img})`;
    cardSkirts.appendChild(skirt);
});

// Remove the previous card skirt selection
const resetSelection = () => {
    var selected = document.querySelectorAll('.selectedSkirt');
    selected.forEach(skirt => {
        skirt.classList.remove('selectedSkirt');
    });
};

// Event handler for selecting a card skirt
cardSkirts.addEventListener('click', function (event) {
    // The event target is our clicked item
    let clicked = event.target;
    if (clicked.classList.contains('skirt')) {
        resetSelection();
        clicked.classList.add('selectedSkirt');
        chosenSkirt = clicked.style.backgroundImage;
    }
});
document.getElementById('endGame').style.display = 'none';
document.getElementById("startButton").addEventListener("click", checkFields);

function checkFields(e)
{
    // Check if every field had been filled properly 
    let firstName = document.getElementById('firstName').value;
    if (firstName == '') {
        alert('First name is empty');
        return;
    }
    let lastName = document.getElementById('lastName').value;
    if (lastName == '') {
        alert('Last name is empty');
        return;
    }
    let email = document.getElementById('email').value;
    if (email == '') {
        alert('Email is empty');
        return;
    }
    if (chosenSkirt == '') {
        alert('A skirt has not been chosen');
        return;
    }
    
    // Start the game
    document.getElementById('start').style.display = 'none';
    game(firstName, lastName, email);
}

function game()
{  
    // Randomize array with cards on each load
    cardsArray.sort(() => 0.5 - Math.random());
    
    // Select a proper amount of cards
    let gameGrid = cardsArray.slice(0, cardsNumber);
    
    // Duplicate array to create a match for each card
    gameGrid = gameGrid.concat(gameGrid);

    // Grab the div with an id of root
    const game = document.getElementById('game'); 
    
    // Creating a game timer
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timerContainer');
    game.appendChild(timerContainer);
    const minutesLabel = document.createElement('label');
    const separator = document.createElement('span');
    separator.textContent = ':';
    const secondsLabel = document.createElement('label');
    // Adding css
    minutesLabel.classList.add('minutes');
    secondsLabel.classList.add('seconds');
    // Appending the game timer
    timerContainer.appendChild(minutesLabel);
    timerContainer.appendChild(separator);
    timerContainer.appendChild(secondsLabel);
    
    // Timer for game duration control
    var totalSeconds = 0;
    let timer = setInterval(setTime, 1000);

    // Counting minutes and seconds
    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    // Processing values for showing it a user
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

    // Reset unmatched cards
    const resetGuesses = () => {
        firstGuess = '';
        secondGuess = '';
        count = 0;
        previousTarget = null;

        // Unselect cards
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
            card.firstChild.style.backgroundImage = 'none';
      });
    }

    // Exit game if all cards are opened
    const isGameOver = () => {
        amountOfOpened++;
        if (amountOfOpened == cardsNumber) {
            endGame(timer, pad, totalSeconds, firstName, lastName, email);
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
                    setTimeout(resetGuesses, delay);
                    isGameOver();
                } else {
                    setTimeout(resetGuesses, delay);
                }
            }
        }
     });
}

function endGame(timer, pad, totalSeconds, firstName, lastName, email) {
    // Stop timer
    clearInterval(timer);
    
    // Show the records scene
    document.getElementById('game').style.display = 'none';
    document.getElementById('endGame').style.display = 'block';
    
    // Append a player name
    document.getElementById('congratsCapture').innerHTML += firstName.value;
    
    // Append a game duration
    let gameTime = pad(parseInt(totalSeconds / 60)) + ':' + pad(totalSeconds % 60);
    document.getElementById('timeScore').innerHTML += gameTime;
    
    let scores = new Array(0);
    if (localStorage.getItem('scores') !== null) {
        scores = localStorage.getItem('scores');
        scores = JSON.parse(scores);
    }
    
    // An object that represents a current result
    let score = {
        name: firstName.value,
        surname: lastName.value,
        level: selectedLevel,
        time: gameTime,
        seconds: totalSeconds,
    }
    
    // Pushing new entry
    let amountOfScores = 10;
    let sameLevelEntries = scores.filter(x => x.level === selectedLevel);
    // If there is some space to push the entry
    if (sameLevelEntries.length < amountOfScores) {
        scores.push(score);
    } else {
        // Looking for an entry with the worst time
        let maxTimeEntry = sameLevelEntries.reduce(function(prev, curr) {
            return prev.seconds > curr.seconds ? prev : curr;
        });
        // If a player finished faster then replace the entry
        if (score.seconds < maxTimeEntry.seconds) {
            scores[scores.indexOf(maxTimeEntry)] = score;
        }
    }
    if (sameLevelEntries.length > 0) {
        // Looking for an entry with the best time
        let minTimeEntry = sameLevelEntries.reduce(function(prev, curr) {
            return prev.seconds < curr.seconds ? prev : curr;
        });
        // If a player finished faster then show the special capture
        if (score.seconds < minTimeEntry.seconds) {
            const newRecordChapture = document.createElement('span');
            newRecordChapture.textContent = ' (new record)'
            newRecordChapture.classList.add('newRecordChapture');
            document.getElementById('timeScore').appendChild(newRecordChapture);
        }
    }

    var levels = ['easy', 'medium', 'hard'];
    // Sort entries by levels and time rates within levels
    scores = scores.sort((a, b) => {
        return a.level != b.level ? (levels.indexOf(a.level) > levels.indexOf(b.level) ? 1 : -1) : (a.seconds > b.seconds ? 1 : -1);
    });
    
    // Save records
    localStorage.clear();
    localStorage.setItem('scores', JSON.stringify(scores));
    
    // Get a scores table
    let scoresTable = document.getElementById('scoresTable');
    // Append headers
    scoresTable.innerHTML = '<tr><th>First name</th><th>Last name</th><th>Level</th><th>Time</th></tr>';
    // Append entries
    scores.forEach(score => {
        scoresTable.innerHTML += '<tr><td>' + score.name + '</td><td>' + score.surname + '</td><td>' + score.level + '</td><td>' + score.time + '</td></tr>';
    });
    
    // Reload the game page
    let replay = document.getElementById('replayButton');
    replay.addEventListener('click', function (event) {
        location.reload();
    })
}