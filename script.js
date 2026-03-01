import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.164.1/examples/jsm/controls/OrbitControls.js';

const products = [
  { id: 'ekos-castanha', name: 'Ekos Castanha', price: 42, color: 0xd97706, shape: 'cylinder' },
  { id: 'tododia-ceramidas', name: 'Tododia Ceramidas', price: 36, color: 0xf59e0b, shape: 'box' },
  { id: 'lumina-shampoo', name: 'Lumina Shampoo', price: 54, color: 0x60a5fa, shape: 'cylinder' },
  { id: 'mamãe-bebê-oleo', name: 'Mamãe e Bebê Óleo', price: 48, color: 0x34d399, shape: 'box' },
  { id: 'kaiak-feminino', name: 'Kaiak Feminino', price: 79, color: 0x22d3ee, shape: 'box' }
];

const canvas = document.getElementById('scene');
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const cartTotal = document.getElementById('cart-total');
const toggleSpin = document.getElementById('toggle-spin');
const checkoutButton = document.getElementById('checkout');

const cart = [];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 100);
camera.position.set(0, 3.4, 8.5);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 4;
controls.maxDistance = 14;

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
keyLight.position.set(5, 8, 4);
scene.add(keyLight);

const floor = new THREE.Mesh(
  new THREE.CircleGeometry(7.5, 64),
  new THREE.MeshStandardMaterial({ color: 0x14532d, roughness: 0.9 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.1;
scene.add(floor);

const ring = new THREE.Group();
scene.add(ring);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let autoSpin = true;
let selectedMesh = null;

function createProductMesh(product, index) {
  const geometry = product.shape === 'cylinder'
    ? new THREE.CylinderGeometry(0.55, 0.65, 1.8, 32)
    : new THREE.BoxGeometry(1.1, 1.7, 0.8);

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      color: product.color,
      metalness: 0.22,
      roughness: 0.35
    })
  );

  const radius = 3.1;
  const angle = (index / products.length) * Math.PI * 2;
  mesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  mesh.lookAt(0, 0, 0);
  mesh.userData = { product };

  const label = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: makeLabelTexture(product.name), transparent: true })
  );
  label.scale.set(2.2, 0.48, 1);
  label.position.y = 1.5;
  mesh.add(label);

  ring.add(mesh);
}

function makeLabelTexture(text) {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 120;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgba(15,23,42,0.7)';
  ctx.roundRect(0, 0, c.width, c.height, 32);
  ctx.fill();
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '700 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, c.width / 2, c.height / 2);

  return new THREE.CanvasTexture(c);
}

function renderProductList() {
  productList.innerHTML = '';
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${product.name}<br><small>$${product.price}</small></span>
      <button class="btn">Agregar</button>
    `;
    li.querySelector('button').addEventListener('click', () => addToCart(product));
    productList.appendChild(li);
  });
}

function addToCart(product) {
  cart.push(product);
  renderCart();
}

function renderCart() {
  cartList.innerHTML = '';
  if (!cart.length) {
    cartList.innerHTML = '<li>Tu carrito está vacío</li>';
  }

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} · $${item.price}`;
    cartList.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `Total: $${total}`;
}

function resizeRenderer() {
  const { clientWidth, clientHeight } = canvas;
  if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }
}

function onPointerDown(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(ring.children, true);

  if (!intersects.length) return;

  const objectWithProduct = intersects
    .map(hit => hit.object)
    .find(obj => obj.userData.product || obj.parent?.userData.product);

  const selected = objectWithProduct.userData.product ? objectWithProduct : objectWithProduct.parent;
  const product = selected.userData.product;

  if (selectedMesh && selectedMesh.material?.emissive) {
    selectedMesh.material.emissive.setHex(0x000000);
  }
  selected.material.emissive = new THREE.Color(0x1e293b);
  selectedMesh = selected;

  addToCart(product);
}

function animate() {
  resizeRenderer();
  if (autoSpin) ring.rotation.y += 0.004;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

products.forEach(createProductMesh);
renderProductList();
renderCart();
animate();

canvas.addEventListener('pointerdown', onPointerDown);

toggleSpin.addEventListener('click', () => {
  autoSpin = !autoSpin;
  toggleSpin.textContent = autoSpin ? 'Pausar rotación' : 'Reanudar rotación';
});

checkoutButton.addEventListener('click', () => {
  if (!cart.length) {
    alert('Agrega al menos un producto antes de finalizar.');
    return;
  }

  alert(`¡Compra realizada! Total de ${cart.length} productos.`);
  cart.length = 0;
  renderCart();
});
