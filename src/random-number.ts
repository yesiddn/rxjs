import { Observable, Subject } from "rxjs";

// Observable es unic-cast, es decir, que solo tienen una difusión por cada observador
const numbers$ = new Observable<number>(subscriber => {
  subscriber.next(Math.round(Math.random() * 100));
});

// Subject es multi-cast, es decir, que el valor que se emite se difunde a todos los observadores de igual forma
const numbersRandom$ = new Subject<number>();

const observer1 = {
  next: (value: number) => console.log(`Observer 1: ${value}`)
}

const observer2 = {
  next: (value: number) => console.log(`Observer 2: ${value}`)
};

// los dos observadores reciben valores diferentes porque todos los observables (con excepción de los Subjects) son cold observables, es decir, se ejecuta la funcion por cada observador. Si hay 2 observadores, se ejecuta 2 veces la funcion del observable
numbers$.subscribe(observer1); // este puede recibir el valor 10
numbers$.subscribe(observer2); // este puede recibir el valor 20

numbersRandom$.subscribe(observer1);
numbersRandom$.subscribe(observer2);

// Subject, al contrario de Observable, no necesita un callback cuando se crea, por lo que no se ejecuta la funcion del observable por cada observador
numbersRandom$.next(Math.round(Math.random() * 100)); // para que los observadores reciban los valores, tienen que estar suscritros antes de que se ejecute el next

// Subject también se puede suscribir a un observable para emitir un solo valor a varios observables
numbers$.subscribe(numbersRandom$);
