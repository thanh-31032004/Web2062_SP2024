const whereAmI = function(lat,lng){
    fetch(`http://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res =>{
        if (!res.ok) throw new Error(`Problem width geocoding ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);
        return fetch(`http://restcountries.eu/rest/v2/name/${data.country}`);

    })
    .then(response => {
        if (!res.ok)
        throw new Error(`Country not found (${response.status})`);
        return res.json();

    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));

};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
