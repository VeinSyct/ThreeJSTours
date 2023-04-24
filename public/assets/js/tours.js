//public#tours={"library":"ayala 01","splash":"https://upload.wikimedia.org/wikipedia/commons/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg","rotation":"90","elevation":"1.55","lookAt":{"x":"-1","z":"-.2"},"nodes":[{"src":"https://upload.wikimedia.org/wikipedia/commons/3/3c/Vue_de_nuit_de_la_Place_Stanislas_%C3%A0_Nancy.jpg","x":"0","y":"0","z":"0",_param},{"src":"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/PanoStanislasCrepuscule.jpg/1920px-PanoStanislasCrepuscule.jpg","x":"0","y":"0","z":"3",_param}]}
function getParameters(tour){
  if(tour!==undefined){
    if(tour[0]=='{'){
      tour=tour.replace(/_param/g,'"o":180,"po":{"x":0,"y":0},"px":4.2,"node":{"src":"node.gif","w":2.4,"h":2.4,"dSide":false,"follows":false,"map":false}')
      tour=JSON.parse(tour)
      for(nI0=0;nI0<tour.nodes.length;nI0++){
        tour.nodes[nI0].x=parseFloat(tour.nodes[nI0].x)
        tour.nodes[nI0].y=parseFloat(tour.nodes[nI0].y)
        tour.nodes[nI0].z=parseFloat(tour.nodes[nI0].z)
      }
      return{
        nodes:tour.nodes,
        splash:tour.splash,
        library:tour.library,
        rotation:parseFloat(tour.rotation),elevation:parseFloat(tour.elevation),
        lookAt:{x:parseFloat(tour.lookAt.x),z:parseFloat(tour.lookAt.z)},
        //NODE STANDARD
        leftbottom:{type:'website',url:'https://realholmes.ph',icon:'RealHolmes-Logo.png',size:'56px'},
        rightbottom:{type:'mappin',url:'14.425939759011836,121.02271956411666',icon:'mappin.gif',size:'48px'},
        zoom:!isOnL()?false:.5,radius:!isOnL()?null:2.5,external:true
      }
    }
  }else tour='retailcongress'
  if(tour=='retailcongress')return{
    nodes:[
      {src:'assets/tours/'+tour+'/VR 000.jpg',x:0,y:0,z:0,o:180,po:{x:0,y:0},px:4.2,node:{src:'node.gif',w:2.4,h:2.4,dSide:false,follows:false,map:false}},
      {src:'assets/tours/'+tour+'/VR 001.jpg',x:0,y:0,z:3,o:180,po:{x:0,y:0},px:4.2,node:{src:'node.gif',w:2.4,h:2.4,dSide:false,follows:false,map:false}},
      {src:'assets/tours/'+tour+'/VR 002.jpg',x:0,y:0,z:6,o:180,po:{x:0,y:0},px:4.2,node:{src:'node.gif',w:2.4,h:2.4,dSide:false,follows:false,map:false}},
      {src:'assets/tours/'+tour+'/VR 003.jpg',x:-3,y:0,z:6,o:90,po:{x:0,y:0},px:4.2,node:{src:'node.gif',w:2.4,h:2.4,dSide:false,follows:false,map:false}},
    ],
    splash:'assets/tours/splash/retailcongress.jpg',
    library:'retailcongress',
    leftbottom:{type:'website',url:'https://realholmes.ph',icon:'RealHolmes-Logo.png',size:'56px'},
    rightbottom:{type:'mappin',url:'14.425939759011836,121.02271956411666',icon:'mappin.gif',size:'48px'},
    rotation:90,elevation:1.55,
    zoom:!isOnL()?false:.5,radius:!isOnL()?null:2.5,
    lookAt:{x:1,z:0}
  }
  if(tour=='scootermaster')return{
    nodes:[
      {src:'assets/tours/'+tour+'/VR 000.jpg',x:0,y:0,z:0,o:180,po:{x:0,y:0},px:4.2,node:{src:'node.gif',w:2.4,h:2.4,dSide:false,follows:false,map:false}},
      {src:'assets/tours/'+tour+'/VR 001.jpg',x:1.5,y:0,z:-3,o:180,po:{x:0,y:0},px:4.2,node:{src:'node.gif',w:2.4,h:2.4,dSide:false,follows:false,map:false}},
    ],
    splash:'assets/tours/splash/scootermaster.jpg',
    library:'scootermaster',
    leftbottom:{type:'website',url:'https://realholmes.ph',icon:'RealHolmes-Logo.png',size:'56px'},
    rightbottom:{type:'mappin',url:'14.425939759011836,121.02271956411666',icon:'mappin.gif',size:'48px'},
    rotation:90,elevation:1.55,
    zoom:!isOnL()?false:.5,radius:!isOnL()?null:2.5,
    lookAt:{x:-1,z:-.2}
  }
  return getParameters()
}
