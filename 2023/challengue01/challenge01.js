/*
A spy is sending encrypted messages.

Your mission is to create a program that decodes the messages.

The messages are words separated by spaces like this:
cat dog dog car Cat doG sun

We need the program to return the number of times each word appears in the message, regardless of whether it is in uppercase or lowercase.

The result will be a text string with the word and the number of times it appears in the message, in this format:
cat2dog3car1sun1

The words are sorted by their first appearance in the message!

** More Examples: **
keys house HOUSE house keys -> keys2house3
cup te a cup -> cup2te1a1
houses house housess -> houses1house1housess1

*/

import { readDataFromFile } from '../../utils/utils.mjs'
const FILENAME = 'input.txt'
const inputFile = new URL(FILENAME, import.meta.url)

const encryptedData = await readDataFromFile(inputFile)

const encryptedCounter = encryptedData.toLowerCase().split(' ').reduce((obj, item) => {
  obj.hasOwnProperty(item) ? obj[item] += 1 : obj[item] = 1;
  return obj;
}, {})

const decodeText = Object.entries(encryptedCounter).flat().join('')

console.log(
  `The decode soulution is:\n${decodeText}`
)