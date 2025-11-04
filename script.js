let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 70;
let planet;
function crearEstrellas() {
  let geo = new THREE.BufferGeometry();
  let count = 2500;
  let pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 300;
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

  // para el planeta
const planetTexture = new THREE.TextureLoader().load("PNG.png");
const planetGeo = new THREE.SphereGeometry(8, 64, 64);
const planetMat = new THREE.MeshStandardMaterial({
  map: planetTexture,
  emissive: 0x7fc8ff,
  emissiveIntensity: 0.02
});
planet = new THREE.Mesh(planetGeo, planetMat);
planet.position.set(-50, -15, -40);
scene.add(planet);
// constelación de mi manita
const points = [
  new THREE.Vector3(0, 10, -5),
  new THREE.Vector3(5, 12, -5),
  new THREE.Vector3(12, 9, -5)
];
const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
const lineMat = new THREE.LineBasicMaterial({ color: 0x88ccff });
const constellation = new THREE.Line(lineGeo, lineMat);
scene.add(constellation);

// estrellas de constelación
points.forEach(p => {
  const starGeo = new THREE.SphereGeometry(0.25, 16, 16);
  const starMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const s = new THREE.Mesh(starGeo, starMat);
  s.position.copy(p);
  scene.add(s);
});

// luz para planeta
const light = new THREE.PointLight(0xffffff, 2, 200);
light.position.set(30, 30, 30);
scene.add(light);

  let mat = new THREE.PointsMaterial({ color: 0x4b7aff, size: 1,
  alphaTest: 0.1
});
  let pts = new THREE.Points(geo, mat);
  scene.add(pts);
  return pts;
}
let estrellas = crearEstrellas();
let frases = [
  "Mi planetita... no es la gran cosa..",
  "Tampoco estan en forma de estrellitas..",
  "Sé que soy tu constelación favorita..",
  "Pero pense y dije..",
  "¿Y si intento crear algo parecido..?",
  "No puedo ofrecerte el mundo entero...",
  "Pero intente dibujarte una galaxia...",
  "Te amo mi niña pequeña..❤‍🩹",
  "Se que es algo sencillo..",
  "Pero lo ise con mucho amor para usted..",
  "Mi linda bebita tierna..❤‍🩹",
  "Te amo mi pequeña nubesita..☁",
  "Mi lindo océano..",
  "La chica a la cual amo mucho..🥹❤️‍🩹",
  "Mi linda y dulce novia..",
  "Te amo mi madelayne❤‍🩹",
  "Moorr beshitosh...",
];
let index = 0;
let textoMesh = null;
let fontLoader = new THREE.FontLoader();

function crearTexto3D(msg) {
  if (textoMesh) scene.remove(textoMesh);

  fontLoader.load("fonts/helvetiker_regular.typeface.json", font => {
    let geo = new THREE.TextGeometry(msg, {
      font: font,
      size: 4,
      height: 1
    });
    let mat = new THREE.MeshBasicMaterial({ color: 0x9b59ff });
    textoMesh = new THREE.Mesh(geo, mat);
    textoMesh.position.set(-35, 0, -10);
    scene.add(textoMesh);
  });
}

document.addEventListener("click", () => {
  const msg = frases[index];
  document.getElementById("mensaje").innerText = msg;
  crearTexto3D(msg);
  index = (index + 1) % frases.length;
});

function animar() {
  requestAnimationFrame(animar); 
  estrellas.rotation.y += 0.0008;
  estrellas.rotation.x += 0.0003;
  if (textoMesh) textoMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
  if (planet) planet.rotation.y += 0.01;
}
animar();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

});
document.addEventListener("click", () => {
  const bgm = document.getElementById("bgm");
  bgm.play().catch(()=>{});
});