
function get_3d_int8Array_mod(numrows, numcols,numslice, initial){
 var vol = [];
   for (var k = 0; k < numslice; ++k){
    vol[k] = get_2d_Uint8Array(numrows,numcols,initial);
}
    return vol;
}
