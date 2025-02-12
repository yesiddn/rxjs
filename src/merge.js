import { from, fromEvent, interval, map, mergeAll, mergeMap, mergeWith } from "rxjs"

// const onClick$ = fromEvent(document, 'click').pipe(map(event => event.type));
// const onMouseMove$ = fromEvent(document, 'mousemove').pipe(map(event => event.type));

// mergeWith
// este metodo une los observables para generar un solo observable que emite los eventos de los dos obsevables principales
// const eventDocument$ = onMouseMove$.pipe(
//   mergeWith(onClick$)
// );

// eventDocument$.subscribe(value => console.log(`obs: ${value}`));

// const onClick$ = fromEvent(document, 'click');
// const higherOrder$ = onClick$.pipe(map(() => interval(1000)));
// const firstOrder$ = higherOrder$.pipe(mergeAll());
//
// firstOrder$.subscribe(console.log); // por cada click que se haga, se crea un nuevo observable y con mergeAll se unen todos estos observables en uno solo, es como mergeWith pero con muchos obsevables

const letters$ = from(["A", "B", "C"]);

const result$ = letters$.pipe(
  mergeMap(letter => interval(1000).pipe(
    map(
      second => letter + second
    )
  ))
); // mergeMap es un tanto mas complejo de entender, pero lo que se imprimiria en consola seria:
// A0, B0, C0, A1, B1, C1, ...
// Mientras que mergeWith y mergeAll usa los valores por separado, con mergeMap podemos usar los valores de ambos observables para unirlos y generar un nuevo valor
