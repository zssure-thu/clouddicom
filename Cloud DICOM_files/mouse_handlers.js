



$(document).ready(function(){
    $("#ThreeJS").on("mouseleave", function(){
enableScroll();
    })
    $("#ThreeJS").on("mouseenter", function(){
disableScroll() ;
    })
$("#canvas").on("mouseleave", function(){
enableScroll();
    })
    $("#canvas").on("mouseenter", function(){
disableScroll() ;
    })
$("#canvas2").on("mouseleave", function(){
enableScroll();
    })
    $("#canvas2").on("mouseenter", function(){
disableScroll() ;
    })
    $("#canvas3").on("mouseleave", function(){
enableScroll();
    })
    $("#canvas3").on("mouseenter", function(){
disableScroll() ;
    })


});




var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {

if (isFirefox==true) {
      window.addEventListener('DOMMouseScroll', preventDefault, false);
    }
else
{
  if (window.addEventListener)
window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
  
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null; 
}


//document.body.style.backgroundColor = "black"; 


function MouseWheelHandler(e) {
  var e = window.event || e; // old IE support
e.wheelDelta = e.wheelDelta ? e.wheelDelta : -e.detail;
  if (e.wheelDelta <0 && ctsize[2]>current_slice[2]){
    current_slice[2] = current_slice[2]+1;
draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal();
get_planethree(current_slice[2]);
}
    if (e.wheelDelta >0 && 0<current_slice[2]){
    current_slice[2] = current_slice[2]-1;
draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal();
get_planethree(current_slice[2]);

//canvas=document.getElementById("canvas");
//context=canvas.getContext("2d");
//img=context.createImageData(ctsize[0],ctsize[1]);
//img2 =context.getImageData(0,0,ctsize[0],ctsize[1]);
}
//console.log(e)
  return false;
}

function MouseWheelHandler2(e) {
  var e = window.event || e; // old IE support
e.wheelDelta = e.wheelDelta ? e.wheelDelta : -e.detail;
  if (e.wheelDelta <0 && ctsize[1]>current_slice[1]){
    current_slice[1] = current_slice[1]+1;
  draw_ct("canvas2",ct_sort,[ctsize[0],ctsize[2]],current_slice[1],'cor');
  }
    if (e.wheelDelta >0 && 0<current_slice[1]){
    current_slice[1] = current_slice[1]-1;
 draw_ct("canvas2",ct_sort,[ctsize[0],ctsize[2]],current_slice[1],'cor');
}
  return false;
}


function MouseWheelHandler3(e) {
  var e = window.event || e; // old IE support
e.wheelDelta = e.wheelDelta ? e.wheelDelta : -e.detail;
  if (e.wheelDelta <0 && ctsize[1]>current_slice[0]){
    current_slice[0] = current_slice[0]+1;
  draw_ct("canvas3",ct_sort,[ctsize[0],ctsize[2]],current_slice[0],'sag');
  }
    if (e.wheelDelta >0 && 0<current_slice[0]){
    current_slice[0] = current_slice[0]-1;
 draw_ct("canvas3",ct_sort,[ctsize[0],ctsize[2]],current_slice[0],'sag');
}
  return false;
}



var myimage = document.getElementById("canvas");
if (myimage.addEventListener) {
  // IE9, Chrome, Safari, Opera
  myimage.addEventListener("mousewheel", MouseWheelHandler, false);
  // Firefox
  myimage.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
// IE 6/7/8
else myimage.attachEvent("onmousewheel", MouseWheelHandler);


var myimage2 = document.getElementById("canvas2");
if (myimage2.addEventListener) {
  // IE9, Chrome, Safari, Opera
  myimage2.addEventListener("mousewheel", MouseWheelHandler2, false);
  // Firefox
  myimage2.addEventListener("DOMMouseScroll", MouseWheelHandler2, false);
}
// IE 6/7/8
else myimage2.attachEvent("onmousewheel", MouseWheelHandler2);

var myimage3 = document.getElementById("canvas3");
if (myimage3.addEventListener) {
  // IE9, Chrome, Safari, Opera
  myimage3.addEventListener("mousewheel", MouseWheelHandler3, false);
  // Firefox
  myimage3.addEventListener("DOMMouseScroll", MouseWheelHandler3, false);
}
// IE 6/7/8
else myimage3.attachEvent("onmousewheel", MouseWheelHandler3);
