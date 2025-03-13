import { endWith, of, startWith } from "rxjs";

const letters$ = of("b", "c", "d", "e", "f", "g", "h", "i", "j").pipe(
  startWith("z"),
  endWith("a")
);

letters$.subscribe(console.log);
