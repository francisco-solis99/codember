/*
Finally, hackers have managed to access the database and have corrupted it. But it seems they have left a hidden message in the database. Can you find it?

Our database is in .csv format. The columns are id,username,email,age,location.

A user is only valid if:

- id: exists and is alphanumeric
- username: exists and is alphanumeric
- email: exists and is valid (follows the pattern user@domain.com)
- age: is optional but if it appears it is a number
- location: is optional but if it appears it is a text string
Examples:

Entry: 1a421fa,alex,alex9@gmail.com,18,Barcelona
Result: ✅ Valid

Entry: 9412p_m,maria,mb@hotmail.com,22,CDMX
Result: ❌ Invalid (id is not alphanumeric, the _ is extra)

Entry: 494ee0,madeval,mdv@twitch.tv,,
Result: ✅ Valid (age and location are optional)
Entry: 494ee0,madeval,twitch.tv,22,Montevideo
Result: ❌ Invalid (email is not valid)

Find the first letter of the username of all invalid users. Gather them in the order of appearance and uncover the hidden message.
*/



import {readDataFromFile} from '../../utils/utils.mjs'

const FILE_NAME = 'input.txt'
const inputFile = new URL(FILE_NAME, import.meta.url)

const usersDbData = await readDataFromFile(inputFile)
const users = usersDbData.split('\n')

const invalidUsers = [];
const validUsers = [];

const isValidUser = (user) => {
  // Using the complete regex
  const regex = /^[a-z-A-Z0-9]+,[a-z-A-Z0-9]+,[\w\d]+@[\w\d]+\.[a-z]+,\d*?,?.*?$/gi;
  return regex.test(user);
};

users.forEach(user => {
  const isValid = isValidUser(user)
  isValid ? validUsers.push(user) : invalidUsers.push(user)
})



const getTheSecretMessage = () => {
  const userNamesFirstLetter = invalidUsers.map(user => {
    const [,userName] = user.split(',');
    return userName[0]
  })
  return userNamesFirstLetter.join('')
}

const message = getTheSecretMessage()
console.log(`Valid Users ✅: ${validUsers.length}\nInvalid Users ❌: ${invalidUsers.length}`)
console.log(`Your secret message is ${message}`)