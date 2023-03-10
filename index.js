fetch('./data.json')
    .then(function(response) {return response.json()})
    .then(function (data) { getData(data); })
    .catch(function (err) {console.log('error' + err);})

function getData(data){
    let i = 1;
        for(let productName in data){
            if(productName == "Mens Shoes"){
                for(let element of data[productName]){
                    let outer = document.getElementById(String(i));
                    let text = document.createElement("p");
                    text.className = "card-text";
                    text.innerHTML = `Product Name: ${element["name"]}<br>${element["desc"]} <br> Price: $${element["price"]}`
                    outer.appendChild(text);
                    i++;
                }
            }
        }
}