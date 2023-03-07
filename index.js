fetch('./data.json')
    .then(function(response) {return response.json})
    .then(function(data) { getData(data); })
    .catch(function (err) {console.log('error' + err);})