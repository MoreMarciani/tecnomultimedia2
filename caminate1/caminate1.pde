Caminante c;
Paleta p;
PImage fondo;
Figura figura;


void setup(){
  background(200);
  size(900,600);
  fondo = loadImage("fondo.jpg");
   p = new Paleta("vanGogh.jpg");
   figura = new Figura();
  c = new Caminante(p.darColor()); //al caminante le llamo el metodo de la clase paleta que te devuelve el color d eun pixel x
 
  
  
  
}


void draw(){
 
   fill(20,20);//10 de opacidad en el rectangulo, que genera una estela de los caminantes
 // rect(0,0,width,height);
  image(fondo,0,0);
 
  c.draw();
  c.movimiento();
  figura.dibujar();
  

 /*  if(key=='a'){
    
   c.otraDireccion();
    
  }*/
  
  
}

void keyPressed(){
  
  c.cambiarColor(p.darColor());
   
  
}
