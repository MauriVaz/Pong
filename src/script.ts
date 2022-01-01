import { Barra } from './actors/Barra';
import { IActor } from './actors/Actor';
import { FPSViewer } from './actors/FPSViewer';
import { Ball } from './actors/Ball';
import { Marcador } from './actors/Marcador';
import { MAP_A, MAP_B } from './utils/keyboardMap';

window.onload = () => {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement;
  var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  //  Creamos los actores
  let barra1 = new Barra({ x: 30, y: 30 }, MAP_A);
  let barra2 = new Barra({ x: 30, y: 270 }, MAP_B);
  let fps = new FPSViewer({ x: 70, y: 30 });
  let ball = new Ball({ x: 360, y: 240 });
  let marcador = new Marcador({ x: 240, y: 30 });
  let actors: Array<IActor> = [fps, barra1, barra2, ball, marcador];
  let lastFrame = 0;
  const render = (time: number) => {
    let delta = (time - lastFrame) / 1000;
    lastFrame = time;
    actors.forEach((e) => e.update(delta));
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    actors.forEach((e) => {
      ctx.save();
      e.draw(delta, ctx);
      e.update(delta);
      ctx.restore();
    });
    window.requestAnimationFrame(render);
  };

  window.requestAnimationFrame(render);
  document.body.addEventListener('keydown', (e) => {
    actors.forEach((actor) => {
      if (actor.keyboard_event_down) {
        actor.keyboard_event_down(e.key);
      }
    });
  });
}