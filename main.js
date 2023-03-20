import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer setup
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const white = new THREE.Color( 0x216869 );
scene.background =  white;

const controls = new OrbitControls( camera, renderer.domElement );

const gridHelper = new THREE.GridHelper( 20, 20 );
scene.add( gridHelper );

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const geometry = new THREE.TorusKnotGeometry(2, 0.5, 120, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0x49A078} );
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0x9CC5A1 }))
const knot = new THREE.Mesh( geometry, material );
scene.add(line)
scene.add( knot );

camera.position.z = 6;
camera.position.x = 0;
camera.position.y = 1;
camera.rotation.x = 25;

// controls.update();

function addStar(spread, starGeometry, starMaterial) {
      const star = new THREE.Mesh(starGeometry, starMaterial)
      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(spread))
      star.position.set(x, y, z)
      scene.add(star)
    }
    
const starGeometry = new THREE.DodecahedronGeometry(0.25, 32, 32)
const starMaterial = new THREE.MeshStandardMaterial({ color: 0xdce1de })

Array(75).fill().forEach(() => addStar(100, starGeometry, starMaterial))
Array(100).fill().forEach(() => addStar(200, starGeometry, starMaterial))
Array(100).fill().forEach(() => addStar(1000, starGeometry, starMaterial))


function animate() {
    requestAnimationFrame(animate);
    knot.rotation.x += 0.005
    knot.rotation.y += 0.005
    knot.rotation.z += 0.001
    line.rotation.x += 0.005
    line.rotation.y += 0.005
    line.rotation.z += 0.001
    controls.update();
    renderer.render(scene, camera);
}

animate();