
var interpls = [];
//var interptemp = [];




function get_fill_verts(contour_line,size){
	var matrixout = get_2d_Uint8Array(size[0],size[1],0);
	for (var j=0;j<contour_line.length;j+=1){
		cl = contour_line[j].length; 
		var matrix = get_2d_Uint8Array(size[0],size[1],1);
		xp = contour_line[j][cl-2][1];
		yp = contour_line[j][cl-2][0];

		limits = [5000,5000,0,0];

		for (var i=0;i<cl;i+=1){

			xx = contour_line[j][i][1];
			yy = contour_line[j][i][0];

			if (xx<limits[1])limits[1] = xx;
			if (yy<limits[0])limits[0] = yy;
			if (xx>limits[2])limits[2] = xx;
			if (yy>limits[3])limits[3] = yy;

			matrix[Math.round(xx)][Math.round(yy)]= 0;

		}
		limits[0] = Math.floor(limits[0]) - 1;
		limits[1] = Math.floor(limits[1]) - 1;
		limits[2] = Math.ceil(limits[2]) + 1;
		limits[3] = Math.ceil(limits[3]) + 1;
		var matrix = floodFill(limits[1], limits[0],Stack,matrix,limits);
		for (var jj=0;jj<size[1];jj+=1)
			for (var i=0;i<size[0];i+=1){{
				if (jj<limits[1])matrix[jj][i] = 0;
				if (i<limits[0])matrix[jj][i] = 0;
				if (jj>limits[2])matrix[jj][i] = 0;
				if (i>limits[3])matrix[jj][i] = 0;
			}}


			for (var jj=0;jj<size[1];jj+=1)
				for (var i=0;i<size[0];i+=1){{
					if (matrix[i][jj] ==1 && matrixout[i][jj]==1){
						matrixout[i][jj]=0;
					}
					else if (matrix[i][jj]==1 && matrixout[i][jj]==0){     
						matrixout[i][jj]=1;
					}
				}}
			}
			return matrixout;
		}




function get_fill_verts_disconect(contour_line,size){
	var d = 100;
	var matrixout = get_2d_Uint8Array(size[0],size[1],0);
	for (var j=0;j<1;j+=1){
		cl = contour_line.length; 
		var matrix = get_2d_Uint8Array(size[0],size[1],1);
		xp = contour_line[cl-2][1];
		yp = contour_line[cl-2][0];

		limits = [5000,5000,0,0];

		for (var i=0;i<cl;i+=1){
             // xp = struct.contours[refnum][slicen][j][cl-2][1];
             // yp = struct.contours[refnum][slicen][j][cl-2][0];
			xp = contour_line[cl-2][1];
			yp = contour_line[cl-2][0];
              limits = [5000,5000,0,0];
              for (var i=0;i<cl-1;i+=1){
			xx = contour_line[i][1];
			yy = contour_line[i][0];

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
			xp = contour_line[i][1];
			yp = contour_line[i][0]; 
                  for (var q=0;q<d;q+=1){
                    xd = (xx*(d-q)/d+xp*(q/d));
                    yd = (yy*(d-q)/d+yp*(q/d));
                    matrix[Math.round(xd)][Math.round(yd)]= 0;
                  }
              }
             }   

			xx = contour_line[i][1];
			yy = contour_line[i][0];

			if (xx<limits[1])limits[1] = xx;
			if (yy<limits[0])limits[0] = yy;
			if (xx>limits[2])limits[2] = xx;
			if (yy>limits[3])limits[3] = yy;

			matrix[Math.round(xx)][Math.round(yy)]= 0;

		}
		limits[0] = Math.floor(limits[0]) - 1;
		limits[1] = Math.floor(limits[1]) - 1;
		limits[2] = Math.ceil(limits[2]) + 1;
		limits[3] = Math.ceil(limits[3]) + 1;
		var matrix = floodFill(limits[1], limits[0],Stack,matrix,limits);
		for (var jj=0;jj<size[1];jj+=1)
			for (var i=0;i<size[0];i+=1){{
				if (jj<limits[1])matrix[jj][i] = 0;
				if (i<limits[0])matrix[jj][i] = 0;
				if (jj>limits[2])matrix[jj][i] = 0;
				if (i>limits[3])matrix[jj][i] = 0;
			}}


			for (var jj=0;jj<size[1];jj+=1)
				for (var i=0;i<size[0];i+=1){{
					if (matrix[i][jj] ==1 && matrixout[i][jj]==1){
						matrixout[i][jj]=0;
					}
					else if (matrix[i][jj]==1 && matrixout[i][jj]==0){     
						matrixout[i][jj]=1;
					}
				}}
			}
			return matrixout;
		}














		function get_cm(contour_line,size){
			var matrix =get_fill_verts(contour_line,size);
			var cmx=0;
			var cmy=0;
			var index =0;
			for (var j=0;j<size[1];j+=1)
				for (var i=0;i<size[0];i+=1){{
					if (matrix[i][j] ==1){
						cmx +=i; 
						cmy +=j;
						index +=1;  
					}
				}}
				var cm = [cmx/index,cmy/index];
				return cm;
			}



