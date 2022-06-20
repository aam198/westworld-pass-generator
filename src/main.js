
// TODO: Big logo and then scale down to begin password Generator

// TODO: Add onload line to go under h2

// TODO: Add the transition from CodePen for result

// to show the results
const resultEl = document.getElementById('result');
const clipboardEl = document.getElementById('clipboard');
const lengthEl = document.getElementById('length');
const upperEl = document.getElementById('uppercase');
const lowerEl = document.getElementById('lowercase');
const numberEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');


// Random Functions

// Creating an OBJECT to get Random Amount from all of the functions below
// Object that has keys and values from the functions

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}
console.log(randomFunc)


clipboardEl.addEventListener('click', () => {
  const textArea = document.createElement('textarea');
  const password = resultEl.innerText;

  if(!password) {
  // Just return and do nothing
    alert('No password to copy, please select Generate Password');
  }
  else {

    textArea.value = password;

    document.body.appendChild(textArea)
    // Selects everything in the textarea
    textArea.select()
    document.execCommand('copy');
    textArea.remove();

    // Make a toast instead
    alert('Password is copied to the clipboard!');
  }
})


generateEl.addEventListener('click', () => {
  // Adding the + to lengthEl casting into a number instead of a string!
  const length = +lengthEl.value;
  console.log(length);
  // Checking all of the checkboxes, give boolean as result
  const hasLower = lowerEl.checked;
  const hasUpper = upperEl.checked;
  const hasNumbers = numberEl.checked;
  const hasSymbols = symbolsEl.checked;
  console.log(hasLower, hasUpper, hasNumbers, hasSymbols);
  // Sending all the information from the value to another function to actually generate the password 
  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
})

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  // While remaining elements to shuffle
  while (currentIndex != 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // and then swap it with the current element
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

function generatePassword(lower, upper, number, symbol, length) {
  // Empty by start
  let generatedPassword = '';
  // Types count - The count of how many are selected
  const typesCount = lower + upper + number + symbol;
  console.log('this is types count', typesCount);
  
  // putting each into an array and filtering out the ones that are not checked, or False as a value
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
  console.log(typesArr);

  // Send typesArr to shuffle function
  shuffle(typesArr);

  if(typesCount === 0) {
    return '';
  }


  // To create the characters

  for(let i = 0; i < length; i+=typesCount){
    typesArr.forEach(type => {
      console.log(type);

      const randomName = Object.keys(type)
      const prop = randomName[Math.floor(Math.random() * randomName.length)]
      console.log('prop', prop);

      const funcName = Object.keys(type)[0];
      // Randomize the order
      console.log('funName:', funcName);
      generatedPassword += randomFunc[funcName]();
    })
  }

  const finalPassword = generatedPassword.slice(0, length);
  // Which will then get sent back up to resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
  return finalPassword;

}


function getRandomLower() {
  // String object to manipulate characters
  // Math.floor to round down, Math.random() number and multiply the highest number which is 26 and adding 97
  return String.fromCharCode(Math.floor(Math.random() * 26)+  97)
}

console.log('getRandomLower:', getRandomLower())


function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26)+  65)
}

console.log('getRandomUpper:', getRandomUpper())


function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

console.log('getRandomNumber: ', getRandomNumber())

function getRandomSymbol() {
  const symbols = '!@#$%&*(){}[]?~^';
  // To get a random 1 out of one of the symbols above
  return symbols[Math.floor(Math.random() * symbols.length)] 
}

console.log('Random symbol', getRandomSymbol());