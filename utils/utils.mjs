import fs from 'fs/promises';

export async function readDataFromFile(inputFile) {
  try {
    const dataFile = await fs.readFile(inputFile, 'utf-8')
    return dataFile;
  } catch (error) {
    console.error('Something gone wrong')
    console.log(error)
    return '';
  }
}
