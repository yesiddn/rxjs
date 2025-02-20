import { fromEvent, map, pluck } from "rxjs";

fromEvent<MouseEvent>(document, 'mousemove').pipe(
  pluck('clientX') // este metodo esta deprecado, pero lo que hace es retornar un valor, por ejemplo si retornara los datos de un usuario y quiero solo el nombre, usaria pluck('name')
  // pluck se usaba comunmente para manejar errores en caso de que una propiedad no existiera, pero el optional chaining lo sustituyo (?.)
  // map(event => event.clientX) // map con optional chaining serian el sustituto de pluck
).subscribe(console.log)
