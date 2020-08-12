var flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false,
radius = 10;
var line_width = 1;
var transparancy_contour = [0.2,0.8];
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

var hexcolor='#00c2ff';
var drawtool = 'pointer';
function initcontouring() {
  canvas.addEventListener("mousemove", function (e) {
    findxy('move', e)
  }, false);
  canvas.addEventListener("mousedown", function (e) {
   // document.body.style.cursor = 'wait';
     findxy('down', e)
  }, false);
  canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
  }, false);
  canvas.addEventListener("mouseout", function (e) {
    document.body.style.cursor = 'default';
    findxy('out', e)
  }, false);
}


function detectLeftButton(evt) {
    evt = evt || window.event;
    var button = evt.which || evt.button;
    return button == 1;
}


var circpoints = [];
var circ_size = 15;
function create_circle() {
var len = 1000;
var rat = 2*Math.PI/len;
var tempx, tempy;
var diffc = Math.round(circ_size/20)*2;
//console.log(diffc)

var circ_sizein = circ_size-2 ; 
var circ2 = circ_size*2+1;
        var matrix = get_2d_Uint8Array(circ2,circ2,1);
    //    console.log(matrix)
       for (var i=0;i<len;i+=1){
    tempx = Math.sin(i*rat)*circ_sizein + circ_size;
    tempy = Math.cos(i*rat)*circ_sizein + circ_size;
//console.log(Math.round(tempx),Math.round(tempy),i)
matrix[Math.round(tempx)][Math.round(tempy)] = 0;
}
       
var limits = [1,1,circ2-1,circ2-1];
matrix = floodFill(limits[1], limits[0],Stack,matrix,limits);

circpoints =[];
for (var i=1;i<circ2-1;i+=1){
for (var j=1;j<circ2-1;j+=1){
if (matrix[i][j]==1){
circpoints.push([i-circ_size,j-circ_size]);
//console.log(i-circ_size,j-circ_size)
}
}}
//console.log(circpoints)
}


function brush(e) {
var refnum = struct.indexnum[current_structure];
interpls[refnum][current_slice[2]] = 1;
mesh_created[refnum] = 0;
var rgbt = struct.colorsname[current_structure];
//var rgbt = struct.colorsname[struct.names[struct.indexnum[current_structure]]];
var rgbt_string = "rgba("+rgbt[0].toString()+","+rgbt[1].toString()+", "+rgbt[2].toString()+", 1)";
draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal_contouring();
  var data = matrix4[struct.indexnum[current_structure]][current_slice[2]];
  var diffX = currX-prevX;
  var diffY = currY-prevY;  
  pt = 20;
  var xxx = (diffX/pt);
  var yyy = (diffY/pt);
  var xt = prevX;
  var yt = prevY;
  var circ_l = circpoints.length;
  var xx = 0;
  var yy = 0;

  if (e.button_LR==true){
     //console.log(e) ;
       for (var tt=0;tt<pt;tt+=1)
    for (var i=0;i<circ_l;i+=1)
      {{
        xx = Math.round(xxx*tt);
        yy = Math.round(yyy*tt);
        var jj = prevY+yy+circpoints[i][1];
        var ii = (prevX+xx+circpoints[i][0]);
        data[jj][ii] = 1;
      }}
      }
 else{
  for (var tt=0;tt<pt;tt+=1)
    for (var i=0;i<circ_l;i+=1)
      {{
        xx = Math.round(xxx*tt);
        yy = Math.round(yyy*tt);
        var jj = prevY+yy+circpoints[i][1];
        var ii = prevX+xx+circpoints[i][0];
        data[jj][ii] = 0;
      }} 
}    

 var contour_line = MarchingSquaresJS.IsoContours(data, 0.5,"");
  matrix4[struct.indexnum[current_structure]][current_slice[2]]=data;
//console.log( struct.contours)  
 struct.contours[struct.indexnum[current_structure]][current_slice[2]] = contour_line;
 var temp_total_contours = contour_line.length;
 context.beginPath();
 for (var j=0;j<temp_total_contours;j+=1){
  var temp = contour_line[j];
  var length_temp = temp.length;
  var point = temp[0];
  context.moveTo(point[0], point[1]);
  for (var i=0;i<length_temp;i+=1){
    var point = temp[i];
    context.lineTo(point[0], point[1]);
  }}
  context.lineWidth=line_width;
  context.strokeStyle=rgbt_string;
  context.stroke();
}


function couch(e) {

var rgbt = [512,0,0];
//var rgbt = struct.colorsname[struct.names[struct.indexnum[current_structure]]];
var rgbt_string = "rgba("+rgbt[0].toString()+","+rgbt[1].toString()+", "+rgbt[2].toString()+", 1)";


draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal_contouring();
var point = [];
point[0]=[0,currY];
point[1]=[ctsize[0],currY];
  couchposition = currY;
context.beginPath();
context.moveTo(point[0][0], point[0][1]);
context.lineTo(point[1][0], point[1][1]);

  context.lineWidth=2;
  context.strokeStyle=rgbt_string;
  context.stroke();
}

var current_points = [];

