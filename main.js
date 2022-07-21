import './style.css'

import * as THREE from 'three';

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( innerWidth, innerHeight );
renderer.setPixelRatio(devicePixelRatio);

let mesh;

document.body.appendChild( renderer.domElement );

//create new OrbitControls object
new OrbitControls(camera, renderer.domElement);

//makes what's in front of the black screen visible
camera.position.z = 5;

function init() {
    scene.background = new THREE.Color('black');
    camera.position.set(0, 0, 1);
    renderer.setSize(innerWidth, innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setLight() {
    //parameters: color, intensity
    const frontLight = new THREE.DirectionalLight(0xC0C0C0, 0.5);
    frontLight.position.set(0, 0, 1);
    scene.add( frontLight );

    //parameters: color, intensity
    const backLight = new THREE.DirectionalLight(0xC0C0C0, 0.5);
    backLight.position.set(0, 0, -1);
    scene.add( backLight );

    //parameters: color, intensity
    const rightLight = new THREE.DirectionalLight(0xC0C0C0, 0.5);
    rightLight.position.set(1, 0, 0);
    scene.add( rightLight );

    //parameters: color, intensity
    const leftLight = new THREE.DirectionalLight(0xC0C0C0, 0.5);
    leftLight.position.set(-1, 0, 0);
    scene.add( leftLight );

    //parameters: color, intensity
    const upLight = new THREE.DirectionalLight(0xC0C0C0, 0.5);
    upLight.position.set(0, 1, 0);
    scene.add( upLight );

    //parameters: color, intensity
    const downLight = new THREE.DirectionalLight(0xC0C0C0, 1.0);
    downLight.position.set(0, -1, 0);
    scene.add( downLight );
}
function loadGLTF() {

    let balloonLoader = new GLTFLoader();

    //DRACOLoader instance to decode compressed mesh data
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
    balloonLoader.setDRACOLoader( dracoLoader );

    balloonLoader.load('blender_files/donut.gltf', (gltf) => {
        mesh = gltf.scene;
        mesh.scale.set(5, 5, 5);
        scene.add(mesh);
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (mesh && mesh.rotation) {
        mesh.rotation.y -= 0.005;
        mesh.rotation.x += 0.005;
    }
    renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
animate();