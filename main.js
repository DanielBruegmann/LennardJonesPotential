var camera, scene, renderer;

var A=0.02;
var B=0.01;
var T=0.1;

var velocities = [];

init();
render();

function lennard_jones_force(from_idx, to_idx) {
	var force = new THREE.Vector3(0,0,0);
	force.subVectors(scene.children[to_idx].position, scene.children[from_idx].position);
	force.normalize();

	var d = scene.children[from_idx].position.distanceTo( scene.children[to_idx].position );
	var strength = -6*A*Math.pow(d, -7) + 12*B*Math.pow(d, -13);

	force.multiplyScalar(strength);
	return force;
}

function update_velocity(sphere_idx) {
	var force = new THREE.Vector3(0,0,0);
	for (var i = 0; i < scene.children.length; i++) {
		if (i == sphere_idx) { continue; }
		force.add(lennard_jones_force(i, sphere_idx));
	}
	velocities[sphere_idx].add(force.multiplyScalar(T));
}

function update_position(sphere_idx) {
	var vel = new THREE.Vector3();
	vel.copy(velocities[sphere_idx]);
	vel.multiplyScalar(T);
	scene.children[sphere_idx].position.add(vel);	
	
	if (scene.children[sphere_idx].position.x < -10 ||
		scene.children[sphere_idx].position.x > 10) {
		velocities[sphere_idx].x = -velocities[sphere_idx].x;
	}
	if (scene.children[sphere_idx].position.y < -10 ||
		scene.children[sphere_idx].position.y > 10) {
		velocities[sphere_idx].y = -velocities[sphere_idx].y;
	}
	
}

function init() {
	scene = new THREE.Scene();
	camera = new THREE.OrthographicCamera( -10, 10, -10, 10, -1, 1);
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
	var sphere;
	var radius = 0.1;
	var num_particles = 25;
	var vel0 = 0.01;

	for (var i = 0; i < num_particles; i++) {
		sphere = new THREE.Mesh( new THREE.SphereGeometry( radius ), material );
		sphere.position.set( -10 + 20*i/num_particles, 20*Math.random() - 10, 0 );
		velocities.push(new THREE.Vector3(-1 + 2*Math.random(), -1 + 2*Math.random(), 0).multiplyScalar(vel0));
		scene.add(sphere)
	}
}


function render() {
	requestAnimationFrame( render );

	for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
		update_velocity(i);
	}
	for ( var i = 0, l = scene.children.length; i < l; i ++ ) {
		update_position(i);
	}

	renderer.render(scene, camera);
};