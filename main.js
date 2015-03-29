var camera, scene, renderer;

init()
render()

function update_position(sphere, all_spheres) {
	sphere.position.x += 0.01
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
		scene.add(sphere)
	}
}


function render() {
	requestAnimationFrame( render );

	for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

		var sphere = scene.children[ i ];
		update_position(sphere, [])

	}

	renderer.render(scene, camera);
};