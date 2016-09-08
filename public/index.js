var canvas = document.querySelector("#renderCanvas");
// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    // Setup camera
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(-10, 10, 0));
    camera.attachControl(canvas, true);

    // Lights
    var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(0, 10, 0), scene);
    var light1 = new BABYLON.PointLight("Omni1", new BABYLON.Vector3(0, -10, 0), scene);

    var material = new BABYLON.StandardMaterial("kosh", scene);
    var sphere = BABYLON.Mesh.CreateSphere("Sphere", 16, 5, scene);

    // Sphere material
    material.diffuseColor = new BABYLON.Color3(1, 1, 1);
    sphere.material = material;

    // Creating light sphere

    var lightSphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 16, 2, scene);

    material = new BABYLON.StandardMaterial("material01", scene);
    material.reflectionTexture = new BABYLON.Texture("images/earth.jpg", scene);
    material.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;
    lightSphere1.material = material;


    // Lights colors
    light1.diffuse = new BABYLON.Color3(0, 1, 0);
    light1.specular = new BABYLON.Color3(0, 1, 0);

    // Animations
    var alpha = 0;
    scene.beforeRender = function () {
        light1.position = new BABYLON.Vector3(10 * Math.sin(alpha), 0, -10 * Math.cos(alpha));

        lightSphere1.position = light1.position;

        alpha += 0.01;
    };

    return scene;
}

 // End of createScene function

// -------------------------------------------------------------

// Now, call the createScene function that you just finished creating
var scene = createScene();
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
   scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
   engine.resize();
});
