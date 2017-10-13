 $(document).bind('mousemove', function(e) {
  $('#container_rayas').css({
   left: e.pageX - 200,
   top: e.pageY - 200
  });

 });

 var img = [];
 var slider;
 var cont = 0;
 var fileInput;
 var acetatoP5;
 var imagenesP5;

 var rayas_pdf;
 var imagenes_pdf;

 function guardar_pdf() {
  rayas_pdf.save();
  imagenes_pdf.save();
 }

 function setup() {
  slider = createSlider(2, 20, 2, 1);
  slider.style('width', '80px');
  slider.parent("container_slider");
 }

 var cargar_imagenes = function(r) {
  r.setup = function() {
   fileInput = createFileInput(gotFile, 'multiple');
   fileInput.parent("boton_cargar_imagenes");
   r.noLoop();
  }
 };

 function gotFile(file) {
  if (file.type === 'image') {
   img[cont] = loadImage(file.data);
   cont++;
  }
 }

 var cargar_imagenesP5 = new p5(cargar_imagenes);

 var acetato = function(r) {
  r.img = img;

  r.preload = function() {
   images = [];
   images = this.img;

  }

  r.setup = function() {
   var img = this.img;
   pg = r.createGraphics(img[0].width, img[0].height);
   var g = r.createCanvas(img[0].width, img[0].height);
   g.parent("container_rayas");
   r.noLoop();
   rayas_pdf = r.createPDF();
   rayas_pdf.beginRecord();
  }

  r.draw = function() {
   var img = this.img;
   var val = slider.value() * 2;
   pg.clear()
   r.clear();
   r.background(0, 0);
   var ancho = val; //debe ser par
   var alto = img[0].height;
   var iteraciones = img[0].width / ancho;
   var fotogramas = img.length;

   pg.strokeWeight(ancho / 2);

   for (var x = 0; x < iteraciones; x++) {
    for (var y = 0; y < fotogramas; y++) {
     if (y != 0) {
      pg.stroke(0);
      pg.line(fotogramas * x * ancho / 2 + (y * ancho / 2), 0, fotogramas * x * ancho / 2 + (y * ancho / 2), alto);
     }
    }

   }
   r.image(pg, 0, 0);
  }
 };

 var imagenes = function(r) {
  r.img = img;
  r.preload = function() {
   images = [];
   images = this.img;
  }

  r.setup = function() {
   var img = this.img;
   pg = r.createGraphics(img[0].width, img[0].height);
   var g = r.createCanvas(img[0].width, img[0].height);
   g.parent("container_imagenes");
   imagenes_pdf = r.createPDF();
   imagenes_pdf.beginRecord();
   r.noLoop();
  }

  r.draw = function() {
   var img = this.img;
   var val = slider.value() * 2;
   pg.clear()
   r.clear();
   r.background(0, 0);
   var ancho = val; //debe ser par
   var alto = img[0].height;
   var iteraciones = img[0].width / ancho;
   var fotogramas = img.length;

   pg.strokeWeight(ancho / 2);

   for (var x = 0; x < iteraciones; x++) {
    for (var y = 0; y < fotogramas; y++) {
     r.copy(img[y], x * ancho, 0, ancho, alto, (fotogramas * x * (ancho / fotogramas) + (y * ancho / fotogramas)), 0, ancho, alto);
    }
   }
   r.image(pg, 0, 0);
  }
 };

 function crear() {
  if (img.length > 1) {
   imagenesP5 = new p5(imagenes);
   acetatoP5 = new p5(acetato);
   $('#container_cargar_imagenes').hide();
   $('#seccion_cambiar_tamano').show();
   $('body').css('background-image','none')
  }
  else {
   alert("Selecciona más de una imagen");
  }
 }

 function imagenes_muestra() {
  img[0] = loadImage("https://github.com/pesinasiller/Moire/blob/master/img/001.JPG");
  img[1] = loadImage("https://github.com/pesinasiller/Moire/blob/master/img/002.JPG", function() {
   crear();
  });
 }

 function cambiar_tamano() {
  acetatoP5.redraw();
  imagenesP5.redraw();
 }
 
