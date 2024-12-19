/** ⏰ Los operadores de tiempo nos ayudan a gestionar cómo y con qué frecuencia entregamos valores.
 * Hay muchos operadores de esta clase en RxJS, en esta clase te introduzco 4 de ellos:
 * debounceTime(20): Emite un valor del observable solo después de que haya pasado un tiempo específico sin emisiones. -> Ignora todos los valores y cuando pasa un intervalo de tiempo sin valores, emite el ultimo de esos valores -> [a, , b,c, , , d] -> [ , a, , c, , d] -> https://rxjs.dev/api/operators/debounceTime
 *
 * throttleTime(fn: { leading: true, trailing: true}): Emite un valor del observable solo después de que haya pasado un tiempo específico sin emisiones, pero ignora los valores que se emiten durante ese tiempo. -> Emite el primer valor que se origine y omite todos los valores que se originen en un intervalo de tiempo -> [a, , x,y, , , b, , x, , c, x, x, x] -> [a, , , y, , , b, , x, , c, , , x] -> https://rxjs.dev/api/operators/throttleTime
 *
 * auditTime(50): Cuando la fuente emite un valor, lo ignora y sus siguientes emesiones durante N milisegundos, luego emite el valor mas reciente -> Emite el ultimo valor que haya salido en un intervalo de tiempo -> [a, b, c, , , b, , x, c, x] -> [ , , c, , , , , x] -> https://rxjs.dev/api/operators/auditTime
 *
 * sampleTime(70): Muestrea la fuente Observable durante un intervalo y retorna lo ultimo de esa muestra. -> Es como un setInterval, emite el ultimo valor que se haya originado en un intervalo que se reinicia automaticamente -> [a, b, c, , , d, e, , f, g, h] -> [ , , c, , , , e, , , , h] -> https://rxjs.dev/api/operators/sampleTime
 */
//¿Por qué son importantes los operadores de tiempo? 🔃 Imagina que necesitamos consultar a una API por unos valores que tenemos. Si son muchos valores corremos el riesgo de utilizar muchos recursos o generar muchas peticiones y llegar a un límite establecido.
//
//✅ Pero a través de un operador como sampleTime, sólo hacemos una petición a una API cada 1 minuto, o cada 10 minutos por los valores emitidos, disminuimos la frecuencia de peticiones y el riesgo de llegar a un límite.

import { debounceTime, fromEvent, sampleTime, throttleTime } from "rxjs";

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(debounceTime(1000));
result.subscribe(x => console.log(x));

//const clicks = fromEvent(document, 'click');
//const result = clicks.pipe(throttleTime(1000));
//result.subscribe(x => console.log(x));

//const clicks = fromEvent(document, 'click');
//const result = clicks.pipe(auditTime(1000));
//result.subscribe(x => console.log(x));

//const clicks = fromEvent(document, 'click');
//const result = clicks.pipe(sampleTime(1000));
//result.subscribe(x => console.log(x));
