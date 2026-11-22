import{readdirSync,readFileSync,writeFileSync,mkdirSync}from'node:fs';
import{join}from'node:path';
const K='\x00\x01\x02\x03\x04\x05\x06\x07\x10\x11\x12\x13\x14\x15\x16\x17\x18\x19\x1a\x1b\x1c\x1d\x1e\x20\x21\x22\x30\x31\x32\x33\x34\x40\x41\x50\x51\x52\x53',V='!2b%\'+,0*******&***&******AEEA!&)%%"%';
const T=new Int16Array(256).fill(-1);
for(let j=0;j<37;j++)T[K.charCodeAt(j)]=V.charCodeAt(j)-33;
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const d of readdirSync(I).sort()){
 const P=readFileSync(join(I,d,'program.bin')),N=readFileSync(join(I,d,'input.bin')),n=P.length;
 const D=new Int32Array(256),C=new Int32Array(64),W=new Int32Array(256),U=new Uint8Array(65536);
 let sp=0,cp=0,ip=0,pc=0,st=0,ol=0,ex=-1;
 const R=()=>((P[pc-2]|P[pc-1]<<8)<<16)>>16;
 while(ex<0){
  if(st===1e6){ex=10;break}
  if(pc<0||pc>=n){ex=9;break}
  const op=P[pc],t=T[op];
  if(t<0){ex=5;break}
  const im=t>>4,po=t>>2&3,pu=t&3;
  if(pc+im>=n){ex=9;break}
  st++;
  const nx=pc+1+im;
  if(sp<po){ex=2;break}
  if(sp-po+pu>256){ex=3;break}
  pc=nx;
  switch(op){
  case 0:ex=0;break;
  case 1:D[sp++]=(P[pc-1]<<24)>>24;break;
  case 2:D[sp++]=P[pc-4]|P[pc-3]<<8|P[pc-2]<<16|P[pc-1]<<24;break;
  case 3:sp--;break;
  case 4:D[sp]=D[sp-1];sp++;break;
  case 5:{const z=D[sp-1];D[sp-1]=D[sp-2];D[sp-2]=z;break}
  case 6:D[sp]=D[sp-2];sp++;break;
  case 7:{const z=D[sp-3];D[sp-3]=D[sp-2];D[sp-2]=D[sp-1];D[sp-1]=z;break}
  case 23:D[sp-1]=-D[sp-1]|0;break;
  case 27:D[sp-1]=~D[sp-1];break;
  case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
   const y=D[sp-1],z=D[sp-2];let r=0;
   if(op<23){
    if(op==16)r=z+y|0;
    else if(op==17)r=z-y|0;
    else if(op==18)r=Math.imul(z,y);
    else if(op==19){if(!y){ex=4;break}r=(z/y)|0}
    else if(op==20){if(!y){ex=4;break}r=z%y|0}
    else if(op==21){if(!y){ex=4;break}r=Math.floor((z>>>0)/(y>>>0))|0}
    else{if(!y){ex=4;break}r=(z>>>0)%(y>>>0)|0}
   }else if(op<27){
    if(op==24)r=z&y;
    else if(op==25)r=z|y;
    else r=z^y;
   }else if(op<31){
    if(op==28)r=z<<(y&31);
    else if(op==29)r=z>>(y&31);
    else r=(z>>>(y&31))|0;
   }else{
    if(op==32)r=z==y?1:0;
    else if(op==33)r=z<y?1:0;
    else r=z>>>0<y>>>0?1:0;
   }
   sp-=2;D[sp++]=r;break}
  case 48:pc+=R();break;
  case 49:case 50:{const v=D[--sp];if(op==49?v==0:v!=0)pc+=R();break}
  case 51:{if(cp==64){ex=7;break}C[cp++]=pc;pc=P[pc-2]|P[pc-1]<<8;break}
  case 52:{if(!cp){ex=8;break}pc=C[--cp];break}
  case 64:{const a=D[sp-1];if(a<0||a>255){ex=6;break}D[sp-1]=W[a];break}
  case 65:{const a=D[sp-1];if(a<0||a>255){ex=6;break}const v=D[sp-2];sp-=2;W[a]=v;break}
  case 80:{const s=String(D[sp-1]);if(ol+s.length>65536){ex=11;break}sp--;for(let i=0;i<s.length;i++)U[ol++]=s.charCodeAt(i);break}
  case 81:{if(ol+1>65536){ex=11;break}U[ol++]=D[--sp]&255;break}
  case 82:D[sp++]=ip<N.length?N[ip++]:-1;break;
  case 83:ex=D[--sp]&255;break;
  }
 }
 mkdirSync(join(O,d),{recursive:true});
 writeFileSync(join(O,d,'stdout.bin'),U.subarray(0,ol));
 writeFileSync(join(O,d,'exit.txt'),ex+'\n');
}
