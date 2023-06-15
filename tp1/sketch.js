// Variables de sonido

let monitorear = false;

//------VARIABLES A CALIBRAR-----//
let AMP_MIN = 0.006; // umbral mínimo de amplitud. Señal que supera al ruido de fondo
let AMP_MAX = 0.03; // umbral máximo de amplitud. 
let FREC_MIN = 160;
let FREC_MAX = 900;

//-----ENTRADA DE AUDIO----
let mic;
let pitch;
let audioContext; //motor de audio del navegador
//-----GESTOR DE AMP Y PITCH----//
let gestorPitch;
let gestorAmp;
//-----AMPLITUD----
let amp; //variable donde cargo los valores de amplitud del sonido de entrada
let haySonido = false; // vaiable buleana que de define el ESTADO
let antesHabiaSonido = false; //memoria de la variable "haySonido". Guarda el valor de la variable en fotograma anterior
let antesHabiaFrec = false;
//----FRECUENCIA -----
let frecuencia; //variable donde cargo los valores de frecuencia del sonido de entrada
let frecuenciaAnterior; //memoria de la variable "frecuencia". Guarda el valor de la variable en fotograma anterior

const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

// Variables de imagen y estado
let img1, img2, img3, img4, img5, img6, img8,img9, img10;
let estado = "inicial";
let marcaDeTiempo;
let limiteInicial = 2000;
let limiteMov = 2000;
let vel;

//FONDO
let graphics;
let fondos = [];
let cantidad = 3;





function preload() {
  // Carga las imágenes
  img1 = loadImage('data/fig00.png');
  img2 = loadImage('data/fig01.png');
  img3 = loadImage('data/fig02.png');
  img4 = loadImage('data/fig03.png');
  img5 = loadImage('data/fig04.png');
  img6 = loadImage('data/fig05.png');
  img7 = loadImage('data/fig06.png');
  img8 = loadImage('data/fig07.png');
  img9 = loadImage('data/fig08.png');
  img10 = loadImage('data/fig09.png');

  //fondo
   for( let i=0 ; i<cantidad ; i++){
    let nombre = "data/fondo"+nf( i , 2 )+".png";
    //console.log( nombre );
    fondos[i] = loadImage( nombre );
  } 
}

function setup() {
  createCanvas(displayWidth, displayHeight);
 
  imageMode(CENTER);
  //---CONFIG DE MIC Y AUDIO---//
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)

  //--- LLAMO AL GESTOR DE AMP Y PITCH---//
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);
  gestorPitch = new GestorSenial(FREC_MIN, FREC_MAX)

  //---DECLARO VARIABLES---//
  antesHabiaSonido = false;
}

