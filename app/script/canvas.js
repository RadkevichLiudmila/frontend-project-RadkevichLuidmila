'use strict';

let rotate = 5;

function showCanvas() {

  const context = document.getElementById('canvas')
    .getContext('2d');
  context.beginPath();
  context.arc(140, 70, 50, 1.5 * Math.PI, 3.2 * Math.PI, false);
  context.lineWidth = 20;
  context.strokeStyle = '#3172bb';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 0;
  context.shadowBlur = 2;
  context.shadowColor = '#b1afaf';
  context.stroke();

  document.getElementById('canvas').style.transform = `rotate(${rotate}deg)`;
  rotate += 10;
};
