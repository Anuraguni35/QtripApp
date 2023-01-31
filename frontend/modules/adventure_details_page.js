import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  
    search=search.split("=");
    

  // Place holder for functionality to work in the Stubs
  return search[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  
  try{
   let res=await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
   let data= await res.json();
  //  console.log(data);
   return data;
  }
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventure_name=document.getElementById('adventure-name');
  adventure_name.innerHTML=`${adventure.name}`
  let adventure_subtitle=document.getElementById('adventure-subtitle');
  adventure_subtitle.innerHTML=`${adventure.subtitle}`;
  let photo_gallery=document.getElementById('photo-gallery');
  adventure.images.forEach(element => {
    let div=document.createElement('div');
    div.innerHTML=`<img class="activity-card-image" src="${element}" alt="">`;
    photo_gallery.appendChild(div);
  });
  let adventure_content=document.getElementById('adventure-content');
  adventure_content.innerHTML=`${adventure.content}`;
  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photo_gallery=document.getElementById('photo-gallery');
  photo_gallery.innerHTML="";
  photo_gallery.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="true">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="gallery_container"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
 
images.forEach((e,i)=>{
  let actcls= i===0? 'active':'';
  let photo_container=`
    <div class="carousel-item ${actcls}">
      <img src="${e}" class="d-block w-100 h-100px" height=700px alt="...">
    </div>`
    document.getElementById('gallery_container').innerHTML+=photo_container;
});


  
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let reservation_panel_soldout=document.getElementById('reservation-panel-sold-out');
  let reservation_panel_available=document.getElementById('reservation-panel-available');
  let reservation_person_cost=document.getElementById('reservation-person-cost');
  console.log(adventure);
   if(adventure.available==true){
    reservation_panel_soldout.style.display="none";
    reservation_panel_available.style.display="block";
    reservation_person_cost.innerHTML=`${adventure.costPerHead}`;
   }
   else if(adventure.available==false){
    reservation_panel_soldout.style.display="block";
    reservation_panel_available.style.display="none";
   }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById('reservation-cost').innerHTML=adventure.costPerHead*persons;
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let myForm=document.getElementById('myForm');
  myForm.addEventListener("submit",e=>{
    e.preventDefault();
    let data={
      name:myForm.elements.name.value,
      date:myForm.elements.date.value,
      person:myForm.elements.person.value,
      adventure:adventure.id
    }
   
      let res = fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(data=>{
        if(data.ok){
        alert("Success!");
        window.location.reload();
        }else{
          let res =data.json();
          alert(`Failed - Date of booking is incorrect. Can't book for a past date!`);
          console.log(res);
        }
      }).catch(err=>{
        console.log(err);
        alert("Failed - fetch call resulted in error");
      })

     
      
  });
 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved==true){
    document.getElementById('reserved-banner').style.display="block";
  }else if(adventure.reserved==false){
    document.getElementById('reserved-banner').style.display="none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
