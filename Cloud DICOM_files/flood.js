

function get_2d_array_flood(numrows, numcols, initial,limits){
   var arr = [];
   for (var i = 0; i < numrows; ++i){
      var columns = [];
      for (var j = 0; j < numcols; ++j){
    //    if(i>limits[0] && i<limits[2] && j>limits[1] && j<limits[3]){
         columns[j] = initial;
         //}
      //   else{
       //   columns[j] = 0;
       //  }
      }
      arr[i] = columns;
    }
    return arr;
}


var Stack = [];
function floodFill(x, y,Stack,matrix,limits){
    matrix = fillPixel(x, y,Stack,matrix,limits);
    while(Stack.length>0){
        toFill = Stack.pop();
       matrix =  fillPixel(toFill[0], toFill[1],Stack,matrix,limits);
    }
    return matrix;    
}

function fillPixel(x, y,Stack,matrixc,limits){
    if(!alreadyFilled(x, y,Stack,matrixc)){ matrixc = fill(x, y,Stack,matrixc);}
    if(y>limits[1])
    if(!alreadyFilled(x,   y-1,Stack,matrixc)) Stack.push([x,   y-1]);   
    if(x<limits[2])
    if(!alreadyFilled(x+1, y  ,Stack,matrixc)) Stack.push([x+1, y  ]);
    if(y<limits[3])
    if(!alreadyFilled(x,   y+1,Stack,matrixc)) Stack.push([x,   y+1]);
    if(x>limits[0])
    if(!alreadyFilled(x-1, y  ,Stack,matrixc)) Stack.push([x-1, y  ]);
return matrixc;
}

function fill(x, y,Stack,matrixc){
matrixc[x][y] = 0;
return matrixc;
}

function alreadyFilled(x, y,Stack,matrixc){
if (matrixc[x][y]==1)
return 0;
if (matrixc[x][y]==0)
return 1;
}

function get_2d_Uint8Array(dimensionsx,dimensionsy,intial) {
var matrix = [];
for (var i=0;i<dimensionsy;i+=1){
var arr = new Uint8Array(dimensionsx);
matrix[i] = arr;}
for (var i=0;i<dimensionsx;i+=1) 
for (var j=0;j<dimensionsy;j+=1) matrix[i][j] = intial;
return matrix
}