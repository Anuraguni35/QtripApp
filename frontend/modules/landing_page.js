import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
  
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let res= await fetch(`${config.backendEndpoint}/cities`);
  console.log(res);
  let data= await res.json();
  document.getElementById('loading').classList.remove('show');
  return data;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data=document.getElementById('data');
  let div=document.createElement('div');
  div.className="col-6 col-lg-3 mb-4";
  div.innerHTML=`<a href="./pages/adventures/?city=${id}" id="${id}" index.html ">
                    <div class="tile">
                        <img src="${image}" alt="">
                           <div class="tile-text text-center">
                                  <h5>${city}</h5>
                                   <p>10${description}</p>
                               </div>
                      </div>
                  </a>`
  

data.appendChild(div);

}

export { init, fetchCities, addCityToDOM };
