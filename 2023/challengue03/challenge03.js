/*
A group of spies has discovered that their message encryption system is compromised.

They have found some passwords that do not comply with theEncryption Security Policy that was established when they were created.

To solve the problem, they have created a list (your entry to the challenge) of passwords (according to the corrupted database) and the security policy when that key was established.

Example of the list:

2-4 f: fgff
4-6 z: zzzsg
1-6 h: hhhhhh
Each line indicates, separated by :, the key policy and the key itself.

The key policy specifies the minimum and maximum number of times a given character must appear for the key to be valid. For example, 2-4 f means that the key must contain f at least 2 times and at most 4 times.

Knowing this, in the previous example, there are 2 valid keys but one is not:

The second key, zzzsg, is not valid; it contains the letter z 3 times, but needs at least 4. The first and third keys are valid: they contain the appropriate amount of f and h, respectively, according to their policies.

** Your challenge: **
Determine how many encryption keys are valid according to their policies.
*/

import { readDataFromFile } from '../../utils/utils.mjs'

const FILENAME = 'input.txt'
const inputFile = new URL(FILENAME, import.meta.url)

const keysInput = await readDataFromFile(inputFile)
const keysList = keysInput.split('\n');

const [validList, invalidList] = depurateKeyLists(keysList)

// Answers
console.log(validList.length) // 21
console.log(invalidList.length) // 479
console.log(invalidList[41]) // bgamidqewtbus
console.log(invalidList[12]) // nljzuyfzb

// Function to valid the encryption of the keys according to the rules, returns true or false
function isValidEncryptKey({key, letter, times}){
  let counter = 0;
  [...key].forEach(itemLetter => {
    if(itemLetter === letter) counter +=1;
  })
  if(counter >= times.min && counter <= times.max) return true;
  return false
}

// Function that return two lists, one with valid keys according to the encryptation rules and other with does not
function depurateKeyLists(keysList){
  const validKeysList = []
  const invalidKeysList = []

  keysList.forEach(item => {
    const [nums, letter, key] = item.split(' ')
    const [min, max] = nums.split('-')

    if(isValidEncryptKey({
      key,
      letter: letter.slice(0, letter.length - 1),
      times: {min, max}
    })) {
      validKeysList.push(key);
      return;
    }
    invalidKeysList.push(key)
  })

  return [validKeysList, invalidKeysList]
}