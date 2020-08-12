function get_scaler_to_poly(THREE,matrix3,size){
	// Generate a list of 3D points and values at those points

	for (var k = 0; k < size[2]; k++){
				var z = k- size[2]/2;
		for (var j = 0; j < size[1]; j++){
			var y = j- size[1]/2;
			for (var i = 0; i < size[0]; i++){
			
				var x = i - size[0]/2;
				points.push( new THREE.Vector3(x,y,z) );
				values.push( matrix3[k][i][j] );
			}}}

	// Marching Cubes Algorithm
	
	var size2 = size[0] * size[1];

	// Vertices may occur along edges of cube, when the values at the edge's endpoints
	//   straddle the isolevel value.
	// Actual position along edge weighted according to function values.
	var vlist = new Array(12);
	
	var geometry = new THREE.Geometry();
	var vertexIndex = 0;
	
	for (var z = 0; z < size[2] - 1; z++)
		for (var y = 0; y < size[1] - 1; y++)
			for (var x = 0; x < size[0] - 1; x++)
			{
		// index of base point, and also adjacent points on cube
		var p    = x + size[0] * y + size2 * z,
		px   = p   + 1,
		py   = p   + size[1],
		pxy  = py  + 1,
		pz   = p   + size2,
		pxz  = px  + size2,
		pyz  = py  + size2,
		pxyz = pxy + size2;
		
		// store scalar values corresponding to vertices
		var value0 = values[ p    ],
		value1 = values[ px   ],
		value2 = values[ py   ],
		value3 = values[ pxy  ],
		value4 = values[ pz   ],
		value5 = values[ pxz  ],
		value6 = values[ pyz  ],
		value7 = values[ pxyz ];
		
		// place a "1" in bit positions corresponding to vertices whose
		//   isovalue is less than given constant.
		
		var isolevel = 0.5;
		
		var cubeindex = 0;
		if ( value0 < isolevel ) cubeindex |= 1;
		if ( value1 < isolevel ) cubeindex |= 2;
		if ( value2 < isolevel ) cubeindex |= 8;
		if ( value3 < isolevel ) cubeindex |= 4;
		if ( value4 < isolevel ) cubeindex |= 16;
		if ( value5 < isolevel ) cubeindex |= 32;
		if ( value6 < isolevel ) cubeindex |= 128;
		if ( value7 < isolevel ) cubeindex |= 64;
		
		// bits = 12 bit number, indicates which edges are crossed by the isosurface
		var bits = THREE.edgeTable[ cubeindex ];
		
		// if none are crossed, proceed to next iteration
		if ( bits === 0 ) continue;
		
		// check which edges are crossed, and estimate the point location
		//    using a weighted average of scalar values at edge endpoints.
		// store the vertex in an array for use later.
		var mu = 0.5; 
		
		// bottom of the cube
		if ( bits & 1 )
		{		
			mu = ( isolevel - value0 ) / ( value1 - value0 );
			vlist[0] = points[p].clone().lerp( points[px], mu );
		}
		if ( bits & 2 )
		{
			mu = ( isolevel - value1 ) / ( value3 - value1 );
			vlist[1] = points[px].clone().lerp( points[pxy], mu );
		}
		if ( bits & 4 )
		{
			mu = ( isolevel - value2 ) / ( value3 - value2 );
			vlist[2] = points[py].clone().lerp( points[pxy], mu );
		}
		if ( bits & 8 )
		{
			mu = ( isolevel - value0 ) / ( value2 - value0 );
			vlist[3] = points[p].clone().lerp( points[py], mu );
		}
		// top of the cube
		if ( bits & 16 )
		{
			mu = ( isolevel - value4 ) / ( value5 - value4 );
			vlist[4] = points[pz].clone().lerp( points[pxz], mu );
		}
		if ( bits & 32 )
		{
			mu = ( isolevel - value5 ) / ( value7 - value5 );
			vlist[5] = points[pxz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 64 )
		{
			mu = ( isolevel - value6 ) / ( value7 - value6 );
			vlist[6] = points[pyz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 128 )
		{
			mu = ( isolevel - value4 ) / ( value6 - value4 );
			vlist[7] = points[pz].clone().lerp( points[pyz], mu );
		}
		// vertical lines of the cube
		if ( bits & 256 )
		{
			mu = ( isolevel - value0 ) / ( value4 - value0 );
			vlist[8] = points[p].clone().lerp( points[pz], mu );
		}
		if ( bits & 512 )
		{
			mu = ( isolevel - value1 ) / ( value5 - value1 );
			vlist[9] = points[px].clone().lerp( points[pxz], mu );
		}
		if ( bits & 1024 )
		{
			mu = ( isolevel - value3 ) / ( value7 - value3 );
			vlist[10] = points[pxy].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 2048 )
		{
			mu = ( isolevel - value2 ) / ( value6 - value2 );
			vlist[11] = points[py].clone().lerp( points[pyz], mu );
		}
		
		// construct triangles -- get correct vertices from triTable.
		var i = 0;
		cubeindex <<= 4;  // multiply by 16... 
		// "Re-purpose cubeindex into an offset into triTable." 
		//  since each row really isn't a row.

		// the while loop should run at most 5 times,
		//   since the 16th entry in each row is a -1.
		while ( THREE.triTable[ cubeindex + i ] != -1 ) 
		{
			var index1 = THREE.triTable[cubeindex + i];
			var index2 = THREE.triTable[cubeindex + i + 1];
			var index3 = THREE.triTable[cubeindex + i + 2];
			
			geometry.vertices.push( vlist[index1].clone() );
			geometry.vertices.push( vlist[index2].clone() );
			geometry.vertices.push( vlist[index3].clone() );
			var face = new THREE.Face3(vertexIndex, vertexIndex+1, vertexIndex+2);
			geometry.faces.push( face );

			//geometry.faceVertexUvs[ 0 ].push( [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ] );

			vertexIndex += 3;
			i += 3;
		}
	}
	return geometry;
}









var points = [];
function get_scaler_to_poly_down(THREE,matrix3,sizeup,size,down,res){
	// Generate a list of 3D points and values at those points
	var values = [];
var sizescale = [sizeup[0]*res[0],sizeup[1]*res[1],sizeup[2]*res[2] ];
var scale = [down[0]*res[0],down[1]*res[1],down[2]*res[2] ];
  var start = new Date().getTime();
if (first_struct==1){
	for (var k = 0; k < size[2]; k++){
				var z = k*scale[2]- sizescale[2]/2;
		for (var j = 0; j < size[1]; j++){
			var y = j*scale[1]- sizescale[1]/2;
			for (var i = 0; i < size[0]; i++){
				var x = i*scale[0] - sizescale[0]/2;
				points.push( new THREE.Vector3(x,y,z) );
				values.push( 0 );
			}}}}
else{
	for (var k = 0; k < size[2]; k++){
				var z = k*scale[2]- sizescale[2]/2;
		for (var j = 0; j < size[1]; j++){
			var y = j*scale[1]- sizescale[1]/2;
			for (var i = 0; i < size[0]; i++){
				var x = i*scale[0] - sizescale[0]/2;
				values.push( 0 );
			}}}}
first_struct = 0;




var end = new Date().getTime();
var time = end - start;
console.log(time/1000)

var start = new Date().getTime();
var md = down[0]*down[1]*down[2];
var size2 = size[0] * size[1];
var zr,jr,ir,index;
for (var kk=0;kk<sizeup[2];kk+=1){
//	for (var kk=0;kk<100;kk+=1){
  kr = Math.floor(kk/down[2]);
if(typeof matrix3[kk] != 'undefined') {
for (var jj=0;jj<sizeup[1];jj+=1){
  jr = Math.floor(jj/down[1]);
for (var ii=0;ii<sizeup[0];ii+=1){
  ir = Math.floor(ii/down[0]);
index = ir +jr*size[0]+ kr*size2;
//values[index] += matrix3[kk][ii][jj];
values[index] += matrix3[kk][ii][jj];
}}}}


var end = new Date().getTime();
var time = end - start;
console.log(time/1000)








	// Marching Cubes Algorithm
	
//	var size2 = size[0] * size[1];

	// Vertices may occur along edges of cube, when the values at the edge's endpoints
	//   straddle the isolevel value.
	// Actual position along edge weighted according to function values.
	var vlist = new Array(12);
	
	var geometry = new THREE.Geometry();
	var vertexIndex = 0;
//			var isolevel = md/4;
			var isolevel = md/10;
		//	console.log(md)
		//	console.log(isolevel)
	for (var z = 0; z < size[2] - 1; z++)
	{
		for (var y = 0; y < size[1] - 1; y++)
		{
			for (var x = 0; x < size[0] - 1; x++)
			{
		// index of base point, and also adjacent points on cube
		var p    = x + size[0] * y + size2 * z,
		px   = p   + 1,
		py   = p   + size[1],
		pxy  = py  + 1,
		pz   = p   + size2,
		pxz  = px  + size2,
		pyz  = py  + size2,
		pxyz = pxy + size2;
		
		// store scalar values corresponding to vertices
		var value0 = values[ p    ],
		value1 = values[ px   ],
		value2 = values[ py   ],
		value3 = values[ pxy  ],
		value4 = values[ pz   ],
		value5 = values[ pxz  ],
		value6 = values[ pyz  ],
		value7 = values[ pxyz ];
		
		// place a "1" in bit positions corresponding to vertices whose
		//   isovalue is less than given constant.
		

		
		var cubeindex = 0;
		if ( value0 < isolevel ) cubeindex |= 1;
		if ( value1 < isolevel ) cubeindex |= 2;
		if ( value2 < isolevel ) cubeindex |= 8;
		if ( value3 < isolevel ) cubeindex |= 4;
		if ( value4 < isolevel ) cubeindex |= 16;
		if ( value5 < isolevel ) cubeindex |= 32;
		if ( value6 < isolevel ) cubeindex |= 128;
		if ( value7 < isolevel ) cubeindex |= 64;
		
		// bits = 12 bit number, indicates which edges are crossed by the isosurface
		var bits = THREE.edgeTable[ cubeindex ];
		
		// if none are crossed, proceed to next iteration
		if ( bits === 0 ) continue;
		
		// check which edges are crossed, and estimate the point location
		//    using a weighted average of scalar values at edge endpoints.
		// store the vertex in an array for use later.
		var mu = 0.5; 
		
		// bottom of the cube
		if ( bits & 1 )
		{		
			mu = ( isolevel - value0 ) / ( value1 - value0 );
			vlist[0] = points[p].clone().lerp( points[px], mu );
		}
		if ( bits & 2 )
		{
			mu = ( isolevel - value1 ) / ( value3 - value1 );
			vlist[1] = points[px].clone().lerp( points[pxy], mu );
		}
		if ( bits & 4 )
		{
			mu = ( isolevel - value2 ) / ( value3 - value2 );
			vlist[2] = points[py].clone().lerp( points[pxy], mu );
		}
		if ( bits & 8 )
		{
			mu = ( isolevel - value0 ) / ( value2 - value0 );
			vlist[3] = points[p].clone().lerp( points[py], mu );
		}
		// top of the cube
		if ( bits & 16 )
		{
			mu = ( isolevel - value4 ) / ( value5 - value4 );
			vlist[4] = points[pz].clone().lerp( points[pxz], mu );
		}
		if ( bits & 32 )
		{
			mu = ( isolevel - value5 ) / ( value7 - value5 );
			vlist[5] = points[pxz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 64 )
		{
			mu = ( isolevel - value6 ) / ( value7 - value6 );
			vlist[6] = points[pyz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 128 )
		{
			mu = ( isolevel - value4 ) / ( value6 - value4 );
			vlist[7] = points[pz].clone().lerp( points[pyz], mu );
		}
		// vertical lines of the cube
		if ( bits & 256 )
		{
			mu = ( isolevel - value0 ) / ( value4 - value0 );
			vlist[8] = points[p].clone().lerp( points[pz], mu );
		}
		if ( bits & 512 )
		{
			mu = ( isolevel - value1 ) / ( value5 - value1 );
			vlist[9] = points[px].clone().lerp( points[pxz], mu );
		}
		if ( bits & 1024 )
		{
			mu = ( isolevel - value3 ) / ( value7 - value3 );
			vlist[10] = points[pxy].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 2048 )
		{
			mu = ( isolevel - value2 ) / ( value6 - value2 );
			vlist[11] = points[py].clone().lerp( points[pyz], mu );
		}
		
		// construct triangles -- get correct vertices from triTable.
		var i = 0;
		cubeindex <<= 4;  // multiply by 16... 
		// "Re-purpose cubeindex into an offset into triTable." 
		//  since each row really isn't a row.

		// the while loop should run at most 5 times,
		//   since the 16th entry in each row is a -1.
		while ( THREE.triTable[ cubeindex + i ] != -1 ) 
		{
			var index1 = THREE.triTable[cubeindex + i];
			var index2 = THREE.triTable[cubeindex + i + 1];
			var index3 = THREE.triTable[cubeindex + i + 2];
			
			geometry.vertices.push( vlist[index1].clone() );
			geometry.vertices.push( vlist[index2].clone() );
			geometry.vertices.push( vlist[index3].clone() );
			var face = new THREE.Face3(vertexIndex, vertexIndex+1, vertexIndex+2);
			geometry.faces.push( face );

			//geometry.faceVertexUvs[ 0 ].push( [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ] );

			vertexIndex += 3;
			i += 3;
		}
	}}}
	return geometry;
}

















function get_scaler_to_poly_nd(THREE,matrix3,size){
	// Generate a list of 3D points and values at those points



//var matrix3d =get_3d_array(ctsized[0], ctsized[1],ctsized[2], 0);


//console.log(matrix3)
	var nd = [2,2,2];
	size[0] = Math.floor(size[0]/nd[0])-1;
	size[1] = Math.floor(size[1]/nd[1])-1;
	size[2] = Math.floor(size[2]/nd[2])-1;

console.log(size)
var kk,jj,ii;
	for (var k = 0; k < size[2]; k++){
		kk = k*nd[2];
		var z = k- size[2]/2;
		for (var j = 0; j < size[1]; j++){
        jj = j*nd[1];
				var y = j- size[1]/2;
			for (var i = 0; i < size[0]; i++){
				ii = i*nd[0]
				var x = i -size[0]/2;


				points.push( new THREE.Vector3(x,y,z) );
				if(typeof matrix3[k*2] != 'undefined') {

var temp = matrix3[kk][ii][jj]+matrix3[kk+1][ii][jj]+matrix3[kk][ii+1][jj]+matrix3[kk][ii][jj+1];
				values.push( temp/4 );
			}
else{values.push( 0);
}

			}}}



/*
for (var k = 0; k < size[2]; k++){
	if(typeof matrix3[z] != 'undefined') { 
		for (var j = 0; j < size[1]; j++){
			for (var i = 0; i < size[0]; i++){
			
				var x = i - size[0]/2;
				var y = j- size[1]/2;
				var z = k- size[2]/2;
				points.push( new THREE.Vector3(x,y,z) );
				values.push( matrix3[k][i][j] );
			}}}
else{
		for (var j = 0; j < size[1]; j++){
			for (var i = 0; i < size[0]; i++){
			
				var x = i - size[0]/2;
				var y = j- size[1]/2;
				var z = k- size[2]/2;
				points.push( new THREE.Vector3(x,y,z) );
				values.push(0);
			}}}




		}
*/


/*
	for (var k = 0; k < size[2]; k++){
			if(typeof matrix3[z] != 'undefined') { 
		for (var j = 0; j < size[1]; j++){
			for (var i = 0; i < size[0]; i++)
			{
				var x = i - size[0]/2;
				var y = j- size[1]/2;
				var z = k- size[2]/2;
				points.push( new THREE.Vector3(z,y,x) );
				values.push( matrix3[k][i][j] );
			}}}}
*/
	// Marching Cubes Algorithm
	
	var size2 = size[0] * size[1];

	// Vertices may occur along edges of cube, when the values at the edge's endpoints
	//   straddle the isolevel value.
	// Actual position along edge weighted according to function values.
	var vlist = new Array(12);
	
	var geometry = new THREE.Geometry();
	var vertexIndex = 0;
	
	for (var z = 0; z < size[2] - 1; z++)
		for (var y = 0; y < size[1] - 1; y++)
			for (var x = 0; x < size[0] - 1; x++)
			{
		// index of base point, and also adjacent points on cube
		var p    = x + size[0] * y + size2 * z,
		px   = p   + 1,
		py   = p   + size[1],
		pxy  = py  + 1,
		pz   = p   + size2,
		pxz  = px  + size2,
		pyz  = py  + size2,
		pxyz = pxy + size2;
		
		// store scalar values corresponding to vertices
		var value0 = values[ p    ],
		value1 = values[ px   ],
		value2 = values[ py   ],
		value3 = values[ pxy  ],
		value4 = values[ pz   ],
		value5 = values[ pxz  ],
		value6 = values[ pyz  ],
		value7 = values[ pxyz ];
		
		// place a "1" in bit positions corresponding to vertices whose
		//   isovalue is less than given constant.
		
		var isolevel = 0.5;
		
		var cubeindex = 0;
		if ( value0 < isolevel ) cubeindex |= 1;
		if ( value1 < isolevel ) cubeindex |= 2;
		if ( value2 < isolevel ) cubeindex |= 8;
		if ( value3 < isolevel ) cubeindex |= 4;
		if ( value4 < isolevel ) cubeindex |= 16;
		if ( value5 < isolevel ) cubeindex |= 32;
		if ( value6 < isolevel ) cubeindex |= 128;
		if ( value7 < isolevel ) cubeindex |= 64;
		
		// bits = 12 bit number, indicates which edges are crossed by the isosurface
		var bits = THREE.edgeTable[ cubeindex ];
		
		// if none are crossed, proceed to next iteration
		if ( bits === 0 ) continue;
		
		// check which edges are crossed, and estimate the point location
		//    using a weighted average of scalar values at edge endpoints.
		// store the vertex in an array for use later.
		var mu = 0.5; 
		
		// bottom of the cube
		if ( bits & 1 )
		{		
			mu = ( isolevel - value0 ) / ( value1 - value0 );
			vlist[0] = points[p].clone().lerp( points[px], mu );
		}
		if ( bits & 2 )
		{
			mu = ( isolevel - value1 ) / ( value3 - value1 );
			vlist[1] = points[px].clone().lerp( points[pxy], mu );
		}
		if ( bits & 4 )
		{
			mu = ( isolevel - value2 ) / ( value3 - value2 );
			vlist[2] = points[py].clone().lerp( points[pxy], mu );
		}
		if ( bits & 8 )
		{
			mu = ( isolevel - value0 ) / ( value2 - value0 );
			vlist[3] = points[p].clone().lerp( points[py], mu );
		}
		// top of the cube
		if ( bits & 16 )
		{
			mu = ( isolevel - value4 ) / ( value5 - value4 );
			vlist[4] = points[pz].clone().lerp( points[pxz], mu );
		}
		if ( bits & 32 )
		{
			mu = ( isolevel - value5 ) / ( value7 - value5 );
			vlist[5] = points[pxz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 64 )
		{
			mu = ( isolevel - value6 ) / ( value7 - value6 );
			vlist[6] = points[pyz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 128 )
		{
			mu = ( isolevel - value4 ) / ( value6 - value4 );
			vlist[7] = points[pz].clone().lerp( points[pyz], mu );
		}
		// vertical lines of the cube
		if ( bits & 256 )
		{
			mu = ( isolevel - value0 ) / ( value4 - value0 );
			vlist[8] = points[p].clone().lerp( points[pz], mu );
		}
		if ( bits & 512 )
		{
			mu = ( isolevel - value1 ) / ( value5 - value1 );
			vlist[9] = points[px].clone().lerp( points[pxz], mu );
		}
		if ( bits & 1024 )
		{
			mu = ( isolevel - value3 ) / ( value7 - value3 );
			vlist[10] = points[pxy].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 2048 )
		{
			mu = ( isolevel - value2 ) / ( value6 - value2 );
			vlist[11] = points[py].clone().lerp( points[pyz], mu );
		}
		
		// construct triangles -- get correct vertices from triTable.
		var i = 0;
		cubeindex <<= 4;  // multiply by 16... 
		// "Re-purpose cubeindex into an offset into triTable." 
		//  since each row really isn't a row.

		// the while loop should run at most 5 times,
		//   since the 16th entry in each row is a -1.
		while ( THREE.triTable[ cubeindex + i ] != -1 ) 
		{
			var index1 = THREE.triTable[cubeindex + i];
			var index2 = THREE.triTable[cubeindex + i + 1];
			var index3 = THREE.triTable[cubeindex + i + 2];
			
			geometry.vertices.push( vlist[index1].clone() );
			geometry.vertices.push( vlist[index2].clone() );
			geometry.vertices.push( vlist[index3].clone() );
			var face = new THREE.Face3(vertexIndex, vertexIndex+1, vertexIndex+2);
			geometry.faces.push( face );

			//geometry.faceVertexUvs[ 0 ].push( [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ] );

			vertexIndex += 3;
			i += 3;
		}
	}
	return geometry;
}









function get_scaler_to_poly_ndtttt(THREE,matrixin,size){
	// Generate a list of 3D points and values at those points

	var nd = [8,8,2];
	var sizenew = [];
	sizenew[0] = Math.floor(size[0]/nd[0]);
	sizenew[1] = Math.floor(size[1]/nd[1]);
	sizenew[2] = Math.floor(size[2]/nd[2]);
size = sizenew;
console.log(size)
console.log(sizenew)
for (var k = 0; k < sizenew[2]; k+=1){
	var z = k*nd[2];
//		console.log(z)
	//			console.log(k)
	if(typeof matrixin[z] != 'undefined') { 	
		for (var j = 0; j < sizenew[1]; j+=1){

			for (var i = 0; i < sizenew[0]; i+=1){
				var y = j*nd[1];
				var x = i*nd[0];

//     	var x = i - size[0]/2;
//		var y = j- size[1]/2;
//		var z = k- size[2]/2;


points.push( new THREE.Vector3(i,j,k) );
values.push( matrixin[z][y][x] );
}}}}
//	 console.log(points)
//console.log(values)
	// Marching Cubes Algorithm
	
	var size2 = size[0] * size[1];

	// Vertices may occur along edges of cube, when the values at the edge's endpoints
	//   straddle the isolevel value.
	// Actual position along edge weighted according to function values.
	var vlist = new Array(12);
	
	var geometry = new THREE.Geometry();
	var vertexIndex = 0;
	
	for (var z = 0; z < size[2] - 1; z+=1){
		for (var y = 0; y < size[1] - 1; y+=1){
			for (var x = 0; x < size[0] - 1; x+=1)
			{
		// index of base point, and also adjacent points on cube
		var p    = x + size[0] * y + size2 * z,
		px   = p   + 1,
		py   = p   + size[1],
		pxy  = py  + 1,
		pz   = p   + size2,
		pxz  = px  + size2,
		pyz  = py  + size2,
		pxyz = pxy + size2;
		
		// store scalar values corresponding to vertices
		var value0 = values[ p    ],
		value1 = values[ px   ],
		value2 = values[ py   ],
		value3 = values[ pxy  ],
		value4 = values[ pz   ],
		value5 = values[ pxz  ],
		value6 = values[ pyz  ],
		value7 = values[ pxyz ];
		
		// place a "1" in bit positions corresponding to vertices whose
		//   isovalue is less than given constant.
		
		var isolevel = 0.5;
		
		var cubeindex = 0;
		if ( value0 < isolevel ) cubeindex |= 1;
		if ( value1 < isolevel ) cubeindex |= 2;
		if ( value2 < isolevel ) cubeindex |= 8;
		if ( value3 < isolevel ) cubeindex |= 4;
		if ( value4 < isolevel ) cubeindex |= 16;
		if ( value5 < isolevel ) cubeindex |= 32;
		if ( value6 < isolevel ) cubeindex |= 128;
		if ( value7 < isolevel ) cubeindex |= 64;
		
		// bits = 12 bit number, indicates which edges are crossed by the isosurface
		var bits = THREE.edgeTable[ cubeindex ];
		
		// if none are crossed, proceed to next iteration
		if ( bits === 0 ) continue;
		
		// check which edges are crossed, and estimate the point location
		//    using a weighted average of scalar values at edge endpoints.
		// store the vertex in an array for use later.
		var mu = 0.5; 
		
		// bottom of the cube
		if ( bits & 1 )
		{		
			mu = ( isolevel - value0 ) / ( value1 - value0 );
			vlist[0] = points[p].clone().lerp( points[px], mu );
		}
		if ( bits & 2 )
		{
			mu = ( isolevel - value1 ) / ( value3 - value1 );
			vlist[1] = points[px].clone().lerp( points[pxy], mu );
		}
		if ( bits & 4 )
		{
			mu = ( isolevel - value2 ) / ( value3 - value2 );
			vlist[2] = points[py].clone().lerp( points[pxy], mu );
		}
		if ( bits & 8 )
		{
			mu = ( isolevel - value0 ) / ( value2 - value0 );
			vlist[3] = points[p].clone().lerp( points[py], mu );
		}
		// top of the cube
		if ( bits & 16 )
		{
			mu = ( isolevel - value4 ) / ( value5 - value4 );
			vlist[4] = points[pz].clone().lerp( points[pxz], mu );
		}
		if ( bits & 32 )
		{
			mu = ( isolevel - value5 ) / ( value7 - value5 );
			vlist[5] = points[pxz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 64 )
		{
			mu = ( isolevel - value6 ) / ( value7 - value6 );
			vlist[6] = points[pyz].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 128 )
		{
			mu = ( isolevel - value4 ) / ( value6 - value4 );
			vlist[7] = points[pz].clone().lerp( points[pyz], mu );
		}
		// vertical lines of the cube
		if ( bits & 256 )
		{
			mu = ( isolevel - value0 ) / ( value4 - value0 );
			vlist[8] = points[p].clone().lerp( points[pz], mu );
		}
		if ( bits & 512 )
		{
			mu = ( isolevel - value1 ) / ( value5 - value1 );
			vlist[9] = points[px].clone().lerp( points[pxz], mu );
		}
		if ( bits & 1024 )
		{
			mu = ( isolevel - value3 ) / ( value7 - value3 );
			vlist[10] = points[pxy].clone().lerp( points[pxyz], mu );
		}
		if ( bits & 2048 )
		{
			mu = ( isolevel - value2 ) / ( value6 - value2 );
			vlist[11] = points[py].clone().lerp( points[pyz], mu );
		}
		
		// construct triangles -- get correct vertices from triTable.
		var i = 0;
		cubeindex <<= 4;  // multiply by 16... 
		// "Re-purpose cubeindex into an offset into triTable." 
		//  since each row really isn't a row.

		// the while loop should run at most 5 times,
		//   since the 16th entry in each row is a -1.
		while ( THREE.triTable[ cubeindex + i ] != -1 ) 
		{
			var index1 = THREE.triTable[cubeindex + i];
			var index2 = THREE.triTable[cubeindex + i + 1];
			var index3 = THREE.triTable[cubeindex + i + 2];
			
			geometry.vertices.push( vlist[index1].clone() );
			geometry.vertices.push( vlist[index2].clone() );
			geometry.vertices.push( vlist[index3].clone() );
			var face = new THREE.Face3(vertexIndex, vertexIndex+1, vertexIndex+2);
			geometry.faces.push( face );

			//geometry.faceVertexUvs[ 0 ].push( [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ] );

			vertexIndex += 3;
			i += 3;
		}
	}}}
	return geometry;
}