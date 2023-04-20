import * as THREE from 'three';
import {OrbitControls} from  'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const renderer=new THREE.WebGL1Renderer();

renderer.shadowMap.enabled=true;

renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit=new OrbitControls(camera, renderer.domElement);


const axesHelper=new THREE.AxesHelper(3);
scene.add(axesHelper);
// camera.position.z=5;
// camera.position.y=2;
// camera.position.x=3;
camera.position.set(1,1,5)
orbit.update();
const boxGeometry=new THREE.BoxGeometry();
const boxMaterial=new THREE.MeshBasicMaterial({color: 0x00FF00});
const box=new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const planeGeometry=new THREE.PlaneGeometry(30,30);
const planeMaterial=new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane=new THREE.Mesh(planeGeometry,planeMaterial);
scene.add(plane);
plane.rotation.x=-0.5*Math.PI;
plane.receiveShadow=true;
const gridHeler=new THREE.GridHelper(30);
scene.add(gridHeler);

const sphereGeometry=new THREE.SphereGeometry(4);
const sphereMaterial=new THREE.MeshStandardMaterial({color:0x0000FF,wireframe:false});
const sphere=new THREE.Mesh(sphereGeometry,sphereMaterial);
scene.add(sphere);
sphere.position.set(-10,10,10);
sphere.castShadow=true;

box.rotation.x=5;
box.rotation.y=5;
const ambientLight=new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const directionalLight=new THREE.DirectionalLight(0xFFFFFF,0.8);
scene.add(directionalLight);
directionalLight.position.set(-30,50,0); 
directionalLight.castShadow=true;

const helpherDlight=new THREE.DirectionalLightHelper(directionalLight);
scene.add(helpherDlight)

const gui =new dat.GUI();

const options={
    sphereColor:'#ffea00',
    wireframe:false,
    speed:0.01
};

gui.addColor(options,'sphereColor').onChange(function(e){
        sphere.material.color.set(e);
});
gui.add(options,'wireframe').onChange(function(e){
    sphere.material.wireframe(e);
})
gui.add(options,'speed',0,0.1);
let step=0;



function animate(time){
    box.rotation.x = time / 1000;
    box.rotation.y = time / 1000;
    renderer.render(scene,camera);

    step+=options.speed;
    sphere.position.y=10*Math.abs(Math.sin(step))
}

renderer.setAnimationLoop(animate); 
