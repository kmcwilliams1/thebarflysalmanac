var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var query = searchParamsArr[0].split('=').pop();
  var format = searchParamsArr[1].split('=').pop();

  searchApi(query, format);
}


function searchApi(query, format) {
  fetch(`https://the-cocktail-db.p.rapidapi.com`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
      "x-rapidapi-key": "3fc93a864fmsha6eb4d6d234e809p1d678fjsn6ae16889f063"
    }
  })
  if (query) {
    fetchDrinkList = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + query
  }
  else if (format) {
    fetchDrinkList = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + format
  }
  fetch(fetchDrinkList)
    .then(headers => headers.json())
    .then(response => {
      for (let i = 0; i < response.drinks.length; i++) {
        const element = response.drinks[i];
        console.log(element);

        var resultCard = document.createElement('div');
        resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

        var resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
        resultCard.append(resultBody);

        var titleEl = document.createElement('h3');
        titleEl.textContent = element.strDrink;

        var bodyContentEl = document.createElement('p');
        bodyContentEl.innerHTML =
          '<strong>Date:</strong> ' + element.strGlass + '<br/>';

        if (element.subject) {
          bodyContentEl.innerHTML +=
            '<strong>Ingredients:</strong> ' + element.strIngredient1.join(', ') +
            element.strIngredient2.join(', ') +
            element.strIngredient3.join(', ') +
            element.strIngredient4.join(', ') +
            element.strIngredient5.join(', ') +
            element.strIngredient6.join(', ') +
            element.strIngredient7.join(', ') + '<br/>';
        } else {
          bodyContentEl.innerHTML +=
            '<strong>Ingredients:</strong> No ingredients for this entry.';
        }
        '<br>'
        if (element.strInstructions) {
          bodyContentEl.innerHTML += '<br>'
          '<strong>Instructions:</strong> ' + element.strInstructions;
          '</br>'
        } else {
          bodyContentEl.innerHTML += '<br>'
          '<strong>Instructions:</strong>  No instructions for this entry.';
          '</br>'
        }
        '</br>'

        // var linkButtonEl = document.createElement('a');
        // linkButtonEl.textContent = 'Read More';
        // linkButtonEl.setAttribute('href', element.url);
        // linkButtonEl.classList.add('btn', 'btn-dark');

        resultBody.append(titleEl, bodyContentEl,
          // linkButtonEl
        );
        resultContentEl.append(resultCard);
      }
    })
    .catch(err => {
      console.error(err);
    });
}

function handleSearchFormSubmit(event) {

  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;
  searchApi(searchInputVal, formatInputVal);
  // console.log(fetchDrinkList)
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();
