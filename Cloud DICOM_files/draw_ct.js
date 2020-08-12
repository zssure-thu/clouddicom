
function draw_ct(canvas,ct,dimensions,z,profile){
var largest =3000;
var canvas=document.getElementById(canvas);
var context=canvas.getContext("2d");
var img=context.createImageData(dimensions[0],dimensions[1]);
var dim4 = [dimensions[0]*4,dimensions[1]*4];

if (profile =='axial_first'){
var kk;
k = z;
for (var j=0;j<dimensions[0];j+=1)
  for (var i=0;i<dimensions[1];i+=1)
    {{
      kk = j*dim4[0]+(i*4);
      img.data[kk+0]=ct[k][j][i]*255/largest;
      img.data[kk+1]=ct[k][j][i]*255/largest;
      img.data[kk+2]=ct[k][j][i]*255/largest;
      img.data[kk+3]=255;
    }}
    if (canvas.width<img.width){
cw = canvas.width;
ch = canvas.height;
canvas.height = img.height;
canvas.width = img.width;
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
canvas.height = ch;
canvas.width = cw;
}
else
{
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
}
var newCanvas = $("<canvas>")
    .attr("width", imageData.width)
    .attr("height", imageData.height)[0];

newCanvas.getContext("2d").putImageData(imageData, 0, 0);
//context.scale(.5, .5);
context.scale(canvas.width/img.width, canvas.height/img.height);
context.drawImage(newCanvas, 0, 0);

//context.drawImage(newCanvas, 0, 0, img.width,    img.height,    // source rectangle
//                   0, 0, newCanvas.width, newCanvas.height)

}


if (profile =='axial'){
var kk;
k = z;
for (var j=0;j<dimensions[0];j+=1)
  for (var i=0;i<dimensions[1];i+=1)
    {{
      kk = j*dim4[0]+(i*4);
      img.data[kk+0]=ct[k][j][i]*255/largest;
      img.data[kk+1]=ct[k][j][i]*255/largest;
      img.data[kk+2]=ct[k][j][i]*255/largest;
      img.data[kk+3]=255;
    }}
    if (canvas.width<img.width){
cw = canvas.width;
ch = canvas.height;
canvas.height = img.height;
canvas.width = img.width;
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
canvas.height = ch;
canvas.width = cw;
}
else
{
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
}

var newCanvas = $("<canvas>")
    .attr("width", imageData.width)
    .attr("height", imageData.height)[0];
newCanvas.getContext("2d").putImageData(imageData, 0, 0);
if (canvas.width<img.width)
context.scale(canvas.width/img.width, canvas.height/img.height);
context.drawImage(newCanvas, 0, 0);
}



if (profile =='cor'){
var i = z;
for (var j=0;j<dimensions[0];j+=1)
  for (var k=0;k<dimensions[1];k+=1)
    {{
      kk = k*dim4[0]+(j*4);
      img.data[kk+0]=ct[k][i][j]*255/largest;
      img.data[kk+1]=ct[k][i][j]*255/largest;
      img.data[kk+2]=ct[k][i][j]*255/largest;
      img.data[kk+3]=255;
    }}
  if (canvas.width<img.width){
cw = canvas.width;
ch = canvas.height;
canvas.height = img.height;
canvas.width = img.width;
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
canvas.height = ch;
canvas.width = cw;
}
else
{
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
}
var newCanvas = $("<canvas>")
    .attr("width", imageData.width)
    .attr("height", imageData.height)[0];

newCanvas.getContext("2d").putImageData(imageData, 0, 0);
if (canvas.width<img.width)
context.scale(canvas.width/img.width, canvas.height/img.height);
context.drawImage(newCanvas, 0, 0);

}

if (profile =='cor_first'){
var i = z
for (var j=0;j<dimensions[0];j+=1)
  for (var k=0;k<dimensions[1];k+=1)
    {{
      kk = k*dim4[0]+(j*4);
      img.data[kk+0]=ct[k][i][j]*255/largest;
      img.data[kk+1]=ct[k][i][j]*255/largest;
      img.data[kk+2]=ct[k][i][j]*255/largest;
      img.data[kk+3]=255;
    }}
  if (canvas.width<img.width){
cw = canvas.width;
ch = canvas.height;
canvas.height = img.height;
canvas.width = img.width;
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
canvas.height = ch;
canvas.width = cw;
}
else
{
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
}
var newCanvas = $("<canvas>")
    .attr("width", imageData.width)
    .attr("height", imageData.height)[0];

newCanvas.getContext("2d").putImageData(imageData, 0, 0);
context.scale(canvas.width/img.width, canvas.height/img.height);
context.drawImage(newCanvas, 0, 0);
}




if (profile =='sag'){
var j = z;
for (var i=0;i<dimensions[0];i+=1)
  for (var k=0;k<dimensions[1];k+=1)
    {{
      kk = k*dim4[0]+(i*4);
      img.data[kk+0]=ct[k][i][j]*255/largest;
      img.data[kk+1]=ct[k][i][j]*255/largest;
      img.data[kk+2]=ct[k][i][j]*255/largest;
      img.data[kk+3]=255;
    }}
  if (canvas.width<img.width){
cw = canvas.width;
ch = canvas.height;
canvas.height = img.height;
canvas.width = img.width;
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
canvas.height = ch;
canvas.width = cw;
}
else
{
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
}
var newCanvas = $("<canvas>")
    .attr("width", imageData.width)
    .attr("height", imageData.height)[0];

newCanvas.getContext("2d").putImageData(imageData, 0, 0);
if (canvas.width<img.width)
context.scale(canvas.width/img.width, canvas.height/img.height);
context.drawImage(newCanvas, 0, 0);


}
if (profile =='sag_first'){
var j = z
for (var i=0;i<dimensions[0];i+=1)
  for (var k=0;k<dimensions[1];k+=1)
    {{
      kk = k*dim4[0]+(i*4);
      img.data[kk+0]=ct[k][i][j]*255/largest;
      img.data[kk+1]=ct[k][i][j]*255/largest;
      img.data[kk+2]=ct[k][i][j]*255/largest;
      img.data[kk+3]=255;
    }}
  if (canvas.width<img.width){
cw = canvas.width;
ch = canvas.height;
canvas.height = img.height;
canvas.width = img.width;
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
canvas.height = ch;
canvas.width = cw;
}
else
{
context.putImageData(img, 0, 0);
var imageData = context.getImageData(0, 0,img.width,img.height);
}
var newCanvas = $("<canvas>")
    .attr("width", imageData.width)
    .attr("height", imageData.height)[0];

newCanvas.getContext("2d").putImageData(imageData, 0, 0);
context.scale(canvas.width/img.width, canvas.height/img.height);
context.drawImage(newCanvas, 0, 0);

}


}