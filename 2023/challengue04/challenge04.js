/*

En un mundo donde la información es poder, un hacker conocido como Savipo Yatar descubre una serie de archivos en un servidor altamente protegido.

Estos archivos contienen secretos que podrían cambiar el curso de la historia. Pero hay un problema: algunos de los archivos son falsos, diseñados para engañar a los intrusos. Savipo Yatar debe determinar rápidamente cuáles archivos son reales y cuáles son falsos.

Cada archivo tiene un nombre con dos partes, separadas por un guion (-). La primera parte es una cadena alfanumérica y la segunda es unchecksum, que es una cadena formada por los caracteres que sólo aparecen una vez en la primera parte y en el orden en que aparecen.

Escribe un programa que determine si un archivo es real o falso basado en estas reglas.

Ejemplos:

Nombre del archivo: xyzz33-xy
Resultado: ✅ Real (El checksum es válido)

Nombre del archivo: abcca1-ab1
Resultado: ❌ Falso (El checksum debería ser b1, es incorrecto)

Nombre del archivo: abbc11-ca
Resultado: ❌ Falso (El checksum debería ser ac, el orden es incorrecto)
Cada línea indica el nombre del archivo y su correspondiente checksum, separados por un guion (-).

* */

import { readDataFromFile } from '../../utils/utils.mjs';

const FILE_NAME = 'input.txt';
const inputFile = new URL(FILE_NAME, import.meta.url)

const filesData = await readDataFromFile(inputFile)
// const filesDataArr = ['xyzz33-xy', 'abcca1-ab1', 'abbc11-ca']
const filesDataArr = filesData.split('\n')

const realFiles = filesDataArr.filter(file => {
  const [part1, part2 ] = file.split('-')
  const stringSet = [...new Set(part1)]
  const uniqueCharacters = stringSet.filter(char => {
    const regex = new RegExp(`${char}`, 'g')
    return part1.match(regex).length === 1;
  })
  return uniqueCharacters.join('') === part2
})

// Answers
console.log(realFiles) // the real files
console.log(realFiles.length) // 100
console.log(realFiles[32]) // 33th real file