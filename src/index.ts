import { fromEvent } from "rxjs";

const onMouseMove$ = fromEvent(document, "mousemove"); // se crea un observable que emite eventos de mousemove
const onKeyDown$ = fromEvent(document, "keydown"); // se crea un observable que emite eventos de keydown
const onKeyUp$ = fromEvent(document, "keyup"); // se crea un observable que emite eventos de keyup

const observer = {
  next: (event: Event) => console.log(event),
}

//onMouseMove$.subscribe(observer); // se subscribe el observer al observable
//onKeyDown$.subscribe(observer); // se subscribe el observer al observable
onKeyUp$.subscribe(observer); // se subscribe el observer al observable
