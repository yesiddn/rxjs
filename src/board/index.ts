import { fromEvent, map } from "rxjs";

const canvas = document.querySelector('#reactive-canvas') as HTMLCanvasElement;
const cursosPosition = { x: 0, y: 0 };

const onMouseDown$ = fromEvent<MouseEvent>(canvas || document, 'mousedown').pipe(
  map(
    (event) => {
      //console.log(event)
      //console.log({ x: event.clientX, y: event.clientY });
      //console.log({ offsetX: canvas.offsetLeft, offsetY: canvas.offsetTop });

      cursosPosition.x = event.clientX - canvas.offsetLeft;
      cursosPosition.y = event.clientY - canvas.offsetTop;
      console.log(cursosPosition);
    }
  )
);
const onMouseMove$ = fromEvent(canvas || document, 'mousemove');
const onMouseUp$ = fromEvent(canvas || document, 'mouseup');

onMouseDown$.subscribe();

const canvasContext = canvas.getContext('2d');
if (canvasContext) {
  // define el ancho de la línea
  canvasContext.lineWidth = 5;

  // define el color de la línea
  canvasContext.strokeStyle = 'white';

  // indica que se va a dibujar una línea
  canvasContext.beginPath();
  // mueve el punto de inicio de la línea
  canvasContext.moveTo(0, 0);
  // indica el punto final de la línea
  canvasContext.lineTo(100, 100);
  // dibuja la línea
  canvasContext.stroke();
  // cierra la ruta actual
  canvasContext.closePath();
}
