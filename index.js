fetch('./data.json')
    .then(function(response) {return response.json})
    .then(function(data) { getData(data); })
    .catch(function (err) {console.log('error' + err);})
function getData(data){
    let i = 0;
        for(let productName in data){
            if(productName == "Mens Shoes"){

            }
        }
}