
var Mem0;
var Mem1;
var Mem2;
var Mem3;
var Mem4;
var Mem5;
var Mem6;
var Mem7;
var Mem8;
var Mem9;
for (let i=0;i<10;i++){
	("Mem"+i+"=[]");
	for (let j=0;j<8;j++){
		eval("Mem"+i+"["+j+"]=0");
	}
}

function store(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		var N=form.stoReg.value;
		eval("Mem"+N+"[i]=form['z"+i+"'].value");
	}
	return;
}
function recall(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		var N=form.rclReg.value;
		eval("form['z"+i+"'].value=Mem"+N+"[i]");
	}
	return;
}
function rotate(form){
	var temp;
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("temp=form['z"+i+"'].value");
		eval("form['z"+i+"'].value=form['y"+i+"'].value");
		eval("form['y"+i+"'].value=form['x"+i+"'].value");
		eval("form['x"+i+"'].value=temp");
	}
}
function pop(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("form['z"+i+"'].value=form['y"+i+"'].value");
		eval("form['y"+i+"'].value=form['x"+i+"'].value");
	}
}
function swap(form){
	var temp;
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("temp=form['z"+i+"'].value");
		eval("form['z"+i+"'].value=form['y"+i+"'].value");
		eval("form['y"+i+"'].value=temp");
	}
}
function dup(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("form['x"+i+"'].value=form['y"+i+"'].value");
		eval("form['y"+i+"'].value=form['z"+i+"'].value");
	}
}
function enter(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("form['x"+i+"'].value=form['y"+i+"'].value");
		eval("form['y"+i+"'].value=form['z"+i+"'].value");
		eval("form['z"+i+"'].value=0");
	}
}
function drop(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("form['z"+i+"'].value=0");
	}
}
function randFill(form){
	var z = [];
	var limit = 8;
	var r = form.randMode.value;
	if (r==0){
		for (let  i = 0; i < limit; i++){
			z[i] = Math.round(2*Math.random()-1);
			eval("form['z"+i+"'].value=z[i]");
		}
		return;
	}
	for (let  i = 0; i < limit; i++){
		z[i] = 2*Math.random()-1;
		eval("form['z"+i+"'].value=z[i]");
	}
	return;
}
function plus(form){
	var y=[];
	var z=[];
	var s=[];
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("z[i]=form['z"+i+"'].value");
		eval("y[i]=form['y"+i+"'].value");
		s[i]=eval(y[i])+eval(z[i]);
		eval("form['z"+i+"'].value=s[i]");
		eval("form['y"+i+"'].value=form['x"+i+"'].value");
	}
}
function minus(form){
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("form['z"+i+"'].value=form['y"+i+"'].value - form['z"+i+"'].value");
		eval("form['y"+i+"'].value=form['x"+i+"'].value");
	}
}
function divide(form){
	var y = [];
	var zconj = [];
	var p = [];
	var z2 = 0;
	var limit = 8;
	zconj[0]=eval(form.z0.value);
	y[0]=eval(form.y0.value);
	p[0]=0;
	for (let  i = 1; i < limit; i++){
		eval("y[i]=form['y"+i+"'].value");
		eval("zconj[i]=-form['z"+i+"'].value");
		p[i] = 0;
	}
	for (let  i = 0; i < limit; i++){
		z2+=zconj[i]*zconj[i];
		for (let  j = 0; j < limit; j++){
			p[i^j] += eval(sign(i,j))*y[i]*zconj[j];
		}
	}
	for (let  i = 0; i < limit; i++){
		p[i]=p[i]/z2;
		p[i]=(1e-15)*Math.round(1e15*p[i]);
		eval("form['y"+i+"'].value=form['x"+i+"'].value");
		eval("form['z"+i+"'].value=p[i]");
	}
return;
}
function inverse(form){
	var zconj = [];
	var z2 = 0;
	var limit = 8;
	zconj[0]=eval(form.z0.value);
	for (let  i = 1; i < limit; i++){
		eval("zconj[i]=-form['z"+i+"'].value");
	}
	for (let  i = 0; i < limit; i++){
		z2+=zconj[i]*zconj[i];
	}
	for (let  i = 0; i < limit; i++){
		zconj[i]=zconj[i]/z2;
		eval("form['z"+i+"'].value=zconj[i]");
	}
return;
}
function multiply(form){
	var y = [];
	var z = [];
	var p = [];
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("y[i]=form['y"+i+"'].value");
		eval("z[i]=form['z"+i+"'].value");
		p[i] = 0;
	}
	for (let  i = 0; i < limit; i++){
		for (let  j = 0; j < limit; j++){
			p[i^j] += eval(sign(i,j))*y[i]*z[j];
		}
	}
	for (let  i = 0; i < limit; i++){
		p[i]=(1e-15)*Math.round(1e15*p[i]);
		eval("form['y"+i+"'].value=form['x"+i+"'].value");
		eval("form['z"+i+"'].value=p[i]");
	}
