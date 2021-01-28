'use strict';

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the repos array
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(username) {
  const url = `https://api.github.com/users/${username}/repos`;
  console.log(url);

  const options = {
    method: 'GET'
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);