function get_int_slices(slice1,slice2,ds){

//var size =[0,0];
var size = [slice1.length,slice1[0].length];
//console.log(size)
//var size[1] = slice1[0].length;

var Vertices1 = MarchingSquaresJS.IsoContours(slice1, 0.5,"");
var Vertices2 = MarchingSquaresJS.IsoContours(slice2, 0.5,"");

var cm1 = get_cm(Vertices1,size);
var cm2 = get_cm(Vertices2,size);
//var cm = [cm2[0]- cm1[0],cm2[1]- cm1[1]] ;
var cm = [cm2[1]- cm1[1],cm2[0]- cm1[0]] ;
//console.log(cm)
//console.log(cm1,cm2,cm)
//var Vertices2_mod = Vertices2.slice();
//var Vertices2_mod = Vertices2;

//var Vertices2_mod = Vertices2.map(function(arr) {
//    return arr.slice();
//});




var j = 0;
var i = 1;

//console.log(Vertices1[0][i])
//console.log(Vertices2[0][i])

//console.log(Vertices1[0][j])
//console.log(Vertices2[0][j])
//console.log(Vertices1[0][i])
//console.log(Vertices2[0][i])



//temp = Math.pow(Vertices1[0][j][0]-(Vertices2[0][i][0]-cm[0]),2);
//temp2 = Math.pow(Vertices1[0][j][1]-(Vertices2[0][i][1]-cm[1]),2);

//console.log(temp,temp2)

var d, tempx,dindex,dmin;
var dd = [];
var dtemp = [];

for (var i=0;i<Vertices2[0].length;i+=1){
var dmin = 1000000;
	for (var j=0;j<Vertices1[0].length;j+=1){
	//	temp = Math.pow((Vertices1[0][j][0]-(Vertices2[0][i][0])-cm[0]),2) +Math.pow((Vertices1[0][j][1]-(Vertices2[0][i][1])-cm[1]),2);
		temp = Math.pow(Vertices1[0][j][0]-(Vertices2[0][i][0]-cm[0]),2) +Math.pow(Vertices1[0][j][1]-(Vertices2[0][i][1]-cm[1]),2);
    //temp = Math.abs(Vertices1[0][j][0]-Vertices2[0][i][0])  + Math.abs(Vertices1[0][j][1]-Vertices2[0][i][1]) ;
		d = Math.sqrt(temp);
		if(d<dmin){
			dmin = d;
			dindex = j;	
		}
	}
//	console.log(dmin)
dtemp[i] = dmin;
		dd[i] = dindex;
}
//console.log(dd)
//console.log(dtemp)
//console.log(dd)
//console.log(ds)
var slice_out = get_3d_int8Array_mod(size[0],size[1],ds-2, 0);

var td = ds;
var Vertices_m = [];
var temp;
var z2;
var z11;
for (var zi=0;zi<ds-1;zi+=1){
    z11 = zi+1;
	z2 = Math.abs(ds-z11);
    Vertices_m = [];
    for (var i=0;i<Vertices2[0].length;i+=1){
    temp = [(Vertices1[0][dd[i]][0]*z2+Vertices2[0][i][0]*z11)/td,(Vertices1[0][dd[i]][1]*z2+Vertices2[0][i][1]*z11)/td];
 //  temp =  [Vertices1[0][dd[i]][0],Vertices1[0][dd[i]][1]];
 //   temp =  [Vertices2[0][i][0],Vertices2[0][i][1]];
    Vertices_m[i] = temp;
//console.log(temp)
}
slice_out[zi] =get_fill_verts_disconect(Vertices_m,size);
}
return slice_out;
}

function get_add_flip(slice1,slice2,size3){
	var slice3 =get_3d_int8Array_mod(ctsize[0], ctsize[1],size3, 0);
	var kk;
	for (var k = 0; k < size3; k++){
		kk = size3-1-k;
		for (var j = 0; j < ctsize[1]; j++){
			for (var i = 0; i < ctsize[0]; i++){
				if (slice1[k][j][i]==1 || slice2[kk][j][i]==1){
					slice3[k][j][i] = 1;
				}
			}
		}
	}
	return slice3;
}



function get_interpolate(){
	var interptemp = new Uint8Array(ctsize[2]);
	var size = ctsize;
//	var refnum = currentstructure;
	var refnum = struct.indexnum[current_structure];
	var interp = interpls[refnum];
console.log(interpls)
	var ls = [];
	var slice3, slice4, slice5;
	for (var k = 0; k < size[2]; k++){
		if (interp[k]==1)
			ls.push( k );
	}
	var lsd = [];
	for (var k = 0; k < ls.length-1; k++){
		lsd[k] = ls[k+1]-ls[k];
	}


	var matrix3 = matrix4[refnum];
	for (var k = 0; k < lsd.length; k++){

		if (lsd[k]>1){
			slice3 = get_int_slices(matrix4[refnum][ls[k]],matrix4[refnum][ls[k+1]],lsd[k]);
			slice4 = get_int_slices(matrix4[refnum][ls[k+1]],matrix4[refnum][ls[k]],lsd[k]);
			slice5 = get_add_flip(slice3,slice4,slice3.length);

			for (var index = 0; index < lsd[k]-1; index++){
				matrix4[refnum][index+ls[k]+1] = slice5[index];
				struct.contours[refnum][index+ls[k]+1] = MarchingSquaresJS.IsoContours(slice5[index], 0.5,"");
			}
		}
	}
	//console.log(lsd)
/*
var matrixtest=get_3d_int8Array_mod(ctsize[0], ctsize[1],ctsize[2], 0);
	//var matrixtest = matrix4.slice;
var tempslice = 15;
    for (var jj=0;jj<ctsize[1];jj+=1){
      for (var i=0;i<ctsize[0];i+=1){
if 		(matrix4[refnum][tempslice][jj][i] ==1){
//	console.log(i)
	matrixtest[tempslice][jj][i] = 2000;
}

       }}
draw_ct("canvas",matrixtest,dimensions,tempslice,'axial')
*/


}