return;
}
function conjugate(form){
	var limit = 8;
	for (let  i = 1; i < limit; i++){
		eval("form['z"+i+"'].value=-form['z"+i+"'].value");
	}
}
function norm(form){
	var z = [];
	var Szz = 0;
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("z[i]=form['z"+i+"'].value");
		Szz+=z[i]*z[i];
		eval("form['z"+i+"'].value=0");
	}
   form.z0.value=Math.sqrt(Szz);
return;
}
function unitize(form){
	var z = [];
	var Szz = 0;
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("z[i] = form['z"+i+"'].value");
		Szz+=z[i]*z[i];
	}
   var normX=Math.sqrt(Szz);
	for (let  i = 0; i < limit; i++){
	var temp=z[i]/normX;
		eval("form['z"+i+"'].value = temp");
	}
return;
}
function bitValue(number,bit){
	var number;
	var bit;
	var result = (number & (1<<bit)) >>> bit;
	return result;
}
function sign(p,q){
var p;
var q;
var state="A0";
var pbit=0;
var qbit=0;
var result=1;
var stateA0 = [];
var stateA  = [];
var stateB  = [];
var stateNB = [];
var stateC  = [];
var stateNC = [];

var loopIndex=Math.ceil(Math.LOG2E*Math.log((Math.max(p+1,q+1))));

stateA0[0] = "A0"
stateA0[1] = "A"
stateA0[2] = "B"
stateA0[3] = "NB"

stateA[0]  = "A";
stateA[1]  = "A";
stateA[2]  = "C";
stateA[3]  = "NC";

stateB[0]  = "B";
stateB[1]  = "NC";
stateB[2]  = "B";
stateB[3]  = "C";

stateNB[0] = "NB";
stateNB[1] = "C";
stateNB[2] = "NC";
stateNB[3] = "NB";

stateC[0]  = "C";
stateC[1]  = "NC";
stateC[2]  = "NC";
stateC[3]  = "NC";

stateNC[0] = "NC";
stateNC[1] = "C";
stateNC[2] = "C";
stateNC[3] = "C";

for (let  i = 0; i < loopIndex; i++){
	var j = loopIndex - i - 1;
	var k = 2*bitValue(p,j)+bitValue(q,j);
	if (state == 'C'){
		state = stateC[k];
		continue;
	}
	if (state == 'NC'){
		state = stateNC[k];
		continue;
	}

	if (state == 'B'){
		 state = stateB[k];
		continue;
	}
	if (state == 'NB'){
		state = stateNB[k];
		continue;
	}
	if (state == 'A'){
		state = stateA[k];
		continue;
	}
	if (state == 'A0'){
		state = stateA0[k];
		continue;
	}
}
  			/* Determination of sign */

    if (state=="NB" || state=="NC") {
        result="-1";
    }
    return result;
}
function SinCosX(form){
	var A=[];
	var B=[];
	var SumA=[];
	var SumB=[];
	var Aspread=0;
	var Bspread=0;
	var Z0=eval(form.z0.value);
	A[2]=Z0;
	SumA[2]=A[2]+1;
	var z = [];
	var Szz = 0;
	var limit = 8;
	for (let  i = 0; i < limit; i++){
		eval("z[i]=form['z"+i+"'].value");
		Szz+=z[i]*z[i];
	}
	B[2]=-Szz/2;
	SumB[2]=B[2]+1;
	for (let  i=3; i<1000; i++){
		A[i]=0;
		B[i]=0;
		SumA[i]=0;
		SumB[i]=0;
		}
	for (let  i=3; i<1000; i++){
		A[i]=(A[i-1]*Z0*2+B[i-1])/i;
		B[i]=-A[i-1]*Szz/i;
		SumA[i]+=SumA[i-1]+A[i];
		SumB[i]=SumB[i-1]+B[i];
		if (A[i]!=0 && B[i]!=0 && SumA[i]!=0 && SumB[i]!=0){
			Aspread=Math.log(Math.abs(SumA[i]))-Math.log(Math.abs(A[i]));
			Bspread=Math.log(Math.abs(SumB[i]))-Math.log(Math.abs(B[i]));
		}
		var N=i;
		if (Aspread>=39 && Bspread>=39) break;
	}
	CosX=SumB[N];
	SinX=SumA[N];
}
function expX(form){
	SinCosX(form);
	var limit = 8;
	form.z0.value=SinX*eval(form.z0.value)+CosX;
	for (let  i = 1; i < limit; i++){
		eval("form['z"+i+"'].value=SinX*form['z"+i+"'].value");
	}
}
