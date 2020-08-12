
put_image = function(img,matrix,dimensions){
var dim4 = [dimensions[0]*4,dimensions[1]*4];

var k;
for (var j=0;j<dimensions[0];j+=1){
  for (var i=0;i<dimensions[1];i+=1){
      k = j*dim4[0]+i*4;
      img.data[k+0]=matrix[i][j]*255;
      img.data[k+1]=matrix[i][j]*255;
      img.data[k+2]=matrix[i][j]*255;
      img.data[k+3]=255;

    }}
 return img;
};


function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}



function getMaxOfArray(numArray) {
var m = 0;
for (var j=0;j<numArray.length;j+=1){
if(m<numArray[j])
  m = numArray[j];
}
  return m;
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}


function sort_array(points){
var points_new = clone(points);
points_new.sort(function(a, b){return b-a});
var index = [];
for (var j=0;j<points_new.length;j+=1){
 index[j] = points.indexOf(points_new[j]);
}
//console.log(index)
//console.log(points)
//console.log(points_new)
return [index,points_new]
}


function bin2String(array) {
  var result = "";
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }

result = result.replace(/\\/g, ' ');
var result = result.split(" ").map(function(item) {
    return parseInt(item, 10);
});
  return result;
}





