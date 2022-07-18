import './style.css'

import * as THREE from 'three';

import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//initiate loader
const loader = new GLTFLoader();

//DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load(
    //resource url
    './blender_files/cordyceps.glb',
    //called when resource url loaded
    function ( gltf ) {

        scene.add( gltf.scene );

    },

    // called while loading is progressing
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },

    // called when loading has errors
    function () {

        console.log( 'An error happened' );

    }
);