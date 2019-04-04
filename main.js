'use strict'

// using document.getElementbyId to match elements from html file
let elStoreTable = document.getElementById('store-table')
let elForm = document.getElementById('store-form')

// declaring variables for arrays
let hours = ['6am', '7am', '9am', '10am', '11am']
let stores = []

// making a constructor function to add values to the empty array for line 9 later.
let CookieStore = function(name, min, max, sold){
    this.storeName = name
    this.maxCustomers = max
    this.minCustomers=min
    this.cookiesPerCustomer = sold
    this.cookiesSoldPerHour = function(){
        let randomNumber = Math.ceil(Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers)
        return randomNumber * this.cookiesPerCustomer
    }
}

// Making new references so the empty array from line 9 have values inside it. With all the help of the constructor from line 12.
let firstPike = new CookieStore ('1st and Pike', 23, 65, 6)
let seaTac = new CookieStore ('SeaTac Airport', 3, 24, 1)
let seattleCenter = new CookieStore ('Seattle Center', 11, 38, 4)
let capHill = new CookieStore ('Capitol Hill', 20, 38, 2)
let alki = new CookieStore ('Alki', 2, 16, 5)

// now pushing the instances to the empty array from line 9
stores.push(firstPike, seaTac, seattleCenter, capHill, alki)

//TABLE TIME

//New row created for header using createElement - includes column titles
let elHeader = document.createElement('tr')
elStoreTable.appendChild(elHeader)
let elTh = document.createElement('th')
elHeader.appendChild(elTh)
elTh.innerText = 'Store Name'
//loop through our hours array and display each hour as a table header element
for(let i = 0; i < hours.length; i++) {
  let elTh = document.createElement('th')
  elHeader.appendChild(elTh)
  elTh.innerText = hours[i]
}

//Using prototype method with cookiestore constructor to generate new rows for each store and populate the row with the random number returned from our cookiesSoldPerHour prototype method
CookieStore.prototype.renderNewStore = function() {
    let elRow = document.createElement('tr')
    elStoreTable.appendChild(elRow)
    let elTh = document.createElement('th')
    elRow.appendChild(elTh)
    elTh.innerText = this.storeName
    for(let i = 0; i < hours.length; i++) {
      let elTd = document.createElement('td')
      elRow.appendChild(elTd)
      elTd.innerText = this.cookiesSoldPerHour()
    }
  }

  //Now loop through stores array and utilize rendernewstore method to generate a new row on our table
for(let j = 0; j < stores.length; j++) {
    stores[j].renderNewStore()
  }
  
  //access our inputs on our form through dot notation
  let elNameOfStore = elForm.nameOfStore
  let elMinCustomers = elForm.minCustomers
  
  //Event listener created with prevent default to hold for instruction. Event will listen for a submit event and create a new instance of our constructor function using the values collected from our form
  elForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let newStore = new CookieStore(elNameOfStore.value, parseInt(elMinCustomers.value), 65, 4)
    stores.push(newStore)
  
    //Utilize renderNewStore method on our new store to add a new row on our table. 
    newStore.renderNewStore()
  })