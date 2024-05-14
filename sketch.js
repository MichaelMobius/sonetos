let images = [];
const totalRows = 14;
const imgSize = 50;
const rowSpacing = 30;  // Espacio vertical entre los grupos de filas

function preload() {
    images[0] = loadImage('img0.jpg');
    images[1] = loadImage('img1.jpg');
    images[2] = loadImage('img2.jpg');
    images[3] = loadImage('img3.jpg');
    images[4] = loadImage('img4.jpg');
    images[5] = loadImage('img5.jpg');
    images[6] = loadImage('img6.jpg');
    images[7] = loadImage('img7.jpg');
    images[8] = loadImage('img8.jpg');
    images[9] = loadImage('img9.jpg');  
}


function setup() {
  createCanvas(windowWidth, 800);
  if (images.every(img => img !== null)) {
    generateSonnet();
  } else {
    console.error("Algunas imágenes no se cargaron correctamente.");
  }
}

function draw() {
  // El contenido del soneto se dibuja en el canvas, no hay necesidad de redibujar en draw()
}

function generateSonnet() {
  background(255); // Limpiar el canvas
  let y = 0;

  let lastImages = {};

  for (let i = 0; i < totalRows; i++) {
    let numImages = int(random(4, 6)); // Cantidad aleatoria de imágenes entre 4 y 5
    let imgIndex = null; // Definir imgIndex fuera del bucle
    let lastImage = null; // Guardar la última imagen de la fila actual

    let rowWidth = numImages * imgSize;
    let x = (width - rowWidth) / 2; // Calcular posición inicial de x para centrar la fila

    for (let j = 0; j < numImages; j++) {
      if (j === numImages - 1) { // Si es la última imagen de la fila
        if (i < 8) { // Grupos de 4 filas
          if (i % 4 === 0) {
            imgIndex = int(random(10));
            lastImages[i + 3] = imgIndex;  // Guardar la imagen para la cuarta fila del grupo
          } else if (i % 4 === 1) {
            imgIndex = int(random(10));
            lastImages[i + 1] = imgIndex;  // Guardar la imagen para la tercera fila del grupo
          } else if (i % 4 === 2) {
            imgIndex = lastImages[i - 1];  // Última imagen de la tercera fila igual a la última imagen de la segunda fila
          } else if (i % 4 === 3) {
            imgIndex = lastImages[i - 3];  // Última imagen de la cuarta fila igual a la última imagen de la primera fila
          }
        } else { // Grupos de 3 filas
          if (i === 8) {
            imgIndex = int(random(10));
            lastImages[8] = imgIndex; // Guardar la imagen para la primera fila del primer grupo de 3
          } else if (i === 9) {
            imgIndex = int(random(10));
            lastImages[10] = imgIndex; // Guardar la imagen para la segunda fila del primer grupo de 3
          } else if (i === 10) {
            imgIndex = lastImages[8]; // Última imagen de la tercera fila igual a la última imagen de la primera fila
          } else if (i === 11) {
            imgIndex = lastImages[9]; // Última imagen de la segunda fila del segundo grupo de 3 igual a la última imagen de la primera fila del primer grupo de 3
          } else if (i === 12) {
            imgIndex = lastImages[10]; // Última imagen de la primera fila del segundo grupo de 3 igual a la última imagen de la segunda fila del primer grupo de 3
          } else if (i === 13) {
            imgIndex = lastImages[9]; // Última imagen de la segunda fila del segundo grupo de 3 igual a la última imagen de la primera fila del primer grupo de 3
          }
        }
        lastImage = imgIndex;
      } else {
        imgIndex = int(random(10));
      }

      if (imgIndex !== null && images[imgIndex]) {
        image(images[imgIndex], x, y, imgSize, imgSize);
      } else {
        console.error(`Imagen en índice ${imgIndex} no está cargada correctamente.`);
      }

      x += imgSize;
    }

    // Guardar la última imagen de la fila según la regla específica
    if (i < 8 || i === 8 || i === 9 || i === 10 || i === 11 || i === 12 || i === 13) {
      lastImages[i] = lastImage;
    }

    y += imgSize;

    // Añadir un espacio extra después de ciertos grupos de filas
    if (i === 3 || i === 7 || i === 10) {
      y += rowSpacing;
    }
  }
}

function mousePressed() {
  if (images.every(img => img !== null)) {
    generateSonnet(); // Generar un nuevo soneto cuando se hace clic
  } else {
    console.error("Algunas imágenes no se cargaron correctamente.");
  }
}
