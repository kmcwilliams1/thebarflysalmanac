var searchFormEl = document.querySelector('#search-form');
function handleSearchFormSubmit(event) {
  event.preventDefault();
  var searchInputVal = document.querySelector('#search-input').value;
  var formatInputVal = document.querySelector('#format-input').value;
  var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
  location.assign(queryString);
}
searchFormEl.addEventListener('submit', handleSearchFormSubmit);
