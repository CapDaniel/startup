$(document).ready(function()
{
  var canvas = document.getElementById('canvasAPI');
  ctx = canvas.getContext('2d');
  function drawCircle()
  {
    var centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        radius = 70;
    ctx.beginPath();
    ctx.arc(280, 160, 50, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  }
  function drawTriangle()
  {
    ctx.fillStyle="#A2322E";
    ctx.beginPath();
    ctx.moveTo(150,200);
    ctx.lineTo(50,80);
    ctx.lineTo(200,110);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  drawCircle();
  drawTriangle();
  function drawRectangle()
  {
    ctx.beginPath();
    ctx.rect(x, y, 70, 50);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.stroke();
  }
  var x = 0;
      y = 15;
      speed = 2;
  function animate()
  {
    reqAnimFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.ooRequestAnimationFrame || window.msRequestAnimationFrame;
    reqAnimFrame(animate);
    x += speed;
    if(x <= 0 || x >= 500)
    {
      speed = -speed;
    }
    drawRectangle();
  }
  animate();
});