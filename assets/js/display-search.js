var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split("&");

  // Get the query and format values
  var query = searchParamsArr[0].split("=").pop();
  var format = searchParamsArr[1].split("=").pop();

  searchApi(query, format);
}

function searchApi(query, format) {
  // fetch(`https://the-cocktail-db.p.rapidapi.com`, {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
  //     "x-rapidapi-key": "3fc93a864fmsha6eb4d6d234e809p1d678fjsn6ae16889f063"
  //   }
  // })
  if (query) {
    fetchDrinkList =
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + query;
  } else if (format) {
    fetchDrinkList =
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=` + format;
  }
  fetch(fetchDrinkList)
    .then((headers) => headers.json())
    .then((response) => {
      for (let i = 0; i < response.drinks.length; i++) {
        const element = response.drinks[i];
        console.log(element);
        // console.log(response)
        var resultCard = document.createElement("section");
        resultCard.classList.add(
          "card",
          "bg-light",
          "text-dark",
          "mb-3",
          "p-3",
          "container"
        );

        var resultBody = document.createElement("section");
        resultBody.classList.add("card-body", "container");
        resultCard.append(resultBody);

        var titleEl = document.createElement("h3");
        titleEl.textContent = element.strDrink;

        var bodyContentEl1 = document.createElement("p");
        var bodyContentEl2 = document.createElement("ul");
        bodyContentEl2.classList.add("column");
        var bodyContentEl3 = document.createElement("ul");
        bodyContentEl3.classList.add("column");
        var bodyContentEl4 = document.createElement("p");

        bodyContentEl1.innerHTML =
          "<strong>Served in:</strong> " + element.strGlass + "<br/>";

        var ingredientsArray = [
          element.strIngredient1,
          element.strIngredient2,
          element.strIngredient3,
          element.strIngredient4,
          element.strIngredient5,
          element.strIngredient6,
          element.strIngredient7,
        ];
        tempArr = [];
        for (let i of ingredientsArray) i && tempArr.push(i);
        ingredientsArray = tempArr;
        var measureArray = [
          element.strMeasure1,
          element.strMeasure2,
          element.strMeasure3,
          element.strMeasure4,
          element.strMeasure5,
          element.strMeasure6,
          element.strMeasure7,
        ];
        tempArr2 = [];
        for (let i of measureArray) i && tempArr2.push(i);
        measureArray = tempArr2;

        // console.log(element.strIngredient1)
        console.log(ingredientsArray);
        console.log(measureArray);

        bodyContentEl2.innerHTML += '<div>' + "<strong>Ingredients:</strong> " + '</div>' + "</br>";

        if (ingredientsArray) {
          bodyContentEl2.innerHTML += "<div>" + ingredientsArray + "</div>";
        }
        if (measureArray) {
          bodyContentEl3.innerHTML += "<div>" + measureArray + "</div>";
          // '<strong>Measure:</strong> ' + measureArray +
          '</br>'
        } else {
          bodyContentE3.innerHTML +=
            "<strong>Ingredients:</strong> No ingredients for this entry.";
          ("</br>");
        }

        if (element.strInstructions) {
          bodyContentEl4.innerHTML +=
            "<strong>Instructions:</strong> " + element.strInstructions;
          ("</br>");
        } else {
          bodyContentEl4.innerHTML +=
            "<strong>Instructions:</strong>  No instructions for this entry.";
          ("</br>");
        }

        var imgThumbEl = document.createElement('img');
        // imgThumbEl.textContent = 'Read More';
        imgThumbEl.setAttribute('src', element.strDrinkThumb);
        imgThumbEl.classList.add('width', 'picture');

        resultBody.append(
          titleEl,
          imgThumbEl,
          bodyContentEl1,
          bodyContentEl2,
          bodyContentEl3,
          bodyContentEl4,
        );
        resultContentEl.append(resultCard);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector("#search-input").value;
  var formatInputVal = document.querySelector("#format-input").value;
  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
  location.assign(queryString);
  searchApi(searchInputVal, formatInputVal);
  console.log(fetchDrinkList)
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

getParams();

// commit this