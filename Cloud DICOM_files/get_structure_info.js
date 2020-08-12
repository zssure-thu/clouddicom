
complete = 0;
myVar = [];
function doPartialWork() {
    //// do one "step" of the complex logic.
console.log(complete)
    // If complete, run a callback (and terminate without starting the timer)
    if (complete==1) {

    var start = new Date().getTime();
       struct_flood();
        init();
      animate();

var end = new Date().getTime();
var time = end - start;
console.log(time/1000)
clearTimeout(myVar);
    }
    else {

    	if (complete==0){
    	draw_struct_coronal();
    	complete =1;
    	    }
     
    }
}


var struct = {names:[], algorithm:[], ortype:[], colors:[], contours:[], colors3d:[], showmesh:[], colorsname:[], indexnum:[]};
var temp = [];
struct.contours[1] = temp;
function get_structure_info(dataSet,pixelspacing,position){
var DE = dataSet.elements;
//var elements = document.getElementsByTagName('div');
//  console.log(DE);
obj =DE;
objName = "test"
var result = "";
var names;
var name;
var name_d;
var num_struct;
var struct_data;
var struct_data_d;
var struct_points;
var struct_points_d;
 for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
//        result += objName + "." + i + " = " + obj[i] + "\n";
 //console.log(obj[i])

if (obj[i].tag =="x30060080"){
names = obj[i].items;
//console.log(names)
num_struct=names.length;
for (var j=0;j<num_struct;j+=1){
//console.log(names.length)
name = names[j];
//console.log(name)
name_d = name.dataSet;
//console.log(name_d);
var structnumber =name_d.text("x30060084"); 
structloaded=structloaded+1;
refnums[structloaded] = structnumber;
refnum = structloaded;
//struct.type[refnum] = refnum;
//console.log(name_d.text("x300600a4")); // type of structure
//console.log(name_d.text("x300600a6"))
//console.log(name_d.text("x30060082"))
//console.log(name_d.text("x30060084")) // structure number
var refnum =name_d.text("x30060084");
struct.ortype[refnum] = name_d.text("x300600a4");
}}

if (obj[i].tag =="x30060020"){
names = obj[i].items;
//console.log(names)
num_struct=names.length;
for (var j=0;j<num_struct;j+=1){
//console.log(names.length)
name = names[j];
//console.log(name)
name_d = name.dataSet;
//console.log(name_d);
//console.log(name_d.text("x30060022")) // structure number
var refnum =name_d.text("x30060022");
//console.log(name_d.text("x30060024")) // id number
//console.log(name_d.text("x30060026")) // name
struct.names[refnum] = name_d.text("x30060026");

struct.indexnum[struct.names[refnum]] = refnum;

var newstruct = new Object;
newstruct[struct.names[refnum]] = false;

var newstructname = new Object;
newstructname[struct.names[refnum]] = struct.names[refnum];

$.extend(parameters, newstruct);
$.extend(parameters_str, newstructname);
structtoggle.add( parameters, struct.names[refnum] ).onChange( parameters.showModelChanged ).listen();


var newstruct3d = new Object;
newstruct3d[struct.names[refnum]+" "] = false;
$.extend(parameters, newstruct3d);
structtoggle3d.add( parameters, struct.names[refnum]+" ").onChange( parameters.showModelChanged3d ).listen();



struct.algorithm[refnum] = name_d.text("x30060036");
//console.log(name_d.text("x30060036")) // algorithm
}
//console.log(struct) // algorithm
}


if (obj[i].tag =="x30060039"){
names = obj[i].items;
//console.log(names)
num_struct=names.length;
for (var stn=0;stn<num_struct;stn+=1){
var contours_single = [];
//console.log(names.length)
name = names[stn];
//console.log(name)
name_d = name.dataSet;
//console.log(name_d);
struct_data = name_d.elements;
//console.log(struct_data);

var item_list = name_d.elements.x30060040.items;
var refnum = name_d.text('x30060084');
var result = name_d.text('x3006002a');
result = result.replace(/\\/g, ' ');
var rgbt = result.split(" ").map(function(item) {
    return parseInt(item, 10);
});

//var rgbt = [0,255,255,255];
struct.colors[refnum] = "rgba("+rgbt[0].toString()+","+rgbt[1].toString()+", "+rgbt[2].toString()+", 1)";
struct.colors3d[refnum] = [rgbt[0]/255,rgbt[1]/255,rgbt[2]/255];
struct.colorsname[struct.names[refnum]] = [rgbt[0],rgbt[1],rgbt[2]];
//console.log(struct_colors);

for (var item_n=0;item_n<item_list.length;item_n+=1){
struct_data_d = name_d.elements.x30060040.items[item_n].dataSet;
//console.log(struct_data_d);
//struct_points = struct_data_d.elements.x30060016;
struct_points = struct_data_d.elements.x30060050;

var new8 = new Uint8Array(struct_data_d.byteArray.buffer,struct_points.dataOffset,struct_points.length);
var temp=bin2String(new8);
var pts = listToMatrix(temp, 3);
var temp_c = get_2d_array(pts.length, 2, 0);
var k = ctsize[2] - Math.floor((pts[0][2] - position[2])/pixelspacing[2]);
var contours_temp =[];
for (var i=0;i<pts.length;i+=1){
  for (var j=0;j<2;j+=1){
temp_c[i][j]=(pts[i][j] - position[j])/pixelspacing[j];
}}
if(typeof contours_single[k] === 'undefined') {
contours_temp[0] = temp_c;
contours_single[k] = contours_temp;
}
else {
contours_single[k][contours_single[k].length] = temp_c;
}
}
struct.contours[refnum] = contours_single;
}}
    }}
//structlist.add( parameters_str, struct.names[refnum] ).onChange( parameters.showcurrentstruct ).listen();



//struct.colors[refnum]

//parameters.gui.add(text, 'speed', { King: 'A', Queen: 'B', Rook: 'C' } );

//var temp = { King: 'A', Queen: 'B', Rook: 'C' } ;
//currentstructure.add(parameters, 'Structure', temp );

//currentstructure.add(parameters, 'Structure', parameters_str );
structlist = currentstructure.add(parameters, 'Structure', parameters_str ).onChange( parameters.listfunc ).listen();
current_structure = struct.names[1];
structlist.object.Structure = struct.names[1];
text.color = struct.colorsname[struct.names[1]]
controlador.updateDisplay();
currentstructure.open();
parameters[struct.names[1]]=true;
parameters[struct.names[1]+" "]=true;
//console.log(struct.ortype)

draw_struct_coronal();
 struct_flood();
 init();
 animate();

//console.log(struct.indexnum)
//  struct_flood();
 //       init();
 //     animate();


//myVar = setInterval(doPartialWork, 100);
}
