/* Variables - containers that store values */

var name // a declared variable, but not initialized (no value) and it's in the global scope (BAD)

let foo // a declared variable that can be changed

const bar = 'Bar' // a declared variable that cannot be changed - short for 'constant'

// '=' is the assignment operator, read it as "is assigned the value of..."

const ANSWER = 42

// String

let string1 = "Hello World"

let string2 = 'Hello Utah!'

let string3 = new String("Hello New World!")

// Numbers

let myNum = 1234567

let myNum2 = 12

"1" == 1 // true, because of type coercion and loose equality checking
"1" === 1 // false, because this is strict equality checking

// Boolean

let myBool = true

// Array

let myArray = [] // this is an empty array

//              0     1      2       3      4   
let myArray2 = [42, "Bob", myBool, ANSWER, true]

let secondElement = myArray2[1];

let lastItem = myArray2[myArray2.length - 1];

myArray2.push("Thor"); // added an element to the end of myArray2

myArray2.unshift("Hello World!");

let myLongString = 
    "hahahahahahahahahahahahahahahahahahahahahahahaha";

myLongString.length;

// Object

let minObject = {};

const myCar = {
    make: "Tayota",
    color: "Red",
    year: "2005",
    vin: "12345678910111213141516171819"
};

myCar.numDoors = 4;

const anotherObject = {
    wordz: ["foo", "bar", "baz"],
    car: {
        make: "Volkswagon",
        model: "beetle"
    },
    awesome: true
};

// Functions

function myFunction() {
    return "My greeting to you...";
}

function sumTwoThings(one, two) {
    return one + two;
}
