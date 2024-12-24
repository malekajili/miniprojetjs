// tableau feragh bech nstokiw fih users
let data = [];

// les données li fi HTML aaytnelhom
const main = document.getElementById('main'); // users li bech naamloulhom affichage
const totalWealthEl = document.getElementById('totalWealth'); // affichina lflous
const addUserBtn = document.getElementById('addUser'); // nzidou user
const doubleMoneyBtn = document.getElementById('doubleMoney'); // ndoubliw nbr mteaa lflous *2
const showMillionairesBtn = document.getElementById('showMillionaires'); // taffichi ken lmilionaires, taaml filtrage li tharwthom (floshom) akther minn 1000000
const sortRichestBtn = document.getElementById('sortRichest'); // naamlou tri mel kbir lsgir
const calculateWealthBtn = document.getElementById('calculateWealth'); // thseeb total

document.addEventListener('DOMContentLoaded', function () {
    // evenement ki nenzel 3ala bouton tnedi lil function
    addUserBtn.addEventListener('click', addRandomUser); // tzid user random
    doubleMoneyBtn.addEventListener('click', doubleMoney); // tzid *2
    showMillionairesBtn.addEventListener('click', showMillionaires); // filtrage w taffichi millionaires
    sortRichestBtn.addEventListener('click', sortByRichest); // tri mel kbir lsgir
    calculateWealthBtn.addEventListener('click', calculateWealth); // thseb lmajmou3
});

// tzid user de manière random
async function addRandomUser() {
    try {
        const res = await fetch('https://randomuser.me/api'); // API li st3mltou fi sujet 3
        const data = await res.json(); // tbaddil response HTTP men API il JSON 
        console.log('API Response:', data);

        const user = data.results[0]; // tn7i les user min la réponse
        const newUser = {
            name: `${user.name.first} ${user.name.last}`, // naaml récup lil ism w la9ab
            wealth: Math.floor(Math.random() * 1000000) // ykhtar milyonnaire random entre 0 w 1000000
        };

        // tzid user lil tableau
        addData(newUser);
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error); // fi halet erreur, message afficher
    }
}

// function li taaml *2 lil flous
function doubleMoney() {
    data = data.map(user => {
        return { ...user, wealth: user.wealth * 2 }; // kol user n3mloh fousou *2
    });
    updateDOM(); // affichage jdide bles données jdod
}

// function taffichi les millionnaires li tharwthom akther min 1000000
function showMillionaires() {
    data = data.filter(user => user.wealth > 1000000); // filtrage luser li tharwthom akther min 1000000
    updateDOM(); // affichage jdide b données filtrées
}

// function taaml tri min kbir lil sgir
function sortByRichest() {
    data.sort((a, b) => b.wealth - a.wealth); // tri mel kbir lsgir
    updateDOM(); // affichage jdide bles données triées
}

// t7seb lmajmou3 lflous
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.wealth), 0); // fonction fleché t7isab lmajmou3a

    totalWealthEl.innerHTML = `<h3>Richesse totale: $${formatMoney(wealth)}</h3>`; // affichage fi format dolaire
}

// bech tzid user lil tableau
function addData(obj) {
    data.push(obj); 
    updateDOM(); // affichage
}

// function li taaml re-affichage kol ma tsir evenement jdida
function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Personne</strong> Richesse</h2>'; // tn7i  contenu de DOM l9dim

    // kol mara nzid user lil DOM
    providedData.forEach(user => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong> $${formatMoney(user.wealth)}`; // affichage l'ism w flous
        main.appendChild(element); // ajout user fi DOM
    });
}

// fonction li taaml formatage lil flous kima ce format ex: 1,000,000
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // formatage mteaa lflous
}
