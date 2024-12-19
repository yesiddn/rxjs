// hay tres operadores de distinción que permiten comparar valores y restringirlos dependiendo de si se repiten o no
// distinct -> solo emite los valores no repetidos -> [1, 2, 2, 1, 3] -> [1, 2, 3]
// distinctUntilChanged -> solo emite los valores no repetidos consecutivos (que no son iguales al anterior) -> [1, 2, 2, 1, 3] -> [1, 2, 1, 3]
// distinctUntilKeyChanged('a') -> solo emite los valores no repetidos consecutivos de una propiedad específica (como el anterior pero con propiedades) -> [{a: 1}, {a: 2}, {a: 2}, {a: 1}, {a: 3}] -> [{a: 1}, {a: 2}, {a: 1}, {a: 3}]

import { distinct, distinctUntilChanged, distinctUntilKeyChanged, of } from "rxjs";

const repeatedNumbers$ = of(1, 2, 3, 3, 4, 3, 2, 2, 2, 3).pipe(
  distinct(), // no requiere argumentos
);

repeatedNumbers$.subscribe(console.log); // 1, 2, 3, 4

const repeatedNumbers2$ = of(1, 2, 3, 3, 4, 3, 2, 2, 2, 3).pipe(
  distinctUntilChanged(),
);

repeatedNumbers2$.subscribe(console.log); // 1, 2, 3, 4, 3, 2, 3

const repeatedObjects$ = of(
  { a: 1 },
  { a: 2 },
  { a: 3 },
  { a: 3 },
  { a: 4 },
  { a: 3 },
  { a: 2 },
  { a: 2 },
  { a: 2 },
  { a: 3 },
).pipe(distinctUntilKeyChanged('a')); // distinctUntilKeyChanged requiere un argumento que es el nombre de la propiedad

repeatedObjects$.subscribe(console.log); // {a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 3}, {a: 2}, {a: 3}
