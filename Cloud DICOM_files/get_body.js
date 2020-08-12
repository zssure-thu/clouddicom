
function getbody() {

var refnum = struct.indexnum[current_structure];
var size = ctsize;
mesh_created[refnum] = 0;
var temp = 0;
//var limits = [0,0,511,511];
var limits = [5000,5000,0,0];
for (var k = 0; k < ctsize[2]; k++){
limits = [5000,5000,0,0];
//k = current_slice[2];
temp=0;
    var matrix = get_2d_Uint8Array(size[0],size[1],1);
//    var matrix = get_2d_Uint8Array_body_couch(size[0],size[1],1);
 

    for (var yy=0;yy<size[1];yy+=1){
    for (var xx=0;xx<size[0];xx+=1){
if (ct_sort[k][xx][yy]>800){
  temp=1;
      matrix[xx][yy]= 0;
     if (xx<limits[1])limits[1] = xx;
                if (yy<limits[0])limits[0] = yy;
                if (xx>limits[2])limits[2] = xx;
                if (yy>limits[3])limits[3] = yy;

}}}
if (temp==1){
  if (limits[0]>0)
   limits[0] = limits[0]-1;
  if (limits[1]>0)
   limits[1] = limits[1]-1;
    if (limits[2]<size[0]-1)
   limits[2] = limits[2]+1;
    if (limits[3]<size[1]-1)
   limits[3] = limits[3]+1;

    for (var yy=0;yy<size[1];yy+=1){
   matrix[0][yy] = 1;
   //matrix[1][yy] = 0;
   matrix[size[1]-1][yy] = 1;
   }
    for (var xx=0;xx<size[0];xx+=1){
   matrix[xx][0] = 1;
 // matrix[xx][1] = 0;
   matrix[xx][size[0]-1] = 1;
   }
       matrixg = get_2d_Uint8Array_body_couch(size[0],size[1],limits);
    var matrix = floodFill_body(limits[1], limits[0],Stack,matrix,limits);
   matrix4[refnum][k] = matrixg;
struct.contours[refnum][k] = MarchingSquaresJS.IsoContours(matrix4[refnum][k], 0.5,"");
}
}

draw_ct("canvas",ct_sort,[ctsize[0],ctsize[1]],current_slice[2],'axial');
draw_struct_coronal();
drawtool = 'pointer';
var rgbt = struct.colorsname[current_structure];
hexcolor=rgbToHex(255,255,255);
    $(canvas)
        .awesomeCursor('mouse-pointer', {
        color: hexcolor,
        size: 20,
        hotspot: [1, 1],
        outline: null
    });
body=true;
init();
animate();
body=false;
}



var Stack = [];
var matrixg = [];
function floodFill_body(x, y,Stack,matrix,limits){
    matrix = fillPixel_body(x, y,Stack,matrix,limits);
    while(Stack.length>0){
        toFill = Stack.pop();
       matrix =  fillPixel_body(toFill[0], toFill[1],Stack,matrix,limits);
    }
    return matrix;    
}

function fillPixel_body(x, y,Stack,matrixc,limits){
    if(!alreadyFilled_body(x, y,Stack,matrixc)){ matrixc = fill_body(x, y,Stack,matrixc);}
    if(y>limits[1])
    if(!alreadyFilled_body(x,   y-1,Stack,matrixc)) Stack.push([x,   y-1]);   
    if(x<limits[2])
    if(!alreadyFilled_body(x+1, y  ,Stack,matrixc)) Stack.push([x+1, y  ]);
    if(y<limits[3])
    if(!alreadyFilled_body(x,   y+1,Stack,matrixc)) Stack.push([x,   y+1]);
    if(x>limits[0])
    if(!alreadyFilled_body(x-1, y  ,Stack,matrixc)) Stack.push([x-1, y  ]);
return matrixc;
}

function fill_body(x, y,Stack,matrixc){
matrixc[x][y] = 0;
matrixg[x][y]=0;
return matrixc;
}

function alreadyFilled_body(x, y,Stack,matrixc){
if (matrixc[x][y]==1)
return 0;
if (matrixc[x][y]==0)
return 1;
}

function get_2d_Uint8Array_body_couch(dimensionsx,dimensionsy,limits) {
  var limity=limits[2];
if (limits[2]>couchposition)
limity = couchposition;

var matrix = [];
for (var i=0;i<dimensionsy;i+=1){
var arr = new Uint8Array(dimensionsx);
matrix[i] = arr;}
for (var j=limits[0];j<limits[3];j+=1){
for (var i=limits[1];i<limity;i+=1){
  matrix[i][j] = 1;
}}
return matrix;
}