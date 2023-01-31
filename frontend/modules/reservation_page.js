import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
 let res= await fetch(`${config.backendEndpoint}/reservations`)
 let data= await res.json();
//  console.log(data);
 return data
  } catch (err){
  return null;
 };
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table.
  if(reservations.length>0){
    document.getElementById('no-reservation-banner').style.display="none";
    document.getElementById('reservation-table-parent').style.display="block"
  console.log(reservations);
  let tbody=document.getElementById('reservation-table');
 reservations.forEach(element => {
   let d_temp=new Date(`${element.date}`)
    let d=`${ d_temp.getDate()}/${d_temp.getMonth()+1}/${d_temp.getFullYear()}`;
    
    let t_temp=new Date(`${element.time}`);
    let t_date = new Date(Date.UTC(t_temp.getFullYear(),t_temp.getMonth() , t_temp.getDate(),t_temp.getHours(),t_temp.getMinutes(),t_temp.getSeconds(),t_temp.getMilliseconds() ));
    let time_date=new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'UTC'}).format(t_date)
    let t_time=new Intl.DateTimeFormat('en-IN', { timeStyle: 'medium', timeZone: 'UTC'}).format(t_date)
    let newtime=`${time_date}, ${t_time}`;
    console.log(newtime);
    let tr=document.createElement('tr');
  tr.innerHTML=`
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.adventureName}</td>
                        <td>${element.person}</td>
                        <td>${d}</td>
                        <td>${element.price}</td>
                        <td>${newtime}</td>
                        <td id="${element.id}"> <a href="../detail/?adventure=${element.adventure}"><button class="reservation-visit-button">Visit Adventure</button></a>  </td>
                     `
                     tbody.append(tr);
});
  }else if(reservations.length==0){
    document.getElementById('no-reservation-banner').style.display="block";
    document.getElementById('reservation-table-parent').style.display="none";
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
