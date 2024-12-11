import { Observable } from "rxjs";

const numbers$ = new Observable<number>(subscriber => {
  subscriber.next(Math.round(Math.random() * 100));
});

const observer1 = {
  next: (value: number) => console.log(`Observer 1: ${value}`)
}

const observer2 = {
  next: (value: number) => console.log(`Observer 2: ${value}`)
};

// los dos observadores reciben valores diferentes porque todos los observables (con excepción de los Subjects) son cold observables, es decir, se ejecuta la funcion por cada observador. Si hay 2 observadores, se ejecuta 2 veces la funcion del observable
numbers$.subscribe(observer1); // este puede recibir el valor 10
numbers$.subscribe(observer2); // este puede recibir el valor 20
