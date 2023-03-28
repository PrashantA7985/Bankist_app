"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// DIFFERENT DATA! Contains movement dates, currency and locale
const account1 = {
  owner: "Prashant Singh",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-12-01T17:01:17.194Z",
    "2022-12-06T23:36:17.929Z",
    "2022-12-08T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Ananya Tiwari",
  movements: [2500, 400, -260, 830, -4210, 2200, 4600, -70],
  interestRate: 1.8,
  pin: 2222,

  movementsDates: [
    "2019-11-03T13:15:33.035Z",
    "2019-11-25T09:48:16.867Z",
    "2019-12-16T06:04:23.907Z",
    "2020-01-12T14:18:46.235Z",
    "2020-02-25T16:33:06.386Z",
    "2020-04-11T14:43:26.374Z",
    "2020-06-15T18:49:59.371Z",
    "2020-07-30T12:01:20.894Z",
  ],
  currency: "BDT",
  locale: "en-US",
};

const account3 = {
  owner: "Rohit  Sharma",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2, account3];
// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
const wronginput=document.querySelector(".temp");
const displaynya=document.querySelector(".wrong");
const body=document.querySelector(".x")

// ////////////////////////////
  //  1.Timing function
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date1 - date2) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

//////////////////////////
//2.  Currency internationalization
// const formatCur = function (value, local, currency) {
//   return new Intl.NumberFormat(local, {
//     style: "currency",
//     currency: currency,
//   }).format(value);
// };

/////////////////////////////////////////////////
//  ///Displaying the movements
// const displayMovements = function (acc, sort = false) {
//   containerMovements.innerHTML = "";

//   const movs = sort
//     ? acc.movements.slice().sort((a, b) => a - b)       
//     : acc.movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? "deposit" : "withdrawal";
//     // const date = new Date(acc.movementsDates[i]);
//     // const displayDate = formatMovementDate(date, acc.locale);
//     // const formatedMov = formatCur(mov, acc.local, acc.currency);

//     const html = `
//     <div class="movements__row">
//       <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//       <div class="movements__date">${displayDate}</div>
//       <div class="movements__value">${formatedMov}</div>
//     </div>
//     `;

//     containerMovements.insertAdjacentHTML("afterbegin", html);
//   });
// };


const displayMovements = function(acc,sort=false){
  containerMovements.innerHTML="";
  //   const movs = sort
//     ? acc.movements.slice().sort((a, b) => a - b)       
//     : acc.movements;
let movs;
if(sort){
movs=acc.movements.slice().sort(function(a,b){
    console.log(a-b);
      if(a-b>=1)return 1;
      else return -1;
})
}
else {
  movs=acc.movements;
}

  movs.forEach(function(mov,i){
       
    const type=mov>0? 'deposit':'withdrawal';

    const html=` <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    
    <div class="movements__value">${mov} Rs</div>
  </div>`;

  containerMovements.insertAdjacentHTML('afterbegin',html);
  });
}





// display labelBalance

const calcDisplayBalance= function(acc){
      acc.balance=acc.movements.reduce(function(acc,item){
        return acc+item;
      },0);
      // console.log(acc.balance);
      labelBalance.textContent=`${acc.balance} Rs`;

}



// /////////////////////////////////////////////////
// /Display balence
// const calcDisplayBalance = function (acc) {
//   acc.balence = acc.movements.reduce((acc, mov) => acc + mov, 0);
//   labelBalance.textContent = formatCur(acc.balence, acc.local, acc.currency);
// };

// /////////////////////////////////////////////////
///Displaying summary
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumIn.textContent = formatCur(incomes, acc.local, acc.currency);
  labelSumIn.textContent=`${incomes} Rs`; 

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  // labelSumOut.textContent = formatCur(Math.abs(out), acc.local, acc.currency);
  labelSumOut.textContent=`${Math.abs(out)} Rs`; 
  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposite) => (deposite * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  // labelSumInterest.textContent = formatCur(interest, acc.local, acc.currency);
  labelSumInterest.textContent=`${interest} Rs`; 
};



// Displaying summary by me

// const displaysummary=function(acc){
//    var temp=acc.movements.slice();
//   const total=temp.filter(item =>
//     item>=0).reduce((acc,item) =>
//        acc+item,0)
//        labelSumIn.textContent=`${total} Rs`; 
//        acc.balance=total;
//       //  var temp=arr.slice();
//        const negtotal=temp.filter(item =>
//         item<0).reduce((acc,item) =>
//            acc+item,0)
//            labelSumOut.textContent=`${Math.abs(negtotal)} Rs`;
          

// }


// /////////////////////////////////////////////////
// ///Creating usernames
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
// console.log(account1);
createUserName(accounts);
/*
const nam= {
  owner: "Prashant Kumar Singh",
}


const temp=nam.owner.toLowerCase();
console.log(temp);   ----  prashant kumar singh
const x=temp.split(" ");
console.log(x);       ------->["prashant", "kumar", "singh"]
const c=x.map(function(name){
   return name[0];  ------>['p','k','s']
})
console.log(c.join(''));   ------> pks

///  accounts array ke saare object me ek nya element username add ho jayega with 
// for examaple     agar owner ka naaam Prashant Singh h 
// to username ='ps'; 

*/

// createUserName(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc);

  //Display balence
  calcDisplayBalance(acc);

  //Display summery
  calcDisplaySummary(acc);
};

/////////////////////////
// Timer function
// const startLogOutTimer = function () {
//   const tick = function () {
//     //In each call pring the remaining time in the UI
//     const min = String(Math.trunc(time / 60)).padStart(2, 0);
//     const sec = String(time % 60).padStart(2, 0);

