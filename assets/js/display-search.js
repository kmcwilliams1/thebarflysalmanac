var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");

function getParams() {
  var searchParamsArr = document.location.search.split("&");

  var query = searchParamsArr[0].split("=").pop();
  var format = searchParamsArr[1].split("=").pop();

  searchApi(query, format);
}

function searchApi(query, format) {
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
        console.log(element)
        var resultCard = document.createElement("section");
        resultCard.classList.add(
          "card",
          "bg-primary",
          "text-white",
          "mb-3",
          "p-3",
          "container"
        );

        var resultBody = document.createElement("div");
        resultBody.classList.add("card-body");
        resultCard.append(resultBody);

        var titleEl = document.createElement("h3");
        titleEl.classList.add("h3");
        titleEl.textContent = element.strDrink;

        var imgThumbEl = document.createElement("img");
        imgThumbEl.setAttribute("src", element.strDrinkThumb);
        imgThumbEl.classList.add("width", "picture");

        var bodyContentEl1 = document.createElement("p");
        var bodyContentEl2 = document.createElement("p");
        bodyContentEl2.classList.add("ingredients", "glass");
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

        // if (tempArr2 < tempArr){
        //   newIngredientsArray2.push()
        // }

        newIngredientsArray = [];
        console.log(newIngredientsArray)
        for (let i = 0; i < ingredientsArray.length; i++) {


          // i dont think we need the i === 0
          // if (i === 0) {
          //   newIngredientsArray.push(measureArray[i] + ingredientsArray[i]);
          // } else 
          if (i < measureArray.length) {
            newIngredientsArray.push(
              " " + measureArray[i] + " " + ingredientsArray[i]
            );
          }
          else if ( measureArray.length < ingredientsArray.length) {
            newIngredientsArray.push(
              " " + measureArray[i] + " " + ingredientsArray[i]
            );
          }
          // else if (measureArray < ingredientsArray) {
          //   if (measureArray === undefined){
          //   newIngredientsArray.push(
          //     " " + measureArray + " " + ingredientsArray[i]
          //   )
          //   }
          // }
        }

        if (ingredientsArray) {
          bodyContentEl2.innerHTML +=
            "<strong>Ingredients: </strong>" + "</br>" + newIngredientsArray + "</br>";
        } else {
          bodyContentE3.innerHTML +=
            "<strong>Ingredients:</strong> No ingredients for this entry.";
          ("</br>");
        }

        if (element.strInstructions) {
          bodyContentEl4.innerHTML +=
            "<strong>Instructions:</strong> " + "</br>" + element.strInstructions;
          ("</br>");
        } else {
          bodyContentEl4.innerHTML +=
            "<strong>Instructions:</strong>  No instructions for this entry.";
          ("</br>");
        }

        resultBody.append(
          titleEl,
          imgThumbEl,
          bodyContentEl1,
          bodyContentEl2,
          bodyContentEl4
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
  var queryString =
    "./search-results.html?q=" + searchInputVal + "&format=" + formatInputVal;
  location.assign(queryString);
  searchApi(searchInputVal, formatInputVal);
  console.log(fetchDrinkList);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

getParams();