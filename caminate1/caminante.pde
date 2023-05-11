class Caminante {
 float posX, posY, tam, vel, dir;
 color c;
  
  
 Caminante(color c_){ //se necesita por variable color
   
   posX = width/2;
   posY = height/2;
   /* posX = mouseX;
   posY = mouseY;*/
   tam = 20;
   vel = 2;
   dir = 30;
   c = c_;
   
   
 }
  
  void draw(){
    noStroke();
    fill(c);
    ellipse(posX,posY,tam,tam);
  
    
  }
  
  void movimiento(){
      float objetivoX = mouseX;
  float objetivoY = mouseY;

  float anguloDeseado = atan2(objetivoY-posY, objetivoX-posX);
    if(mousePressed){ //cuando mantego presionado el mouse hace un circulo, caso contraio se mantiene igual
    dir +=2 ; 
    }else{
     dir += random(-7,7); //para que de un movimiento mas organico y no tan recto. Al ser el caso contrario de que cuando presionas el mouse, hace un circulo perfecto
      
    }
    posX = posX+vel*cos(anguloDeseado);//la posicion actual se suma por la velocidad por el angulo determinado por la direccion
    posY = posY+vel*sin(anguloDeseado);//determinar angulo en radianes
    
  }
  
  void otraDireccion(){ //cambia de direccion en random en el primer opantalla, es con keyPressed
  dir = random(0,360); //direccion que vaya del 0 al 360 en angulos  
  }
  
  void cambiarColor(color c_){ //al llamar este parametro, tengo que volver a nombrar lo de darColor
    c = c_;
    
  }
  
  
}
