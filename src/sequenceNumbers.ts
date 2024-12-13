// interval and timer are used to generate sequence numbers

import { interval, timer } from "rxjs";

const sequenceNumbers$ = interval(1000); // emite una secuencia de numeros (0, 1, 2) cada 1 segundo
const delayedTimer$ = timer(5000); // emite un solo valor despues de 5 segundos, es bueno para ejecutar una accion despues de un tiempo, por ejemplo, reintertar una petición http que haya fallado

sequenceNumbers$.subscribe(console.log);
delayedTimer$.subscribe(console.log);

