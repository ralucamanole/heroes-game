let showHeroesBtn = document.getElementById('show-heroes');
let startFightBtn = document.querySelector('.start-fight');
let heroesContainer = document.querySelector('.heroes-container');
let showWinnerDiv = document.querySelector('.show-winner');
showWinnerDiv.innerHTML = epicFight.findWinner();

showHeroesBtn.addEventListener('click', showHeroesFunc);

function showHeroesFunc() {
    heroesContainer.classList.add('d-flex');
    showHeroesBtn.classList.add('d-none');
    startFightBtn.classList.add('d-block');
}

startFightBtn.addEventListener('click', showWinner);

function showWinner() {
    // heroesContainer.classList.remove('d-flex');
    startFightBtn.classList.remove('d-block');
    showWinnerDiv.classList.add('d-block');
}