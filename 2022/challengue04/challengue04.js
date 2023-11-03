/*
- It's a 5-digit password.
- The password has the number 5 repeated at least two times.
- The number to the right is always greater than or equal to the one on the left.

He says that the password is between the numbers 11098 and 98123

*/


import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

// Use the dirname with es modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const initMIN = 11098;
const initMAX = 98123;

// Optimized range
const MIN = 11155;
const MAX = 55999;


const possiblePass = getFulfillPasswords2();
console.log(possiblePass);
console.log(`Possibles passwords: ${possiblePass.length}
Password at 55 index is ${possiblePass[55]}
`);
await fs.writeFile(path.join(__dirname, 'passwords.txt'), possiblePass.join('\n'));



function getFulfillPasswords(){
  const possiblePasswords = [];

  for (let i = MIN; i < MAX; i++) {
    const numAsString = i.toString();
    const isIncreasing = numAsString.split('').sort().join('') === numAsString;
    const atLeastTwoFives = [...numAsString.matchAll(/5/g)].length >= 2;


    if(isIncreasing && atLeastTwoFives) possiblePasswords.push(i);
  }
  return possiblePasswords;
}


function getFulfillPasswords2() {
  const rangeArray = Array.from({length: MAX-MIN + 1}, (_, i) => i+MIN);
  return rangeArray.filter(pass => {
    const numAsString = pass.toString();
    const isIncreasing = numAsString.split('').sort().join('') === numAsString;
    const atLeastTwoFives = [...numAsString.matchAll(/5/g)].length >= 2;

    return isIncreasing && atLeastTwoFives;
  });
}
