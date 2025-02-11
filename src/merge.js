import { fromEvent, map, mergeWith } from "rxjs"

const onClick$ = fromEvent(document, 'click').pipe(map(event => event.type));
const onMouseMove$ = fromEvent(document, 'mousemove').pipe(map(event => event.type));

// mergeWith
// este metodo une los observables para generar un solo observable que emite los eventos de los dos obsevables principales
const eventDocument$ = onMouseMove$.pipe(
  mergeWith(onClick$)
);

eventDocument$.subscribe(value => console.log(`obs: ${value}`));
