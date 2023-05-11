class Paleta{ //sagarramos el codigo de las paletas y trazos para ponerlo en los caminantes
  
  PImage imagen;
  
 Paleta( String nombreArchivo){
   imagen = loadImage (nombreArchivo);//para instanciarlo en el programa del setup

 }
 
 color darColor(){//agarra un pixel al azar de la imagen y lo devuelve a la pantalla
  int x = int (random (imagen.width));
  int y = int (random (imagen.height));
  return imagen.get(x,y);
 }
 
 color darUnColor(float alfa){
   int x = int (random (imagen.width));
  int y = int (random (imagen.height));
  color este = imagen.get(x,y);
  return color (red (este), green(este), blue(este), alfa);
   
 }
 
 
}
