/*
  Twitter ha sido comprado y quieren eliminar los bots. Te han pedido ayuda para detectar el número de usuarios en su base de datos que tienen datos corruptos.

La base de datos es muy antigua y está en un formato extraño. Los perfiles requieren tener los siguientes datos:

usr: nombre de usuario
eme: email
psw: contraseña
age: edad
loc: ubicación
fll: número de seguidores
Todo está en un fichero donde los datos de usuario son una secuencia de pares `key:value`, que pueden estar en la misma línea o separado por líneas, y cada usuario está separado por un salto de línea. ¡Ojo porque puede estar todo desordenado!

Ejemplo de input:

usr:@midudev eme:mi@gmail.com psw:123456 age:22 loc:bcn fll:82

fll:111 eme:yrfa@gmail.com usr:@codember psw:123456 age:21 loc:World

psw:11133 loc:Canary fll:333 usr:@pheralb eme:pheralb@gmail.com

usr:@itziar age:19 loc:isle psw:aaa fll:222 eme:itzi@gmail.com

El primer usuario SÍ es válido. Tiene todos los campos.
El segundo usuario SÍ es válido. Tiene todos los campos.
El tercer usuario NO es válido. Le falta el campo `age`.
El cuarto usuario SÍ es válido. Tiene todos los campos.

*/


import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

// Use the dirname with es modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the users.txt file
const usersText = await fs.readFile(path.join(__dirname, 'users.txt'), 'utf-8')
  .then(response => response)
  .catch(err => console.log(err));

const realUsers = getTwitterRealUsers(usersText);
console.log(`Real twitter users => ${realUsers.length}`);
console.log(`Last real user => ${realUsers[realUsers.length-1]}`);

function getTwitterRealUsers(input) {
  const props = ['usr', 'eme', 'psw', 'age', 'loc', 'fll'];
  const realUsers = input.split('\n\n').filter(user => {
      if(!user) return false;
      const properties =  [...new Set([...user.matchAll(/(\w+):/gi)].map(match => match[1]))];
      if(properties.length < props.length) return false;
      const countProps = properties.reduce((acum, prop) => {
        if(props.includes(prop)) acum +=1;
        return acum;
      }, 0)
      return countProps === props.length;
  });
  return realUsers;
}
