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
  var apiKey = "3fc93a864fmsha6eb4d6d234e809p1d678fjsn6ae16889f063"
  var fetchDrinkList = fetch(`https://the-cocktail-db.p.rapidapi.com`, {
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
      console.log(response);
    })
    .then(function(locRes) {
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = locRes.search.query;
      console.log(locRes);
      if (!locRes.response.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.results.length; i++) {
          printResults(locRes.results[i]);
        }
      }
    })
    .catch(err => {
      console.error(err);
    });

}

function printResults(resultObj) {
  console.log(resultObj);

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.strDrink;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.strGlass + '<br/>';

  if (resultObj.subject) {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> ' + resultObj.strIngredient1.join(', ') + 
      '<strong>Subjects:</strong> ' + resultObj.strIngredient2.join(', ') + 
      '<strong>Subjects:</strong> ' + resultObj.strIngredient3.join(', ') + 
      '<strong>Subjects:</strong> ' + resultObj.strIngredient4.join(', ') + 
      '<strong>Subjects:</strong> ' + resultObj.strIngredient5.join(', ') + 
      '<strong>Subjects:</strong> ' + resultObj.strIngredient6.join(', ') +
      '<strong>Subjects:</strong> ' + resultObj.strIngredient7.join(', ') + '<br/>';
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.description) {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong> ' + resultObj.description[0];
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;

  if (!searchInputVal) {
    searchInputVal = formatInputVal
    console.error('You need a search input value!');
    return;
  }

  searchApi(searchInputVal, formatInputVal);
 
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();
