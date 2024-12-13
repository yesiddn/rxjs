// of, from y asyncSchedulers

import { asyncScheduler, from, of } from "rxjs";

const fruitsOf$ = of('apple', 'banana', 'cherry'); // emite los valores de uno en uno que se le pasen como parametro

const fruitsFrom$ = from(['apple', 'banana', 'cherry']); // emite los valores de uno en uno de un array
const fruitsFromAsyncScheduler$ = from(['apple', 'banana', 'cherry'], asyncScheduler); // asyncScheduler es un scheduler que permite emitir los valores de uno en uno, pero con la diferencia de que aplica un delay, como si de un setTimeout se tratara. Esta funcion envia los datos al event loop queue

fruitsOf$.subscribe(console.log); // se le puede pasar tanto un next como una funcion
fruitsFrom$.subscribe(console.log); // a from tambien se le puede pasar un next o una funcion
fruitsFromAsyncScheduler$.subscribe(console.log); // ejecuta de forma asincrona los valores del array
