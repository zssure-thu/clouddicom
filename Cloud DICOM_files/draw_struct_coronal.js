
function draw_struct_coronal() {
var canvas=document.getElementById('canvas');
context=canvas.getContext("2d");
var slicen = current_slice[2];
//console.log(slicen)
//console.log(struct.contours)
for (var refnum=0;refnum<struct.contours.length;refnum+=1){
//  for (var refnum=2;refnum<3;refnum+=1){
if(typeof struct.contours[refnum] != 'undefined') {  

//newstruct[struct.names[refnum]] = false;
//$.extend(parameters, newstruct);
//structtoggle.add( parameters, struct.names[refnum] ).onChange( parameters.showModelChanged );

if(parameters[struct.names[refnum]]==true){
if(typeof struct.contours[refnum][slicen] != 'undefined') {
for (var j=0;j<struct.contours[refnum][slicen].length;j+=1){
context.beginPath();
  context.moveTo(struct.contours[refnum][slicen][j][0][0], struct.contours[refnum][slicen][j][0][1]);
  for (var i=0;i<struct.contours[refnum][slicen][j].length;i+=1){
context.lineTo(struct.contours[refnum][slicen][j][i][0], struct.contours[refnum][slicen][j][i][1]);
  }
  context.lineWidth=1;
  context.strokeStyle=struct.colors[refnum];
  context.stroke();
}}}}}
    //	doPartialWork()
    //	conplete =1;
}


function draw_struct_coronal_contouring() {
var canvas=document.getElementById('canvas');
context=canvas.getContext("2d");
var slicen = current_slice[2];
for (var refnum=0;refnum<struct.contours.length;refnum+=1){

if(typeof struct.contours[refnum] != 'undefined') {  
if(struct.names[refnum] != current_structure) {
//console.log(struct.names[refnum])
if(parameters[struct.names[refnum]]==true){
if(typeof struct.contours[refnum][slicen] != 'undefined') {
for (var j=0;j<struct.contours[refnum][slicen].length;j+=1){
context.beginPath();
  context.moveTo(struct.contours[refnum][slicen][j][0][0], struct.contours[refnum][slicen][j][0][1]);
  for (var i=0;i<struct.contours[refnum][slicen][j].length;i+=1){
context.lineTo(struct.contours[refnum][slicen][j][i][0], struct.contours[refnum][slicen][j][i][1]);
  }
  context.lineWidth=1;
  context.strokeStyle=struct.colors[refnum];
  context.stroke();
}}}}}}
    //	doPartialWork()
    //	conplete =1;
}