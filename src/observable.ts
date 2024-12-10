import { Observable } from "rxjs";

console.log('RxJS');

// los observables se les pone el signo de dolar ($) al final para identificarlos
const observableAlfa$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.error('Error en el observable');
  subscriber.next(3);
  subscriber.complete();
  subscriber.next(20);
});

const observador = {
  next: (value: number) => {
    console.log(value);
  },
  complete: () => {
    console.log('Observable completado');
  },
  error: (error: any) => {
    console.log('Error en el observable');
    console.error(error);
  }
}

observableAlfa$.subscribe(observador);
