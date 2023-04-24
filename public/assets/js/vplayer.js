// ==== IMPORTS ====
import * as THREE from'./three.module.js'
import{RGBELoader}from'./RGBELoader.js'
import{GroundProjectedEnv}from'./GroundProjectedEnv.js'
import{OrbitControls}from'./OrbitControls.js'
import{EffectComposer}from'./EffectComposer.js'
import{RenderPass}from'./RenderPass.js'
import{ShaderPass}from'./ShaderPass.js'
// ==== START OF ENGINE ====
// ==== APP ROOT ====
// Start app
window.startApp=function(){
  if(lsRd('permission')==null)lsSv('permission',"B'/''''&.b&.a/-") // Permission key do not errase
  loadEnvironment({
    camera:{
      fov:{desktop:104,horizontal:78,vertical:96,distortion:{fadeIn:1.05,fadeOut:.99}},
      lens:{desktop:.36,horizontal:.18,vertical:.04},
    },
    fadeTime:{in:256,out:64,back:2400,opacity:.24},
    nodePixels:{desktop:3.6,mobile:2.4},
    drag:{rate:-.36}
  }) // Camera and scene orientation
  $('#welcome').fadeOut('fast')
  $('#loadingBar').fadeIn('slow')
  $('#loadingFill').css('width','1%')
  loadTours()
  loadControls()
  document.addEventListener('mouseup',mouseUp)
  lsSv('FirstRun','done')
}
// ==== RENDERING ====
// Render
function render(){
  requestAnimationFrame(render)
  if(vParameters.composer){
    vParameters.composer.render(vParameters.scene,vParameters.camera)
  }else vParameters.renderer.render(vParameters.scene,vParameters.camera)
  vParameters.orbitControl.update()
  animateNode()
}
// ==== OPERATION ====
// Load environment
function loadEnvironment(settings){
  vParameters.scene=new THREE.Scene()
  // Camera
  vParameters.drag=settings.drag
  vParameters.fov=settings.camera.fov
  vParameters.lens=settings.camera.lens
  vParameters.fov.angle=getCameraFOV().fov
  vParameters.camera=new THREE.PerspectiveCamera(vParameters.fov.angle,window.innerWidth/window.innerHeight,1,100000)
  // Ambient light
  vParameters.scene.add(new THREE.AmbientLight(0xffffff))
  // Renderer
  vParameters.renderer=new THREE.WebGLRenderer()
  vParameters.renderer.setPixelRatio(window.devicePixelRatio*isMobile?settings.nodePixels.mobile:settings.nodePixels.desktop)
  vParameters.renderer.setSize(window.innerWidth,window.innerHeight)
  vParameters.renderer.outputEncoding=THREE.sRGBEncoding
  vParameters.composer=onLens(getCameraFOV().lens)
  vParameters.renderer.autoClearColor=false
  document.getElementById('world').appendChild(vParameters.renderer.domElement)
  window.addEventListener('resize',onWindowResize)
  vParameters.fadeTime=settings.fadeTime
}
// Winidow resize
function onWindowResize(){
  vParameters.camera.aspect=window.innerWidth/window.innerHeight
  vParameters.renderer.setSize(window.innerWidth,window.innerHeight)
  getOrientation()
  vParameters.fov.angle=getCameraFOV().fov
  vParameters.camera.fov=vParameters.fov.angle*vParameters.fov.distortion.fadeIn
  vParameters.camera.updateProjectionMatrix()
  vParameters.composer=onLens(getCameraFOV().lens)
  loadControls()
  onNode(processMemory.nodeIndex)
}
// Get camera fov
function getCameraFOV(){
  return {
    fov:!isMobile?vParameters.fov.desktop:orientation==90?vParameters.fov.horizontal:vParameters.fov.vertical,
    lens:!isMobile?vParameters.lens.desktop:orientation==90?vParameters.lens.horizontal:vParameters.lens.vertical
  }
}
// Orbit control
function loadControls(){
  processMemory.target=lastPosition(true)
  if(!processMemory.target)processMemory.target=lastPosition(true)
  if(vParameters.orbitControl!==undefined)vParameters.orbitControl.dispose()
  vParameters.orbitControl=new OrbitControls(vParameters.camera,vParameters.renderer.domElement)
  vParameters.orbitControl.minDistance=0
  vParameters.orbitControl.maxDistance=vParameters.parameters.zoom?vParameters.parameters.zoom:.01
  vParameters.orbitControl.target.set(processMemory.target.x,vParameters.parameters.elevation,processMemory.target.z)
  vParameters.orbitControl.enablePan=false
  vParameters.orbitControl.enableDamping=true
  if(isMobile)vParameters.orbitControl.rotateSpeed*=vParameters.drag.rate
}
// Return constant
window.returnConstant=function(sel0,str0){
  if(sel0=='rGBELoader')return new RGBELoader()
  if(sel0=='groundProjectedEnv'){
    try{
      processMemory.env=new GroundProjectedEnv(str0)
    }catch(e){return false}
    return processMemory.env
  }
  if(sel0=='effectComposer')return new EffectComposer(vParameters.renderer)
  if(sel0=='renderPass')return new RenderPass(vParameters.scene,str0)
	if(sel0=='shaderPass')return new ShaderPass(getDistortionShaderDefinition())
  if(sel0=='sphereMesh')return new THREE.Mesh(new THREE.SphereGeometry(100,32,64),new THREE.MeshStandardMaterial({
    transparent:true,
    side:THREE.DoubleSide,
  }))
  if(sel0=='textureLoader')return new THREE.TextureLoader()
  if(sel0=='sRGBEncoding')return THREE.sRGBEncoding
  if(sel0=='equirectangularReflectionMapping')return THREE.EquirectangularReflectionMapping
  if(sel0=='raycaster')return new THREE.Raycaster()
  if(sel0=='rayVec3')return new THREE.Vector3((event.clientX/window.innerWidth)*2-1,-(event.clientY/window.innerHeight)*2+1,.5)
  if(sel0=='meshStandardMaterial')return new THREE.MeshStandardMaterial()
  if(sel0=='doubleSide')return THREE.DoubleSide
  if(sel0=='texture')return new THREE.Texture(str0)
  if(sel0=='nodeMesh')return new THREE.Mesh(
    new THREE.PlaneGeometry(processMemory.tourNodes[str0].node.w,processMemory.tourNodes[str0].node.h),
    processMemory.material[str0].clone()
  )
  if(sel0=='vector3'){
    if(str0){
      return new THREE.Vector3(str0.x,str0.y,str0.z)
    }else return new THREE.Vector3()
  }
}
// Star rendering
window.startRender=function(){
  $('#loadingFill').css('width','95%')
  setTimeout(function(){
    $('#loadingFill').css('width','100%')
    $('#loadingBar').fadeOut('slow')
    $('#world').fadeIn('slow')
  },600)
  render()
}
// On hash
window.onHash=function(hash){
  loadTours()
  if(processMemory.prevZoom!=(vParameters.parameters.zoom==false?false:true))location.reload()
}
// Save last position
window.lastPosition=function(load){
  if(load){
    if(lsRd(getParameters(getURL().tour).library+'leavePosition')){
      vParameters.origin=JSON.parse(lsRd(getParameters(getURL().tour).library+'leavePosition')).node
      vParameters.target=JSON.parse(lsRd(getParameters(getURL().tour).library+'leavePosition')).target
      vParameters.camera.lookAt(vParameters.target.x*1,vParameters.target.y*1+vParameters.parameters.elevation,vParameters.target.z*1)
      vParameters.camera.position.set(vParameters.target.x*-1,vParameters.target.y*-1+vParameters.parameters.elevation,vParameters.target.z*-1)
      return{x:0,z:0}
    }else{
      vParameters.camera.position.set(0,vParameters.parameters.elevation,0)
      vParameters.camera.lookAt(vParameters.parameters.lookAt.x,vParameters.parameters.elevation,vParameters.parameters.lookAt.z)
      lastPosition()
      return
    }
  }else lsSv(getParameters(getURL().tour).library+'leavePosition',JSON.stringify({node:processMemory.nodeIndex,target:returnConstant('vector3',{x:0,y:0,z:-1}).applyQuaternion(vParameters.camera.quaternion)}))
}
// Interactive
window.mouseUp=function(){
  if(vParameters.parameters.nodes[processMemory.nodeIndex].src&&vParameters.camera)lastPosition()
}
