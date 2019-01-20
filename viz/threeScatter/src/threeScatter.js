var dscc = require('@google/dscc');
var d3 = require('d3');
var THREE = require('three');
THREE.OrbitControls = require('./orbitControls.js');


var returnObj = function(message){
  //Fetch an option by key from the subscription message.
  function getOption(i){
    if(message.style[i] === undefined){
      return null;
    }
    else if(message.style[i].value === undefined){
      return message.style[i].defaultValue;
    }
    else if(message.style[i].value.color !== undefined){
      return message.style[i].value.color;
    }
    else{
      return message.style[i].value
    }
  }
  //Log a label and value to the console, only if the option is set.
  function devMsg(msg,val){if(getOption('devMessages')){ console.log(msg,val)}}
  //Create a point.
  function v(x,y,z){ return new THREE.Vector3(x,y,z);}
  //Create a box.
  function box(){
    var lineGeo = new THREE.Geometry();
    lineGeo.vertices.push(
      v(-50, 50, -50),
      v(50, 50, -50),
      v(50, -50, -50),
      v(-50, -50, -50),

      v(-50, 50, -50),
      v(-50, 50, 50),
      v(50, 50, 50),
      v(50, 50, -50),

      v(50, -50, -50),
      v(50, -50, 50),
      v(50, 50, 50),
      v(-50, 50, 50),

      v(-50, -50, 50),
      v(50, -50, 50),
      v(-50, -50, 50),
      v(-50, -50, -50)
    );
    var lineGeo = new THREE.Geometry();
    lineGeo.vertices.push(
      v(-50, 50, -50),
      v(50, 50, -50),
      v(50, -50, -50),
      v(-50, -50, -50),

      v(-50, 50, -50),
      v(-50, 50, 50),
      v(50, 50, 50),
      v(50, 50, -50),

      v(50, -50, -50),
      v(50, -50, 50),
      v(50, 50, 50),
      v(-50, 50, 50),

      v(-50, -50, 50),
      v(50, -50, 50),
      v(-50, -50, 50),
      v(-50, -50, -50)
    );
    var lineMat = new THREE.LineBasicMaterial({color: 0x808080, linewidth: 1});
    var line = new THREE.Line(lineGeo, lineMat);

    return line;
  }
  //Draw all points.
  function points(data, colors, index){
    var color = colors[index];
    //define our material
    var mat = new THREE.PointsMaterial({color: color,
        size: 1.5,
        transparent: true,
        opacity: 0.5,
        depthTest: false,
        blending: THREE.AdditiveBlending
    });
    // compute scales for attributes
    // note these are hard-coded for now
    var indexes = [
      (data[0].length - 3),
      (data[0].length - 2),
      (data[0].length - 1)
    ];
    var scales = indexes.map(function (i) {
      var domain = d3.extent(data, function (d) {
        return parseInt(d[i]);
      });
      return d3.scaleSqrt()
          .domain(
            domain
          )
          .range([-50, 50]);
    });
    //define our geo object
    var pointGeo = new THREE.Geometry();
    //iterate over returned data to make points
    data.forEach(function (d, i) {
      var x = scales[0](parseInt(d[indexes[0]]));
      var y = scales[1](parseInt(d[indexes[1]]));
      var z = scales[2](parseInt(d[indexes[2]]));
      if(i%colors.length==index){
          pointGeo.vertices.push(v(x,y,z));
      }
    });
    var points = new THREE.Points(pointGeo, mat);
    return points;
  }
  //Draw the spotlight.
  function light(){
    // add a spotlight to the scene
    var light = new THREE.SpotLight();
    light.position.set( -10, 20, 16 );
    return light;
  }
  //Main animation function.
  function animate(t) {
    if(getOption('interactive')){
      // update positions based on mouse input
      controls.update();
    }
    else{
      // spin the camera in a circle
      camera.position.x = Math.sin(t/3000)*300;
      camera.position.y = 100;
      camera.position.z = Math.cos(t/3000)*300;
      // point the camera at the origin
      camera.lookAt(scene.position);

    }

    // render the scene again
    renderer.render(scene, camera);
    // request the next animation frame to render again
    window.requestAnimationFrame(animate, renderer.domElement);
  }

  var data = message.tables.DEFAULT.rows;
  devMsg('returned ' + data.length + 'rows', message);
  //clear out everything when we get an update
  d3.selectAll('canvas').remove();
  // create the scene
  var scene = new THREE.Scene();
  // create the camera with 45-degree field of view and an aspect ratio that matches the viewport
  var camera = new THREE.PerspectiveCamera(45, dscc.getWidth() / dscc.getHeight(), 1, 1000);
camera.position.set( 0, 20, 300 );
  // orbital controls with the mouse for the camera
  if(getOption('interactive')){
    var controls = new THREE.OrbitControls( camera );
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.update();
  }

  // create the renderer
  var renderer = new THREE.WebGLRenderer();
  // make the renderer fill the viewport
  renderer.setSize(dscc.getWidth(), dscc.getHeight());

  // add the DOM element that the renderer will draw to to the page
  document.body.appendChild(renderer.domElement);
  // set the background color to almost-white
  renderer.setClearColor(getOption('bgColor'), 1.0);
  renderer.clear();

  // create the main object
  var scatterPlot = new THREE.Object3D();
  scene.add(scatterPlot);
  scatterPlot.rotation.y = 0.5;

  // add the box
  if(getOption('showBox')){
      scatterPlot.add(box());
  }

  // we define more than one color so alpha blending looks cool!
  var colors = [getOption('alphaOneColor'),getOption('alphaTwoColor')];
  colors.map(function(color, index){
      scatterPlot.add(points(data,colors,index));
  });

  // add a spotlight
  scene.add(light());

  // animate the scene
  animate(new Date().getTime());

  return {scene: scene};
}

module.exports = returnObj;
