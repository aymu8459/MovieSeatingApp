const movieSelector = document.querySelector('#movie');
const seatsContainer = document.querySelector('.container');
const naSeats = document.querySelectorAll('.row .seat:not(.occuppied)')
console.log("this is naSeats: ", [...naSeats]);
const movie = {
    name: 'Avengers: Endgame',
    price: 10,
    numberOfSeats: 5,
    calculate() {
        return this.price * this.numberOfSeats;
    },
};

window.addEventListener('load', () => {
    placeSavedValues();
    updateFinalText();
})

seatsContainer.addEventListener('click', (item) => {
    const itemClasses = item.target.classList;
    if(itemClasses.contains('seat') && 
    !itemClasses.contains('occuppied')) {
    itemClasses.toggle('selected');
    /* toggle adds and removes a class based on 
    if the class is already present or not */
    if(itemClasses.contains('selected')) {
        movie.numberOfSeats++;
    } else {
        movie.numberOfSeats--;
    }
    // console.log(movie.numberOfSeats);
    updateFinalText();
    }
    
})
movieSelector.addEventListener('change', (item) => {
    let i = item.target.options;
    movie.name = (i[i.selectedIndex].innerText.split(' '))[0];
    movie.price = item.target.value;
    updateFinalText();
})

function updateFinalText() {
saveToLocalStorage();
document.querySelector('#count').innerText = movie.numberOfSeats;
document.querySelector('#film').innerText = movie.name;
document.querySelector('#total').innerText = movie.calculate();
}

function saveToLocalStorage () {
const selectedSeats = document.querySelectorAll('.row  .seat.selected')
// console.log(typeof(selectedSeats));
const indexHolder = [...selectedSeats].map((seat) => [...naSeats].indexOf(seat));
console.log("this is the indexHolder: ", indexHolder);
localStorage.setItem('selectedSeatIndexes', JSON.stringify(indexHolder))
localStorage.setItem('movie', movie.name);
localStorage.setItem('price', movie.price);
}

function placeSavedValues () {
    const preSelectedSeats = JSON.parse(localStorage.getItem('selectedSeatIndexes'));
    
    movie.name = localStorage.getItem('movie') ?? 'Avengers: Endgame';
    movie.price = localStorage.getItem('price') ?? 10;
    
    if(preSelectedSeats !== null && preSelectedSeats.length > 0) {
        naSeats.forEach((seat, index) => {
            if(preSelectedSeats.indexOf(index) > -1) {
                // console.log(index);
                // console.log(preSelectedSeats.indexOf(index));
                seat.classList.add('selected');
            }
        });
    }
    [...movieSelector.options].map((m) => {
        if (m.innerText.search(movie.name) >= 0)
        m.setAttribute('selected','selected');
    });

    movie.numberOfSeats = preSelectedSeats?.length ?? 0;
    

}