function pencildraw(e) {
var refnum = struct.indexnum[current_structure];
interpls[refnum][current_slice[2]] = 1;
mesh_created[refnum] = 0;
var rgbt = struct.colorsname[current_structure];
var rgbt_string = "rgba("+rgbt[0].toString()+","+rgbt[1].toString()+", "+rgbt[2].toString()+", 1)";


draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal();
var temp = [Math.round(currX),Math.round(currY)];
current_points.push(temp);
 context.beginPath();
  context.moveTo(current_points[0][0], current_points[0][1]);
              for (var p=1;p<current_points.length;p+=1){
    context.lineTo(current_points[p][0], current_points[p][1]);
              }

  context.lineWidth=line_width;
  context.strokeStyle=rgbt_string;
  context.stroke();
}


function closeloop(e) {
var refnum = struct.indexnum[current_structure];
interpls[refnum][current_slice[2]] = 1;
mesh_created[refnum] = 0;
draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal_contouring();
var rgbt = struct.colorsname[current_structure];
var rgbt_string = "rgba("+rgbt[0].toString()+","+rgbt[1].toString()+", "+rgbt[2].toString()+", 1)";
var temp = [Math.round(currX),Math.round(currY)];
current_points.push(temp);
  var data = matrix4[struct.indexnum[current_structure]][current_slice[2]];
                var matrix = get_2d_Uint8Array(ctsize[0],ctsize[1],1);
  var d = 2000;
  dd = 200;
  var xx = Math.round(currX);
  var yy = Math.round(currY);
  var xp = current_points[0][0];
  var yp = current_points[0][1];

              for (var p=1;p<current_points.length;p+=1){
              var xx = current_points[p][0];
              var yy = current_points[p][1];
                for (var q=0;q<dd;q+=1){
                  xd = (xp*(dd-q)/dd+xx*(q/dd));
                  yd = (yp*(dd-q)/dd+yy*(q/dd));
                  matrix[Math.round(yd)][Math.round(xd)]= 0;
                }
              var xp = current_points[p][0];
              var yp = current_points[p][1];
              }
  var xx = Math.round(currX);
  var yy = Math.round(currY);
  var xp = current_points[0][0];
  var yp = current_points[0][1];
                for (var q=0;q<d;q+=1){
                  xd = (xp*(d-q)/d+xx*(q/d));
                  yd = (yp*(d-q)/d+yy*(q/d));
                  matrix[Math.round(yd)][Math.round(xd)]= 0;
                }

              limits = [0,0,511,511];
  matrix = floodFill(limits[1], limits[0],Stack,matrix,limits);  
    
 if (e.button_LR==true){

      for (var j=0;j<ctsize[1];j+=1)
      for (var i=0;i<ctsize[0];i+=1){{
      if (matrix[i][j]==1)
      data[i][j] = 1;
      }}
}
 else{
      for (var j=0;j<ctsize[1];j+=1)
      for (var i=0;i<ctsize[0];i+=1){{
      if (matrix[i][j]==1)
      data[i][j] = 0;
      }}
}

var contour_line = MarchingSquaresJS.IsoContours(data, 0.5,"");
  matrix4[struct.indexnum[current_structure]][current_slice[2]]=data;
 struct.contours[struct.indexnum[current_structure]][current_slice[2]] = contour_line;
 var temp_total_contours = contour_line.length;
 context.beginPath();
 for (var j=0;j<temp_total_contours;j+=1){
  var temp = contour_line[j];
  var length_temp = temp.length;
  var point = temp[0];
  context.moveTo(point[0], point[1]);
  for (var i=0;i<length_temp;i+=1){
    var point = temp[i];
    context.lineTo(point[0], point[1]);
  }}
  context.lineWidth=line_width;
  context.strokeStyle=rgbt_string;
  context.stroke();
  current_points = [];
}


function draw(e) {
if (drawtool=='pencil')
  pencildraw(e);
if (drawtool=='brush')
  brush(e);
if (drawtool=='couch')
  couch(e);
}

function findxy(res, e) {
//console.log(e.clientX,e.clientY)
//e.clientX = e.clientX/imageratio;
//e.clientY = e.clientY/imageratio;
   // console.log(e.type)
   // console.log(res)
  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;
currX = Math.round(currX/imageratio);
currY = Math.round(currY/imageratio);
    flag = true;
    dot_flag = true;
    if (dot_flag) {
      prevX = currX; prevY = currY;
      e.button_LR = detectLeftButton(e);
      draw(e);
      dot_flag = false;
    }
  }
  if (res == "out") {
    flag = false;
  }
  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
currX = Math.round(currX/imageratio);
currY = Math.round(currY/imageratio);

      e.button_LR = detectLeftButton(e);
      draw(e);
    }
  }

  if (res == 'up') {
        if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      currX = Math.round(currX/imageratio);
currY = Math.round(currY/imageratio);
      e.button_LR = detectLeftButton(e);
      if (drawtool=='pencil')
      closeloop(e);
    }
    flag = false;
  }


}


function hover_on_canvas(res, e) {

      currX = e.clientX - canvas2.offsetLeft;
      currY = e.clientY - canvas2.offsetTop;

  
//var c=document.getElementById("myCanvas");
//var ctx=c.getContext("2d");
context.beginPath();
context.clearRect(0,0,512,512);
      context.putImageData(img2, 0, 0);
context.arc(currX,currY,50,0,2*Math.PI);
//ctx.stroke();


//  context.lineWidth=line_width;
  context.strokeStyle=rgbt_string;
  context.stroke();



}

initcontouring();