//     labelTimer.textContent = `${min}:${sec}`;

//     //When 0 seconds, stop timer and logout
//     if (time === 0) {
//       clearInterval(timer);

//       containerApp.style.opacity = "0";
//       containerApp.style.visibility = "hidden";
//     }

//     //Decrease 1s
//     time--;
//   };

//   //set time to 5 minures
//   let time = 60 * 5;

//   //call the timer ever second
//   tick();
//   const timer = setInterval(tick, 1000);
//   return timer;
// };

//Event handlers
let currentAccount, timer;

btnLogin.addEventListener("click", function (e) {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
    
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0] 
    }!`;

    containerApp.style.visibility="visible";
    containerApp.style.opacity=1;
    // displaynya.style.opacity=0;
    // displaynya.style.display="none";
    

    // const options = {
    //   hour: "numeric",
    //   minute: "numeric",
    //   day: "numeric",
    //   month: "numeric",
    //   year: "numeric",
    // };
    // const now = new Date();
    // labelDate.textContent = new Intl.DateTimeFormat(
    //   navigator.language,
    //   options
    // ).format(now);

    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hour = `${date.getHours()}`.padStart(2, 0);
    // const minute = `${date.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;

    //Clear the inputs fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // if (timer) {
    //   clearInterval(timer);
    // }
    // timer = startLogOutTimer();
    // //Updating the UI
    updateUI(currentAccount);
  //   displayMovements(currentAccount);
  // displaybalance(currentAccount);
  // displaysummary(currentAccount);
  // console.log(currentAccount);
  }
  else {
    wronginput.style.opacity=0;
    wronginput.style.display="none";
    containerApp.style.display = "none";
    containerApp.style.opacity = 0;
    displaynya.style.opacity=1;
    displaynya.style.display="block";
    // window.location.href="/index.html"

    
  }
  

});

//////////
//Balence transfering
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc=accounts.find(function(acc){
    return acc.username===inputTransferTo.value;
  })
  // const receiverAcc = accounts.find(
  //   (acc) => acc.username === inputTransferTo.value
  // );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    ////////////////////////
    // //add treansfer date
    // currentAccount.movementsDates.push(new Date().toISOString());
    // receiverAcc.movementsDates.push(new Date().toISOString());

    // //Resetting the timer
    // clearInterval(timer);
    // timer = startLogOutTimer();

    //Updating ui
    updateUI(currentAccount);
  }
  else{
    if(currentAccount.balance < amount)alert("Low Balance");
    else alert("Acount Doesn't Exist");
  }
});

////////////////////////
//Taking Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  setTimeout(() => {
    if (
      amount > 0 &&
      currentAccount.movements.some((mov) => mov >= (amount * 10) / 100)
    ) {
      currentAccount.movements.push(amount);

      ////////////////////////
      //add treansfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      //Resetting the timer
      clearInterval(timer);
      timer = startLogOutTimer();

      //Updating ui
      updateUI(currentAccount);
    }
  }, 1000);
  inputLoanAmount.value = "";
});

////////////////////////
//Closing the account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    const arr=accounts[index];
    accounts.splice(index, 1);

    containerApp.style.opacity = "0";
    containerApp.style.visibility = "hidden";
    accounts.push(arr);
  }
  inputCloseUsername.value = inputClosePin.value = "";
});

///////////////////////
//Sorting macanism
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

















// 'use strict';

// // Data
// const account1 = {
//   owner: 'Prashant',
//   movements: [200, 450, -400, 25000, -642.21, -133.9, 79.97, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,

 
// };
// const account2 = {
//   owner: 'Naveen',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,

 
// };
// const account3 = {
//   owner: 'Vishal ',
//   movements: [200, -200, 150, 300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,

 
// };
// const account4 = {
//   owner: 'Anshdeep',
//   movements: [100, -300, 1500, 1000, -2030, 505, 230, -200],
//   interestRate: 1,
//   pin: 4444,

 
// };


// const ar=[3,5,2,12,7];
// const a=[4,1,15,8,3];
// const nya_arr=ar.slice(1,-2);

// a.forEach(function(item){
//      nya_arr.push(item);
// })
// console.log(nya_arr); 
// nya_arr.forEach(function(item,i){
//     const x=item>=3?'adult':'puppy';
//     const s=`Dog ${i+1} is ${x}.`
//     console.log(s);
// })


// const a=[5,2,4,1,15,8,3];
// const b=[16,6,10,5,6,1,4];

// const challenge=function(arr){
//    const x=   arr.map(function(item){
//         if(item<=2)return 2*item;
//         else return 16+item*4;
//       })
//       console.log(x);

//       const y=x.filter(function(item){
//           return item>=18;
//       })
//       console.log(y);
//       const z=arr.reduce(function(acc,item){
//               return acc+item;
//       })
//       console.log(z);
// }
// challenge(a);
// solve(dogs[0]);
// console.log(dogs[0]);

// const solve=function(arr){
//   const poison=arr.forEach(function(arr,i){
//     console.log([i].weight);
//     // const temp=Number(arr[i].weight)*28;
//     // return temp;
//   })
// }



const dogs=[
  {
  weight :22,
curfood: 250,
owners: ['Alice', 'bob']
},
{
  weight :8,
curfood: 200,
owners: ['Matilda']
},
{
  weight :32,
curfood: 340,
owners: ['Michael']
}
]



const solve=function(arr){
  const poison=arr.forEach(function(arr){
    // console.log(arr.weight);
    // // const temp=Number(arr[i].weight)*28;
    // // return temp;
    arr.poison=arr.weight**0.75*28;
  })
}
solve(dogs);

console.log(dogs);




    
 


 