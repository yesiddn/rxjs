import { fromEvent, map, merge, mergeAll, takeUntil, throttleTime } from "rxjs";

const canvas = document.querySelector('#reactive-canvas') as HTMLCanvasElement;
const restartButton = document.querySelector('#restart-button') as HTMLButtonElement;
const cursosPosition = { x: 0, y: 0 };

const updateCursorPosition = (event: MouseEvent) => {
  cursosPosition.x = event.clientX - canvas.offsetLeft;
  cursosPosition.y = event.clientY - canvas.offsetTop;
  console.log(cursosPosition);
}

const onMouseDown$ = fromEvent<MouseEvent>(canvas || document, 'mousedown');
onMouseDown$.subscribe(updateCursorPosition);

const onMouseUp$ = fromEvent(canvas || document, 'mouseup');
const onMouseMove$ = fromEvent<MouseEvent>(canvas || document, 'mousemove').pipe(
  // throttleTime(40), 
  takeUntil(onMouseUp$)
);

onMouseDown$.subscribe();

const canvasContext = canvas.getContext('2d');
if (canvasContext) {
  const paintStroke = (event: MouseEvent) => {
    // define el ancho de la línea
    canvasContext.lineWidth = 8;

    // define el estilo de la linea
    canvasContext.lineJoin = 'round';

    // define el estilo del inicio de la linea
    canvasContext.lineCap = 'round';

    // define el color de la línea
    canvasContext.strokeStyle = 'white';

    // indica que se va a dibujar una línea
    canvasContext.beginPath();
    // mueve el punto de inicio de la línea
    canvasContext.moveTo(cursosPosition.x, cursosPosition.y);

    updateCursorPosition(event);

    // indica el punto final de la línea
    canvasContext.lineTo(cursosPosition.x, cursosPosition.y);
    // dibuja la línea
    canvasContext.stroke();
    // cierra la ruta actual
    canvasContext.closePath();
  }

  const startPaint$ = onMouseDown$.pipe(
    map(() => onMouseMove$),
    mergeAll()
  );

  let startPaintSubscription = startPaint$.subscribe(paintStroke);

  const onLoadWindow$ = fromEvent(window, 'load');
  const onRestartClick$ = fromEvent(restartButton, 'click');

  const restartWitheBoard$ = merge(onLoadWindow$, onRestartClick$);

  restartWitheBoard$.subscribe(() => {
    // se desuscribe de los observables para evitar fugas de memoria
    startPaintSubscription.unsubscribe();
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    startPaintSubscription = startPaint$.subscribe(paintStroke);
  });
}

