function get_3d_array(numrows, numcols,numslice, initial){
 var vol = [];
   for (var k = 0; k < numslice; ++k){
   var arr = [];
   for (var i = 0; i < numrows; ++i){
      var columns = [];
      for (var j = 0; j < numcols; ++j){
         columns[j] = initial;
      }
      arr[i] = columns;
    }
    vol[k] = arr;
}
    return vol;
}


