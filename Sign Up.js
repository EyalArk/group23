
function person (first,last,DOB){
    this.first = first;
    this.last = last;
    this.DOB = DOB;
}

const person1 = new person('moti','levi', '1.1.1995' )
console.log(person1)
function user (name,email,psw,phone,adress){
    this.name = name;
    this.email = email;
    this.psw = psw;
    this.phone = phone;
    this.adress = adress;
}

const user1 = new user('amit','a@gm.com', '12345', '0521111111', 'TLV')
console.log(user1)

const usersList = document.querySelector('.users');
details_form.addEventListener('submit', (event) => {
    event.preventDefault();

    const li = document.createElement('li');
    li.textContent = JSON.stringify(user);
    usersList.appendChild(li);
});

console.log("Hello, world!");
const details_form = document.querySelector('#details')
const email_input = document.querySelector('#accountEmail')
const psw_input = document.querySelector('#psw')
const name_input = document.querySelector('#name')
const phone_input = document.querySelector('#phone')
const address_input = document.querySelector('#address')
const users_list = document.querySelector('.users')

const on_submit = (e) => {
    e.preventDefault()
    console.log(name_input)
    console.log(email_input)
    console.log(psw_input)
    console.log(phone_input)
    console.log(address_input)

    console.log(name_input.value)
    console.log(email_input.value)
    console.log(psw_input.value)
    console.log(phone_input.value)
    console.log(address_input.value)
}
console.log("check 1!!")
details_form.addEventListener('submit', on_submit)
console.log("check 2!!")



    // if(name_input.value === '' || email_input.value === '' ||psw_input.value === '' ||phone_input.value === ''
    //     ||address_input.value === '' ){
    //     console.log('ERROR!')
    // }else {
    //     console.log('GOOD')
    // }


// const phone_input = document.querySelector('#phone')
// const phoneInput = document.getElementById('phone');
// console.log("checkkk1!!!");
// //console.log(phoneInput.value);
// //console.log(phoneInput);
// console.log(phone_input);
// console.log(phone_input.value);



//
// // Add an event listener to the input field to validate the input
// phoneInput.value.addEventListener('input', (event) => {
//     console.log("check2!!!");
//     const input = event.target.value;
//     const isValid = /^\d+$/.test(input);
//     console.log("check3!!!");
//
//
//     // If the input is invalid, set a custom error message
//     if (!isValid) {
//         console.log("Hello, not work!!!");
//         phoneInput.setCustomValidity('Please enter only numbers');
//     } else {
//         console.log("Hello, work!!!");
//         phoneInput.setCustomValidity('');
//     }
// });
