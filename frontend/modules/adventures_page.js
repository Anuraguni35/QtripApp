
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

 let ans="";
 for(let i=6;i<search.length;i++){
  ans+=search[i];
 }
 return ans;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
 try{
  let res=await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  let data=await res.json();
  return data;
 }catch(err){
  console.log(err)
  return null;
}
}

function addAdventureToDOM(adventures) {
  console.log(adventures);
  let data=document.getElementById('data');
  adventures.forEach((e) => {
    let div=document.createElement('div');
    div.className=" col-6 col-lg-3 mb-3  adventure-cards ";
    div.innerHTML=`<a href="./detail/?adventure=${e.id}" id="${e.id}">
    
                     <div class="card activity-card ">
                     <div class="category-banner">${e.category}</div>
                          <img class="activity-card-image " src="${e.image}">
            
                             <div class="card-body  text-center d-md-flex justify-content-between">
                                  <div><h5 class="card-title">${e.name}</h5>
                                  <h5 class="card-title m-3">Duration</h5>
                                  </div>
                      
                                   
                                     <div>
                                     <p class="card-text">Rs.${e.costPerHead}</p>
                                     <p class="card-text">${e.duration} hours</p></div>
                               </div>
                    </div>
                        
                    </a>`

 data.append(div);
  });
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let arr=[];
  list.forEach(e=>{
    if(e.duration<=high&&e.duration>=low){
      arr.push(e);
    }
  })
  
  return arr;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let arr=[];let num=0;
  for(let i=0;i<categoryList.length;i++){
    for(let j=0;j<list.length;j++){
      if(categoryList[i]==list[j].category){
        arr.push(list[j]);
      }
    }
  }
  
  return arr;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
 
  if(filters.duration==""&&filters.category.length!=0){
   list=filterByCategory(list,filters.category);
  }
  else if(filters.duration!=""&&filters.category.length==0){
    let duration=filters.duration.split("-");
    let low=parseInt(duration[0]);
    let high=parseInt(duration[1]);
    list=filterByDuration(list, low, high);
  }
  else if(filters.duration!=""&&filters.category.length!=0 ){
    list=filterByCategory(list,filters.category);
    let duration=filters.duration.split("-");
    let low=parseInt(duration[0]);
    let high=parseInt(duration[1]);
    list=filterByDuration(list, low, high);
  }
  
 
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
   let obj=JSON.stringify(filters);
   localStorage.setItem("filters",obj);
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
 let obj= JSON.parse(localStorage.getItem("filters"));
 
  // Place holder for functionality to work in the Stubs
  return obj;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills  
  
  filters.category.forEach(e=>{
    let div=document.createElement('div');
    div.className=` category-filter`;
    div.innerHTML=`${e}`;
    document.getElementById('category-list').append(div);
  });
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
