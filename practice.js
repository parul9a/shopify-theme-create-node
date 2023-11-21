const person = {
  name: "parul",
  age: 27,
  dob: "18/11/1995",
  hobby() {
    console.log(this.name + " loves to dance");
  },
};
// console.log(person.hobby());

// Spread Operator
const copiedPerson = { ...person };
// console.log(copiedPerson);
// Spread Operator

//Rest Operator
const showData = (...args) => {
  return args;
};
// console.log(showData("Dance", "Singing"));
//Rest Operator

//Destructiurng
const personData = {
  name: "parul",
  age: 27,
  dob: "18/11/1995",
  hobby() {
    console.log(this.name + " loves to dance");
  },
};
const { name, age } = personData;
// console.log("name", name);
// console.log("age", age);

const hobbies = ["Sports", "Cooking"];
const [hobby1, hobby2] = hobbies;
// console.log("hobby1: ", hobby1);
// console.log("hobby2: ", hobby2);
//Destructiurng

// Async Code

// In Node js and Js, Syncronous code will be executed first and then async code.
// Async call
setTimeout(() => {
  console.log("Timer is Done");
}, 1);
// Sync call
console.log("Hello");
console.log("Hi");

// Async Code
