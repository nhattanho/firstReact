/* person.js */
const person = {
    name: 'Davis'
}

export default person;

/* work.js */
export const clean = {
    time: 9
}


/* application.js */ // we import the modules from person.js and work.js files
import person from './person.js'
import ps from './person.js' // because in person.js, we export the module with default person, so
// in the receiving file, we can name the file with whatever we want, like person or ps are just fine

import { clean } from './work.js' // because in work.js, we export the const clean, so in the receiving
// file, we have to keep the same name as original file and this name will be put in {...}

// Besides, if we want to change the name of clean to the other name, we can do like:
import { clean as newClean } from './work.js' // ==> the clean in original will have the new name in receiving
// file

// We also import everything from the original file to receiving file by:
import * as allProperties from './work.js' // so everything in file work.js will be imported in application.js
// file with the brief name now is allProperties
///////////////////////////////////////////////////////////////////////////////////
//for class
class Name = {
    /////
}

export default Name;

//OR
export default class Name = {
    /////
}

//=> import Name from './path' ==> because we added the default keyword
//////////////////////////////////////////////////////////////////////////////////////
export class Name {
    //
}

//==> import { Name } from './path' ==>because class is also an object

//////////////////////////////////////////////////////////////////////////////////////
export function Test() {
    //.....
}
//==> import { Test } from './path' ==> because function Test is also an object


export default function Test() {

}
//==> import Test from './path'