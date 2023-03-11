function getMenDataFromJson() {
    fetch('./data.json')
        .then(function (response) { return response.json() })
        .then(function (data) { getMensData(data); })
        .catch(function (err) { console.log('error' + err); })
    
}

function getWomenDataFromJson() {
    fetch('./data.json')
        .then(function (response) { return response.json() })
        .then(function (data) { getWomensData(data); })
        .catch(function (err) { console.log('error' + err); })
}

function getMensData(data){
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
function getWomensData(data) {
    let i = 1;
    for (let productName in data) {
        console.log("HERE")
        if (productName == "Womens_Shoes") {
            for (let element of data[productName]) {
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