function draw() {
  background(255);
  //Declaramos e inicializamos variables que ayuden al sonido
  let vol = mic.getLevel();//cargo en vol, la apm del mic (señal cruda)
  gestorAmp.actualizar(vol);
  //empiezo a definir si hay sonido o no, cuando eso ocurre
  haySonido = gestorAmp.filtrada > 0.1; //umbral de ruido, si hay sonido

 

  let iniciarSonido = haySonido && !antesHabiaSonido; //EVENTO DEL INICIO DEL SONIDO
  let finDelSonido = !haySonido && antesHabiaSonido; // EVENTO DEL FINAL DE UN SONIDO

 



  //monitoreo de gestorPitch y gestorAmp
  if(monitorear){
    gestorAmp.dibujar(100,200);
    gestorPitch.dibujar(100, 350);
  }

 antesHabiaSonido = haySonido;

 let frec = map(gestorPitch.filtrada, 0, 1, FREC_MIN, FREC_MAX); //Mapeo para la frecuencia 
 


//--- ACÁ VIENE LO DE LAS FIGURAS Y FONDO---//
if(estado == "inicial"){ //ESTADO INICIO, LAS FIGURAS ESTATICAS
  background(255);
   image(fondos[1], width/2, height/2, width, height)
 
    image(img1, frec+200, 300, 100, 100); //00 // DE IZQ A DER 
    image(img2, frec+200, 100, 150, 150); // 01 // DE IZQ A DER
    image(img3, 700, frec+100, 200, 200); //02 //DE ARRIBA A ABAJO
    image(img4, 1100-frec, 100, 200, 200); //03 //DE DER A IZQ
    image(img5, 980-frec, 300, 100,100); //04 // DE DER A IZQ
    image(img6, frec+200, 450, 100,100); //05 // DE IZQ A DER
    image(img7, 500, 500-frec, 150, 150); //06 // ABAJO HACIA ARRIBA
    image(img8, 450, 90, frec+200,frec+200); //07 //SE AGRANDA Y ACHICA
    image(img9, 850, 480, 300-frec,300-frec); //08 //SE AGRANDA Y ACHICA
    image(img10, 1200-frec, 400, 250, 250); //09 //DE DER A IZQ
    

  if(iniciarSonido){
    marcaDeTiempo = millis();
    
  }

  if(finDelSonido){
   // marcaDeTiempo = millis();
    
  }

 let cambiarYa = millis();
 if(cambiarYa > marcaDeTiempo + limiteInicial){
  estado = "movimiento"
  marcaDeTiempo = millis();
 }

}
else if(estado == "movimiento"){//SE MUEVEN CON AGUDOS y GRAVES
  if(haySonido){ 
    //el fondo se reemplaza cuando el sonido esta
   image(fondos[1], width/2, height/2, width, height);
    //aca van las funciones de poder agrupar las img en el centro o cerca de ahi
    //vel = frec;
    image(img1, frec+200, 300, 100, 100); //00 // DE IZQ A DER 
    image(img2, frec+200, 100, 150, 150); // 01 // DE IZQ A DER
    image(img3, 700, frec+100, 200, 200); //02 //DE ARRIBA A ABAJO
    image(img4, 1100-frec, 100, 200, 200); //03 //DE DER A IZQ
    image(img5, 980-frec, 300, 100,100); //04 // DE DER A IZQ
    image(img6, frec+200, 450, 100,100); //05 // DE IZQ A DER
    image(img7, 500, 500-frec, 150, 150); //06 // ABAJO HACIA ARRIBA
    image(img8, 450, 90, frec+200,frec+200); //07 //SE AGRANDA Y ACHICA
    image(img9, 850, 480, 300-frec,300-frec); //08 //SE AGRANDA Y ACHICA
    image(img10, 1200-frec, 400, 250, 250); //09 //DE DER A IZQ
    
  }
  else if(!haySonido){
    image(fondos[2], width/2, height/2, width, height)
    vel -= 0;
    image(img1, frec+200, 300, 100, 100); //00 // DE IZQ A DER 
    image(img2, frec+200, 100, 150, 150); // 01 // DE IZQ A DER
    image(img3, 700, frec+100, 200, 200); //02 //DE ARRIBA A ABAJO
    image(img4, 1100-frec, 100, 200, 200); //03 //DE DER A IZQ
    image(img5, 980-frec, 300, 100,100); //04 // DE DER A IZQ
    image(img6, frec+200, 450, 100,100); //05 // DE IZQ A DER
    image(img7, 500, 500-frec, 150, 150); //06 // ABAJO HACIA ARRIBA
    image(img8, 450, 90, frec+200,frec+200); //07 //SE AGRANDA Y ACHICA
    image(img9, 850, 480, 300-frec,300-frec); //08 //SE AGRANDA Y ACHICA
    image(img10, 1200-frec, 400, 250, 250); //09 //DE DER A IZQ
  }

 /* if(finDelSonido){
    marcaDeTiempo = millis();

  }
  let cambiarYa = millis();
 if(cambiarYa > marcaDeTiempo + limiteMov){
  estado = "desagrupar"
  marcaDeTiempo = millis();
 }

}
else if(estado == "desagrupar"){ // SE DESAGRUPAN Y SE MUEVEN A OTRO PUNTO CON GRAVES

   /* if (haySonido) {
      let angulo = radians(frameCount); 
      push();
      rotate(angulo);
      image(img1, 0,0,100,100)
      pop()
      
    }*/
}

//console.log(estado);


  



 
}



//---------------------PITCH DETECTION-----------------------------------------------
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
  //--------------------------------------------------------------------
  function startPitch() {
    pitch = ml5.pitchDetection(model_url, audioContext , mic.stream, modelLoaded);
  }
  //--------------------------------------------------------------------
  function modelLoaded() {
  //select('#status').html('Model Loaded');
  getPitch();
  //console.log( "entro aca !" );
  
  }
  //--------------------------------------------------------------------
  function getPitch() {
    pitch.getPitch(function(err, frequency) {
    if (frequency) {    	
    //  let midiNum = freqToMidi(frequency);
      //console.log( midiNum );
  
      gestorPitch.actualizar( frequency );
     // console.log(frequency);
  
    }
    getPitch();
  })
  }