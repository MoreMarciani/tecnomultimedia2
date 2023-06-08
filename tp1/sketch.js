let squares = [];
let centerX, centerY;
let isGrouped = false;
let imagen1;
let graphics;
let trazos = [];
let cantidad = 19;

function preload(){
    for( let i=0 ; i<cantidad ; i++){
        let nombre = "data/trazo"+nf( i , 2 )+".png";
        //console.log( nombre );
        trazos[i] = loadImage( nombre );
      }

    imagen1 = loadImage('data/fig00.png');
}


function setup(){
createCanvas(windowWidth, windowHeight);
background(120);
  centerX = width/2;
 centerY = height/2;
 graphics = createGraphics(windowWidth,windowHeight);
squares.push(createSquare(width / 4, height / 4));
squares.push(createSquare(width * 3 / 4, height / 4));
squares.push(createSquare(width / 4, height * 3 / 4));
squares.push(createSquare(width * 3 / 4, height * 3 / 4));
//squares.push(createSquare(width / 2, height/2+200));
//squares.push(createSquare(width * 3 / 4, height * 3 / 4));

}
function createSquare(x, y) {
    return {
      x: x,
      y: y,
      size: 250,
      rotation: 0,
      rotationSpeed: random(0.01, 0.05),
      maxSpeed: 0.1,
      action: function () {
        let distance = dist(mouseX, mouseY, this.x, this.y);
  
        // Aumenta el tamaño del cuadrado al mover el mouse
        this.size = map(distance, 0, width, 250, 100);
  
        // Aumenta la velocidad de rotación del cuadrado al mover el mouse
        this.rotationSpeed = map(distance, 0, width, 0, this.maxSpeed);
      },
    };
  }

  function draw() {
    background(0,0,20);
    // graphics
    image(graphics,0,0);
    //graphics.background(trazos[cual]);
    //fondo
    let cual = int(random(cantidad));
    let x = random(width);
    let y = random(height);
    push()
    imageMode(CENTER);
    graphics.image(trazos[cual], x, y, 200,200);
    pop()
  
    // Agrupa los cuadrados en el centro de la pantalla si el mouse está cerca del centro
    let distanceToCenter = dist(mouseX, mouseY, centerX, centerY);
    if (distanceToCenter < 50) {
      isGrouped = true;
    } else {
      isGrouped = false;
    }
  
    // Actualiza y dibuja los cuadrados
    for (let i = 0; i < squares.length; i++) {
      let square = squares[i];
  
      // Aplica la función correspondiente al cuadrado al mover el mouse
      square.action();
  
      // Rota el cuadrado
      square.rotation += square.rotationSpeed;
  
      // Si los cuadrados están agrupados, mueve cada cuadrado hacia el centro
      if (isGrouped) {
        square.x = lerp(square.x, centerX, 0.1);
        square.y = lerp(square.y, centerY, 0.1);
      }
  
      // Dibuja el cuadrado
      push();
      translate(square.x, square.y);
      rotate(square.rotation);
      fill(0);
     /* rectMode(CENTER);
      rect(0, 0, square.size, square.size);*/
      imageMode(CENTER);
      image(imagen1,0, 0, square.size, square.size);
      pop();
    }
  
    // Verifica si el mouse está en la parte superior derecha de la pantalla
    if (mouseX > width * 0.8 && mouseY < height * 0.2) {
      // Restaura las posiciones originales de los cuadrados
      for (let i = 0; i < squares.length; i++) {
        squares[i].x = width / 4 + (i % 2) * (width / 2);
        squares[i].y = height / 4 + floor(i / 2) * (height / 2);
      }
      // Dibuja el cuadrado
    push();
    translate(square.x, square.y);
    rotate(square.rotation);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, square.size, square.size);
    pop();
  }

  // Verifica si el mouse está en la parte superior derecha de la pantalla
  if (mouseX > width * 0.8 && mouseY < height * 0.2) {
    // Restaura las posiciones originales de los cuadrados
    for (let i = 0; i < squares.length; i++) {
      squares[i].x = width / 4 + (i % 2) * (width / 2);
      squares[i].y = height / 4 + floor(i / 2) * (height / 2);
    }
}

  }