const users = await fetch('https://codember.dev/mecenas.json').then(response => response.json());

const survivor = getLastSurvivor(users.slice(0, 111));
console.log({ survivor });

function getLastSurvivor(users) {
  let copyUsers = [...users.keys()];

  while (copyUsers.length !== 1) {
    const prevLength = copyUsers.length;
    copyUsers = copyUsers.filter((_, index) => (index + 1) % 2);
    if (prevLength % 2 && copyUsers.length !== 1) copyUsers.shift();
  }
  // let pair = true;

  // while (copyUsers.length !== 1) {
  //   console.log(copyUsers);
  //   copyUsers = copyUsers.filter(() => !(pair = !pair))
  // }

  const [indexSurvivor] = copyUsers;
  return {
    index: indexSurvivor,
    nameSurvivor: users[indexSurvivor]
  };

}


// function getLastSurvivor(users){
//   const copyUsersIndex = [...users.keys()];

//   while()


// }

