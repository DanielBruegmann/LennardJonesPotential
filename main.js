var camera, scene, renderer;

var A=0.01;
var B=0.01;

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

function update_position(sphere_idx) {
	var force = new THREE.Vector3(0,0,0);
	for (var i = 0; i < scene.children.length; i++) {
		if (i == sphere_idx) { continue; }
		force.add(lennard_jones_force(i, sphere_idx));
	}
	velocities[sphere_idx].add(force);
	scene.children[sphere_idx].position.add(velocities[sphere_idx]);
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
	var num_particles = 10;

	for (var i = 0; i < num_particles; i++) {
		sphere = new THREE.Mesh( new THREE.SphereGeometry( radius ), material );
		sphere.position.set( -2*i + num_particles, 0, 0 );
		velocities.push(new THREE.Vector2(0,0,0))
		scene.add(sphere)
	}
}


function render() {
	requestAnimationFrame( render );

	for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

		var sphere = scene.children[ i ];
		//update_position(i);
	}

	renderer.render(scene, camera);
};