

// 97 to 122

const URLFILE = 'https://codember.dev/encrypted.txt';
const messageEncrypted = await fetch(URLFILE)
                        .then(data => data.text())
                        .catch(err => console.error(err));

const messageDecrypted = decipherMessage(messageEncrypted);
console.log(messageDecrypted);

function decipherMessage(message) {

  const wordsEncrypted = message.split(' ');

  const wordsDecrypted  = wordsEncrypted.map(word => {
    const hexNumbers = [];
    let index = 0;

    while(index < word.length) {
     const hexNum = Number(word.slice(index, index + 2));
     if(hexNum  > 96 && hexNum < 100) {
      hexNumbers.push(hexNum);
      index += 2;
      continue;
     }

     hexNumbers.push(Number(word.slice(index, index + 3)));
     index += 3;
    }
    return String.fromCharCode(...hexNumbers);
  });

  return wordsDecrypted.join(' ');
}
