import { fromEvent, takeUntil } from "rxjs";

const onMouseMove$ = fromEvent(document, 'mousemove');
const onMouseDown$ = fromEvent(document, 'mousemove');

// takeUntil detiene el observable onMouseMove cuando se emite un elemento de onMouseDown
const sourceCompleted$ = onMouseMove$.pipe(takeUntil(onMouseDown$));
sourceCompleted$.subscribe(console.log);
