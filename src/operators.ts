// los operadores creacionales son aquellos que nos permiten crear observables desde cero como el of, from, interval, etc.
// los operadores pipeable son aquellos que nos permiten transformar los valores emitidos por un observable, como el map, filter, etc.

import { filter, from, map, reduce } from "rxjs"

const numbers$ = from([1, 2, 3, 4, 5]).pipe(
  map(val => val * 10), // se multiplica por 10 cada valor emitido
  map(val => val + 2), // se suma 2 a cada valor emitido
  reduce((acc, val) => acc + val, 0), // se suman todos los valores emitidos)
  filter(val => val > 20) // se filtran los valores mayores a 20
);

numbers$.subscribe(console.log);
