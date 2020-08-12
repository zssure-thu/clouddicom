



function struct_flood() {
  var matrix2 = [];
  var matrix3 = [];
//var matrix4 = [];
var limits;

var d = 200;
var xx,yy,xp,yp,cl,xd,yd;

//for (var refnum=0;refnum<struct.contours.length;refnum+=1){
 //console.log(matrix_created)
 //console.log(parameters)
 for (var refnum=0;refnum<struct.contours.length;refnum+=1){
  matrix3 = [];
  if(typeof struct.contours[refnum] != 'undefined' && struct.ortype[refnum]!="MARKER") { 
    if(parameters[struct.names[refnum]+" "]==true && matrix_created[refnum] != 1){
  //    matrix_created[refnum] = 1;  
      for (var slicen=0;slicen<struct.contours[refnum].length;slicen+=1){
        if(typeof struct.contours[refnum][slicen] != 'undefined') { 
      //    console.log(struct.contours[refnum][slicen].length,slicen)
          for (var j=0;j<struct.contours[refnum][slicen].length;j+=1){
            
            cl = struct.contours[refnum][slicen][j].length;
        
            if (cl>3){
              var matrix = get_2d_Uint8Array(ctsize[0],ctsize[1],1);
              xp = struct.contours[refnum][slicen][j][cl-2][1];
              yp = struct.contours[refnum][slicen][j][cl-2][0];

              limits = [5000,5000,0,0];

              for (var i=0;i<cl-1;i+=1){

                xx = struct.contours[refnum][slicen][j][i][1];
                yy = struct.contours[refnum][slicen][j][i][0];

                if (xx<limits[1])limits[1] = xx;
                if (yy<limits[0])limits[0] = yy;
                if (xx>limits[2])limits[2] = xx;
                if (yy>limits[3])limits[3] = yy;

                for (var q=0;q<d;q+=1){
                  xd = (xp*(d-q)/d+xx*(q/d));
                  yd = (yp*(d-q)/d+yy*(q/d));
                  matrix[Math.round(xd)][Math.round(yd)]= 0;
                }
                xp = xx;
                yp = yy; 

                if (i==cl-2){
                  xp = struct.contours[refnum][slicen][j][0][1];
                  yp = struct.contours[refnum][slicen][j][0][0];  
                  for (var q=0;q<d;q+=1){
                    xd = (xx*(d-q)/d+xp*(q/d));
                    yd = (yy*(d-q)/d+yp*(q/d));
                    matrix[Math.round(xd)][Math.round(yd)]= 0;
                  }
                }


              }
              limits[0] = Math.floor(limits[0]) - 1;
              limits[1] = Math.floor(limits[1]) - 1;
              limits[2] = Math.ceil(limits[2]) + 1;
              limits[3] = Math.ceil(limits[3]) + 1;
var matrix = floodFill(limits[1], limits[0],Stack,matrix,limits);
for (var jj=0;jj<ctsize[1];jj+=1)
  for (var i=0;i<ctsize[0];i+=1){{
    if (jj<limits[1])matrix[jj][i] = 0;
    if (i<limits[0])matrix[jj][i] = 0;
    if (jj>limits[2])matrix[jj][i] = 0;
    if (i>limits[3])matrix[jj][i] = 0;
  }}
}
else{
  var matrix = get_2d_Uint8Array(ctsize[0],ctsize[1],0);
  for (var i=0;i<cl-1;i+=1){
    xx = struct.contours[refnum][slicen][j][i][1];
    yy = struct.contours[refnum][slicen][j][i][0];
    matrix[Math.round(xx)][Math.round(yy)]= 1;  
  }}


  if (j==0){
    matrix3[slicen] = matrix;
  }
  else{
    for (var jj=0;jj<ctsize[1];jj+=1)
      for (var i=0;i<ctsize[0];i+=1){{
        if (matrix[i][jj] ==1 && matrix3[slicen][i][jj]==1){
         matrix3[slicen][i][jj]=0;
       }
       else if (matrix[i][jj]==1 && matrix3[slicen][i][jj]==0){     
        matrix3[slicen][i][jj]=1;
      }
    }}

  }

}

}
else{
matrix3[slicen] = get_2d_Uint8Array(ctsize[0],ctsize[1],0);
}
}

matrix4[refnum] = matrix3;


 for (var refnum=0;refnum<struct.contours.length;refnum+=1){
  matrix3 = [];
  if(typeof struct.contours[refnum] != 'undefined' && struct.ortype[refnum]!="MARKER") { 
    if(parameters[struct.names[refnum]+" "]==true && matrix_created[refnum] != 1){
      matrix_created[refnum] = 1;  
      for (var slicen=0;slicen<struct.contours[refnum].length;slicen+=1){
        if(typeof struct.contours[refnum][slicen] != 'undefined') { 
      //    console.log(struct.contours[refnum][slicen].length,slicen)
          for (var j=0;j<struct.contours[refnum][slicen].length;j+=1){
            
            cl = struct.contours[refnum][slicen][j].length;
        
            if (cl>3){
              var matrix = get_2d_Uint8Array(ctsize[0],ctsize[1],1);
              xp = struct.contours[refnum][slicen][j][cl-2][1];
              yp = struct.contours[refnum][slicen][j][cl-2][0];

              limits = [5000,5000,0,0];

              for (var i=0;i<cl-1;i+=1){

                xx = struct.contours[refnum][slicen][j][i][1];
                yy = struct.contours[refnum][slicen][j][i][0];

           //     if (xx<limits[1])limits[1] = xx;
             //   if (yy<limits[0])limits[0] = yy;
             //   if (xx>limits[2])limits[2] = xx;
            ////    if (yy>limits[3])limits[3] = yy;

                for (var q=0;q<d;q+=1){
                  xd = (xp*(d-q)/d+xx*(q/d));
                  yd = (yp*(d-q)/d+yy*(q/d));
               matrix4[refnum][slicen][Math.round(xd)][Math.round(yd)]= 1;
                }
                xp = xx;
                yp = yy; 

                if (i==cl-2){
                  xp = struct.contours[refnum][slicen][j][0][1];
                  yp = struct.contours[refnum][slicen][j][0][0];  
                  for (var q=0;q<d;q+=1){
                    xd = (xx*(d-q)/d+xp*(q/d));
                    yd = (yy*(d-q)/d+yp*(q/d));
                    matrix4[refnum][slicen][Math.round(xd)][Math.round(yd)]= 1;
                  }
                }


              }}}}}}}}




/*
console.log(matrix4[refnum] )

dimensions = [512,512];
var largest =3000;
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");
var img=context.createImageData(dimensions[0],dimensions[1]);
var dim4 = [dimensions[0]*4,dimensions[1]*4];


var kk;
k = 114;
//k = 96;
for (var j=0;j<dimensions[0];j+=1)
  for (var i=0;i<dimensions[1];i+=1)
    {{
      kk = j*dim4[0]+(i*4);

      img.data[kk+0]=matrix3[k][j][i]*255;
      img.data[kk+1]=matrix3[k][j][i]*255;
      img.data[kk+2]=matrix3[k][j][i]*255;
      img.data[kk+3]=255;
    }}
    context.putImageData(img, 0, 0);
*/

  }






/*
down = [8,8,2];
var md = down[0]*down[1]*down[2];
ctsized[0] = Math.ceil(ctsize[0]/down[0]);
ctsized[1] = Math.ceil(ctsize[1]/down[1]);
ctsized[2] = Math.ceil(ctsize[2]/down[2]);


var matrix3d =get_3d_array(ctsized[0], ctsized[1],ctsized[2], 0);
var zr,jr,ir;
for (var kk=0;kk<ctsize[2];kk+=1){
  kr = Math.floor(kk/down[2]);
if(typeof matrix4[refnum][kk] != 'undefined') { 
for (var jj=0;jj<ctsize[1];jj+=1){
  jr = Math.floor(jj/down[1]);
for (var ii=0;ii<ctsize[0];ii+=1){
  ir = Math.floor(ii/down[0]);
matrix3d[kr][jr][ir] += matrix4[refnum][kk][jj][ii]/md;}}}}
matrix4d[refnum] = matrix3d;
*/





}

}

//draw_ct("canvas",matrix3,[512,512],113,'axial');

/*
var slicen = 30;
var refnum = 3;
current_slice[2] = slicen;

var canvas=document.getElementById('canvas');
var context=canvas.getContext("2d");
var img=context.createImageData(ctsize[0],ctsize[1]);
img = put_image(img,matrix4[refnum][slicen],ctsize);
     context.putImageData(img,0,0);

 var contour_line = MarchingSquaresJS.IsoContours(matrix4[refnum][slicen], 0.5,"");
 //console.log(contour_line);
var temp_total_contours = contour_line.length;
 context.beginPath();
 for (var j=0;j<temp_total_contours;j+=1){
  var temp = contour_line[j];
  var length_temp = temp.length;
  var point = temp[0];
  context.moveTo(point[1], point[0]);
  for (var i=0;i<length_temp;i+=1){
    var point = temp[i];
    context.lineTo(point[1], point[0]);
  }}
  context.lineWidth=1;
  context.strokeStyle=struct.colors[refnum+1];
  context.stroke();

  */


}