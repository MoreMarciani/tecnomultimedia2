class Figura{
   PImage linroja;
PImage linamarilla;
PImage linazul;
PImage tricolor;
PImage imgrara;

Figura(){
 
  linroja = loadImage("linroja.png");
  linamarilla = loadImage("linamarilla.png");
  linazul = loadImage("linazul.png");
  tricolor = loadImage("tricolor.png");
  imgrara = loadImage("imgrara.png");
}

void dibujar(){
  // background(150);
  image(linazul,mouseX,mouseY,250,250);
  image(linamarilla,mouseX+30,300,230,230);
  image(linroja,200,mouseY-50,300,300);
  image(tricolor,mouseY,mouseX,150,150);
  image(imgrara,100,100,mouseX-mouseY,mouseY-mouseX);
}

}
