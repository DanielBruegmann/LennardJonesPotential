var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.SphereGeometry( 1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphere2 = new THREE.Mesh( geometry, material );
scene.add( sphere2 );


camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );


	sphere2.position.x += 0.01

	renderer.render(scene, camera);
};

render();