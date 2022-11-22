


const zebra = async () => {
  const colors = await fetch('https://codember.dev/colors.txt')
                .then(response => response.json())
                .catch(err => console.log(err));

  const {count, lastColorIndex} = getLongestZebra(colors);;
  console.log(`Cout of ${count} zebra colors and the last color of this list is ${colors[lastColorIndex]}`)
}

zebra();

function getLongestZebra(colors) {

  let colorIndex = colors.findIndex((color, index) => color !== colors[index + 1] && colors[index + 1]);
  if(colorIndex < 0) return {lastIndexColor: colors.length - 1,count: 1};

  let count = 2;

  const dataLongest = colors.reduce((acum, color, index, self) => {
    if(index < colorIndex + 2) return acum;
    if(color === self[index - 2]) {
      count += 1;
      if(count > acum.count) {
        acum.count = count;
        acum.lastColorIndex = index;
      }
      return acum;
    }
    count = 2;
    return acum;

  }, {
    count: 2,
    lastColorIndex: colorIndex + 1
  });

  return dataLongest;
}
