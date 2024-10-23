/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const studentsPerPage = 9;

//Element selectors
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('.header');

//Dynamically creates search box and insert/appends to the header
let searchHTML = "";
searchHTML += `<label for="search" class="student-search">
            <span>Search by name</span>
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
         </label>`;
header.insertAdjacentHTML('beforeend', searchHTML);
const userSearch = document.querySelector('#search');

/*
Search event listener
Searches data array names for user input then pushes to search array
If any results found
   Run showPage and addPagination with search array
Else
   Display 'No results'
*/
userSearch.addEventListener('keyup', (e) => {
   userInput = e.target.value.toLowerCase();
   let searchArray = [];
   for ( let i = 0; i < data.length; i++ ) {
      let name = data[i].name.first + " " + data[i].name.last;
      if( name.toLowerCase().includes(userInput) ) {
         searchArray.push(data[i]);
      }
   }
   
   if(searchArray.length >= 1){
      showPage(searchArray,1);
      addPagination(searchArray);
   } else {
      const html = `<div class="no-results"><h2>No results</h2></div>`;
      studentList.innerHTML = html;
      linkList.innerHTML = "";
   }
})

/*
showPage function
This function will create and insert/append the elements needed to display a "page" of nine students
@param {list} - Data array of students
@param {number} - Current pagination page
*/
function showPage(list, page) {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = (page * studentsPerPage) - 1;
   studentList.innerHTML = "";
   let html = "";
   for( let i = 0; i < list.length; i++ ) {
      if(i >= startIndex && i <= endIndex) {
         html +=`<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
           <h3>${list[i].name.first + ' ' + list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">${list[i].registered.date}</span>
         </div>
       </li>`;
      }
   }
   studentList.insertAdjacentHTML('beforeend', html);
}

/*
`addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
@param {list} - Data array of students
*/
function addPagination(list) {
   const numOfPages = Math.ceil(list.length / studentsPerPage);
   linkList.innerHTML = "";
   let html = "";
   for( let i = 1; i <= numOfPages; i++ ) {
      html += `<li>
            <button type="button">${i}</button>
          </li>`;
   }
   linkList.insertAdjacentHTML('beforeend', html);
   document.querySelector('.link-list li button').className = 'active';

   linkList.addEventListener('click', (e) => {
      const button = e.target;
      if(button.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         button.className = "active";
         showPage(list, button.textContent);
      }
   });
}

// Call functions
showPage(data,1);
addPagination(data);