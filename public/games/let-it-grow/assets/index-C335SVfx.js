var Gu=Object.defineProperty;var Wu=(i,t,e)=>t in i?Gu(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var V=(i,t,e)=>Wu(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uc="170",$n={ROTATE:0,DOLLY:1,PAN:2},jn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Xu=0,qc=1,Yu=2,Uh=1,Nh=2,qn=3,vi=0,Xe=1,xn=2,mi=0,gi=1,oo=2,jc=3,Zc=4,qu=5,Li=100,ju=101,Zu=102,Ku=103,$u=104,Ju=200,Qu=201,td=202,ed=203,ga=204,_a=205,nd=206,id=207,sd=208,rd=209,od=210,ad=211,cd=212,ld=213,hd=214,va=0,xa=1,ya=2,vs=3,Ma=4,Sa=5,ba=6,wa=7,Oh=0,ud=1,dd=2,_i=0,fd=1,pd=2,md=3,Fh=4,gd=5,_d=6,vd=7,Kc="attached",xd="detached",kh=300,xs=301,ys=302,Ea=303,Ta=304,_o=306,Ms=1e3,Ui=1001,Aa=1002,sn=1003,yd=1004,_r=1005,Pn=1006,Co=1007,Ni=1008,ti=1009,Bh=1010,zh=1011,ir=1012,dc=1013,ki=1014,Sn=1015,hr=1016,fc=1017,pc=1018,Ss=1020,Vh=35902,Hh=1021,Gh=1022,ln=1023,Wh=1024,Xh=1025,gs=1026,bs=1027,mc=1028,gc=1029,Yh=1030,_c=1031,vc=1033,Qr=33776,to=33777,eo=33778,no=33779,Ra=35840,Ca=35841,Pa=35842,La=35843,Ia=36196,Da=37492,Ua=37496,Na=37808,Oa=37809,Fa=37810,ka=37811,Ba=37812,za=37813,Va=37814,Ha=37815,Ga=37816,Wa=37817,Xa=37818,Ya=37819,qa=37820,ja=37821,io=36492,Za=36494,Ka=36495,qh=36283,$a=36284,Ja=36285,Qa=36286,ao=2300,tc=2301,Po=2302,$c=2400,Jc=2401,Qc=2402,Md=2500,py=0,my=1,gy=2,Sd=3200,bd=3201,jh=0,wd=1,fi="",We="srgb",Ts="srgb-linear",vo="linear",ve="srgb",Yi=7680,tl=519,Ed=512,Td=513,Ad=514,Zh=515,Rd=516,Cd=517,Pd=518,Ld=519,ec=35044,el="300 es",Zn=2e3,co=2001;class Gi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const He=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nl=1234567;const $s=Math.PI/180,ws=180/Math.PI;function hn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(He[i&255]+He[i>>8&255]+He[i>>16&255]+He[i>>24&255]+"-"+He[t&255]+He[t>>8&255]+"-"+He[t>>16&15|64]+He[t>>24&255]+"-"+He[e&63|128]+He[e>>8&255]+"-"+He[e>>16&255]+He[e>>24&255]+He[n&255]+He[n>>8&255]+He[n>>16&255]+He[n>>24&255]).toLowerCase()}function Ue(i,t,e){return Math.max(t,Math.min(e,i))}function xc(i,t){return(i%t+t)%t}function Id(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Dd(i,t,e){return i!==t?(e-i)/(t-i):0}function Js(i,t,e){return(1-e)*i+e*t}function Ud(i,t,e,n){return Js(i,t,1-Math.exp(-e*n))}function Nd(i,t=1){return t-Math.abs(xc(i,t*2)-t)}function Od(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Fd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function kd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Bd(i,t){return i+Math.random()*(t-i)}function zd(i){return i*(.5-Math.random())}function Vd(i){i!==void 0&&(nl=i);let t=nl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Hd(i){return i*$s}function Gd(i){return i*ws}function Wd(i){return(i&i-1)===0&&i!==0}function Xd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Yd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function qd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*h,c*u,c*d,a*l);break;case"YZY":i.set(c*d,a*h,c*u,a*l);break;case"ZXZ":i.set(c*u,c*d,a*h,a*l);break;case"XZX":i.set(a*h,c*m,c*f,a*l);break;case"YXY":i.set(c*f,a*h,c*m,a*l);break;case"ZYZ":i.set(c*m,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const nc={DEG2RAD:$s,RAD2DEG:ws,generateUUID:hn,clamp:Ue,euclideanModulo:xc,mapLinear:Id,inverseLerp:Dd,lerp:Js,damp:Ud,pingpong:Nd,smoothstep:Od,smootherstep:Fd,randInt:kd,randFloat:Bd,randFloatSpread:zd,seededRandom:Vd,degToRad:Hd,radToDeg:Gd,isPowerOfTwo:Wd,ceilPowerOfTwo:Xd,floorPowerOfTwo:Yd,setQuaternionFromProperEuler:qd,normalize:me,denormalize:yn};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,s,r,o,a,c,l){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=s[0],g=s[3],p=s[6],y=s[1],v=s[4],x=s[7],I=s[2],T=s[5],L=s[8];return r[0]=o*_+a*y+c*I,r[3]=o*g+a*v+c*T,r[6]=o*p+a*x+c*L,r[1]=l*_+h*y+u*I,r[4]=l*g+h*v+u*T,r[7]=l*p+h*x+u*L,r[2]=d*_+f*y+m*I,r[5]=d*g+f*v+m*T,r[8]=d*p+f*x+m*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Lo.makeScale(t,e)),this}rotate(t){return this.premultiply(Lo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lo=new $t;function Kh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jd(){const i=sr("canvas");return i.style.display="block",i}const il={};function Zs(i){i in il||(il[i]=!0,console.warn(i))}function Zd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Kd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function $d(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ae={enabled:!0,workingColorSpace:Ts,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ve&&(i.r=Jn(i.r),i.g=Jn(i.g),i.b=Jn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ve&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fi?vo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const sl=[.64,.33,.3,.6,.15,.06],rl=[.2126,.7152,.0722],ol=[.3127,.329],al=new $t().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cl=new $t().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[Ts]:{primaries:sl,whitePoint:ol,transfer:vo,toXYZ:al,fromXYZ:cl,luminanceCoefficients:rl,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:sl,whitePoint:ol,transfer:ve,toXYZ:al,fromXYZ:cl,luminanceCoefficients:rl,outputColorSpaceConfig:{drawingBufferColorSpace:We}}});let qi;class Jd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{qi===void 0&&(qi=sr("canvas")),qi.width=t.width,qi.height=t.height;const n=qi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=qi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Jn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Jn(e[n]/255)*255):e[n]=Jn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Qd=0;class $h{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qd++}),this.uuid=hn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Io(s[o].image)):r.push(Io(s[o]))}else r=Io(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Io(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Jd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let tf=0;class Be extends Gi{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Ui,s=Ui,r=Pn,o=Ni,a=ln,c=ti,l=Be.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=hn(),this.name="",this.source=new $h(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==kh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ms:t.x=t.x-Math.floor(t.x);break;case Ui:t.x=t.x<0?0:1;break;case Aa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ms:t.y=t.y-Math.floor(t.y);break;case Ui:t.y=t.y<0?0:1;break;case Aa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=kh;Be.DEFAULT_ANISOTROPY=1;class he{constructor(t=0,e=0,n=0,s=1){he.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,x=(f+1)/2,I=(p+1)/2,T=(h+d)/4,L=(u+_)/4,D=(m+g)/4;return v>x&&v>I?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=T/n,r=L/n):x>I?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=D/s):I<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(I),n=L/r,s=D/r),this.set(n,s,r,e),this}let y=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class ef extends Gi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new he(0,0,t,e),this.scissorTest=!1,this.viewport=new he(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Be(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new $h(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends ef{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Jh extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class nf extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ui,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==m){let g=1-a;const p=c*d+l*f+h*m+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){const I=Math.sqrt(v),T=Math.atan2(I,p*y);g=Math.sin(g*T)/I,a=Math.sin(a*T)/I}const x=a*y;if(c=c*g+d*x,l=l*g+f*x,h=h*g+m*x,u=u*g+_*x,g===1-a){const I=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=I,l*=I,h*=I,u*=I}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*f-l*d,t[e+1]=c*m+h*d+l*u-a*f,t[e+2]=l*m+h*f+a*d-c*u,t[e+3]=h*m-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),d=c(n/2),f=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-s)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ue(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ll.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ll.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Do.copy(this).projectOnVector(t),this.sub(Do)}reflect(t){return this.sub(Do.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ue(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Do=new A,ll=new bn;class yi{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,fn):fn.fromBufferAttribute(r,o),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vr.copy(n.boundingBox)),vr.applyMatrix4(t.matrixWorld),this.union(vr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Us),xr.subVectors(this.max,Us),ji.subVectors(t.a,Us),Zi.subVectors(t.b,Us),Ki.subVectors(t.c,Us),si.subVectors(Zi,ji),ri.subVectors(Ki,Zi),bi.subVectors(ji,Ki);let e=[0,-si.z,si.y,0,-ri.z,ri.y,0,-bi.z,bi.y,si.z,0,-si.x,ri.z,0,-ri.x,bi.z,0,-bi.x,-si.y,si.x,0,-ri.y,ri.x,0,-bi.y,bi.x,0];return!Uo(e,ji,Zi,Ki,xr)||(e=[1,0,0,0,1,0,0,0,1],!Uo(e,ji,Zi,Ki,xr))?!1:(yr.crossVectors(si,ri),e=[yr.x,yr.y,yr.z],Uo(e,ji,Zi,Ki,xr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Bn=[new A,new A,new A,new A,new A,new A,new A,new A],fn=new A,vr=new yi,ji=new A,Zi=new A,Ki=new A,si=new A,ri=new A,bi=new A,Us=new A,xr=new A,yr=new A,wi=new A;function Uo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){wi.fromArray(i,r);const a=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),c=t.dot(wi),l=e.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const sf=new yi,Ns=new A,No=new A;class ei{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):sf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);const e=Ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ns,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(No.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ns.copy(t.center).add(No)),this.expandByPoint(Ns.copy(t.center).sub(No))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new A,Oo=new A,Mr=new A,oi=new A,Fo=new A,Sr=new A,ko=new A;class As{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zn.copy(this.origin).addScaledVector(this.direction,e),zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Oo.copy(t).add(e).multiplyScalar(.5),Mr.copy(e).sub(t).normalize(),oi.copy(this.origin).sub(Oo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Mr),a=oi.dot(this.direction),c=-oi.dot(Mr),l=oi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=r*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Oo).addScaledVector(Mr,d),f}intersectSphere(t,e){zn.subVectors(t.center,this.origin);const n=zn.dot(this.direction),s=zn.dot(zn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,zn)!==null}intersectTriangle(t,e,n,s,r){Fo.subVectors(e,t),Sr.subVectors(n,t),ko.crossVectors(Fo,Sr);let o=this.direction.dot(ko),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;oi.subVectors(this.origin,t);const c=a*this.direction.dot(Sr.crossVectors(oi,Sr));if(c<0)return null;const l=a*this.direction.dot(Fo.cross(oi));if(l<0||c+l>o)return null;const h=-a*oi.dot(ko);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wt{constructor(t,e,n,s,r,o,a,c,l,h,u,d,f,m,_,g){Wt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,d,f,m,_,g)}set(t,e,n,s,r,o,a,c,l,h,u,d,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Wt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/$i.setFromMatrixColumn(t,0).length(),r=1/$i.setFromMatrixColumn(t,1).length(),o=1/$i.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+m*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=m+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,m=l*h,_=l*u;e[0]=d+_*a,e[4]=m*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=_+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,m=l*h,_=l*u;e[0]=d-_*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=m*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*c,f=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(rf,t,of)}lookAt(t,e,n){const s=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),ai.crossVectors(n,en),ai.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ai.crossVectors(n,en)),ai.normalize(),br.crossVectors(en,ai),s[0]=ai.x,s[4]=br.x,s[8]=en.x,s[1]=ai.y,s[5]=br.y,s[9]=en.y,s[2]=ai.z,s[6]=br.z,s[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],v=n[7],x=n[11],I=n[15],T=s[0],L=s[4],D=s[8],w=s[12],M=s[1],R=s[5],B=s[9],k=s[13],U=s[2],X=s[6],H=s[10],tt=s[14],Y=s[3],ht=s[7],dt=s[11],xt=s[15];return r[0]=o*T+a*M+c*U+l*Y,r[4]=o*L+a*R+c*X+l*ht,r[8]=o*D+a*B+c*H+l*dt,r[12]=o*w+a*k+c*tt+l*xt,r[1]=h*T+u*M+d*U+f*Y,r[5]=h*L+u*R+d*X+f*ht,r[9]=h*D+u*B+d*H+f*dt,r[13]=h*w+u*k+d*tt+f*xt,r[2]=m*T+_*M+g*U+p*Y,r[6]=m*L+_*R+g*X+p*ht,r[10]=m*D+_*B+g*H+p*dt,r[14]=m*w+_*k+g*tt+p*xt,r[3]=y*T+v*M+x*U+I*Y,r[7]=y*L+v*R+x*X+I*ht,r[11]=y*D+v*B+x*H+I*dt,r[15]=y*w+v*k+x*tt+I*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*d+n*l*d+s*a*f-n*c*f)+_*(+e*c*f-e*l*d+r*o*d-s*o*f+s*l*h-r*c*h)+g*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*d+s*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],y=u*g*l-_*d*l+_*c*f-a*g*f-u*c*p+a*d*p,v=m*d*l-h*g*l-m*c*f+o*g*f+h*c*p-o*d*p,x=h*_*l-m*u*l+m*a*f-o*_*f-h*a*p+o*u*p,I=m*u*c-h*_*c-m*a*d+o*_*d+h*a*g-o*u*g,T=e*y+n*v+s*x+r*I;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/T;return t[0]=y*L,t[1]=(_*d*r-u*g*r-_*s*f+n*g*f+u*s*p-n*d*p)*L,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*L,t[3]=(u*c*r-a*d*r-u*s*l+n*d*l+a*s*f-n*c*f)*L,t[4]=v*L,t[5]=(h*g*r-m*d*r+m*s*f-e*g*f-h*s*p+e*d*p)*L,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*L,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*f+e*c*f)*L,t[8]=x*L,t[9]=(m*u*r-h*_*r-m*n*f+e*_*f+h*n*p-e*u*p)*L,t[10]=(o*_*r-m*a*r+m*n*l-e*_*l-o*n*p+e*a*p)*L,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*L,t[12]=I*L,t[13]=(h*_*s-m*u*s+m*n*d-e*_*d-h*n*g+e*u*g)*L,t[14]=(m*a*s-o*_*s-m*n*c+e*_*c+o*n*g-e*a*g)*L,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*d+e*a*d)*L,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,m=r*u,_=o*h,g=o*u,p=a*u,y=c*l,v=c*h,x=c*u,I=n.x,T=n.y,L=n.z;return s[0]=(1-(_+p))*I,s[1]=(f+x)*I,s[2]=(m-v)*I,s[3]=0,s[4]=(f-x)*T,s[5]=(1-(d+p))*T,s[6]=(g+y)*T,s[7]=0,s[8]=(m+v)*L,s[9]=(g-y)*L,s[10]=(1-(d+_))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=$i.set(s[0],s[1],s[2]).length();const o=$i.set(s[4],s[5],s[6]).length(),a=$i.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],pn.copy(this);const l=1/r,h=1/o,u=1/a;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=u,pn.elements[9]*=u,pn.elements[10]*=u,e.setFromRotationMatrix(pn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Zn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,m;if(a===Zn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===co)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Zn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*l,f=(n+s)*h;let m,_;if(a===Zn)m=(o+r)*u,_=-2*u;else if(a===co)m=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const $i=new A,pn=new Wt,rf=new A(0,0,0),of=new A(1,1,1),ai=new A,br=new A,en=new A,hl=new Wt,ul=new bn;class wn{constructor(t=0,e=0,n=0,s=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ue(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ue(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ue(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ue(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ul.setFromEuler(this),this.setFromQuaternion(ul,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class yc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let af=0;const dl=new A,Ji=new bn,Vn=new Wt,wr=new A,Os=new A,cf=new A,lf=new bn,fl=new A(1,0,0),pl=new A(0,1,0),ml=new A(0,0,1),gl={type:"added"},hf={type:"removed"},Qi={type:"childadded",child:null},Bo={type:"childremoved",child:null};class Ce extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:af++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new A,e=new wn,n=new bn,s=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Wt},normalMatrix:{value:new $t}}),this.matrix=new Wt,this.matrixWorld=new Wt,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.multiply(Ji),this}rotateOnWorldAxis(t,e){return Ji.setFromAxisAngle(t,e),this.quaternion.premultiply(Ji),this}rotateX(t){return this.rotateOnAxis(fl,t)}rotateY(t){return this.rotateOnAxis(pl,t)}rotateZ(t){return this.rotateOnAxis(ml,t)}translateOnAxis(t,e){return dl.copy(t).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fl,t)}translateY(t){return this.translateOnAxis(pl,t)}translateZ(t){return this.translateOnAxis(ml,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wr.copy(t):wr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Os,wr,this.up):Vn.lookAt(wr,Os,this.up),this.quaternion.setFromRotationMatrix(Vn),s&&(Vn.extractRotation(s.matrixWorld),Ji.setFromRotationMatrix(Vn),this.quaternion.premultiply(Ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gl),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hf),Bo.child=t,this.dispatchEvent(Bo),Bo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gl),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,cf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,lf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ce.DEFAULT_UP=new A(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new A,Hn=new A,zo=new A,Gn=new A,ts=new A,es=new A,_l=new A,Vo=new A,Ho=new A,Go=new A,Wo=new he,Xo=new he,Yo=new he;class Mn{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),Hn.subVectors(n,e),zo.subVectors(t,e);const o=mn.dot(mn),a=mn.dot(Hn),c=mn.dot(zo),l=Hn.dot(Hn),h=Hn.dot(zo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Gn.x),c.addScaledVector(o,Gn.y),c.addScaledVector(a,Gn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Wo.setScalar(0),Xo.setScalar(0),Yo.setScalar(0),Wo.fromBufferAttribute(t,e),Xo.fromBufferAttribute(t,n),Yo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Wo,r.x),o.addScaledVector(Xo,r.y),o.addScaledVector(Yo,r.z),o}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),Hn.subVectors(t,e),mn.cross(Hn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),mn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Mn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Mn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ts.subVectors(s,n),es.subVectors(r,n),Vo.subVectors(t,n);const c=ts.dot(Vo),l=es.dot(Vo);if(c<=0&&l<=0)return e.copy(n);Ho.subVectors(t,s);const h=ts.dot(Ho),u=es.dot(Ho);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ts,o);Go.subVectors(t,r);const f=ts.dot(Go),m=es.dot(Go);if(m>=0&&f<=m)return e.copy(r);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(es,a);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return _l.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(_l,a);const p=1/(g+_+d);return o=_*p,a=d*p,e.copy(n).addScaledVector(ts,o).addScaledVector(es,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},Er={h:0,s:0,l:0};function qo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class lt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=xc(t,1),e=Ue(e,0,1),n=Ue(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=qo(o,r,t+1/3),this.g=qo(o,r,t),this.b=qo(o,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){const n=Qh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jn(t.r),this.g=Jn(t.g),this.b=Jn(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return ae.fromWorkingColorSpace(Ge.copy(this),t),Math.round(Ue(Ge.r*255,0,255))*65536+Math.round(Ue(Ge.g*255,0,255))*256+Math.round(Ue(Ge.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Ge.copy(this),e);const n=Ge.r,s=Ge.g,r=Ge.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=We){ae.fromWorkingColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,s=Ge.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ci),this.setHSL(ci.h+t,ci.s+e,ci.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ci),t.getHSL(Er);const n=Js(ci.h,Er.h,e),s=Js(ci.s,Er.s,e),r=Js(ci.l,Er.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new lt;lt.NAMES=Qh;let uf=0;class Wi extends Gi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uf++}),this.uuid=hn(),this.name="",this.blending=gi,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=_a,this.blendEquation=Li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=vs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gi&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ga&&(n.blendSrc=this.blendSrc),this.blendDst!==_a&&(n.blendDst=this.blendDst),this.blendEquation!==Li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==vs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Qn extends Wi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Oh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Le=new A,Tr=new nt;class Ie{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ec,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Tr.fromBufferAttribute(this,e),Tr.applyMatrix3(t),this.setXY(e,Tr.x,Tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ec&&(t.usage=this.usage),t}}class tu extends Ie{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class eu extends Ie{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class fe extends Ie{constructor(t,e,n){super(new Float32Array(t),e,n)}}let df=0;const on=new Wt,jo=new Ce,ns=new A,nn=new yi,Fs=new yi,ke=new A;class Ae extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kh(t)?eu:tu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new $t().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return jo.lookAt(t),jo.updateMatrix(),this.applyMatrix4(jo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ns).negate(),this.translate(ns.x,ns.y,ns.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new fe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ei);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Fs.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(nn.min,Fs.min),nn.expandByPoint(ke),ke.addVectors(nn.max,Fs.max),nn.expandByPoint(ke)):(nn.expandByPoint(Fs.min),nn.expandByPoint(Fs.max))}nn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)ke.fromBufferAttribute(a,l),c&&(ns.fromBufferAttribute(t,l),ke.add(ns)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ie(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new A,c[D]=new A;const l=new A,h=new A,u=new A,d=new nt,f=new nt,m=new nt,_=new A,g=new A;function p(D,w,M){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),d.fromBufferAttribute(r,D),f.fromBufferAttribute(r,w),m.fromBufferAttribute(r,M),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const R=1/(f.x*m.y-m.x*f.y);isFinite(R)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(R),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(R),a[D].add(_),a[w].add(_),a[M].add(_),c[D].add(g),c[w].add(g),c[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let D=0,w=y.length;D<w;++D){const M=y[D],R=M.start,B=M.count;for(let k=R,U=R+B;k<U;k+=3)p(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const v=new A,x=new A,I=new A,T=new A;function L(D){I.fromBufferAttribute(s,D),T.copy(I);const w=a[D];v.copy(w),v.sub(I.multiplyScalar(I.dot(w))).normalize(),x.crossVectors(T,w);const R=x.dot(c[D])<0?-1:1;o.setXYZW(D,v.x,v.y,v.z,R)}for(let D=0,w=y.length;D<w;++D){const M=y[D],R=M.start,B=M.count;for(let k=R,U=R+B;k<U;k+=3)L(t.getX(k+0)),L(t.getX(k+1)),L(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ie(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new A,r=new A,o=new A,a=new A,c=new A,l=new A,h=new A,u=new A;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Ie(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vl=new Wt,Ei=new As,Ar=new ei,xl=new A,Rr=new A,Cr=new A,Pr=new A,Zo=new A,Lr=new A,yl=new A,Ir=new A;class ee extends Ce{constructor(t=new Ae,e=new Qn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Lr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Zo.fromBufferAttribute(u,t),o?Lr.addScaledVector(Zo,h):Lr.addScaledVector(Zo.sub(e),h))}e.add(Lr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(r),Ei.copy(t.ray).recast(t.near),!(Ar.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Ar,xl)===null||Ei.origin.distanceToSquared(xl)>(t.far-t.near)**2))&&(vl.copy(r).invert(),Ei.copy(t.ray).applyMatrix4(vl),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ei)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),v=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,I=v;x<I;x+=3){const T=a.getX(x),L=a.getX(x+1),D=a.getX(x+2);s=Dr(this,p,t,n,l,h,u,T,L,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=a.getX(g),v=a.getX(g+1),x=a.getX(g+2);s=Dr(this,o,t,n,l,h,u,y,v,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),v=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,I=v;x<I;x+=3){const T=x,L=x+1,D=x+2;s=Dr(this,p,t,n,l,h,u,T,L,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,v=g+1,x=g+2;s=Dr(this,o,t,n,l,h,u,y,v,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function ff(i,t,e,n,s,r,o,a){let c;if(t.side===Xe?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===vi,a),c===null)return null;Ir.copy(a),Ir.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ir);return l<e.near||l>e.far?null:{distance:l,point:Ir.clone(),object:i}}function Dr(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,Rr),i.getVertexPosition(c,Cr),i.getVertexPosition(l,Pr);const h=ff(i,t,e,n,Rr,Cr,Pr,yl);if(h){const u=new A;Mn.getBarycoord(yl,Rr,Cr,Pr,u),s&&(h.uv=Mn.getInterpolatedAttribute(s,a,c,l,u,new nt)),r&&(h.uv1=Mn.getInterpolatedAttribute(r,a,c,l,u,new nt)),o&&(h.normal=Mn.getInterpolatedAttribute(o,a,c,l,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new A,materialIndex:0};Mn.getNormal(Rr,Cr,Pr,d.normal),h.face=d,h.barycoord=u}return h}class En extends Ae{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new fe(l,3)),this.setAttribute("normal",new fe(h,3)),this.setAttribute("uv",new fe(u,2));function m(_,g,p,y,v,x,I,T,L,D,w){const M=x/L,R=I/D,B=x/2,k=I/2,U=T/2,X=L+1,H=D+1;let tt=0,Y=0;const ht=new A;for(let dt=0;dt<H;dt++){const xt=dt*R-k;for(let zt=0;zt<X;zt++){const ie=zt*M-B;ht[_]=ie*y,ht[g]=xt*v,ht[p]=U,l.push(ht.x,ht.y,ht.z),ht[_]=0,ht[g]=0,ht[p]=T>0?1:-1,h.push(ht.x,ht.y,ht.z),u.push(zt/L),u.push(1-dt/D),tt+=1}}for(let dt=0;dt<D;dt++)for(let xt=0;xt<L;xt++){const zt=d+xt+X*dt,ie=d+xt+X*(dt+1),j=d+(xt+1)+X*(dt+1),et=d+(xt+1)+X*dt;c.push(zt,ie,et),c.push(ie,j,et),Y+=6}a.addGroup(f,Y,w),f+=Y,d+=tt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new En(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Es(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function qe(i){const t={};for(let e=0;e<i.length;e++){const n=Es(i[e]);for(const s in n)t[s]=n[s]}return t}function pf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function nu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const mf={clone:Es,merge:qe};var gf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_f=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class In extends Wi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gf,this.fragmentShader=_f,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Es(t.uniforms),this.uniformsGroups=pf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class iu extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Wt,this.projectionMatrix=new Wt,this.projectionMatrixInverse=new Wt,this.coordinateSystem=Zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const li=new A,Ml=new nt,Sl=new nt;class Ze extends iu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ws*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(li.x,li.y).multiplyScalar(-t/li.z),li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(li.x,li.y).multiplyScalar(-t/li.z)}getViewSize(t,e){return this.getViewBounds(t,Ml,Sl),e.subVectors(Sl,Ml)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan($s*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const is=-90,ss=1;class vf extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ze(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new Ze(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new Ze(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new Ze(is,ss,t,e);a.layers=this.layers,this.add(a);const c=new Ze(is,ss,t,e);c.layers=this.layers,this.add(c);const l=new Ze(is,ss,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===co)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class su extends Be{constructor(t,e,n,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:xs,super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class xf extends Bi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new su(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Pn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new En(5,5,5),r=new In({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:mi});r.uniforms.tEquirect.value=e;const o=new ee(s,r),a=e.minFilter;return e.minFilter===Ni&&(e.minFilter=Pn),new vf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Ko=new A,yf=new A,Mf=new $t;class di{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ko.subVectors(n,e).cross(yf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ko),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Mf.getNormalMatrix(t),s=this.coplanarPoint(Ko).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new ei,Ur=new A;class Mc{constructor(t=new di,e=new di,n=new di,s=new di,r=new di,o=new di){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Zn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],m=s[9],_=s[10],g=s[11],p=s[12],y=s[13],v=s[14],x=s[15];if(n[0].setComponents(c-r,d-l,g-f,x-p).normalize(),n[1].setComponents(c+r,d+l,g+f,x+p).normalize(),n[2].setComponents(c+o,d+h,g+m,x+y).normalize(),n[3].setComponents(c-o,d-h,g-m,x-y).normalize(),n[4].setComponents(c-a,d-u,g-_,x-v).normalize(),e===Zn)n[5].setComponents(c+a,d+u,g+_,x+v).normalize();else if(e===co)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(t){return Ti.center.set(0,0,0),Ti.radius=.7071067811865476,Ti.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Ur.x=s.normal.x>0?t.max.x:t.min.x,Ur.y=s.normal.y>0?t.max.y:t.min.y,Ur.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Ur)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ru(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Sf(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Dn extends Ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const y=p*d-o;for(let v=0;v<l;v++){const x=v*u-r;m.push(x,-y,0),_.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const v=y+l*p,x=y+l*(p+1),I=y+1+l*(p+1),T=y+1+l*p;f.push(v,x,T),f.push(x,I,T)}this.setIndex(f),this.setAttribute("position",new fe(m,3)),this.setAttribute("normal",new fe(_,3)),this.setAttribute("uv",new fe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.width,t.height,t.widthSegments,t.heightSegments)}}var bf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ef=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Af=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,If=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Df=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Nf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Of=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ff=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Gf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Yf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,qf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qf="gl_FragColor = linearToOutputTexel( gl_FragColor );",tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ep=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ip=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ap=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,up=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_p=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Mp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ep=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ip=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Np=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Vp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$p=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,am=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,um=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_m=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Em=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Nm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Gm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ym=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,qm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Km=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,$m=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,t0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:bf,alphahash_pars_fragment:wf,alphamap_fragment:Ef,alphamap_pars_fragment:Tf,alphatest_fragment:Af,alphatest_pars_fragment:Rf,aomap_fragment:Cf,aomap_pars_fragment:Pf,batching_pars_vertex:Lf,batching_vertex:If,begin_vertex:Df,beginnormal_vertex:Uf,bsdfs:Nf,iridescence_fragment:Of,bumpmap_pars_fragment:Ff,clipping_planes_fragment:kf,clipping_planes_pars_fragment:Bf,clipping_planes_pars_vertex:zf,clipping_planes_vertex:Vf,color_fragment:Hf,color_pars_fragment:Gf,color_pars_vertex:Wf,color_vertex:Xf,common:Yf,cube_uv_reflection_fragment:qf,defaultnormal_vertex:jf,displacementmap_pars_vertex:Zf,displacementmap_vertex:Kf,emissivemap_fragment:$f,emissivemap_pars_fragment:Jf,colorspace_fragment:Qf,colorspace_pars_fragment:tp,envmap_fragment:ep,envmap_common_pars_fragment:np,envmap_pars_fragment:ip,envmap_pars_vertex:sp,envmap_physical_pars_fragment:mp,envmap_vertex:rp,fog_vertex:op,fog_pars_vertex:ap,fog_fragment:cp,fog_pars_fragment:lp,gradientmap_pars_fragment:hp,lightmap_pars_fragment:up,lights_lambert_fragment:dp,lights_lambert_pars_fragment:fp,lights_pars_begin:pp,lights_toon_fragment:gp,lights_toon_pars_fragment:_p,lights_phong_fragment:vp,lights_phong_pars_fragment:xp,lights_physical_fragment:yp,lights_physical_pars_fragment:Mp,lights_fragment_begin:Sp,lights_fragment_maps:bp,lights_fragment_end:wp,logdepthbuf_fragment:Ep,logdepthbuf_pars_fragment:Tp,logdepthbuf_pars_vertex:Ap,logdepthbuf_vertex:Rp,map_fragment:Cp,map_pars_fragment:Pp,map_particle_fragment:Lp,map_particle_pars_fragment:Ip,metalnessmap_fragment:Dp,metalnessmap_pars_fragment:Up,morphinstance_vertex:Np,morphcolor_vertex:Op,morphnormal_vertex:Fp,morphtarget_pars_vertex:kp,morphtarget_vertex:Bp,normal_fragment_begin:zp,normal_fragment_maps:Vp,normal_pars_fragment:Hp,normal_pars_vertex:Gp,normal_vertex:Wp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:Yp,clearcoat_normal_fragment_maps:qp,clearcoat_pars_fragment:jp,iridescence_pars_fragment:Zp,opaque_fragment:Kp,packing:$p,premultiplied_alpha_fragment:Jp,project_vertex:Qp,dithering_fragment:tm,dithering_pars_fragment:em,roughnessmap_fragment:nm,roughnessmap_pars_fragment:im,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:rm,shadowmap_vertex:om,shadowmask_pars_fragment:am,skinbase_vertex:cm,skinning_pars_vertex:lm,skinning_vertex:hm,skinnormal_vertex:um,specularmap_fragment:dm,specularmap_pars_fragment:fm,tonemapping_fragment:pm,tonemapping_pars_fragment:mm,transmission_fragment:gm,transmission_pars_fragment:_m,uv_pars_fragment:vm,uv_pars_vertex:xm,uv_vertex:ym,worldpos_vertex:Mm,background_vert:Sm,background_frag:bm,backgroundCube_vert:wm,backgroundCube_frag:Em,cube_vert:Tm,cube_frag:Am,depth_vert:Rm,depth_frag:Cm,distanceRGBA_vert:Pm,distanceRGBA_frag:Lm,equirect_vert:Im,equirect_frag:Dm,linedashed_vert:Um,linedashed_frag:Nm,meshbasic_vert:Om,meshbasic_frag:Fm,meshlambert_vert:km,meshlambert_frag:Bm,meshmatcap_vert:zm,meshmatcap_frag:Vm,meshnormal_vert:Hm,meshnormal_frag:Gm,meshphong_vert:Wm,meshphong_frag:Xm,meshphysical_vert:Ym,meshphysical_frag:qm,meshtoon_vert:jm,meshtoon_frag:Zm,points_vert:Km,points_frag:$m,shadow_vert:Jm,shadow_frag:Qm,sprite_vert:t0,sprite_frag:e0},ft={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Rn={basic:{uniforms:qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new lt(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:qe([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:qe([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new lt(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:qe([ft.points,ft.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:qe([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:qe([ft.common,ft.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:qe([ft.sprite,ft.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:qe([ft.common,ft.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:qe([ft.lights,ft.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};Rn.physical={uniforms:qe([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const Nr={r:0,b:0,g:0},Ai=new wn,n0=new Wt;function i0(i,t,e,n,s,r,o){const a=new lt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function m(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?e:t).get(v)),v}function _(y){let v=!1;const x=m(y);x===null?p(a,c):x&&x.isColor&&(p(x,1),v=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,o):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(y,v){const x=m(v);x&&(x.isCubeTexture||x.mapping===_o)?(h===void 0&&(h=new ee(new En(1,1,1),new In({name:"BackgroundCubeMaterial",uniforms:Es(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(I,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ai.copy(v.backgroundRotation),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(n0.makeRotationFromEuler(Ai)),h.material.toneMapped=ae.getTransfer(x.colorSpace)!==ve,(u!==x||d!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new ee(new Dn(2,2),new In({name:"BackgroundMaterial",uniforms:Es(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=ae.getTransfer(x.colorSpace)!==ve,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,v){y.getRGB(Nr,nu(i)),n.buffers.color.setClear(Nr.r,Nr.g,Nr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:g}}function s0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(M,R,B,k,U){let X=!1;const H=u(k,B,R);r!==H&&(r=H,l(r.object)),X=f(M,k,B,U),X&&m(M,k,B,U),U!==null&&t.update(U,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,x(M,R,B,k),U!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(U).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,R,B){const k=B.wireframe===!0;let U=n[M.id];U===void 0&&(U={},n[M.id]=U);let X=U[R.id];X===void 0&&(X={},U[R.id]=X);let H=X[k];return H===void 0&&(H=d(c()),X[k]=H),H}function d(M){const R=[],B=[],k=[];for(let U=0;U<e;U++)R[U]=0,B[U]=0,k[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:B,attributeDivisors:k,object:M,attributes:{},index:null}}function f(M,R,B,k){const U=r.attributes,X=R.attributes;let H=0;const tt=B.getAttributes();for(const Y in tt)if(tt[Y].location>=0){const dt=U[Y];let xt=X[Y];if(xt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(xt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(xt=M.instanceColor)),dt===void 0||dt.attribute!==xt||xt&&dt.data!==xt.data)return!0;H++}return r.attributesNum!==H||r.index!==k}function m(M,R,B,k){const U={},X=R.attributes;let H=0;const tt=B.getAttributes();for(const Y in tt)if(tt[Y].location>=0){let dt=X[Y];dt===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(dt=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(dt=M.instanceColor));const xt={};xt.attribute=dt,dt&&dt.data&&(xt.data=dt.data),U[Y]=xt,H++}r.attributes=U,r.attributesNum=H,r.index=k}function _(){const M=r.newAttributes;for(let R=0,B=M.length;R<B;R++)M[R]=0}function g(M){p(M,0)}function p(M,R){const B=r.newAttributes,k=r.enabledAttributes,U=r.attributeDivisors;B[M]=1,k[M]===0&&(i.enableVertexAttribArray(M),k[M]=1),U[M]!==R&&(i.vertexAttribDivisor(M,R),U[M]=R)}function y(){const M=r.newAttributes,R=r.enabledAttributes;for(let B=0,k=R.length;B<k;B++)R[B]!==M[B]&&(i.disableVertexAttribArray(B),R[B]=0)}function v(M,R,B,k,U,X,H){H===!0?i.vertexAttribIPointer(M,R,B,U,X):i.vertexAttribPointer(M,R,B,k,U,X)}function x(M,R,B,k){_();const U=k.attributes,X=B.getAttributes(),H=R.defaultAttributeValues;for(const tt in X){const Y=X[tt];if(Y.location>=0){let ht=U[tt];if(ht===void 0&&(tt==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),tt==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor)),ht!==void 0){const dt=ht.normalized,xt=ht.itemSize,zt=t.get(ht);if(zt===void 0)continue;const ie=zt.buffer,j=zt.type,et=zt.bytesPerElement,Tt=j===i.INT||j===i.UNSIGNED_INT||ht.gpuType===dc;if(ht.isInterleavedBufferAttribute){const at=ht.data,Nt=at.stride,qt=ht.offset;if(at.isInstancedInterleavedBuffer){for(let Gt=0;Gt<Y.locationSize;Gt++)p(Y.location+Gt,at.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Gt=0;Gt<Y.locationSize;Gt++)g(Y.location+Gt);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Gt=0;Gt<Y.locationSize;Gt++)v(Y.location+Gt,xt/Y.locationSize,j,dt,Nt*et,(qt+xt/Y.locationSize*Gt)*et,Tt)}else{if(ht.isInstancedBufferAttribute){for(let at=0;at<Y.locationSize;at++)p(Y.location+at,ht.meshPerAttribute);M.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let at=0;at<Y.locationSize;at++)g(Y.location+at);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let at=0;at<Y.locationSize;at++)v(Y.location+at,xt/Y.locationSize,j,dt,xt*et,xt/Y.locationSize*at*et,Tt)}}else if(H!==void 0){const dt=H[tt];if(dt!==void 0)switch(dt.length){case 2:i.vertexAttrib2fv(Y.location,dt);break;case 3:i.vertexAttrib3fv(Y.location,dt);break;case 4:i.vertexAttrib4fv(Y.location,dt);break;default:i.vertexAttrib1fv(Y.location,dt)}}}}y()}function I(){D();for(const M in n){const R=n[M];for(const B in R){const k=R[B];for(const U in k)h(k[U].object),delete k[U];delete R[B]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const R=n[M.id];for(const B in R){const k=R[B];for(const U in k)h(k[U].object),delete k[U];delete R[B]}delete n[M.id]}function L(M){for(const R in n){const B=n[R];if(B[M.id]===void 0)continue;const k=B[M.id];for(const U in k)h(k[U].object),delete k[U];delete B[M.id]}}function D(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:w,dispose:I,releaseStatesOfGeometry:T,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function r0(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function o0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(L){return!(L!==ln&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const D=L===hr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==ti&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Sn&&!D)}function c(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:I,maxSamples:T}}function a0(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new di,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{const y=r?0:n,v=y*4;let x=p.clippingState||null;c.value=x,x=h(m,d,v,f);for(let I=0;I!==v;++I)x[I]=e[I];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function c0(i){let t=new WeakMap;function e(o,a){return a===Ea?o.mapping=xs:a===Ta&&(o.mapping=ys),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ea||a===Ta)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new xf(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class ou extends iu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ds=4,bl=[.125,.215,.35,.446,.526,.582],Ii=20,$o=new ou,wl=new lt;let Jo=null,Qo=0,ta=0,ea=!1;const Pi=(1+Math.sqrt(5))/2,rs=1/Pi,El=[new A(-Pi,rs,0),new A(Pi,rs,0),new A(-rs,0,Pi),new A(rs,0,Pi),new A(0,Pi,-rs),new A(0,Pi,rs),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class Tl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Jo,Qo,ta),this._renderer.xr.enabled=ea,t.scissorTest=!1,Or(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===ys?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:hr,format:ln,colorSpace:Ts,depthBuffer:!1},s=Al(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Al(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=l0(r)),this._blurMaterial=h0(r,t,e)}return s}_compileMaterial(t){const e=new ee(this._lodPlanes[0],t);this._renderer.compile(e,$o)}_sceneToCubeUV(t,e,n,s){const a=new Ze(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(wl),h.toneMapping=_i,h.autoClear=!1;const f=new Qn({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),m=new ee(new En,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(wl),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const v=this._cubeSize;Or(s,y*v,p>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===xs||t.mapping===ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Rl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ee(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Or(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,$o)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=El[(s-r-1)%El.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ee(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ii-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):Ii;g>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ii}`);const p=[];let y=0;for(let L=0;L<Ii;++L){const D=L/_,w=Math.exp(-D*D/2);p.push(w),L===0?y+=w:L<g&&(y+=2*w)}for(let L=0;L<p.length;L++)p[L]=p[L]/y;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;const x=this._sizeLods[s],I=3*x*(s>v-ds?s-v+ds:0),T=4*(this._cubeSize-x);Or(e,I,T,3*x,2*x),c.setRenderTarget(e),c.render(u,$o)}}function l0(i){const t=[],e=[],n=[];let s=i;const r=i-ds+1+bl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-ds?c=bl[o-i+ds-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),v=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let T=0;T<f;T++){const L=T%3*2/3-1,D=T>2?0:-1,w=[L,D,0,L+2/3,D,0,L+2/3,D+1,0,L,D,0,L+2/3,D+1,0,L,D+1,0];y.set(w,_*m*T),v.set(d,g*m*T);const M=[T,T,T,T,T,T];x.set(M,p*m*T)}const I=new Ae;I.setAttribute("position",new Ie(y,_)),I.setAttribute("uv",new Ie(v,g)),I.setAttribute("faceIndex",new Ie(x,p)),t.push(I),s>ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Al(i,t,e){const n=new Bi(i,t,e);return n.texture.mapping=_o,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Or(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function h0(i,t,e){const n=new Float32Array(Ii),s=new A(0,1,0);return new In({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Rl(){return new In({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Cl(){return new In({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mi,depthTest:!1,depthWrite:!1})}function Sc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function u0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ea||c===Ta,h=c===xs||c===ys;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Tl(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Tl(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function d0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Zs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function f0(i,t,e,n){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)t.remove(_[g])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const m in d)t.update(d[m],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const _=f[m];for(let g=0,p=_.length;g<p;g++)t.update(_[g],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let v=0,x=y.length;v<x;v+=3){const I=y[v+0],T=y[v+1],L=y[v+2];d.push(I,T,T,L,L,I)}}else if(m!==void 0){const y=m.array;_=m.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const I=v+0,T=v+1,L=v+2;d.push(I,T,T,L,L,I)}}else return;const g=new(Kh(d)?eu:tu)(d,1);g.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function p0(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function l(d,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,d*o,m),e.update(f,n,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,n,1)}function u(d,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function m0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function g0(i,t,e){const n=new WeakMap,s=new he;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let w=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",w)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;f===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let x=a.attributes.position.count*v,I=1;x>t.maxTextureSize&&(I=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const T=new Float32Array(x*I*4*u),L=new Jh(T,x,I,u);L.type=Sn,L.needsUpdate=!0;const D=v*4;for(let M=0;M<u;M++){const R=g[M],B=p[M],k=y[M],U=x*I*4*M;for(let X=0;X<R.count;X++){const H=X*D;f===!0&&(s.fromBufferAttribute(R,X),T[U+H+0]=s.x,T[U+H+1]=s.y,T[U+H+2]=s.z,T[U+H+3]=0),m===!0&&(s.fromBufferAttribute(B,X),T[U+H+4]=s.x,T[U+H+5]=s.y,T[U+H+6]=s.z,T[U+H+7]=0),_===!0&&(s.fromBufferAttribute(k,X),T[U+H+8]=s.x,T[U+H+9]=s.y,T[U+H+10]=s.z,T[U+H+11]=k.itemSize===4?s.w:1)}}d={count:u,texture:L,size:new nt(x,I)},n.set(a,d),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function _0(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class au extends Be{constructor(t,e,n,s,r,o,a,c,l,h=gs){if(h!==gs&&h!==bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gs&&(n=ki),n===void 0&&h===bs&&(n=Ss),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:sn,this.minFilter=c!==void 0?c:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const cu=new Be,Pl=new au(1,1),lu=new Jh,hu=new nf,uu=new su,Ll=[],Il=[],Dl=new Float32Array(16),Ul=new Float32Array(9),Nl=new Float32Array(4);function Rs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Ll[s];if(r===void 0&&(r=new Float32Array(s),Ll[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function xo(i,t){let e=Il[t];e===void 0&&(e=new Int32Array(t),Il[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function v0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function x0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function y0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function M0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function S0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;Nl.set(n),i.uniformMatrix2fv(this.addr,!1,Nl),Oe(e,n)}}function b0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;Ul.set(n),i.uniformMatrix3fv(this.addr,!1,Ul),Oe(e,n)}}function w0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;Dl.set(n),i.uniformMatrix4fv(this.addr,!1,Dl),Oe(e,n)}}function E0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function T0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function A0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function R0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function C0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function P0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function L0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function I0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function D0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Pl.compareFunction=Zh,r=Pl):r=cu,e.setTexture2D(t||r,s)}function U0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||hu,s)}function N0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||uu,s)}function O0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||lu,s)}function F0(i){switch(i){case 5126:return v0;case 35664:return x0;case 35665:return y0;case 35666:return M0;case 35674:return S0;case 35675:return b0;case 35676:return w0;case 5124:case 35670:return E0;case 35667:case 35671:return T0;case 35668:case 35672:return A0;case 35669:case 35673:return R0;case 5125:return C0;case 36294:return P0;case 36295:return L0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return D0;case 35679:case 36299:case 36307:return U0;case 35680:case 36300:case 36308:case 36293:return N0;case 36289:case 36303:case 36311:case 36292:return O0}}function k0(i,t){i.uniform1fv(this.addr,t)}function B0(i,t){const e=Rs(t,this.size,2);i.uniform2fv(this.addr,e)}function z0(i,t){const e=Rs(t,this.size,3);i.uniform3fv(this.addr,e)}function V0(i,t){const e=Rs(t,this.size,4);i.uniform4fv(this.addr,e)}function H0(i,t){const e=Rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function G0(i,t){const e=Rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function W0(i,t){const e=Rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function X0(i,t){i.uniform1iv(this.addr,t)}function Y0(i,t){i.uniform2iv(this.addr,t)}function q0(i,t){i.uniform3iv(this.addr,t)}function j0(i,t){i.uniform4iv(this.addr,t)}function Z0(i,t){i.uniform1uiv(this.addr,t)}function K0(i,t){i.uniform2uiv(this.addr,t)}function $0(i,t){i.uniform3uiv(this.addr,t)}function J0(i,t){i.uniform4uiv(this.addr,t)}function Q0(i,t,e){const n=this.cache,s=t.length,r=xo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||cu,r[o])}function tg(i,t,e){const n=this.cache,s=t.length,r=xo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||hu,r[o])}function eg(i,t,e){const n=this.cache,s=t.length,r=xo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||uu,r[o])}function ng(i,t,e){const n=this.cache,s=t.length,r=xo(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||lu,r[o])}function ig(i){switch(i){case 5126:return k0;case 35664:return B0;case 35665:return z0;case 35666:return V0;case 35674:return H0;case 35675:return G0;case 35676:return W0;case 5124:case 35670:return X0;case 35667:case 35671:return Y0;case 35668:case 35672:return q0;case 35669:case 35673:return j0;case 5125:return Z0;case 36294:return K0;case 36295:return $0;case 36296:return J0;case 35678:case 36198:case 36298:case 36306:case 35682:return Q0;case 35679:case 36299:case 36307:return tg;case 35680:case 36300:case 36308:case 36293:return eg;case 36289:case 36303:case 36311:case 36292:return ng}}class sg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=F0(e.type)}}class rg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ig(e.type)}}class og{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function Ol(i,t){i.seq.push(t),i.map[t.id]=t}function ag(i,t,e){const n=i.name,s=n.length;for(na.lastIndex=0;;){const r=na.exec(n),o=na.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Ol(e,l===void 0?new sg(a,i,t):new rg(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new og(a),Ol(e,u)),e=u}}}class so{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);ag(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Fl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const cg=37297;let lg=0;function hg(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const kl=new $t;function ug(i){ae._getMatrix(kl,ae.workingColorSpace,i);const t=`mat3( ${kl.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case vo:return[t,"LinearTransferOETF"];case ve:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Bl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+hg(i.getShaderSource(t),o)}else return s}function dg(i,t){const e=ug(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function fg(i,t){let e;switch(t){case fd:e="Linear";break;case pd:e="Reinhard";break;case md:e="Cineon";break;case Fh:e="ACESFilmic";break;case _d:e="AgX";break;case vd:e="Neutral";break;case gd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fr=new A;function pg(){ae.getLuminanceCoefficients(Fr);const i=Fr.x.toFixed(4),t=Fr.y.toFixed(4),e=Fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function gg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function _g(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ks(i){return i!==""}function zl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Vl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ic(i){return i.replace(vg,yg)}const xg=new Map;function yg(i,t){let e=Qt[t];if(e===void 0){const n=xg.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ic(e)}const Mg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(i){return i.replace(Mg,Sg)}function Sg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Gl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function bg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Uh?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Nh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===qn&&(t="SHADOWMAP_TYPE_VSM"),t}function wg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xs:case ys:t="ENVMAP_TYPE_CUBE";break;case _o:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Eg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ys:t="ENVMAP_MODE_REFRACTION";break}return t}function Tg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Oh:t="ENVMAP_BLENDING_MULTIPLY";break;case ud:t="ENVMAP_BLENDING_MIX";break;case dd:t="ENVMAP_BLENDING_ADD";break}return t}function Ag(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Rg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=bg(e),l=wg(e),h=Eg(e),u=Tg(e),d=Ag(e),f=mg(e),m=gg(r),_=s.createProgram();let g,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ks).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ks).join(`
`),p.length>0&&(p+=`
`)):(g=[Gl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),p=[Gl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_i?"#define TONE_MAPPING":"",e.toneMapping!==_i?Qt.tonemapping_pars_fragment:"",e.toneMapping!==_i?fg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,dg("linearToOutputTexel",e.outputColorSpace),pg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ks).join(`
`)),o=ic(o),o=zl(o,e),o=Vl(o,e),a=ic(a),a=zl(a,e),a=Vl(a,e),o=Hl(o),a=Hl(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===el?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===el?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+g+o,x=y+p+a,I=Fl(s,s.VERTEX_SHADER,v),T=Fl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,I),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function L(R){if(i.debug.checkShaderErrors){const B=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(I).trim(),U=s.getShaderInfoLog(T).trim();let X=!0,H=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,I,T);else{const tt=Bl(s,I,"vertex"),Y=Bl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+tt+`
`+Y)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(k===""||U==="")&&(H=!1);H&&(R.diagnostics={runnable:X,programLog:B,vertexShader:{log:k,prefix:g},fragmentShader:{log:U,prefix:p}})}s.deleteShader(I),s.deleteShader(T),D=new so(s,_),w=_g(s,_)}let D;this.getUniforms=function(){return D===void 0&&L(this),D};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,cg)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=lg++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=I,this.fragmentShader=T,this}let Cg=0;class Pg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Lg(t),e.set(t,n)),n}}class Lg{constructor(t){this.id=Cg++,this.code=t,this.usedTimes=0}}function Ig(i,t,e,n,s,r,o){const a=new yc,c=new Pg,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return l.add(w),w===0?"uv":`uv${w}`}function g(w,M,R,B,k){const U=B.fog,X=k.geometry,H=w.isMeshStandardMaterial?B.environment:null,tt=(w.isMeshStandardMaterial?e:t).get(w.envMap||H),Y=tt&&tt.mapping===_o?tt.image.height:null,ht=m[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const dt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,xt=dt!==void 0?dt.length:0;let zt=0;X.morphAttributes.position!==void 0&&(zt=1),X.morphAttributes.normal!==void 0&&(zt=2),X.morphAttributes.color!==void 0&&(zt=3);let ie,j,et,Tt;if(ht){const pe=Rn[ht];ie=pe.vertexShader,j=pe.fragmentShader}else ie=w.vertexShader,j=w.fragmentShader,c.update(w),et=c.getVertexShaderID(w),Tt=c.getFragmentShaderID(w);const at=i.getRenderTarget(),Nt=i.state.buffers.depth.getReversed(),qt=k.isInstancedMesh===!0,Gt=k.isBatchedMesh===!0,oe=!!w.map,J=!!w.matcap,rt=!!tt,C=!!w.aoMap,Lt=!!w.lightMap,it=!!w.bumpMap,St=!!w.normalMap,ut=!!w.displacementMap,Vt=!!w.emissiveMap,yt=!!w.metalnessMap,E=!!w.roughnessMap,S=w.anisotropy>0,z=w.clearcoat>0,Z=w.dispersion>0,Q=w.iridescence>0,K=w.sheen>0,At=w.transmission>0,pt=S&&!!w.anisotropyMap,Mt=z&&!!w.clearcoatMap,se=z&&!!w.clearcoatNormalMap,st=z&&!!w.clearcoatRoughnessMap,bt=Q&&!!w.iridescenceMap,Ht=Q&&!!w.iridescenceThicknessMap,Xt=K&&!!w.sheenColorMap,wt=K&&!!w.sheenRoughnessMap,re=!!w.specularMap,Jt=!!w.specularColorMap,Me=!!w.specularIntensityMap,N=At&&!!w.transmissionMap,mt=At&&!!w.thicknessMap,q=!!w.gradientMap,$=!!w.alphaMap,vt=w.alphaTest>0,gt=!!w.alphaHash,Zt=!!w.extensions;let Re=_i;w.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Re=i.toneMapping);const Ve={shaderID:ht,shaderType:w.type,shaderName:w.name,vertexShader:ie,fragmentShader:j,defines:w.defines,customVertexShaderID:et,customFragmentShaderID:Tt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Gt,batchingColor:Gt&&k._colorsTexture!==null,instancing:qt,instancingColor:qt&&k.instanceColor!==null,instancingMorph:qt&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?i.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Ts,alphaToCoverage:!!w.alphaToCoverage,map:oe,matcap:J,envMap:rt,envMapMode:rt&&tt.mapping,envMapCubeUVHeight:Y,aoMap:C,lightMap:Lt,bumpMap:it,normalMap:St,displacementMap:d&&ut,emissiveMap:Vt,normalMapObjectSpace:St&&w.normalMapType===wd,normalMapTangentSpace:St&&w.normalMapType===jh,metalnessMap:yt,roughnessMap:E,anisotropy:S,anisotropyMap:pt,clearcoat:z,clearcoatMap:Mt,clearcoatNormalMap:se,clearcoatRoughnessMap:st,dispersion:Z,iridescence:Q,iridescenceMap:bt,iridescenceThicknessMap:Ht,sheen:K,sheenColorMap:Xt,sheenRoughnessMap:wt,specularMap:re,specularColorMap:Jt,specularIntensityMap:Me,transmission:At,transmissionMap:N,thicknessMap:mt,gradientMap:q,opaque:w.transparent===!1&&w.blending===gi&&w.alphaToCoverage===!1,alphaMap:$,alphaTest:vt,alphaHash:gt,combine:w.combine,mapUv:oe&&_(w.map.channel),aoMapUv:C&&_(w.aoMap.channel),lightMapUv:Lt&&_(w.lightMap.channel),bumpMapUv:it&&_(w.bumpMap.channel),normalMapUv:St&&_(w.normalMap.channel),displacementMapUv:ut&&_(w.displacementMap.channel),emissiveMapUv:Vt&&_(w.emissiveMap.channel),metalnessMapUv:yt&&_(w.metalnessMap.channel),roughnessMapUv:E&&_(w.roughnessMap.channel),anisotropyMapUv:pt&&_(w.anisotropyMap.channel),clearcoatMapUv:Mt&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:se&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:wt&&_(w.sheenRoughnessMap.channel),specularMapUv:re&&_(w.specularMap.channel),specularColorMapUv:Jt&&_(w.specularColorMap.channel),specularIntensityMapUv:Me&&_(w.specularIntensityMap.channel),transmissionMapUv:N&&_(w.transmissionMap.channel),thicknessMapUv:mt&&_(w.thicknessMap.channel),alphaMapUv:$&&_(w.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(St||S),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!X.attributes.uv&&(oe||$),fog:!!U,useFog:w.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Nt,skinning:k.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:zt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Re,decodeVideoTexture:oe&&w.map.isVideoTexture===!0&&ae.getTransfer(w.map.colorSpace)===ve,decodeVideoTextureEmissive:Vt&&w.emissiveMap.isVideoTexture===!0&&ae.getTransfer(w.emissiveMap.colorSpace)===ve,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===xn,flipSided:w.side===Xe,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Zt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Zt&&w.extensions.multiDraw===!0||Gt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ve.vertexUv1s=l.has(1),Ve.vertexUv2s=l.has(2),Ve.vertexUv3s=l.has(3),l.clear(),Ve}function p(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const R in w.defines)M.push(R),M.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(y(M,w),v(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function y(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const M=m[w.type];let R;if(M){const B=Rn[M];R=mf.clone(B.uniforms)}else R=w.uniforms;return R}function I(w,M){let R;for(let B=0,k=h.length;B<k;B++){const U=h[B];if(U.cacheKey===M){R=U,++R.usedTimes;break}}return R===void 0&&(R=new Rg(i,M,w,r),h.push(R)),R}function T(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function L(w){c.remove(w)}function D(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:I,releaseProgram:T,releaseShaderCache:L,programs:h,dispose:D}}function Dg(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Ug(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Xl(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,_,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function a(u,d,f,m,_,g){const p=o(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):e.push(p)}function c(u,d,f,m,_,g){const p=o(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||Ug),n.length>1&&n.sort(d||Wl),s.length>1&&s.sort(d||Wl)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Ng(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Xl,i.set(n,[o])):s>=r.length?(o=new Xl,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Og(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new lt};break;case"SpotLight":e={position:new A,direction:new A,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new lt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":e={color:new lt,position:new A,halfWidth:new A,halfHeight:new A};break}return i[t.id]=e,e}}}function Fg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let kg=0;function Bg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function zg(i){const t=new Og,e=Fg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new A);const s=new A,r=new Wt,o=new Wt;function a(l){let h=0,u=0,d=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,v=0,x=0,I=0,T=0,L=0;l.sort(Bg);for(let w=0,M=l.length;w<M;w++){const R=l[w],B=R.color,k=R.intensity,U=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=B.r*k,u+=B.g*k,d+=B.b*k;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],k);L++}else if(R.isDirectionalLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const tt=R.shadow,Y=e.get(R);Y.shadowIntensity=tt.intensity,Y.shadowBias=tt.bias,Y.shadowNormalBias=tt.normalBias,Y.shadowRadius=tt.radius,Y.shadowMapSize=tt.mapSize,n.directionalShadow[f]=Y,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=R.shadow.matrix,y++}n.directional[f]=H,f++}else if(R.isSpotLight){const H=t.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(B).multiplyScalar(k),H.distance=U,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[_]=H;const tt=R.shadow;if(R.map&&(n.spotLightMap[I]=R.map,I++,tt.updateMatrices(R),R.castShadow&&T++),n.spotLightMatrix[_]=tt.matrix,R.castShadow){const Y=e.get(R);Y.shadowIntensity=tt.intensity,Y.shadowBias=tt.bias,Y.shadowNormalBias=tt.normalBias,Y.shadowRadius=tt.radius,Y.shadowMapSize=tt.mapSize,n.spotShadow[_]=Y,n.spotShadowMap[_]=X,x++}_++}else if(R.isRectAreaLight){const H=t.get(R);H.color.copy(B).multiplyScalar(k),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=H,g++}else if(R.isPointLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const tt=R.shadow,Y=e.get(R);Y.shadowIntensity=tt.intensity,Y.shadowBias=tt.bias,Y.shadowNormalBias=tt.normalBias,Y.shadowRadius=tt.radius,Y.shadowMapSize=tt.mapSize,Y.shadowCameraNear=tt.camera.near,Y.shadowCameraFar=tt.camera.far,n.pointShadow[m]=Y,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=R.shadow.matrix,v++}n.point[m]=H,m++}else if(R.isHemisphereLight){const H=t.get(R);H.skyColor.copy(R.color).multiplyScalar(k),H.groundColor.copy(R.groundColor).multiplyScalar(k),n.hemi[p]=H,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const D=n.hash;(D.directionalLength!==f||D.pointLength!==m||D.spotLength!==_||D.rectAreaLength!==g||D.hemiLength!==p||D.numDirectionalShadows!==y||D.numPointShadows!==v||D.numSpotShadows!==x||D.numSpotMaps!==I||D.numLightProbes!==L)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+I-T,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=L,D.directionalLength=f,D.pointLength=m,D.spotLength=_,D.rectAreaLength=g,D.hemiLength=p,D.numDirectionalShadows=y,D.numPointShadows=v,D.numSpotShadows=x,D.numSpotMaps=I,D.numLightProbes=L,n.version=kg++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const v=l[p];if(v.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),u++}else if(v.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(v.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){const x=n.point[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function Yl(i){const t=new zg(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Vg(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Yl(i),t.set(s,[a])):r>=o.length?(a=new Yl(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Hg extends Wi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Sd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Gg extends Wi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Wg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Yg(i,t,e){let n=new Mc;const s=new nt,r=new nt,o=new he,a=new Hg({depthPacking:bd}),c=new Gg,l={},h=e.maxTextureSize,u={[vi]:Xe,[Xe]:vi,[xn]:xn},d=new In({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Wg,fragmentShader:Xg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new Ae;m.setAttribute("position",new Ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ee(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uh;let p=this.type;this.render=function(T,L,D){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),B=i.state;B.setBlending(mi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const k=p!==qn&&this.type===qn,U=p===qn&&this.type!==qn;for(let X=0,H=T.length;X<H;X++){const tt=T[X],Y=tt.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",tt,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ht=Y.getFrameExtents();if(s.multiply(ht),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ht.x),s.x=r.x*ht.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ht.y),s.y=r.y*ht.y,Y.mapSize.y=r.y)),Y.map===null||k===!0||U===!0){const xt=this.type!==qn?{minFilter:sn,magFilter:sn}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Bi(s.x,s.y,xt),Y.map.texture.name=tt.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const dt=Y.getViewportCount();for(let xt=0;xt<dt;xt++){const zt=Y.getViewport(xt);o.set(r.x*zt.x,r.y*zt.y,r.x*zt.z,r.y*zt.w),B.viewport(o),Y.updateMatrices(tt,xt),n=Y.getFrustum(),x(L,D,Y.camera,tt,this.type)}Y.isPointLightShadow!==!0&&this.type===qn&&y(Y,D),Y.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(w,M,R)};function y(T,L){const D=t.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Bi(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(L,null,D,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(L,null,D,f,_,null)}function v(T,L,D,w){let M=null;const R=D.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)M=R;else if(M=D.isPointLight===!0?c:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const B=M.uuid,k=L.uuid;let U=l[B];U===void 0&&(U={},l[B]=U);let X=U[k];X===void 0&&(X=M.clone(),U[k]=X,L.addEventListener("dispose",I)),M=X}if(M.visible=L.visible,M.wireframe=L.wireframe,w===qn?M.side=L.shadowSide!==null?L.shadowSide:L.side:M.side=L.shadowSide!==null?L.shadowSide:u[L.side],M.alphaMap=L.alphaMap,M.alphaTest=L.alphaTest,M.map=L.map,M.clipShadows=L.clipShadows,M.clippingPlanes=L.clippingPlanes,M.clipIntersection=L.clipIntersection,M.displacementMap=L.displacementMap,M.displacementScale=L.displacementScale,M.displacementBias=L.displacementBias,M.wireframeLinewidth=L.wireframeLinewidth,M.linewidth=L.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=i.properties.get(M);B.light=D}return M}function x(T,L,D,w,M){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===qn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,T.matrixWorld);const k=t.update(T),U=T.material;if(Array.isArray(U)){const X=k.groups;for(let H=0,tt=X.length;H<tt;H++){const Y=X[H],ht=U[Y.materialIndex];if(ht&&ht.visible){const dt=v(T,ht,w,M);T.onBeforeShadow(i,T,L,D,k,dt,Y),i.renderBufferDirect(D,null,k,dt,T,Y),T.onAfterShadow(i,T,L,D,k,dt,Y)}}}else if(U.visible){const X=v(T,U,w,M);T.onBeforeShadow(i,T,L,D,k,X,null),i.renderBufferDirect(D,null,k,X,T,null),T.onAfterShadow(i,T,L,D,k,X,null)}}const B=T.children;for(let k=0,U=B.length;k<U;k++)x(B[k],L,D,w,M)}function I(T){T.target.removeEventListener("dispose",I);for(const D in l){const w=l[D],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const qg={[va]:xa,[ya]:ba,[Ma]:wa,[vs]:Sa,[xa]:va,[ba]:ya,[wa]:Ma,[Sa]:vs};function jg(i,t){function e(){let N=!1;const mt=new he;let q=null;const $=new he(0,0,0,0);return{setMask:function(vt){q!==vt&&!N&&(i.colorMask(vt,vt,vt,vt),q=vt)},setLocked:function(vt){N=vt},setClear:function(vt,gt,Zt,Re,Ve){Ve===!0&&(vt*=Re,gt*=Re,Zt*=Re),mt.set(vt,gt,Zt,Re),$.equals(mt)===!1&&(i.clearColor(vt,gt,Zt,Re),$.copy(mt))},reset:function(){N=!1,q=null,$.set(-1,0,0,0)}}}function n(){let N=!1,mt=!1,q=null,$=null,vt=null;return{setReversed:function(gt){if(mt!==gt){const Zt=t.get("EXT_clip_control");mt?Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.ZERO_TO_ONE_EXT):Zt.clipControlEXT(Zt.LOWER_LEFT_EXT,Zt.NEGATIVE_ONE_TO_ONE_EXT);const Re=vt;vt=null,this.setClear(Re)}mt=gt},getReversed:function(){return mt},setTest:function(gt){gt?at(i.DEPTH_TEST):Nt(i.DEPTH_TEST)},setMask:function(gt){q!==gt&&!N&&(i.depthMask(gt),q=gt)},setFunc:function(gt){if(mt&&(gt=qg[gt]),$!==gt){switch(gt){case va:i.depthFunc(i.NEVER);break;case xa:i.depthFunc(i.ALWAYS);break;case ya:i.depthFunc(i.LESS);break;case vs:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case Sa:i.depthFunc(i.GEQUAL);break;case ba:i.depthFunc(i.GREATER);break;case wa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}$=gt}},setLocked:function(gt){N=gt},setClear:function(gt){vt!==gt&&(mt&&(gt=1-gt),i.clearDepth(gt),vt=gt)},reset:function(){N=!1,q=null,$=null,vt=null,mt=!1}}}function s(){let N=!1,mt=null,q=null,$=null,vt=null,gt=null,Zt=null,Re=null,Ve=null;return{setTest:function(pe){N||(pe?at(i.STENCIL_TEST):Nt(i.STENCIL_TEST))},setMask:function(pe){mt!==pe&&!N&&(i.stencilMask(pe),mt=pe)},setFunc:function(pe,un,Fn){(q!==pe||$!==un||vt!==Fn)&&(i.stencilFunc(pe,un,Fn),q=pe,$=un,vt=Fn)},setOp:function(pe,un,Fn){(gt!==pe||Zt!==un||Re!==Fn)&&(i.stencilOp(pe,un,Fn),gt=pe,Zt=un,Re=Fn)},setLocked:function(pe){N=pe},setClear:function(pe){Ve!==pe&&(i.clearStencil(pe),Ve=pe)},reset:function(){N=!1,mt=null,q=null,$=null,vt=null,gt=null,Zt=null,Re=null,Ve=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,I=null,T=null,L=new lt(0,0,0),D=0,w=!1,M=null,R=null,B=null,k=null,U=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,tt=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(tt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),H=tt>=1):Y.indexOf("OpenGL ES")!==-1&&(tt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),H=tt>=2);let ht=null,dt={};const xt=i.getParameter(i.SCISSOR_BOX),zt=i.getParameter(i.VIEWPORT),ie=new he().fromArray(xt),j=new he().fromArray(zt);function et(N,mt,q,$){const vt=new Uint8Array(4),gt=i.createTexture();i.bindTexture(N,gt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Zt=0;Zt<q;Zt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(mt,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,vt):i.texImage2D(mt+Zt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,vt);return gt}const Tt={};Tt[i.TEXTURE_2D]=et(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=et(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),at(i.DEPTH_TEST),o.setFunc(vs),it(!1),St(qc),at(i.CULL_FACE),C(mi);function at(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function Nt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function qt(N,mt){return u[N]!==mt?(i.bindFramebuffer(N,mt),u[N]=mt,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=mt),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=mt),!0):!1}function Gt(N,mt){let q=f,$=!1;if(N){q=d.get(mt),q===void 0&&(q=[],d.set(mt,q));const vt=N.textures;if(q.length!==vt.length||q[0]!==i.COLOR_ATTACHMENT0){for(let gt=0,Zt=vt.length;gt<Zt;gt++)q[gt]=i.COLOR_ATTACHMENT0+gt;q.length=vt.length,$=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,$=!0);$&&i.drawBuffers(q)}function oe(N){return m!==N?(i.useProgram(N),m=N,!0):!1}const J={[Li]:i.FUNC_ADD,[ju]:i.FUNC_SUBTRACT,[Zu]:i.FUNC_REVERSE_SUBTRACT};J[Ku]=i.MIN,J[$u]=i.MAX;const rt={[Ju]:i.ZERO,[Qu]:i.ONE,[td]:i.SRC_COLOR,[ga]:i.SRC_ALPHA,[od]:i.SRC_ALPHA_SATURATE,[sd]:i.DST_COLOR,[nd]:i.DST_ALPHA,[ed]:i.ONE_MINUS_SRC_COLOR,[_a]:i.ONE_MINUS_SRC_ALPHA,[rd]:i.ONE_MINUS_DST_COLOR,[id]:i.ONE_MINUS_DST_ALPHA,[ad]:i.CONSTANT_COLOR,[cd]:i.ONE_MINUS_CONSTANT_COLOR,[ld]:i.CONSTANT_ALPHA,[hd]:i.ONE_MINUS_CONSTANT_ALPHA};function C(N,mt,q,$,vt,gt,Zt,Re,Ve,pe){if(N===mi){_===!0&&(Nt(i.BLEND),_=!1);return}if(_===!1&&(at(i.BLEND),_=!0),N!==qu){if(N!==g||pe!==w){if((p!==Li||x!==Li)&&(i.blendEquation(i.FUNC_ADD),p=Li,x=Li),pe)switch(N){case gi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oo:i.blendFunc(i.ONE,i.ONE);break;case jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case gi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,v=null,I=null,T=null,L.set(0,0,0),D=0,g=N,w=pe}return}vt=vt||mt,gt=gt||q,Zt=Zt||$,(mt!==p||vt!==x)&&(i.blendEquationSeparate(J[mt],J[vt]),p=mt,x=vt),(q!==y||$!==v||gt!==I||Zt!==T)&&(i.blendFuncSeparate(rt[q],rt[$],rt[gt],rt[Zt]),y=q,v=$,I=gt,T=Zt),(Re.equals(L)===!1||Ve!==D)&&(i.blendColor(Re.r,Re.g,Re.b,Ve),L.copy(Re),D=Ve),g=N,w=!1}function Lt(N,mt){N.side===xn?Nt(i.CULL_FACE):at(i.CULL_FACE);let q=N.side===Xe;mt&&(q=!q),it(q),N.blending===gi&&N.transparent===!1?C(mi):C(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),r.setMask(N.colorWrite);const $=N.stencilWrite;a.setTest($),$&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Vt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?at(i.SAMPLE_ALPHA_TO_COVERAGE):Nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function it(N){M!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),M=N)}function St(N){N!==Xu?(at(i.CULL_FACE),N!==R&&(N===qc?i.cullFace(i.BACK):N===Yu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Nt(i.CULL_FACE),R=N}function ut(N){N!==B&&(H&&i.lineWidth(N),B=N)}function Vt(N,mt,q){N?(at(i.POLYGON_OFFSET_FILL),(k!==mt||U!==q)&&(i.polygonOffset(mt,q),k=mt,U=q)):Nt(i.POLYGON_OFFSET_FILL)}function yt(N){N?at(i.SCISSOR_TEST):Nt(i.SCISSOR_TEST)}function E(N){N===void 0&&(N=i.TEXTURE0+X-1),ht!==N&&(i.activeTexture(N),ht=N)}function S(N,mt,q){q===void 0&&(ht===null?q=i.TEXTURE0+X-1:q=ht);let $=dt[q];$===void 0&&($={type:void 0,texture:void 0},dt[q]=$),($.type!==N||$.texture!==mt)&&(ht!==q&&(i.activeTexture(q),ht=q),i.bindTexture(N,mt||Tt[N]),$.type=N,$.texture=mt)}function z(){const N=dt[ht];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function K(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function At(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function se(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function bt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ht(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Xt(N){ie.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ie.copy(N))}function wt(N){j.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),j.copy(N))}function re(N,mt){let q=l.get(mt);q===void 0&&(q=new WeakMap,l.set(mt,q));let $=q.get(N);$===void 0&&($=i.getUniformBlockIndex(mt,N.name),q.set(N,$))}function Jt(N,mt){const $=l.get(mt).get(N);c.get(mt)!==$&&(i.uniformBlockBinding(mt,$,N.__bindingPointIndex),c.set(mt,$))}function Me(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ht=null,dt={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,I=null,T=null,L=new lt(0,0,0),D=0,w=!1,M=null,R=null,B=null,k=null,U=null,ie.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:at,disable:Nt,bindFramebuffer:qt,drawBuffers:Gt,useProgram:oe,setBlending:C,setMaterial:Lt,setFlipSided:it,setCullFace:St,setLineWidth:ut,setPolygonOffset:Vt,setScissorTest:yt,activeTexture:E,bindTexture:S,unbindTexture:z,compressedTexImage2D:Z,compressedTexImage3D:Q,texImage2D:bt,texImage3D:Ht,updateUBOMapping:re,uniformBlockBinding:Jt,texStorage2D:se,texStorage3D:st,texSubImage2D:K,texSubImage3D:At,compressedTexSubImage2D:pt,compressedTexSubImage3D:Mt,scissor:Xt,viewport:wt,reset:Me}}function ql(i,t,e,n){const s=Zg(n);switch(e){case Hh:return i*t;case Wh:return i*t;case Xh:return i*t*2;case mc:return i*t/s.components*s.byteLength;case gc:return i*t/s.components*s.byteLength;case Yh:return i*t*2/s.components*s.byteLength;case _c:return i*t*2/s.components*s.byteLength;case Gh:return i*t*3/s.components*s.byteLength;case ln:return i*t*4/s.components*s.byteLength;case vc:return i*t*4/s.components*s.byteLength;case Qr:case to:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case eo:case no:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ca:case La:return Math.max(i,16)*Math.max(t,8)/4;case Ra:case Pa:return Math.max(i,8)*Math.max(t,8)/2;case Ia:case Da:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ua:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case io:case Za:case Ka:return Math.ceil(i/4)*Math.ceil(t/4)*16;case qh:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ja:case Qa:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zg(i){switch(i){case ti:case Bh:return{byteLength:1,components:1};case ir:case zh:case hr:return{byteLength:2,components:1};case fc:case pc:return{byteLength:2,components:4};case ki:case dc:case Sn:return{byteLength:4,components:1};case Vh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Kg(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new nt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,S){return f?new OffscreenCanvas(E,S):sr("canvas")}function _(E,S,z){let Z=1;const Q=yt(E);if((Q.width>z||Q.height>z)&&(Z=z/Math.max(Q.width,Q.height)),Z<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const K=Math.floor(Z*Q.width),At=Math.floor(Z*Q.height);u===void 0&&(u=m(K,At));const pt=S?m(K,At):u;return pt.width=K,pt.height=At,pt.getContext("2d").drawImage(E,0,0,K,At),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+K+"x"+At+")."),pt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){i.generateMipmap(E)}function y(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(E,S,z,Z,Q=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let K=S;if(S===i.RED&&(z===i.FLOAT&&(K=i.R32F),z===i.HALF_FLOAT&&(K=i.R16F),z===i.UNSIGNED_BYTE&&(K=i.R8)),S===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.R8UI),z===i.UNSIGNED_SHORT&&(K=i.R16UI),z===i.UNSIGNED_INT&&(K=i.R32UI),z===i.BYTE&&(K=i.R8I),z===i.SHORT&&(K=i.R16I),z===i.INT&&(K=i.R32I)),S===i.RG&&(z===i.FLOAT&&(K=i.RG32F),z===i.HALF_FLOAT&&(K=i.RG16F),z===i.UNSIGNED_BYTE&&(K=i.RG8)),S===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RG8UI),z===i.UNSIGNED_SHORT&&(K=i.RG16UI),z===i.UNSIGNED_INT&&(K=i.RG32UI),z===i.BYTE&&(K=i.RG8I),z===i.SHORT&&(K=i.RG16I),z===i.INT&&(K=i.RG32I)),S===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGB8UI),z===i.UNSIGNED_SHORT&&(K=i.RGB16UI),z===i.UNSIGNED_INT&&(K=i.RGB32UI),z===i.BYTE&&(K=i.RGB8I),z===i.SHORT&&(K=i.RGB16I),z===i.INT&&(K=i.RGB32I)),S===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),z===i.UNSIGNED_INT&&(K=i.RGBA32UI),z===i.BYTE&&(K=i.RGBA8I),z===i.SHORT&&(K=i.RGBA16I),z===i.INT&&(K=i.RGBA32I)),S===i.RGB&&z===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),S===i.RGBA){const At=Q?vo:ae.getTransfer(Z);z===i.FLOAT&&(K=i.RGBA32F),z===i.HALF_FLOAT&&(K=i.RGBA16F),z===i.UNSIGNED_BYTE&&(K=At===ve?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function x(E,S){let z;return E?S===null||S===ki||S===Ss?z=i.DEPTH24_STENCIL8:S===Sn?z=i.DEPTH32F_STENCIL8:S===ir&&(z=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ki||S===Ss?z=i.DEPTH_COMPONENT24:S===Sn?z=i.DEPTH_COMPONENT32F:S===ir&&(z=i.DEPTH_COMPONENT16),z}function I(E,S){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==sn&&E.minFilter!==Pn?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function T(E){const S=E.target;S.removeEventListener("dispose",T),D(S),S.isVideoTexture&&h.delete(S)}function L(E){const S=E.target;S.removeEventListener("dispose",L),M(S)}function D(E){const S=n.get(E);if(S.__webglInit===void 0)return;const z=E.source,Z=d.get(z);if(Z){const Q=Z[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&w(E),Object.keys(Z).length===0&&d.delete(z)}n.remove(E)}function w(E){const S=n.get(E);i.deleteTexture(S.__webglTexture);const z=E.source,Z=d.get(z);delete Z[S.__cacheKey],o.memory.textures--}function M(E){const S=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(S.__webglFramebuffer[Z]))for(let Q=0;Q<S.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(S.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(S.__webglFramebuffer[Z]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[Z])}else{if(Array.isArray(S.__webglFramebuffer))for(let Z=0;Z<S.__webglFramebuffer.length;Z++)i.deleteFramebuffer(S.__webglFramebuffer[Z]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Z=0;Z<S.__webglColorRenderbuffer.length;Z++)S.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[Z]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const z=E.textures;for(let Z=0,Q=z.length;Z<Q;Z++){const K=n.get(z[Z]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(z[Z])}n.remove(E)}let R=0;function B(){R=0}function k(){const E=R;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),R+=1,E}function U(E){const S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.wrapR||0),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.colorSpace),S.join()}function X(E,S){const z=n.get(E);if(E.isVideoTexture&&ut(E),E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){const Z=E.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(z,E,S);return}}e.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+S)}function H(E,S){const z=n.get(E);if(E.version>0&&z.__version!==E.version){j(z,E,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+S)}function tt(E,S){const z=n.get(E);if(E.version>0&&z.__version!==E.version){j(z,E,S);return}e.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+S)}function Y(E,S){const z=n.get(E);if(E.version>0&&z.__version!==E.version){et(z,E,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+S)}const ht={[Ms]:i.REPEAT,[Ui]:i.CLAMP_TO_EDGE,[Aa]:i.MIRRORED_REPEAT},dt={[sn]:i.NEAREST,[yd]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[Pn]:i.LINEAR,[Co]:i.LINEAR_MIPMAP_NEAREST,[Ni]:i.LINEAR_MIPMAP_LINEAR},xt={[Ed]:i.NEVER,[Ld]:i.ALWAYS,[Td]:i.LESS,[Zh]:i.LEQUAL,[Ad]:i.EQUAL,[Pd]:i.GEQUAL,[Rd]:i.GREATER,[Cd]:i.NOTEQUAL};function zt(E,S){if(S.type===Sn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Pn||S.magFilter===Co||S.magFilter===_r||S.magFilter===Ni||S.minFilter===Pn||S.minFilter===Co||S.minFilter===_r||S.minFilter===Ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,ht[S.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,ht[S.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,ht[S.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,dt[S.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,dt[S.minFilter]),S.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,xt[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===sn||S.minFilter!==_r&&S.minFilter!==Ni||S.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function ie(E,S){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",T));const Z=S.source;let Q=d.get(Z);Q===void 0&&(Q={},d.set(Z,Q));const K=U(S);if(K!==E.__cacheKey){Q[K]===void 0&&(Q[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,z=!0),Q[K].usedTimes++;const At=Q[E.__cacheKey];At!==void 0&&(Q[E.__cacheKey].usedTimes--,At.usedTimes===0&&w(S)),E.__cacheKey=K,E.__webglTexture=Q[K].texture}return z}function j(E,S,z){let Z=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Z=i.TEXTURE_3D);const Q=ie(E,S),K=S.source;e.bindTexture(Z,E.__webglTexture,i.TEXTURE0+z);const At=n.get(K);if(K.version!==At.__version||Q===!0){e.activeTexture(i.TEXTURE0+z);const pt=ae.getPrimaries(ae.workingColorSpace),Mt=S.colorSpace===fi?null:ae.getPrimaries(S.colorSpace),se=S.colorSpace===fi||pt===Mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);let st=_(S.image,!1,s.maxTextureSize);st=Vt(S,st);const bt=r.convert(S.format,S.colorSpace),Ht=r.convert(S.type);let Xt=v(S.internalFormat,bt,Ht,S.colorSpace,S.isVideoTexture);zt(Z,S);let wt;const re=S.mipmaps,Jt=S.isVideoTexture!==!0,Me=At.__version===void 0||Q===!0,N=K.dataReady,mt=I(S,st);if(S.isDepthTexture)Xt=x(S.format===bs,S.type),Me&&(Jt?e.texStorage2D(i.TEXTURE_2D,1,Xt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Xt,st.width,st.height,0,bt,Ht,null));else if(S.isDataTexture)if(re.length>0){Jt&&Me&&e.texStorage2D(i.TEXTURE_2D,mt,Xt,re[0].width,re[0].height);for(let q=0,$=re.length;q<$;q++)wt=re[q],Jt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,bt,Ht,wt.data):e.texImage2D(i.TEXTURE_2D,q,Xt,wt.width,wt.height,0,bt,Ht,wt.data);S.generateMipmaps=!1}else Jt?(Me&&e.texStorage2D(i.TEXTURE_2D,mt,Xt,st.width,st.height),N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,bt,Ht,st.data)):e.texImage2D(i.TEXTURE_2D,0,Xt,st.width,st.height,0,bt,Ht,st.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Jt&&Me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Xt,re[0].width,re[0].height,st.depth);for(let q=0,$=re.length;q<$;q++)if(wt=re[q],S.format!==ln)if(bt!==null)if(Jt){if(N)if(S.layerUpdates.size>0){const vt=ql(wt.width,wt.height,S.format,S.type);for(const gt of S.layerUpdates){const Zt=wt.data.subarray(gt*vt/wt.data.BYTES_PER_ELEMENT,(gt+1)*vt/wt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,gt,wt.width,wt.height,1,bt,Zt)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,st.depth,bt,wt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,Xt,wt.width,wt.height,st.depth,0,wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Jt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,wt.width,wt.height,st.depth,bt,Ht,wt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,Xt,wt.width,wt.height,st.depth,0,bt,Ht,wt.data)}else{Jt&&Me&&e.texStorage2D(i.TEXTURE_2D,mt,Xt,re[0].width,re[0].height);for(let q=0,$=re.length;q<$;q++)wt=re[q],S.format!==ln?bt!==null?Jt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,bt,wt.data):e.compressedTexImage2D(i.TEXTURE_2D,q,Xt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Jt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,wt.width,wt.height,bt,Ht,wt.data):e.texImage2D(i.TEXTURE_2D,q,Xt,wt.width,wt.height,0,bt,Ht,wt.data)}else if(S.isDataArrayTexture)if(Jt){if(Me&&e.texStorage3D(i.TEXTURE_2D_ARRAY,mt,Xt,st.width,st.height,st.depth),N)if(S.layerUpdates.size>0){const q=ql(st.width,st.height,S.format,S.type);for(const $ of S.layerUpdates){const vt=st.data.subarray($*q/st.data.BYTES_PER_ELEMENT,($+1)*q/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$,st.width,st.height,1,bt,Ht,vt)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,bt,Ht,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Xt,st.width,st.height,st.depth,0,bt,Ht,st.data);else if(S.isData3DTexture)Jt?(Me&&e.texStorage3D(i.TEXTURE_3D,mt,Xt,st.width,st.height,st.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,bt,Ht,st.data)):e.texImage3D(i.TEXTURE_3D,0,Xt,st.width,st.height,st.depth,0,bt,Ht,st.data);else if(S.isFramebufferTexture){if(Me)if(Jt)e.texStorage2D(i.TEXTURE_2D,mt,Xt,st.width,st.height);else{let q=st.width,$=st.height;for(let vt=0;vt<mt;vt++)e.texImage2D(i.TEXTURE_2D,vt,Xt,q,$,0,bt,Ht,null),q>>=1,$>>=1}}else if(re.length>0){if(Jt&&Me){const q=yt(re[0]);e.texStorage2D(i.TEXTURE_2D,mt,Xt,q.width,q.height)}for(let q=0,$=re.length;q<$;q++)wt=re[q],Jt?N&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,bt,Ht,wt):e.texImage2D(i.TEXTURE_2D,q,Xt,bt,Ht,wt);S.generateMipmaps=!1}else if(Jt){if(Me){const q=yt(st);e.texStorage2D(i.TEXTURE_2D,mt,Xt,q.width,q.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,bt,Ht,st)}else e.texImage2D(i.TEXTURE_2D,0,Xt,bt,Ht,st);g(S)&&p(Z),At.__version=K.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function et(E,S,z){if(S.image.length!==6)return;const Z=ie(E,S),Q=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+z);const K=n.get(Q);if(Q.version!==K.__version||Z===!0){e.activeTexture(i.TEXTURE0+z);const At=ae.getPrimaries(ae.workingColorSpace),pt=S.colorSpace===fi?null:ae.getPrimaries(S.colorSpace),Mt=S.colorSpace===fi||At===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const se=S.isCompressedTexture||S.image[0].isCompressedTexture,st=S.image[0]&&S.image[0].isDataTexture,bt=[];for(let $=0;$<6;$++)!se&&!st?bt[$]=_(S.image[$],!0,s.maxCubemapSize):bt[$]=st?S.image[$].image:S.image[$],bt[$]=Vt(S,bt[$]);const Ht=bt[0],Xt=r.convert(S.format,S.colorSpace),wt=r.convert(S.type),re=v(S.internalFormat,Xt,wt,S.colorSpace),Jt=S.isVideoTexture!==!0,Me=K.__version===void 0||Z===!0,N=Q.dataReady;let mt=I(S,Ht);zt(i.TEXTURE_CUBE_MAP,S);let q;if(se){Jt&&Me&&e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,re,Ht.width,Ht.height);for(let $=0;$<6;$++){q=bt[$].mipmaps;for(let vt=0;vt<q.length;vt++){const gt=q[vt];S.format!==ln?Xt!==null?Jt?N&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,0,0,gt.width,gt.height,Xt,gt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,re,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Jt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,0,0,gt.width,gt.height,Xt,wt,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt,re,gt.width,gt.height,0,Xt,wt,gt.data)}}}else{if(q=S.mipmaps,Jt&&Me){q.length>0&&mt++;const $=yt(bt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,mt,re,$.width,$.height)}for(let $=0;$<6;$++)if(st){Jt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,bt[$].width,bt[$].height,Xt,wt,bt[$].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,re,bt[$].width,bt[$].height,0,Xt,wt,bt[$].data);for(let vt=0;vt<q.length;vt++){const Zt=q[vt].image[$].image;Jt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,0,0,Zt.width,Zt.height,Xt,wt,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,re,Zt.width,Zt.height,0,Xt,wt,Zt.data)}}else{Jt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Xt,wt,bt[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,re,Xt,wt,bt[$]);for(let vt=0;vt<q.length;vt++){const gt=q[vt];Jt?N&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,0,0,Xt,wt,gt.image[$]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,vt+1,re,Xt,wt,gt.image[$])}}}g(S)&&p(i.TEXTURE_CUBE_MAP),K.__version=Q.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function Tt(E,S,z,Z,Q,K){const At=r.convert(z.format,z.colorSpace),pt=r.convert(z.type),Mt=v(z.internalFormat,At,pt,z.colorSpace),se=n.get(S),st=n.get(z);if(st.__renderTarget=S,!se.__hasExternalTextures){const bt=Math.max(1,S.width>>K),Ht=Math.max(1,S.height>>K);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,K,Mt,bt,Ht,S.depth,0,At,pt,null):e.texImage2D(Q,K,Mt,bt,Ht,0,At,pt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),St(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,Q,st.__webglTexture,0,it(S)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,Q,st.__webglTexture,K),e.bindFramebuffer(i.FRAMEBUFFER,null)}function at(E,S,z){if(i.bindRenderbuffer(i.RENDERBUFFER,E),S.depthBuffer){const Z=S.depthTexture,Q=Z&&Z.isDepthTexture?Z.type:null,K=x(S.stencilBuffer,Q),At=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=it(S);St(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,pt,K,S.width,S.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,pt,K,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,K,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,At,i.RENDERBUFFER,E)}else{const Z=S.textures;for(let Q=0;Q<Z.length;Q++){const K=Z[Q],At=r.convert(K.format,K.colorSpace),pt=r.convert(K.type),Mt=v(K.internalFormat,At,pt,K.colorSpace),se=it(S);z&&St(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,Mt,S.width,S.height):St(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,Mt,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Mt,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(E,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(S.depthTexture);Z.__renderTarget=S,(!Z.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X(S.depthTexture,0);const Q=Z.__webglTexture,K=it(S);if(S.depthTexture.format===gs)St(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Q,0);else if(S.depthTexture.format===bs)St(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function qt(E){const S=n.get(E),z=E.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==E.depthTexture){const Z=E.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Z){const Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Z.removeEventListener("dispose",Q)};Z.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=Z}if(E.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Nt(S.__webglFramebuffer,E)}else if(z){S.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Z]),S.__webglDepthbuffer[Z]===void 0)S.__webglDepthbuffer[Z]=i.createRenderbuffer(),at(S.__webglDepthbuffer[Z],E,!1);else{const Q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,Q,i.RENDERBUFFER,K)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),at(S.__webglDepthbuffer,E,!1);else{const Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Q),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,Q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(E,S,z){const Z=n.get(E);S!==void 0&&Tt(Z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&qt(E)}function oe(E){const S=E.texture,z=n.get(E),Z=n.get(S);E.addEventListener("dispose",L);const Q=E.textures,K=E.isWebGLCubeRenderTarget===!0,At=Q.length>1;if(At||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=S.version,o.memory.textures++),K){z.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[pt]=[];for(let Mt=0;Mt<S.mipmaps.length;Mt++)z.__webglFramebuffer[pt][Mt]=i.createFramebuffer()}else z.__webglFramebuffer[pt]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let pt=0;pt<S.mipmaps.length;pt++)z.__webglFramebuffer[pt]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(At)for(let pt=0,Mt=Q.length;pt<Mt;pt++){const se=n.get(Q[pt]);se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&St(E)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let pt=0;pt<Q.length;pt++){const Mt=Q[pt];z.__webglColorRenderbuffer[pt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[pt]);const se=r.convert(Mt.format,Mt.colorSpace),st=r.convert(Mt.type),bt=v(Mt.internalFormat,se,st,Mt.colorSpace,E.isXRRenderTarget===!0),Ht=it(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,bt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+pt,i.RENDERBUFFER,z.__webglColorRenderbuffer[pt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),at(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){e.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),zt(i.TEXTURE_CUBE_MAP,S);for(let pt=0;pt<6;pt++)if(S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)Tt(z.__webglFramebuffer[pt][Mt],E,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,Mt);else Tt(z.__webglFramebuffer[pt],E,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);g(S)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(At){for(let pt=0,Mt=Q.length;pt<Mt;pt++){const se=Q[pt],st=n.get(se);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),zt(i.TEXTURE_2D,se),Tt(z.__webglFramebuffer,E,se,i.COLOR_ATTACHMENT0+pt,i.TEXTURE_2D,0),g(se)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let pt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(pt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(pt,Z.__webglTexture),zt(pt,S),S.mipmaps&&S.mipmaps.length>0)for(let Mt=0;Mt<S.mipmaps.length;Mt++)Tt(z.__webglFramebuffer[Mt],E,S,i.COLOR_ATTACHMENT0,pt,Mt);else Tt(z.__webglFramebuffer,E,S,i.COLOR_ATTACHMENT0,pt,0);g(S)&&p(pt),e.unbindTexture()}E.depthBuffer&&qt(E)}function J(E){const S=E.textures;for(let z=0,Z=S.length;z<Z;z++){const Q=S[z];if(g(Q)){const K=y(E),At=n.get(Q).__webglTexture;e.bindTexture(K,At),p(K),e.unbindTexture()}}}const rt=[],C=[];function Lt(E){if(E.samples>0){if(St(E)===!1){const S=E.textures,z=E.width,Z=E.height;let Q=i.COLOR_BUFFER_BIT;const K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,At=n.get(E),pt=S.length>1;if(pt)for(let Mt=0;Mt<S.length;Mt++)e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,At.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Mt=0;Mt<S.length;Mt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(Q|=i.STENCIL_BUFFER_BIT)),pt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const se=n.get(S[Mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,z,Z,0,0,z,Z,Q,i.NEAREST),c===!0&&(rt.length=0,C.length=0,rt.push(i.COLOR_ATTACHMENT0+Mt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(rt.push(K),C.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,rt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Mt=0;Mt<S.length;Mt++){e.bindFramebuffer(i.FRAMEBUFFER,At.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.RENDERBUFFER,At.__webglColorRenderbuffer[Mt]);const se=n.get(S[Mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,At.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Mt,i.TEXTURE_2D,se,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,At.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const S=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function it(E){return Math.min(s.maxSamples,E.samples)}function St(E){const S=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ut(E){const S=o.render.frame;h.get(E)!==S&&(h.set(E,S),E.update())}function Vt(E,S){const z=E.colorSpace,Z=E.format,Q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==Ts&&z!==fi&&(ae.getTransfer(z)===ve?(Z!==ln||Q!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}function yt(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=k,this.resetTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=H,this.setTexture3D=tt,this.setTextureCube=Y,this.rebindTextures=Gt,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=J,this.updateMultisampleRenderTarget=Lt,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=St}function $g(i,t){function e(n,s=fi){let r;const o=ae.getTransfer(s);if(n===ti)return i.UNSIGNED_BYTE;if(n===fc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Bh)return i.BYTE;if(n===zh)return i.SHORT;if(n===ir)return i.UNSIGNED_SHORT;if(n===dc)return i.INT;if(n===ki)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===hr)return i.HALF_FLOAT;if(n===Hh)return i.ALPHA;if(n===Gh)return i.RGB;if(n===ln)return i.RGBA;if(n===Wh)return i.LUMINANCE;if(n===Xh)return i.LUMINANCE_ALPHA;if(n===gs)return i.DEPTH_COMPONENT;if(n===bs)return i.DEPTH_STENCIL;if(n===mc)return i.RED;if(n===gc)return i.RED_INTEGER;if(n===Yh)return i.RG;if(n===_c)return i.RG_INTEGER;if(n===vc)return i.RGBA_INTEGER;if(n===Qr||n===to||n===eo||n===no)if(o===ve)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===to)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===no)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===to)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===eo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===no)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ra||n===Ca||n===Pa||n===La)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ra)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ca)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===La)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ia||n===Da||n===Ua)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ia||n===Da)return o===ve?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ua)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Na||n===Oa||n===Fa||n===ka||n===Ba||n===za||n===Va||n===Ha||n===Ga||n===Wa||n===Xa||n===Ya||n===qa||n===ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Na)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oa)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fa)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ka)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ba)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===za)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Va)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ha)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ga)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Wa)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Xa)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ya)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qa)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ja)return o===ve?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===io||n===Za||n===Ka)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===io)return o===ve?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ka)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qh||n===$a||n===Ja||n===Qa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===io)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$a)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ja)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Qa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Jg extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ee extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qg={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ee,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ee,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ee,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ee;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const t_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,e_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class n_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Be,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new In({vertexShader:t_,fragmentShader:e_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ee(new Dn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class i_ extends Gi{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const _=new n_,g=e.getContextAttributes();let p=null,y=null;const v=[],x=[],I=new nt;let T=null;const L=new Ze;L.viewport=new he;const D=new Ze;D.viewport=new he;const w=[L,D],M=new Jg;let R=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let et=v[j];return et===void 0&&(et=new ia,v[j]=et),et.getTargetRaySpace()},this.getControllerGrip=function(j){let et=v[j];return et===void 0&&(et=new ia,v[j]=et),et.getGripSpace()},this.getHand=function(j){let et=v[j];return et===void 0&&(et=new ia,v[j]=et),et.getHandSpace()};function k(j){const et=x.indexOf(j.inputSource);if(et===-1)return;const Tt=v[et];Tt!==void 0&&(Tt.update(j.inputSource,j.frame,l||o),Tt.dispatchEvent({type:j.type,data:j.inputSource}))}function U(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",U),s.removeEventListener("inputsourceschange",X);for(let j=0;j<v.length;j++){const et=x[j];et!==null&&(x[j]=null,v[j].disconnect(et))}R=null,B=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,s=null,y=null,ie.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",U),s.addEventListener("inputsourceschange",X),g.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(I),s.renderState.layers===void 0){const et={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Bi(f.framebufferWidth,f.framebufferHeight,{format:ln,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let et=null,Tt=null,at=null;g.depth&&(at=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=g.stencil?bs:gs,Tt=g.stencil?Ss:ki);const Nt={colorFormat:e.RGBA8,depthFormat:at,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Nt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new Bi(d.textureWidth,d.textureHeight,{format:ln,type:ti,depthTexture:new au(d.textureWidth,d.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ie.setContext(s),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(j){for(let et=0;et<j.removed.length;et++){const Tt=j.removed[et],at=x.indexOf(Tt);at>=0&&(x[at]=null,v[at].disconnect(Tt))}for(let et=0;et<j.added.length;et++){const Tt=j.added[et];let at=x.indexOf(Tt);if(at===-1){for(let qt=0;qt<v.length;qt++)if(qt>=x.length){x.push(Tt),at=qt;break}else if(x[qt]===null){x[qt]=Tt,at=qt;break}if(at===-1)break}const Nt=v[at];Nt&&Nt.connect(Tt)}}const H=new A,tt=new A;function Y(j,et,Tt){H.setFromMatrixPosition(et.matrixWorld),tt.setFromMatrixPosition(Tt.matrixWorld);const at=H.distanceTo(tt),Nt=et.projectionMatrix.elements,qt=Tt.projectionMatrix.elements,Gt=Nt[14]/(Nt[10]-1),oe=Nt[14]/(Nt[10]+1),J=(Nt[9]+1)/Nt[5],rt=(Nt[9]-1)/Nt[5],C=(Nt[8]-1)/Nt[0],Lt=(qt[8]+1)/qt[0],it=Gt*C,St=Gt*Lt,ut=at/(-C+Lt),Vt=ut*-C;if(et.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Vt),j.translateZ(ut),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Nt[10]===-1)j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const yt=Gt+ut,E=oe+ut,S=it-Vt,z=St+(at-Vt),Z=J*oe/E*yt,Q=rt*oe/E*yt;j.projectionMatrix.makePerspective(S,z,Z,Q,yt,E),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ht(j,et){et===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(et.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let et=j.near,Tt=j.far;_.texture!==null&&(_.depthNear>0&&(et=_.depthNear),_.depthFar>0&&(Tt=_.depthFar)),M.near=D.near=L.near=et,M.far=D.far=L.far=Tt,(R!==M.near||B!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),R=M.near,B=M.far),L.layers.mask=j.layers.mask|2,D.layers.mask=j.layers.mask|4,M.layers.mask=L.layers.mask|D.layers.mask;const at=j.parent,Nt=M.cameras;ht(M,at);for(let qt=0;qt<Nt.length;qt++)ht(Nt[qt],at);Nt.length===2?Y(M,L,D):M.projectionMatrix.copy(L.projectionMatrix),dt(j,M,at)};function dt(j,et,Tt){Tt===null?j.matrix.copy(et.matrixWorld):(j.matrix.copy(Tt.matrixWorld),j.matrix.invert(),j.matrix.multiply(et.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(et.projectionMatrix),j.projectionMatrixInverse.copy(et.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ws*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let xt=null;function zt(j,et){if(h=et.getViewerPose(l||o),m=et,h!==null){const Tt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let at=!1;Tt.length!==M.cameras.length&&(M.cameras.length=0,at=!0);for(let qt=0;qt<Tt.length;qt++){const Gt=Tt[qt];let oe=null;if(f!==null)oe=f.getViewport(Gt);else{const rt=u.getViewSubImage(d,Gt);oe=rt.viewport,qt===0&&(t.setRenderTargetTextures(y,rt.colorTexture,d.ignoreDepthValues?void 0:rt.depthStencilTexture),t.setRenderTarget(y))}let J=w[qt];J===void 0&&(J=new Ze,J.layers.enable(qt),J.viewport=new he,w[qt]=J),J.matrix.fromArray(Gt.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(Gt.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(oe.x,oe.y,oe.width,oe.height),qt===0&&(M.matrix.copy(J.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),at===!0&&M.cameras.push(J)}const Nt=s.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const qt=u.getDepthInformation(Tt[0]);qt&&qt.isValid&&qt.texture&&_.init(t,qt,s.renderState)}}for(let Tt=0;Tt<v.length;Tt++){const at=x[Tt],Nt=v[Tt];at!==null&&Nt!==void 0&&Nt.update(at,et,l||o)}xt&&xt(j,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),m=null}const ie=new ru;ie.setAnimationLoop(zt),this.setAnimationLoop=function(j){xt=j},this.dispose=function(){}}}const Ri=new wn,s_=new Wt;function r_(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,nu(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,y,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xe&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xe&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=t.get(p),v=y.envMap,x=y.envMapRotation;v&&(g.envMap.value=v,Ri.copy(x),Ri.x*=-1,Ri.y*=-1,Ri.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ri.y*=-1,Ri.z*=-1),g.envMapRotation.value.setFromMatrix4(s_.makeRotationFromEuler(Ri)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=v*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xe&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function o_(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){const x=v.program;n.uniformBlockBinding(y,x)}function l(y,v){let x=s[y.id];x===void 0&&(m(y),x=h(y),s[y.id]=x,y.addEventListener("dispose",g));const I=v.program;n.updateUBOMapping(y,I);const T=t.render.frame;r[y.id]!==T&&(d(y),r[y.id]=T)}function h(y){const v=u();y.__bindingPointIndex=v;const x=i.createBuffer(),I=y.__size,T=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,I,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=s[y.id],x=y.uniforms,I=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let T=0,L=x.length;T<L;T++){const D=Array.isArray(x[T])?x[T]:[x[T]];for(let w=0,M=D.length;w<M;w++){const R=D[w];if(f(R,T,w,I)===!0){const B=R.__offset,k=Array.isArray(R.value)?R.value:[R.value];let U=0;for(let X=0;X<k.length;X++){const H=k[X],tt=_(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,B+U,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,U),U+=tt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,B,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,v,x,I){const T=y.value,L=v+"_"+x;if(I[L]===void 0)return typeof T=="number"||typeof T=="boolean"?I[L]=T:I[L]=T.clone(),!0;{const D=I[L];if(typeof T=="number"||typeof T=="boolean"){if(D!==T)return I[L]=T,!0}else if(D.equals(T)===!1)return D.copy(T),!0}return!1}function m(y){const v=y.uniforms;let x=0;const I=16;for(let L=0,D=v.length;L<D;L++){const w=Array.isArray(v[L])?v[L]:[v[L]];for(let M=0,R=w.length;M<R;M++){const B=w[M],k=Array.isArray(B.value)?B.value:[B.value];for(let U=0,X=k.length;U<X;U++){const H=k[U],tt=_(H),Y=x%I,ht=Y%tt.boundary,dt=Y+ht;x+=ht,dt!==0&&I-dt<tt.storage&&(x+=I-dt),B.__data=new Float32Array(tt.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=x,x+=tt.storage}}}const T=x%I;return T>0&&(x+=I-T),y.__size=x,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function g(y){const v=y.target;v.removeEventListener("dispose",g);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function p(){for(const y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class a_{constructor(t={}){const{canvas:e=jd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],v=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=We,this.toneMapping=_i,this.toneMappingExposure=1;const x=this;let I=!1,T=0,L=0,D=null,w=-1,M=null;const R=new he,B=new he;let k=null;const U=new lt(0);let X=0,H=e.width,tt=e.height,Y=1,ht=null,dt=null;const xt=new he(0,0,H,tt),zt=new he(0,0,H,tt);let ie=!1;const j=new Mc;let et=!1,Tt=!1;const at=new Wt,Nt=new Wt,qt=new A,Gt=new he,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let J=!1;function rt(){return D===null?Y:1}let C=n;function Lt(b,O){return e.getContext(b,O)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${uc}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",vt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),C===null){const O="webgl2";if(C=Lt(O,b),C===null)throw Lt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let it,St,ut,Vt,yt,E,S,z,Z,Q,K,At,pt,Mt,se,st,bt,Ht,Xt,wt,re,Jt,Me,N;function mt(){it=new d0(C),it.init(),Jt=new $g(C,it),St=new o0(C,it,t,Jt),ut=new jg(C,it),St.reverseDepthBuffer&&d&&ut.buffers.depth.setReversed(!0),Vt=new m0(C),yt=new Dg,E=new Kg(C,it,ut,yt,St,Jt,Vt),S=new c0(x),z=new u0(x),Z=new Sf(C),Me=new s0(C,Z),Q=new f0(C,Z,Vt,Me),K=new _0(C,Q,Z,Vt),Xt=new g0(C,St,E),st=new a0(yt),At=new Ig(x,S,z,it,St,Me,st),pt=new r_(x,yt),Mt=new Ng,se=new Vg(it),Ht=new i0(x,S,z,ut,K,f,c),bt=new Yg(x,K,St),N=new o_(C,Vt,St,ut),wt=new r0(C,it,Vt),re=new p0(C,it,Vt),Vt.programs=At.programs,x.capabilities=St,x.extensions=it,x.properties=yt,x.renderLists=Mt,x.shadowMap=bt,x.state=ut,x.info=Vt}mt();const q=new i_(x,C);this.xr=q,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const b=it.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=it.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(H,tt,!1))},this.getSize=function(b){return b.set(H,tt)},this.setSize=function(b,O,G=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=b,tt=O,e.width=Math.floor(b*Y),e.height=Math.floor(O*Y),G===!0&&(e.style.width=b+"px",e.style.height=O+"px"),this.setViewport(0,0,b,O)},this.getDrawingBufferSize=function(b){return b.set(H*Y,tt*Y).floor()},this.setDrawingBufferSize=function(b,O,G){H=b,tt=O,Y=G,e.width=Math.floor(b*G),e.height=Math.floor(O*G),this.setViewport(0,0,b,O)},this.getCurrentViewport=function(b){return b.copy(R)},this.getViewport=function(b){return b.copy(xt)},this.setViewport=function(b,O,G,W){b.isVector4?xt.set(b.x,b.y,b.z,b.w):xt.set(b,O,G,W),ut.viewport(R.copy(xt).multiplyScalar(Y).round())},this.getScissor=function(b){return b.copy(zt)},this.setScissor=function(b,O,G,W){b.isVector4?zt.set(b.x,b.y,b.z,b.w):zt.set(b,O,G,W),ut.scissor(B.copy(zt).multiplyScalar(Y).round())},this.getScissorTest=function(){return ie},this.setScissorTest=function(b){ut.setScissorTest(ie=b)},this.setOpaqueSort=function(b){ht=b},this.setTransparentSort=function(b){dt=b},this.getClearColor=function(b){return b.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor.apply(Ht,arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha.apply(Ht,arguments)},this.clear=function(b=!0,O=!0,G=!0){let W=0;if(b){let F=!1;if(D!==null){const ot=D.texture.format;F=ot===vc||ot===_c||ot===gc}if(F){const ot=D.texture.type,_t=ot===ti||ot===ki||ot===ir||ot===Ss||ot===fc||ot===pc,Rt=Ht.getClearColor(),Ct=Ht.getClearAlpha(),jt=Rt.r,Kt=Rt.g,Pt=Rt.b;_t?(m[0]=jt,m[1]=Kt,m[2]=Pt,m[3]=Ct,C.clearBufferuiv(C.COLOR,0,m)):(_[0]=jt,_[1]=Kt,_[2]=Pt,_[3]=Ct,C.clearBufferiv(C.COLOR,0,_))}else W|=C.COLOR_BUFFER_BIT}O&&(W|=C.DEPTH_BUFFER_BIT),G&&(W|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",vt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Mt.dispose(),se.dispose(),yt.dispose(),S.dispose(),z.dispose(),K.dispose(),Me.dispose(),N.dispose(),At.dispose(),q.dispose(),q.removeEventListener("sessionstart",Bc),q.removeEventListener("sessionend",zc),Si.stop()};function $(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function vt(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const b=Vt.autoReset,O=bt.enabled,G=bt.autoUpdate,W=bt.needsUpdate,F=bt.type;mt(),Vt.autoReset=b,bt.enabled=O,bt.autoUpdate=G,bt.needsUpdate=W,bt.type=F}function gt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Zt(b){const O=b.target;O.removeEventListener("dispose",Zt),Re(O)}function Re(b){Ve(b),yt.remove(b)}function Ve(b){const O=yt.get(b).programs;O!==void 0&&(O.forEach(function(G){At.releaseProgram(G)}),b.isShaderMaterial&&At.releaseShaderCache(b))}this.renderBufferDirect=function(b,O,G,W,F,ot){O===null&&(O=oe);const _t=F.isMesh&&F.matrixWorld.determinant()<0,Rt=zu(b,O,G,W,F);ut.setMaterial(W,_t);let Ct=G.index,jt=1;if(W.wireframe===!0){if(Ct=Q.getWireframeAttribute(G),Ct===void 0)return;jt=2}const Kt=G.drawRange,Pt=G.attributes.position;let ce=Kt.start*jt,Se=(Kt.start+Kt.count)*jt;ot!==null&&(ce=Math.max(ce,ot.start*jt),Se=Math.min(Se,(ot.start+ot.count)*jt)),Ct!==null?(ce=Math.max(ce,0),Se=Math.min(Se,Ct.count)):Pt!=null&&(ce=Math.max(ce,0),Se=Math.min(Se,Pt.count));const be=Se-ce;if(be<0||be===1/0)return;Me.setup(F,W,Rt,G,Ct);let Ke,ue=wt;if(Ct!==null&&(Ke=Z.get(Ct),ue=re,ue.setIndex(Ke)),F.isMesh)W.wireframe===!0?(ut.setLineWidth(W.wireframeLinewidth*rt()),ue.setMode(C.LINES)):ue.setMode(C.TRIANGLES);else if(F.isLine){let It=W.linewidth;It===void 0&&(It=1),ut.setLineWidth(It*rt()),F.isLineSegments?ue.setMode(C.LINES):F.isLineLoop?ue.setMode(C.LINE_LOOP):ue.setMode(C.LINE_STRIP)}else F.isPoints?ue.setMode(C.POINTS):F.isSprite&&ue.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ue.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))ue.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const It=F._multiDrawStarts,kn=F._multiDrawCounts,de=F._multiDrawCount,dn=Ct?Z.get(Ct).bytesPerElement:1,Xi=yt.get(W).currentProgram.getUniforms();for(let tn=0;tn<de;tn++)Xi.setValue(C,"_gl_DrawID",tn),ue.render(It[tn]/dn,kn[tn])}else if(F.isInstancedMesh)ue.renderInstances(ce,be,F.count);else if(G.isInstancedBufferGeometry){const It=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,kn=Math.min(G.instanceCount,It);ue.renderInstances(ce,be,kn)}else ue.render(ce,be)};function pe(b,O,G){b.transparent===!0&&b.side===xn&&b.forceSinglePass===!1?(b.side=Xe,b.needsUpdate=!0,gr(b,O,G),b.side=vi,b.needsUpdate=!0,gr(b,O,G),b.side=xn):gr(b,O,G)}this.compile=function(b,O,G=null){G===null&&(G=b),p=se.get(G),p.init(O),v.push(p),G.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),b!==G&&b.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return b.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ot=F.material;if(ot)if(Array.isArray(ot))for(let _t=0;_t<ot.length;_t++){const Rt=ot[_t];pe(Rt,G,F),W.add(Rt)}else pe(ot,G,F),W.add(ot)}),v.pop(),p=null,W},this.compileAsync=function(b,O,G=null){const W=this.compile(b,O,G);return new Promise(F=>{function ot(){if(W.forEach(function(_t){yt.get(_t).currentProgram.isReady()&&W.delete(_t)}),W.size===0){F(b);return}setTimeout(ot,10)}it.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let un=null;function Fn(b){un&&un(b)}function Bc(){Si.stop()}function zc(){Si.start()}const Si=new ru;Si.setAnimationLoop(Fn),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(b){un=b,q.setAnimationLoop(b),b===null?Si.stop():Si.start()},q.addEventListener("sessionstart",Bc),q.addEventListener("sessionend",zc),this.render=function(b,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(O),O=q.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,O,D),p=se.get(b,v.length),p.init(O),v.push(p),Nt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),j.setFromProjectionMatrix(Nt),Tt=this.localClippingEnabled,et=st.init(this.clippingPlanes,Tt),g=Mt.get(b,y.length),g.init(),y.push(g),q.enabled===!0&&q.isPresenting===!0){const ot=x.xr.getDepthSensingMesh();ot!==null&&Ro(ot,O,-1/0,x.sortObjects)}Ro(b,O,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ht,dt),J=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,J&&Ht.addToRenderList(g,b),this.info.render.frame++,et===!0&&st.beginShadows();const G=p.state.shadowsArray;bt.render(G,b,O),et===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=g.opaque,F=g.transmissive;if(p.setupLights(),O.isArrayCamera){const ot=O.cameras;if(F.length>0)for(let _t=0,Rt=ot.length;_t<Rt;_t++){const Ct=ot[_t];Hc(W,F,b,Ct)}J&&Ht.render(b);for(let _t=0,Rt=ot.length;_t<Rt;_t++){const Ct=ot[_t];Vc(g,b,Ct,Ct.viewport)}}else F.length>0&&Hc(W,F,b,O),J&&Ht.render(b),Vc(g,b,O);D!==null&&(E.updateMultisampleRenderTarget(D),E.updateRenderTargetMipmap(D)),b.isScene===!0&&b.onAfterRender(x,b,O),Me.resetDefaultState(),w=-1,M=null,v.pop(),v.length>0?(p=v[v.length-1],et===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Ro(b,O,G,W){if(b.visible===!1)return;if(b.layers.test(O.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(O);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||j.intersectsSprite(b)){W&&Gt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Nt);const _t=K.update(b),Rt=b.material;Rt.visible&&g.push(b,_t,Rt,G,Gt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||j.intersectsObject(b))){const _t=K.update(b),Rt=b.material;if(W&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Gt.copy(b.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Gt.copy(_t.boundingSphere.center)),Gt.applyMatrix4(b.matrixWorld).applyMatrix4(Nt)),Array.isArray(Rt)){const Ct=_t.groups;for(let jt=0,Kt=Ct.length;jt<Kt;jt++){const Pt=Ct[jt],ce=Rt[Pt.materialIndex];ce&&ce.visible&&g.push(b,_t,ce,G,Gt.z,Pt)}}else Rt.visible&&g.push(b,_t,Rt,G,Gt.z,null)}}const ot=b.children;for(let _t=0,Rt=ot.length;_t<Rt;_t++)Ro(ot[_t],O,G,W)}function Vc(b,O,G,W){const F=b.opaque,ot=b.transmissive,_t=b.transparent;p.setupLightsView(G),et===!0&&st.setGlobalState(x.clippingPlanes,G),W&&ut.viewport(R.copy(W)),F.length>0&&mr(F,O,G),ot.length>0&&mr(ot,O,G),_t.length>0&&mr(_t,O,G),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Hc(b,O,G,W){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Bi(1,1,{generateMipmaps:!0,type:it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float")?hr:ti,minFilter:Ni,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const ot=p.state.transmissionRenderTarget[W.id],_t=W.viewport||R;ot.setSize(_t.z,_t.w);const Rt=x.getRenderTarget();x.setRenderTarget(ot),x.getClearColor(U),X=x.getClearAlpha(),X<1&&x.setClearColor(16777215,.5),x.clear(),J&&Ht.render(G);const Ct=x.toneMapping;x.toneMapping=_i;const jt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),et===!0&&st.setGlobalState(x.clippingPlanes,W),mr(b,G,W),E.updateMultisampleRenderTarget(ot),E.updateRenderTargetMipmap(ot),it.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Pt=0,ce=O.length;Pt<ce;Pt++){const Se=O[Pt],be=Se.object,Ke=Se.geometry,ue=Se.material,It=Se.group;if(ue.side===xn&&be.layers.test(W.layers)){const kn=ue.side;ue.side=Xe,ue.needsUpdate=!0,Gc(be,G,W,Ke,ue,It),ue.side=kn,ue.needsUpdate=!0,Kt=!0}}Kt===!0&&(E.updateMultisampleRenderTarget(ot),E.updateRenderTargetMipmap(ot))}x.setRenderTarget(Rt),x.setClearColor(U,X),jt!==void 0&&(W.viewport=jt),x.toneMapping=Ct}function mr(b,O,G){const W=O.isScene===!0?O.overrideMaterial:null;for(let F=0,ot=b.length;F<ot;F++){const _t=b[F],Rt=_t.object,Ct=_t.geometry,jt=W===null?_t.material:W,Kt=_t.group;Rt.layers.test(G.layers)&&Gc(Rt,O,G,Ct,jt,Kt)}}function Gc(b,O,G,W,F,ot){b.onBeforeRender(x,O,G,W,F,ot),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,O,G,W,b,ot),F.transparent===!0&&F.side===xn&&F.forceSinglePass===!1?(F.side=Xe,F.needsUpdate=!0,x.renderBufferDirect(G,O,W,F,b,ot),F.side=vi,F.needsUpdate=!0,x.renderBufferDirect(G,O,W,F,b,ot),F.side=xn):x.renderBufferDirect(G,O,W,F,b,ot),b.onAfterRender(x,O,G,W,F,ot)}function gr(b,O,G){O.isScene!==!0&&(O=oe);const W=yt.get(b),F=p.state.lights,ot=p.state.shadowsArray,_t=F.state.version,Rt=At.getParameters(b,F.state,ot,O,G),Ct=At.getProgramCacheKey(Rt);let jt=W.programs;W.environment=b.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(b.isMeshStandardMaterial?z:S).get(b.envMap||W.environment),W.envMapRotation=W.environment!==null&&b.envMap===null?O.environmentRotation:b.envMapRotation,jt===void 0&&(b.addEventListener("dispose",Zt),jt=new Map,W.programs=jt);let Kt=jt.get(Ct);if(Kt!==void 0){if(W.currentProgram===Kt&&W.lightsStateVersion===_t)return Xc(b,Rt),Kt}else Rt.uniforms=At.getUniforms(b),b.onBeforeCompile(Rt,x),Kt=At.acquireProgram(Rt,Ct),jt.set(Ct,Kt),W.uniforms=Rt.uniforms;const Pt=W.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Pt.clippingPlanes=st.uniform),Xc(b,Rt),W.needsLights=Hu(b),W.lightsStateVersion=_t,W.needsLights&&(Pt.ambientLightColor.value=F.state.ambient,Pt.lightProbe.value=F.state.probe,Pt.directionalLights.value=F.state.directional,Pt.directionalLightShadows.value=F.state.directionalShadow,Pt.spotLights.value=F.state.spot,Pt.spotLightShadows.value=F.state.spotShadow,Pt.rectAreaLights.value=F.state.rectArea,Pt.ltc_1.value=F.state.rectAreaLTC1,Pt.ltc_2.value=F.state.rectAreaLTC2,Pt.pointLights.value=F.state.point,Pt.pointLightShadows.value=F.state.pointShadow,Pt.hemisphereLights.value=F.state.hemi,Pt.directionalShadowMap.value=F.state.directionalShadowMap,Pt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Pt.spotShadowMap.value=F.state.spotShadowMap,Pt.spotLightMatrix.value=F.state.spotLightMatrix,Pt.spotLightMap.value=F.state.spotLightMap,Pt.pointShadowMap.value=F.state.pointShadowMap,Pt.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Kt,W.uniformsList=null,Kt}function Wc(b){if(b.uniformsList===null){const O=b.currentProgram.getUniforms();b.uniformsList=so.seqWithValue(O.seq,b.uniforms)}return b.uniformsList}function Xc(b,O){const G=yt.get(b);G.outputColorSpace=O.outputColorSpace,G.batching=O.batching,G.batchingColor=O.batchingColor,G.instancing=O.instancing,G.instancingColor=O.instancingColor,G.instancingMorph=O.instancingMorph,G.skinning=O.skinning,G.morphTargets=O.morphTargets,G.morphNormals=O.morphNormals,G.morphColors=O.morphColors,G.morphTargetsCount=O.morphTargetsCount,G.numClippingPlanes=O.numClippingPlanes,G.numIntersection=O.numClipIntersection,G.vertexAlphas=O.vertexAlphas,G.vertexTangents=O.vertexTangents,G.toneMapping=O.toneMapping}function zu(b,O,G,W,F){O.isScene!==!0&&(O=oe),E.resetTextureUnits();const ot=O.fog,_t=W.isMeshStandardMaterial?O.environment:null,Rt=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:Ts,Ct=(W.isMeshStandardMaterial?z:S).get(W.envMap||_t),jt=W.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Kt=!!G.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Pt=!!G.morphAttributes.position,ce=!!G.morphAttributes.normal,Se=!!G.morphAttributes.color;let be=_i;W.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(be=x.toneMapping);const Ke=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ue=Ke!==void 0?Ke.length:0,It=yt.get(W),kn=p.state.lights;if(et===!0&&(Tt===!0||b!==M)){const rn=b===M&&W.id===w;st.setState(W,b,rn)}let de=!1;W.version===It.__version?(It.needsLights&&It.lightsStateVersion!==kn.state.version||It.outputColorSpace!==Rt||F.isBatchedMesh&&It.batching===!1||!F.isBatchedMesh&&It.batching===!0||F.isBatchedMesh&&It.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&It.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&It.instancing===!1||!F.isInstancedMesh&&It.instancing===!0||F.isSkinnedMesh&&It.skinning===!1||!F.isSkinnedMesh&&It.skinning===!0||F.isInstancedMesh&&It.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&It.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&It.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&It.instancingMorph===!1&&F.morphTexture!==null||It.envMap!==Ct||W.fog===!0&&It.fog!==ot||It.numClippingPlanes!==void 0&&(It.numClippingPlanes!==st.numPlanes||It.numIntersection!==st.numIntersection)||It.vertexAlphas!==jt||It.vertexTangents!==Kt||It.morphTargets!==Pt||It.morphNormals!==ce||It.morphColors!==Se||It.toneMapping!==be||It.morphTargetsCount!==ue)&&(de=!0):(de=!0,It.__version=W.version);let dn=It.currentProgram;de===!0&&(dn=gr(W,O,F));let Xi=!1,tn=!1,Is=!1;const we=dn.getUniforms(),Tn=It.uniforms;if(ut.useProgram(dn.program)&&(Xi=!0,tn=!0,Is=!0),W.id!==w&&(w=W.id,tn=!0),Xi||M!==b){ut.buffers.depth.getReversed()?(at.copy(b.projectionMatrix),Kd(at),$d(at),we.setValue(C,"projectionMatrix",at)):we.setValue(C,"projectionMatrix",b.projectionMatrix),we.setValue(C,"viewMatrix",b.matrixWorldInverse);const ni=we.map.cameraPosition;ni!==void 0&&ni.setValue(C,qt.setFromMatrixPosition(b.matrixWorld)),St.logarithmicDepthBuffer&&we.setValue(C,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&we.setValue(C,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,tn=!0,Is=!0)}if(F.isSkinnedMesh){we.setOptional(C,F,"bindMatrix"),we.setOptional(C,F,"bindMatrixInverse");const rn=F.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),we.setValue(C,"boneTexture",rn.boneTexture,E))}F.isBatchedMesh&&(we.setOptional(C,F,"batchingTexture"),we.setValue(C,"batchingTexture",F._matricesTexture,E),we.setOptional(C,F,"batchingIdTexture"),we.setValue(C,"batchingIdTexture",F._indirectTexture,E),we.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&we.setValue(C,"batchingColorTexture",F._colorsTexture,E));const Ds=G.morphAttributes;if((Ds.position!==void 0||Ds.normal!==void 0||Ds.color!==void 0)&&Xt.update(F,G,dn),(tn||It.receiveShadow!==F.receiveShadow)&&(It.receiveShadow=F.receiveShadow,we.setValue(C,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(Tn.envMap.value=Ct,Tn.flipEnvMap.value=Ct.isCubeTexture&&Ct.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(Tn.envMapIntensity.value=O.environmentIntensity),tn&&(we.setValue(C,"toneMappingExposure",x.toneMappingExposure),It.needsLights&&Vu(Tn,Is),ot&&W.fog===!0&&pt.refreshFogUniforms(Tn,ot),pt.refreshMaterialUniforms(Tn,W,Y,tt,p.state.transmissionRenderTarget[b.id]),so.upload(C,Wc(It),Tn,E)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(so.upload(C,Wc(It),Tn,E),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&we.setValue(C,"center",F.center),we.setValue(C,"modelViewMatrix",F.modelViewMatrix),we.setValue(C,"normalMatrix",F.normalMatrix),we.setValue(C,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const rn=W.uniformsGroups;for(let ni=0,ii=rn.length;ni<ii;ni++){const Yc=rn[ni];N.update(Yc,dn),N.bind(Yc,dn)}}return dn}function Vu(b,O){b.ambientLightColor.needsUpdate=O,b.lightProbe.needsUpdate=O,b.directionalLights.needsUpdate=O,b.directionalLightShadows.needsUpdate=O,b.pointLights.needsUpdate=O,b.pointLightShadows.needsUpdate=O,b.spotLights.needsUpdate=O,b.spotLightShadows.needsUpdate=O,b.rectAreaLights.needsUpdate=O,b.hemisphereLights.needsUpdate=O}function Hu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(b,O,G){yt.get(b.texture).__webglTexture=O,yt.get(b.depthTexture).__webglTexture=G;const W=yt.get(b);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=G===void 0,W.__autoAllocateDepthBuffer||it.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,O){const G=yt.get(b);G.__webglFramebuffer=O,G.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(b,O=0,G=0){D=b,T=O,L=G;let W=!0,F=null,ot=!1,_t=!1;if(b){const Ct=yt.get(b);if(Ct.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(C.FRAMEBUFFER,null),W=!1;else if(Ct.__webglFramebuffer===void 0)E.setupRenderTarget(b);else if(Ct.__hasExternalTextures)E.rebindTextures(b,yt.get(b.texture).__webglTexture,yt.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Pt=b.depthTexture;if(Ct.__boundDepthTexture!==Pt){if(Pt!==null&&yt.has(Pt)&&(b.width!==Pt.image.width||b.height!==Pt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(b)}}const jt=b.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(_t=!0);const Kt=yt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Kt[O])?F=Kt[O][G]:F=Kt[O],ot=!0):b.samples>0&&E.useMultisampledRTT(b)===!1?F=yt.get(b).__webglMultisampledFramebuffer:Array.isArray(Kt)?F=Kt[G]:F=Kt,R.copy(b.viewport),B.copy(b.scissor),k=b.scissorTest}else R.copy(xt).multiplyScalar(Y).floor(),B.copy(zt).multiplyScalar(Y).floor(),k=ie;if(ut.bindFramebuffer(C.FRAMEBUFFER,F)&&W&&ut.drawBuffers(b,F),ut.viewport(R),ut.scissor(B),ut.setScissorTest(k),ot){const Ct=yt.get(b.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ct.__webglTexture,G)}else if(_t){const Ct=yt.get(b.texture),jt=O||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ct.__webglTexture,G||0,jt)}w=-1},this.readRenderTargetPixels=function(b,O,G,W,F,ot,_t){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=yt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){ut.bindFramebuffer(C.FRAMEBUFFER,Rt);try{const Ct=b.texture,jt=Ct.format,Kt=Ct.type;if(!St.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=b.width-W&&G>=0&&G<=b.height-F&&C.readPixels(O,G,W,F,Jt.convert(jt),Jt.convert(Kt),ot)}finally{const Ct=D!==null?yt.get(D).__webglFramebuffer:null;ut.bindFramebuffer(C.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(b,O,G,W,F,ot,_t){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Rt=yt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_t!==void 0&&(Rt=Rt[_t]),Rt){const Ct=b.texture,jt=Ct.format,Kt=Ct.type;if(!St.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=b.width-W&&G>=0&&G<=b.height-F){ut.bindFramebuffer(C.FRAMEBUFFER,Rt);const Pt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Pt),C.bufferData(C.PIXEL_PACK_BUFFER,ot.byteLength,C.STREAM_READ),C.readPixels(O,G,W,F,Jt.convert(jt),Jt.convert(Kt),0);const ce=D!==null?yt.get(D).__webglFramebuffer:null;ut.bindFramebuffer(C.FRAMEBUFFER,ce);const Se=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Zd(C,Se,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Pt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ot),C.deleteBuffer(Pt),C.deleteSync(Se),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,O=null,G=0){b.isTexture!==!0&&(Zs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,b=arguments[1]);const W=Math.pow(2,-G),F=Math.floor(b.image.width*W),ot=Math.floor(b.image.height*W),_t=O!==null?O.x:0,Rt=O!==null?O.y:0;E.setTexture2D(b,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,_t,Rt,F,ot),ut.unbindTexture()},this.copyTextureToTexture=function(b,O,G=null,W=null,F=0){b.isTexture!==!0&&(Zs("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,b=arguments[1],O=arguments[2],F=arguments[3]||0,G=null);let ot,_t,Rt,Ct,jt,Kt,Pt,ce,Se;const be=b.isCompressedTexture?b.mipmaps[F]:b.image;G!==null?(ot=G.max.x-G.min.x,_t=G.max.y-G.min.y,Rt=G.isBox3?G.max.z-G.min.z:1,Ct=G.min.x,jt=G.min.y,Kt=G.isBox3?G.min.z:0):(ot=be.width,_t=be.height,Rt=be.depth||1,Ct=0,jt=0,Kt=0),W!==null?(Pt=W.x,ce=W.y,Se=W.z):(Pt=0,ce=0,Se=0);const Ke=Jt.convert(O.format),ue=Jt.convert(O.type);let It;O.isData3DTexture?(E.setTexture3D(O,0),It=C.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(E.setTexture2DArray(O,0),It=C.TEXTURE_2D_ARRAY):(E.setTexture2D(O,0),It=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);const kn=C.getParameter(C.UNPACK_ROW_LENGTH),de=C.getParameter(C.UNPACK_IMAGE_HEIGHT),dn=C.getParameter(C.UNPACK_SKIP_PIXELS),Xi=C.getParameter(C.UNPACK_SKIP_ROWS),tn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,be.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,be.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ct),C.pixelStorei(C.UNPACK_SKIP_ROWS,jt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Kt);const Is=b.isDataArrayTexture||b.isData3DTexture,we=O.isDataArrayTexture||O.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const Tn=yt.get(b),Ds=yt.get(O),rn=yt.get(Tn.__renderTarget),ni=yt.get(Ds.__renderTarget);ut.bindFramebuffer(C.READ_FRAMEBUFFER,rn.__webglFramebuffer),ut.bindFramebuffer(C.DRAW_FRAMEBUFFER,ni.__webglFramebuffer);for(let ii=0;ii<Rt;ii++)Is&&C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,yt.get(b).__webglTexture,F,Kt+ii),b.isDepthTexture?(we&&C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,yt.get(O).__webglTexture,F,Se+ii),C.blitFramebuffer(Ct,jt,ot,_t,Pt,ce,ot,_t,C.DEPTH_BUFFER_BIT,C.NEAREST)):we?C.copyTexSubImage3D(It,F,Pt,ce,Se+ii,Ct,jt,ot,_t):C.copyTexSubImage2D(It,F,Pt,ce,Se+ii,Ct,jt,ot,_t);ut.bindFramebuffer(C.READ_FRAMEBUFFER,null),ut.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else we?b.isDataTexture||b.isData3DTexture?C.texSubImage3D(It,F,Pt,ce,Se,ot,_t,Rt,Ke,ue,be.data):O.isCompressedArrayTexture?C.compressedTexSubImage3D(It,F,Pt,ce,Se,ot,_t,Rt,Ke,be.data):C.texSubImage3D(It,F,Pt,ce,Se,ot,_t,Rt,Ke,ue,be):b.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,F,Pt,ce,ot,_t,Ke,ue,be.data):b.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,F,Pt,ce,be.width,be.height,Ke,be.data):C.texSubImage2D(C.TEXTURE_2D,F,Pt,ce,ot,_t,Ke,ue,be);C.pixelStorei(C.UNPACK_ROW_LENGTH,kn),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,de),C.pixelStorei(C.UNPACK_SKIP_PIXELS,dn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Xi),C.pixelStorei(C.UNPACK_SKIP_IMAGES,tn),F===0&&O.generateMipmaps&&C.generateMipmap(It),ut.unbindTexture()},this.copyTextureToTexture3D=function(b,O,G=null,W=null,F=0){return b.isTexture!==!0&&(Zs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,W=arguments[1]||null,b=arguments[2],O=arguments[3],F=arguments[4]||0),Zs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,O,G,W,F)},this.initRenderTarget=function(b){yt.get(b).__webglFramebuffer===void 0&&E.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?E.setTextureCube(b,0):b.isData3DTexture?E.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?E.setTexture2DArray(b,0):E.setTexture2D(b,0),ut.unbindTexture()},this.resetState=function(){T=0,L=0,D=null,ut.reset(),Me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}class bc{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new lt(t),this.density=e}clone(){return new bc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class wc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new lt(t),this.near=e,this.far=n}clone(){return new wc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class du extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class _y{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ec,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ye=new A;class fu{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ie(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fu(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const jl=new A,Zl=new he,Kl=new he,c_=new A,$l=new Wt,kr=new A,sa=new ei,Jl=new Wt,ra=new As;class vy extends ee{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Kc,this.bindMatrix=new Wt,this.bindMatrixInverse=new Wt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new yi),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,kr),this.boundingBox.expandByPoint(kr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ei),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,kr),this.boundingSphere.expandByPoint(kr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sa.copy(this.boundingSphere),sa.applyMatrix4(s),t.ray.intersectsSphere(sa)!==!1&&(Jl.copy(s).invert(),ra.copy(t.ray).applyMatrix4(Jl),!(this.boundingBox!==null&&ra.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ra)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new he,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Kc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===xd?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;Zl.fromBufferAttribute(s.attributes.skinIndex,t),Kl.fromBufferAttribute(s.attributes.skinWeight,t),jl.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){const o=Kl.getComponent(r);if(o!==0){const a=Zl.getComponent(r);$l.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(c_.copy(jl).applyMatrix4($l),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class l_ extends Ce{constructor(){super(),this.isBone=!0,this.type="Bone"}}class pu extends Be{constructor(t=null,e=1,n=1,s,r,o,a,c,l=sn,h=sn,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ql=new Wt,h_=new Wt;class mu{constructor(t=[],e=[]){this.uuid=hn(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Wt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Wt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){const a=t[r]?t[r].matrixWorld:h_;Ql.multiplyMatrices(a,e[r]),Ql.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new mu(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new pu(e,t,t,ln,Sn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const r=t.bones[n];let o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new l_),this.bones.push(o),this.boneInverses.push(new Wt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){const o=e[s];t.bones.push(o.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class th extends Ie{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const os=new Wt,eh=new Wt,Br=[],nh=new yi,u_=new Wt,ks=new ee,Bs=new ei;class Ec extends ee{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new th(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,u_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new yi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,os),nh.copy(t.boundingBox).applyMatrix4(os),this.boundingBox.union(nh)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new ei),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,os),Bs.copy(t.boundingSphere).applyMatrix4(os),this.boundingSphere.union(Bs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(ks.geometry=this.geometry,ks.material=this.material,ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bs.copy(this.boundingSphere),Bs.applyMatrix4(n),t.ray.intersectsSphere(Bs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,os),eh.multiplyMatrices(n,os),ks.matrixWorld=eh,ks.raycast(t,Br);for(let o=0,a=Br.length;o<a;o++){const c=Br[o];c.instanceId=r,c.object=this,e.push(c)}Br.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new th(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new pu(new Float32Array(s*this.count),s,this.count,mc,Sn));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Tc extends Wi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new lt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const lo=new A,ho=new A,ih=new Wt,zs=new As,zr=new ei,oa=new A,sh=new A;class gu extends Ce{constructor(t=new Ae,e=new Tc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)lo.fromBufferAttribute(e,s-1),ho.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=lo.distanceTo(ho);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere),zr.applyMatrix4(s),zr.radius+=r,t.ray.intersectsSphere(zr)===!1)return;ih.copy(s).invert(),zs.copy(t.ray).applyMatrix4(ih);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){const p=h.getX(_),y=h.getX(_+1),v=Vr(this,t,zs,c,p,y);v&&e.push(v)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=Vr(this,t,zs,c,_,g);p&&e.push(p)}}else{const f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){const p=Vr(this,t,zs,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Vr(this,t,zs,c,m-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Vr(i,t,e,n,s,r){const o=i.geometry.attributes.position;if(lo.fromBufferAttribute(o,s),ho.fromBufferAttribute(o,r),e.distanceSqToSegment(lo,ho,oa,sh)>n)return;oa.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(oa);if(!(c<t.near||c>t.far))return{distance:c,point:sh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const rh=new A,oh=new A;class _u extends gu{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)rh.fromBufferAttribute(e,s),oh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+rh.distanceTo(oh);t.setAttribute("lineDistance",new fe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class xy extends gu{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class ur extends Wi{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ah=new Wt,sc=new As,Hr=new ei,Gr=new A;class yo extends Ce{constructor(t=new Ae,e=new ur){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(s),Hr.radius+=r,t.ray.intersectsSphere(Hr)===!1)return;ah.copy(s).invert(),sc.copy(t.ray).applyMatrix4(ah);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=d,_=f;m<_;m++){const g=l.getX(m);Gr.fromBufferAttribute(u,g),ch(Gr,g,c,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)Gr.fromBufferAttribute(u,m),ch(Gr,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ch(i,t,e,n,s,r,o){const a=sc.distanceSqToPoint(i);if(a<e){const c=new A;sc.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class rr extends Be{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=n[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===o)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new nt:new A);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new A,s=[],r=[],o=[],a=new A,c=new Wt;for(let f=0;f<=t;f++){const m=f/t;s[f]=this.getTangentAt(m,new A)}r[0]=new A,o[0]=new A;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();const m=Math.acos(Ue(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Ue(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(c.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ac extends Un{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new nt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class d_ extends Ac{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Rc(){let i=0,t=0,e=0,n=0;function s(r,o,a,c){i=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return i+t*r+e*o+n*a}}}const Wr=new A,aa=new Rc,ca=new Rc,la=new Rc;class f_ extends Un{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new A){const n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(Wr.subVectors(s[0],s[1]).add(s[0]),l=Wr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Wr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Wr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),aa.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),ca.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),la.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(aa.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ca.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),la.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(aa.calc(c),ca.calc(c),la.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new A().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function lh(i,t,e,n,s){const r=(n-t)*.5,o=(s-e)*.5,a=i*i,c=i*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*i+e}function p_(i,t){const e=1-i;return e*e*t}function m_(i,t){return 2*(1-i)*i*t}function g_(i,t){return i*i*t}function Qs(i,t,e,n){return p_(i,t)+m_(i,e)+g_(i,n)}function __(i,t){const e=1-i;return e*e*e*t}function v_(i,t){const e=1-i;return 3*e*e*i*t}function x_(i,t){return 3*(1-i)*i*i*t}function y_(i,t){return i*i*i*t}function tr(i,t,e,n,s){return __(i,t)+v_(i,e)+x_(i,n)+y_(i,s)}class vu extends Un{constructor(t=new nt,e=new nt,n=new nt,s=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(t,s.x,r.x,o.x,a.x),tr(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class M_ extends Un{constructor(t=new A,e=new A,n=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new A){const n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(tr(t,s.x,r.x,o.x,a.x),tr(t,s.y,r.y,o.y,a.y),tr(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class xu extends Un{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class S_ extends Un{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yu extends Un{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,s.x,r.x,o.x),Qs(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class b_ extends Un{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(Qs(t,s.x,r.x,o.x),Qs(t,s.y,r.y,o.y),Qs(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mu extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(lh(a,c.x,l.x,h.x,u.x),lh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new nt().fromArray(s))}return this}}var rc=Object.freeze({__proto__:null,ArcCurve:d_,CatmullRomCurve3:f_,CubicBezierCurve:vu,CubicBezierCurve3:M_,EllipseCurve:Ac,LineCurve:xu,LineCurve3:S_,QuadraticBezierCurve:yu,QuadraticBezierCurve3:b_,SplineCurve:Mu});class w_ extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const o=s[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new rc[s.type]().fromJSON(s))}return this}}class hh extends w_{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new xu(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new yu(this.currentPoint.clone(),new nt(t,e),new nt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){const a=new vu(this.currentPoint.clone(),new nt(t,e),new nt(n,s),new nt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Mu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,o,a,c),this}absellipse(t,e,n,s,r,o,a,c){const l=new Ac(t,e,n,s,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Mi extends Ae{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new A,h=new nt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new fe(o,3)),this.setAttribute("normal",new fe(a,3)),this.setAttribute("uv",new fe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class zi extends Ae{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),o===!1&&(t>0&&v(!0),e>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new fe(u,3)),this.setAttribute("normal",new fe(d,3)),this.setAttribute("uv",new fe(f,2));function y(){const x=new A,I=new A;let T=0;const L=(e-t)/n;for(let D=0;D<=r;D++){const w=[],M=D/r,R=M*(e-t)+t;for(let B=0;B<=s;B++){const k=B/s,U=k*c+a,X=Math.sin(U),H=Math.cos(U);I.x=R*X,I.y=-M*n+g,I.z=R*H,u.push(I.x,I.y,I.z),x.set(X,L,H).normalize(),d.push(x.x,x.y,x.z),f.push(k,1-M),w.push(m++)}_.push(w)}for(let D=0;D<s;D++)for(let w=0;w<r;w++){const M=_[w][D],R=_[w+1][D],B=_[w+1][D+1],k=_[w][D+1];(t>0||w!==0)&&(h.push(M,R,k),T+=3),(e>0||w!==r-1)&&(h.push(R,B,k),T+=3)}l.addGroup(p,T,0),p+=T}function v(x){const I=m,T=new nt,L=new A;let D=0;const w=x===!0?t:e,M=x===!0?1:-1;for(let B=1;B<=s;B++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const R=m;for(let B=0;B<=s;B++){const U=B/s*c+a,X=Math.cos(U),H=Math.sin(U);L.x=w*H,L.y=g*M,L.z=w*X,u.push(L.x,L.y,L.z),d.push(0,M,0),T.x=X*.5+.5,T.y=H*.5*M+.5,f.push(T.x,T.y),m++}for(let B=0;B<s;B++){const k=I+B,U=R+B;x===!0?h.push(U,U+1,k):h.push(U+1,U,k),D+=3}l.addGroup(p,D,x===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zi(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dr extends zi{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new dr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Cc extends Ae{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new fe(r,3)),this.setAttribute("normal",new fe(r.slice(),3)),this.setAttribute("uv",new fe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const v=new A,x=new A,I=new A;for(let T=0;T<e.length;T+=3)f(e[T+0],v),f(e[T+1],x),f(e[T+2],I),c(v,x,I,y)}function c(y,v,x,I){const T=I+1,L=[];for(let D=0;D<=T;D++){L[D]=[];const w=y.clone().lerp(x,D/T),M=v.clone().lerp(x,D/T),R=T-D;for(let B=0;B<=R;B++)B===0&&D===T?L[D][B]=w:L[D][B]=w.clone().lerp(M,B/R)}for(let D=0;D<T;D++)for(let w=0;w<2*(T-D)-1;w++){const M=Math.floor(w/2);w%2===0?(d(L[D][M+1]),d(L[D+1][M]),d(L[D][M])):(d(L[D][M+1]),d(L[D+1][M+1]),d(L[D+1][M]))}}function l(y){const v=new A;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const y=new A;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];const x=g(y)/2/Math.PI+.5,I=p(y)/Math.PI+.5;o.push(x,1-I)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){const v=o[y+0],x=o[y+2],I=o[y+4],T=Math.max(v,x,I),L=Math.min(v,x,I);T>.9&&L<.1&&(v<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),I<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,v){const x=y*3;v.x=t[x+0],v.y=t[x+1],v.z=t[x+2]}function m(){const y=new A,v=new A,x=new A,I=new A,T=new nt,L=new nt,D=new nt;for(let w=0,M=0;w<r.length;w+=9,M+=6){y.set(r[w+0],r[w+1],r[w+2]),v.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),T.set(o[M+0],o[M+1]),L.set(o[M+2],o[M+3]),D.set(o[M+4],o[M+5]),I.copy(y).add(v).add(x).divideScalar(3);const R=g(I);_(T,M+0,y,R),_(L,M+2,v,R),_(D,M+4,x,R)}}function _(y,v,x,I){I<0&&y.x===1&&(o[v]=y.x-1),x.x===0&&x.z===0&&(o[v]=I/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cc(t.vertices,t.indices,t.radius,t.details)}}class Su extends hh{constructor(t){super(t),this.uuid=hn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new hh().fromJSON(s))}return this}}const E_={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=bu(i,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=P_(i,t,r,e)),i.length>80*e){a=l=i[0],c=h=i[1];for(let m=e;m<s;m+=e)u=i[m],d=i[m+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return or(r,o,e,a,c,f,0),o}};function bu(i,t,e,n,s){let r,o;if(s===V_(i,t,e,n)>0)for(r=t;r<e;r+=n)o=uh(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=uh(r,i[r],i[r+1],o);return o&&Mo(o,o.next)&&(cr(o),o=o.next),o}function Vi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Mo(e,e.next)||Te(e.prev,e,e.next)===0)){if(cr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function or(i,t,e,n,s,r,o){if(!i)return;!o&&r&&N_(i,n,s,r);let a=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?A_(i,n,s,r):T_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),cr(i),i=l.next,a=l.next;continue}if(i=l,i===a){o?o===1?(i=R_(Vi(i),t,e),or(i,t,e,n,s,r,2)):o===2&&C_(i,t,e,n,s,r):or(Vi(i),t,e,n,s,r,1);break}}}function T_(i){const t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;const s=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&fs(s,a,r,c,o,l,m.x,m.y)&&Te(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function A_(i,t,e,n){const s=i.prev,r=i,o=i.next;if(Te(s,r,o)>=0)return!1;const a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,m=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,p=oc(f,m,t,e,n),y=oc(_,g,t,e,n);let v=i.prevZ,x=i.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&fs(a,h,c,u,l,d,v.x,v.y)&&Te(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==o&&fs(a,h,c,u,l,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==s&&v!==o&&fs(a,h,c,u,l,d,v.x,v.y)&&Te(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==s&&x!==o&&fs(a,h,c,u,l,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function R_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!Mo(s,r)&&wu(s,n,n.next,r)&&ar(s,r)&&ar(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),cr(n),cr(n.next),n=i=r),n=n.next}while(n!==i);return Vi(n)}function C_(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&k_(o,a)){let c=Eu(o,a);o=Vi(o,o.next),c=Vi(c,c.next),or(o,t,e,n,s,r,0),or(c,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function P_(i,t,e,n){const s=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:i.length,l=bu(i,a,c,n,!1),l===l.next&&(l.steiner=!0),s.push(F_(l));for(s.sort(L_),r=0;r<s.length;r++)e=I_(s[r],e);return e}function L_(i,t){return i.x-t.x}function I_(i,t){const e=D_(i,t);if(!e)return t;const n=Eu(e,i);return Vi(n,n.next),Vi(e,e.next)}function D_(i,t){let e=t,n=-1/0,s;const r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&fs(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),ar(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&U_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function U_(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function N_(i,t,e,n){let s=i;do s.z===0&&(s.z=oc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,O_(s)}function O_(i){let t,e,n,s,r,o,a,c,l=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(o>1);return i}function oc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function F_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fs(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function k_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!B_(i,t)&&(ar(i,t)&&ar(t,i)&&z_(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||Mo(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Mo(i,t){return i.x===t.x&&i.y===t.y}function wu(i,t,e,n){const s=Yr(Te(i,t,e)),r=Yr(Te(i,t,n)),o=Yr(Te(e,n,i)),a=Yr(Te(e,n,t));return!!(s!==r&&o!==a||s===0&&Xr(i,e,t)||r===0&&Xr(i,n,t)||o===0&&Xr(e,i,n)||a===0&&Xr(e,t,n))}function Xr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Yr(i){return i>0?1:i<0?-1:0}function B_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&wu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ar(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function z_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Eu(i,t){const e=new ac(i.i,i.x,i.y),n=new ac(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function uh(i,t,e,n){const s=new ac(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function cr(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ac(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function V_(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}class er{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return er.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];dh(t),fh(n,t);let o=t.length;e.forEach(dh);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,fh(n,e[c]);const a=E_.triangulate(n,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function dh(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function fh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Pc extends Ae{constructor(t=new Su([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new fe(s,3)),this.setAttribute("uv",new fe(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:H_;let v,x=!1,I,T,L,D;p&&(v=p.getSpacedPoints(h),x=!0,d=!1,I=p.computeFrenetFrames(h,!1),T=new A,L=new A,D=new A),d||(g=0,f=0,m=0,_=0);const w=a.extractPoints(l);let M=w.shape;const R=w.holes;if(!er.isClockWise(M)){M=M.reverse();for(let J=0,rt=R.length;J<rt;J++){const C=R[J];er.isClockWise(C)&&(R[J]=C.reverse())}}const k=er.triangulateShape(M,R),U=M;for(let J=0,rt=R.length;J<rt;J++){const C=R[J];M=M.concat(C)}function X(J,rt,C){return rt||console.error("THREE.ExtrudeGeometry: vec does not exist"),J.clone().addScaledVector(rt,C)}const H=M.length,tt=k.length;function Y(J,rt,C){let Lt,it,St;const ut=J.x-rt.x,Vt=J.y-rt.y,yt=C.x-J.x,E=C.y-J.y,S=ut*ut+Vt*Vt,z=ut*E-Vt*yt;if(Math.abs(z)>Number.EPSILON){const Z=Math.sqrt(S),Q=Math.sqrt(yt*yt+E*E),K=rt.x-Vt/Z,At=rt.y+ut/Z,pt=C.x-E/Q,Mt=C.y+yt/Q,se=((pt-K)*E-(Mt-At)*yt)/(ut*E-Vt*yt);Lt=K+ut*se-J.x,it=At+Vt*se-J.y;const st=Lt*Lt+it*it;if(st<=2)return new nt(Lt,it);St=Math.sqrt(st/2)}else{let Z=!1;ut>Number.EPSILON?yt>Number.EPSILON&&(Z=!0):ut<-Number.EPSILON?yt<-Number.EPSILON&&(Z=!0):Math.sign(Vt)===Math.sign(E)&&(Z=!0),Z?(Lt=-Vt,it=ut,St=Math.sqrt(S)):(Lt=ut,it=Vt,St=Math.sqrt(S/2))}return new nt(Lt/St,it/St)}const ht=[];for(let J=0,rt=U.length,C=rt-1,Lt=J+1;J<rt;J++,C++,Lt++)C===rt&&(C=0),Lt===rt&&(Lt=0),ht[J]=Y(U[J],U[C],U[Lt]);const dt=[];let xt,zt=ht.concat();for(let J=0,rt=R.length;J<rt;J++){const C=R[J];xt=[];for(let Lt=0,it=C.length,St=it-1,ut=Lt+1;Lt<it;Lt++,St++,ut++)St===it&&(St=0),ut===it&&(ut=0),xt[Lt]=Y(C[Lt],C[St],C[ut]);dt.push(xt),zt=zt.concat(xt)}for(let J=0;J<g;J++){const rt=J/g,C=f*Math.cos(rt*Math.PI/2),Lt=m*Math.sin(rt*Math.PI/2)+_;for(let it=0,St=U.length;it<St;it++){const ut=X(U[it],ht[it],Lt);at(ut.x,ut.y,-C)}for(let it=0,St=R.length;it<St;it++){const ut=R[it];xt=dt[it];for(let Vt=0,yt=ut.length;Vt<yt;Vt++){const E=X(ut[Vt],xt[Vt],Lt);at(E.x,E.y,-C)}}}const ie=m+_;for(let J=0;J<H;J++){const rt=d?X(M[J],zt[J],ie):M[J];x?(L.copy(I.normals[0]).multiplyScalar(rt.x),T.copy(I.binormals[0]).multiplyScalar(rt.y),D.copy(v[0]).add(L).add(T),at(D.x,D.y,D.z)):at(rt.x,rt.y,0)}for(let J=1;J<=h;J++)for(let rt=0;rt<H;rt++){const C=d?X(M[rt],zt[rt],ie):M[rt];x?(L.copy(I.normals[J]).multiplyScalar(C.x),T.copy(I.binormals[J]).multiplyScalar(C.y),D.copy(v[J]).add(L).add(T),at(D.x,D.y,D.z)):at(C.x,C.y,u/h*J)}for(let J=g-1;J>=0;J--){const rt=J/g,C=f*Math.cos(rt*Math.PI/2),Lt=m*Math.sin(rt*Math.PI/2)+_;for(let it=0,St=U.length;it<St;it++){const ut=X(U[it],ht[it],Lt);at(ut.x,ut.y,u+C)}for(let it=0,St=R.length;it<St;it++){const ut=R[it];xt=dt[it];for(let Vt=0,yt=ut.length;Vt<yt;Vt++){const E=X(ut[Vt],xt[Vt],Lt);x?at(E.x,E.y+v[h-1].y,v[h-1].x+C):at(E.x,E.y,u+C)}}}j(),et();function j(){const J=s.length/3;if(d){let rt=0,C=H*rt;for(let Lt=0;Lt<tt;Lt++){const it=k[Lt];Nt(it[2]+C,it[1]+C,it[0]+C)}rt=h+g*2,C=H*rt;for(let Lt=0;Lt<tt;Lt++){const it=k[Lt];Nt(it[0]+C,it[1]+C,it[2]+C)}}else{for(let rt=0;rt<tt;rt++){const C=k[rt];Nt(C[2],C[1],C[0])}for(let rt=0;rt<tt;rt++){const C=k[rt];Nt(C[0]+H*h,C[1]+H*h,C[2]+H*h)}}n.addGroup(J,s.length/3-J,0)}function et(){const J=s.length/3;let rt=0;Tt(U,rt),rt+=U.length;for(let C=0,Lt=R.length;C<Lt;C++){const it=R[C];Tt(it,rt),rt+=it.length}n.addGroup(J,s.length/3-J,1)}function Tt(J,rt){let C=J.length;for(;--C>=0;){const Lt=C;let it=C-1;it<0&&(it=J.length-1);for(let St=0,ut=h+g*2;St<ut;St++){const Vt=H*St,yt=H*(St+1),E=rt+Lt+Vt,S=rt+it+Vt,z=rt+it+yt,Z=rt+Lt+yt;qt(E,S,z,Z)}}}function at(J,rt,C){c.push(J),c.push(rt),c.push(C)}function Nt(J,rt,C){Gt(J),Gt(rt),Gt(C);const Lt=s.length/3,it=y.generateTopUV(n,s,Lt-3,Lt-2,Lt-1);oe(it[0]),oe(it[1]),oe(it[2])}function qt(J,rt,C,Lt){Gt(J),Gt(rt),Gt(Lt),Gt(rt),Gt(C),Gt(Lt);const it=s.length/3,St=y.generateSideWallUV(n,s,it-6,it-3,it-2,it-1);oe(St[0]),oe(St[1]),oe(St[3]),oe(St[1]),oe(St[2]),oe(St[3])}function Gt(J){s.push(c[J*3+0]),s.push(c[J*3+1]),s.push(c[J*3+2])}function oe(J){r.push(J.x),r.push(J.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return G_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new rc[s.type]().fromJSON(s)),new Pc(n,t.options)}}const H_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new nt(r,o),new nt(a,c),new nt(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],_=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new nt(o,1-c),new nt(l,1-u),new nt(d,1-m),new nt(_,1-p)]:[new nt(a,1-c),new nt(h,1-u),new nt(f,1-m),new nt(g,1-p)]}};function G_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class So extends Cc{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new So(t.radius,t.detail)}}class Lc extends Ae{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new A,m=new nt;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<s;_++){const g=_*(n+1);for(let p=0;p<n;p++){const y=p+g,v=y,x=y+n+1,I=y+n+2,T=y+1;a.push(v,x,T),a.push(x,I,T)}}this.setIndex(a),this.setAttribute("position",new fe(c,3)),this.setAttribute("normal",new fe(l,3)),this.setAttribute("uv",new fe(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Lc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Hi extends Ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new A,d=new A,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],v=p/n;let x=0;p===0&&o===0?x=.5/e:p===n&&c===Math.PI&&(x=-.5/e);for(let I=0;I<=e;I++){const T=I/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+v*a),u.y=t*Math.cos(o+v*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+v*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(T+x,1-v),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const v=h[p][y+1],x=h[p][y],I=h[p+1][y],T=h[p+1][y+1];(p!==0||o>0)&&f.push(v,x,T),(p!==n-1||c<Math.PI)&&f.push(x,I,T)}this.setIndex(f),this.setAttribute("position",new fe(m,3)),this.setAttribute("normal",new fe(_,3)),this.setAttribute("uv",new fe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hi(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class bo extends Ae{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new A,u=new A,d=new A;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/s),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,p=(s+1)*(f-1)+m,y=(s+1)*f+m;o.push(_,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new fe(a,3)),this.setAttribute("normal",new fe(c,3)),this.setAttribute("uv",new fe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bo(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Fe extends Wi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new lt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jh,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class yy extends Fe{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ue(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new lt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new lt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new lt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}function qr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function W_(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function X_(i){function t(s,r){return i[s]-i[r]}const e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function ph(i,t,e){const n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){const a=e[r]*t;for(let c=0;c!==t;++c)s[o++]=i[a+c]}return s}function Tu(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push.apply(e,o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}class wo{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){const a=e[1];t<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Y_ extends wo{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$c,endingEnd:$c}}intervalChanged_(t,e,n){const s=this.parameterPositions;let r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Jc:r=t,a=2*e-n;break;case Qc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Jc:o=t,c=2*n-e;break;case Qc:o=1,c=n+s[1]-s[0];break;default:o=t-1,c=e}const l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,v=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let I=0;I!==a;++I)r[I]=p*o[h+I]+y*o[l+I]+v*o[c+I]+x*o[u+I];return r}}class q_ extends wo{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}}class j_ extends wo{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}}class Nn{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=qr(e,this.TimeBufferType),this.values=qr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:qr(t.times,Array),values:qr(t.values,Array)};const s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new j_(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new q_(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Y_(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ao:e=this.InterpolantFactoryMethodDiscrete;break;case tc:e=this.InterpolantFactoryMethodLinear;break;case Po:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ao;case this.InterpolantFactoryMethodLinear:return tc;case this.InterpolantFactoryMethodSmooth:return Po}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){const n=this.times,s=n.length;let r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&W_(s))for(let a=0,c=s.length;a!==c;++a){const l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Po,r=t.length-1;let o=1;for(let a=1;a<r;++a){let c=!1;const l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=e[u+m];if(_!==e[d+m]||_!==e[f+m]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}}Nn.prototype.TimeBufferType=Float32Array;Nn.prototype.ValueBufferType=Float32Array;Nn.prototype.DefaultInterpolation=tc;class Cs extends Nn{constructor(t,e,n){super(t,e,n)}}Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=ao;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class Au extends Nn{}Au.prototype.ValueTypeName="color";class uo extends Nn{}uo.prototype.ValueTypeName="number";class Z_ extends wo{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(s-e);let l=t*a;for(let h=l+a;l!==h;l+=4)bn.slerpFlat(r,0,o,l-a,o,l,c);return r}}class Eo extends Nn{InterpolantFactoryMethodLinear(t){return new Z_(this.times,this.values,this.getValueSize(),t)}}Eo.prototype.ValueTypeName="quaternion";Eo.prototype.InterpolantFactoryMethodSmooth=void 0;class Ps extends Nn{constructor(t,e,n){super(t,e,n)}}Ps.prototype.ValueTypeName="string";Ps.prototype.ValueBufferType=Array;Ps.prototype.DefaultInterpolation=ao;Ps.prototype.InterpolantFactoryMethodLinear=void 0;Ps.prototype.InterpolantFactoryMethodSmooth=void 0;class fo extends Nn{}fo.prototype.ValueTypeName="vector";class My{constructor(t="",e=-1,n=[],s=Md){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=hn(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push($_(n[o]).scale(s));const r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){const e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=n.length;r!==o;++r)e.push(Nn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){const r=e.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);const h=X_(c);c=ph(c,1,h),l=ph(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new uo(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(l)}}const o=[];for(const a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const g=[],p=[];Tu(f,g,p,m),g.length!==0&&_.push(new u(d,g,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const v=d[m];g.push(v.time),p.push(v.morphTarget===_?1:0)}s.push(new uo(".morphTargetInfluence["+_+"]",g,p))}c=f.length*o}else{const f=".bones["+e[u].name+"]";n(fo,f+".position",d,"pos",s),n(Eo,f+".quaternion",d,"rot",s),n(fo,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,s=t.length;n!==s;++n){const r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function K_(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return uo;case"vector":case"vector2":case"vector3":case"vector4":return fo;case"color":return Au;case"quaternion":return Eo;case"bool":case"boolean":return Cs;case"string":return Ps}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function $_(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=K_(i.type);if(i.times===void 0){const e=[],n=[];Tu(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}const pi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class J_{constructor(t,e,n){const s=this;let r=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const Q_=new J_;class fr{constructor(t){this.manager=t!==void 0?t:Q_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}fr.DEFAULT_MATERIAL_NAME="__DEFAULT";const Wn={};class tv extends Error{constructor(t,e){super(t),this.response=e}}class Sy extends fr{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=pi.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Wn[t]!==void 0){Wn[t].push({onLoad:e,onProgress:n,onError:s});return}Wn[t]=[],Wn[t].push({onLoad:e,onProgress:n,onError:s});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Wn[t],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){u.read().then(({done:v,value:x})=>{if(v)p.close();else{_+=x.byteLength;const I=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let T=0,L=h.length;T<L;T++){const D=h[T];D.onProgress&&D.onProgress(I)}p.enqueue(x),y()}},v=>{p.error(v)})}}});return new Response(g)}else throw new tv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{pi.add(t,l);const h=Wn[t];delete Wn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Wn[t];if(h===void 0)throw this.manager.itemError(t),l;delete Wn[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class ev extends fr{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=pi.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=sr("img");function c(){h(),pi.add(t,this),e&&e(this),r.manager.itemEnd(t)}function l(u){h(),s&&s(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class by extends fr{constructor(t){super(t)}load(t,e,n,s){const r=new Be,o=new ev(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}}class To extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ru extends To{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new lt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ha=new Wt,mh=new A,gh=new A;class Ic{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new Wt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mc,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;mh.setFromMatrixPosition(t.matrixWorld),e.position.copy(mh),gh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(gh),e.updateMatrixWorld(),ha.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ha)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class nv extends Ic{constructor(){super(new Ze(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=ws*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class wy extends To{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new nv}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const _h=new Wt,Vs=new A,ua=new A;class iv extends Ic{constructor(){super(new Ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new nt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Vs.setFromMatrixPosition(t.matrixWorld),n.position.copy(Vs),ua.copy(n.position),ua.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ua),n.updateMatrixWorld(),s.makeTranslation(-Vs.x,-Vs.y,-Vs.z),_h.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_h)}}class sv extends To{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new iv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class rv extends Ic{constructor(){super(new ou(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cu extends To{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new rv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ey{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,s=t.length;n<s;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class Ty extends fr{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=pi.get(t);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(l=>{e&&e(l),r.manager.itemEnd(t)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return pi.add(t,l),e&&e(l),r.manager.itemEnd(t),l}).catch(function(l){s&&s(l),pi.remove(t),r.manager.itemError(t),r.manager.itemEnd(t)});pi.add(t,c),r.manager.itemStart(t)}}class ov{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=vh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=vh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function vh(){return performance.now()}const Dc="\\[\\]\\.:\\/",av=new RegExp("["+Dc+"]","g"),Uc="[^"+Dc+"]",cv="[^"+Dc.replace("\\.","")+"]",lv=/((?:WC+[\/:])*)/.source.replace("WC",Uc),hv=/(WCOD+)?/.source.replace("WCOD",cv),uv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uc),dv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uc),fv=new RegExp("^"+lv+hv+uv+dv+"$"),pv=["material","materials","bones","map"];class mv{constructor(t,e,n){const s=n||xe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class xe{constructor(t,e,n){this.path=e,this.parsedPath=n||xe.parseTrackName(e),this.node=xe.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new xe.Composite(t,e,n):new xe(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(av,"")}static parseTrackName(t){const e=fv.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);pv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,s=e.propertyName;let r=e.propertyIndex;if(t||(t=xe.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[s];if(o===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}xe.Composite=mv;xe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xe.prototype.GetterByBindingType=[xe.prototype._getValue_direct,xe.prototype._getValue_array,xe.prototype._getValue_arrayElement,xe.prototype._getValue_toArray];xe.prototype.SetterByBindingTypeAndVersioning=[[xe.prototype._setValue_direct,xe.prototype._setValue_direct_setNeedsUpdate,xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_array,xe.prototype._setValue_array_setNeedsUpdate,xe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_arrayElement,xe.prototype._setValue_arrayElement_setNeedsUpdate,xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_fromArray,xe.prototype._setValue_fromArray_setNeedsUpdate,xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const xh=new Wt;class gv{constructor(t,e,n=0,s=1/0){this.ray=new As(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new yc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return xh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(xh),this}intersectObject(t,e=!0,n=[]){return cc(t,this,n,e),n.sort(yh),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)cc(t[s],this,n,e);return n.sort(yh),n}}function yh(i,t){return i.distance-t.distance}function cc(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)cc(r[o],t,e,!0)}}class Mh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ue(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class _v extends Gi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uc);const gn=[{id:"meadow",name:"Green Meadow",price:2500,tagline:"Peaceful countryside",mood:"Rolling grass, wildflowers and a lazy little stream under warm sun.",features:["Rolling hills","Wildflowers","Oak trees","Stream"],accent:"#8fbf5a"},{id:"forest",name:"Pine Forest",price:6e3,tagline:"Private woodland retreat",mood:"A misty clearing ringed by tall pines, a cold creek and fireflies after dark.",features:["Forest clearing","Creek","Mist","Fireflies"],accent:"#4f7f5a"},{id:"lakefront",name:"Lakefront",price:12e3,tagline:"Calm luxury retreat",mood:"Your own shoreline on a glassy lake, with a dock, ducks and morning mist.",features:["Private shoreline","Dock","Ducks","Morning mist"],accent:"#5f9fbf"},{id:"mountain",name:"Mountain Valley",price:2e4,tagline:"Dramatic isolation",mood:"A hidden valley below snowy peaks, with a thundering waterfall and drifting clouds.",features:["Snowy peaks","Waterfall","Rock formations","Cloud shadows"],accent:"#8a9bb0"},{id:"beachfront",name:"Beachfront",price:35e3,tagline:"Tropical vacation",mood:"Turquoise water, palms and soft sand, and every evening a sunset.",features:["Turquoise ocean","Palm trees","Waves","Sunsets"],accent:"#e8b86a"},{id:"island",name:"Private Island",price:6e4,tagline:"The ultimate escape",mood:"Ocean in every direction. Cliffs, a private beach, a dock, and nobody else.",features:["360° ocean","Private beach","Cliffs","Spectacular sunset"],accent:"#e98a6a"}],lr=Object.fromEntries(gn.map(i=>[i.id,i])),po={first_escape:{title:"First Escape",desc:"Earn 5,000 points in a run",icon:"🏁"},close_call:{title:"Close Call",desc:"10 near misses in one run",icon:"💨"},road_legend:{title:"Road Legend",desc:"Reach a x5 combo",icon:"🔥"},landowner:{title:"Landowner",desc:"Buy your first property",icon:"🗝️"},lake_life:{title:"Lake Life",desc:"Own the Lakefront",icon:"🦆"},paradise_found:{title:"Paradise Found",desc:"Own the Private Island",icon:"🏝️"},architect:{title:"Architect",desc:"Place 25 objects",icon:"📐"},green_thumb:{title:"Green Thumb",desc:"Place 20 plants",icon:"🌱"}};function vv(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}}function Pu(i){return{sessionCash:0,currentRunPoints:0,lifetimeSessionPoints:0,arcadeStats:{runs:0,bestScore:0,bestDistance:0,totalNearMisses:0,bestCombo:1},ownedLandIds:[],activeLandId:null,landStates:{},sessionAchievements:[],timeMode:"AUTO",weather:"clear",settings:i??{master:.8,music:.55,sfx:.8,ambience:.7,reducedMotion:vv(),quality:"auto"},scene:"BOOT",seenDriveTutorial:!1,seenBuilderTutorial:!1,nextUid:1}}let ne=Pu();const lc=new Set;let da=!1;function $e(i){for(const t of lc)t(ne,i)}const ct={get:()=>ne,subscribe(i){return lc.add(i),()=>lc.delete(i)},setScene(i){ne.scene=i,$e("scene")},beginRun(){ne.currentRunPoints=0,$e("run-begin")},setRunPoints(i){ne.currentRunPoints=Math.max(0,Math.floor(i))},completeRun(i){const t=Math.max(0,Math.floor(i.points)),e=ne.sessionCash;ne.sessionCash=e+t,ne.lifetimeSessionPoints+=t,ne.currentRunPoints=0;const n=ne.arcadeStats;return n.runs+=1,n.bestScore=Math.max(n.bestScore,t),n.bestDistance=Math.max(n.bestDistance,i.distance),n.totalNearMisses+=i.nearMisses,n.bestCombo=Math.max(n.bestCombo,i.bestCombo),t>=5e3&&ct.unlock("first_escape"),i.nearMisses>=10&&ct.unlock("close_call"),i.bestCombo>=5&&ct.unlock("road_legend"),$e("cash"),{before:e,earned:t,after:ne.sessionCash}},isOwned:i=>ne.ownedLandIds.includes(i),shortfall(i){return Math.max(0,lr[i].price-ne.sessionCash)},purchaseLand(i){if(da)return!1;da=!0;try{const t=lr[i].price;return ne.ownedLandIds.includes(i)||ne.sessionCash<t?!1:(ne.sessionCash-=t,ne.ownedLandIds.push(i),ne.landStates[i]||(ne.landStates[i]={id:i,placedObjects:[],visits:0}),ct.unlock("landowner"),i==="lakefront"&&ct.unlock("lake_life"),i==="island"&&ct.unlock("paradise_found"),$e("purchase"),!0)}finally{da=!1}},setActiveLand(i){return ne.ownedLandIds.includes(i)?(ne.activeLandId=i,ne.landStates[i].visits+=1,$e("active-land"),!0):!1},activeLand(){return ne.activeLandId?ne.landStates[ne.activeLandId]??null:null},addObject(i){const t=ct.activeLand();if(!t)return null;const e={...i,uid:ne.nextUid++};return t.placedObjects.push(e),ct.checkBuildAchievements(),$e("objects"),e},restoreObject(i){const t=ct.activeLand();!t||t.placedObjects.some(e=>e.uid===i.uid)||(t.placedObjects.push({...i,colors:{...i.colors}}),$e("objects"))},updateObject(i,t){const e=ct.activeLand(),n=e==null?void 0:e.placedObjects.find(s=>s.uid===i);n&&(Object.assign(n,t),$e("objects"))},removeObject(i){const t=ct.activeLand();t&&(t.placedObjects=t.placedObjects.filter(e=>e.uid!==i),$e("objects"))},checkBuildAchievements(){let i=0,t=0;for(const e of ne.ownedLandIds)for(const n of ne.landStates[e].placedObjects)i++,/^(tree_|bush|hedge|wildflowers|grass|flowerbed|crop_|plot_)/.test(n.assetId)&&t++;i>=25&&ct.unlock("architect"),t>=20&&ct.unlock("green_thumb")},unlock(i){ne.sessionAchievements.includes(i)||!po[i]||(ne.sessionAchievements.push(i),$e("achievement:"+i))},setTimeMode(i){ne.timeMode=i,$e("time")},setWeather(i){ne.weather=i,$e("weather")},setSetting(i,t){ne.settings[i]=t,$e("settings")},markTutorial(i){i==="drive"?ne.seenDriveTutorial=!0:ne.seenBuilderTutorial=!0},resetSession(){ne=Pu(ne.settings),$e("reset")}};class xv{constructor(){V(this,"ctx",null);V(this,"master");V(this,"buses",{});V(this,"noiseBuf");V(this,"engine");V(this,"amb");V(this,"musicTimer",0);V(this,"musicMood","none");V(this,"musicStep",0);V(this,"failed",!1);V(this,"vol",{master:.8,music:.55,sfx:.8,ambience:.7})}unlock(){if(!this.failed)try{if(!this.ctx){const t=window.AudioContext||window.webkitAudioContext;this.ctx=new t,this.master=this.ctx.createGain();const e=this.ctx.createDynamicsCompressor();this.master.connect(e).connect(this.ctx.destination);for(const s of["music","ambience","sfx"])this.buses[s]=this.ctx.createGain(),this.buses[s].connect(this.master);this.noiseBuf=this.ctx.createBuffer(1,this.ctx.sampleRate*2,this.ctx.sampleRate);const n=this.noiseBuf.getChannelData(0);for(let s=0;s<n.length;s++)n[s]=Math.random()*2-1;this.applyVolumes()}this.ctx.state==="suspended"&&this.ctx.resume()}catch(t){console.warn("[audio] unavailable",t),this.failed=!0}}get ok(){return!!this.ctx&&!this.failed}setVolumes(t){Object.assign(this.vol,t),this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.setTargetAtTime(this.vol.master,t,.05),this.buses.music.gain.setTargetAtTime(this.vol.music*.5,t,.05),this.buses.ambience.gain.setTargetAtTime(this.vol.ambience*.6,t,.05),this.buses.sfx.gain.setTargetAtTime(this.vol.sfx*.7,t,.05)}suspend(t){this.ctx&&(t?this.ctx.suspend():this.ctx.resume())}tone(t,e,n={}){if(!this.ok)return;const s=this.ctx,r=s.currentTime+(n.delay??0),o=s.createOscillator(),a=s.createGain();o.type=n.type??"sine",o.frequency.setValueAtTime(t,r),n.slide&&o.frequency.exponentialRampToValueAtTime(Math.max(20,t*n.slide),r+e);const c=n.attack??.01;a.gain.setValueAtTime(1e-4,r),a.gain.exponentialRampToValueAtTime(n.vol??.2,r+c),a.gain.exponentialRampToValueAtTime(1e-4,r+e),o.connect(a).connect(this.buses[n.bus??"sfx"]),o.start(r),o.stop(r+e+.05)}noise(t,e={}){if(!this.ok)return;const n=this.ctx,s=n.currentTime+(e.delay??0),r=n.createBufferSource();r.buffer=this.noiseBuf;const o=n.createBiquadFilter();o.type=e.type??"bandpass",o.frequency.setValueAtTime(e.freq??1e3,s),e.slide&&o.frequency.exponentialRampToValueAtTime(Math.max(40,(e.freq??1e3)*e.slide),s+t),o.Q.value=e.q??1;const a=n.createGain();a.gain.setValueAtTime(1e-4,s),a.gain.exponentialRampToValueAtTime(e.vol??.3,s+(e.attack??.01)),a.gain.exponentialRampToValueAtTime(1e-4,s+t),r.connect(o).connect(a).connect(this.buses[e.bus??"sfx"]),r.start(s,Math.random()),r.stop(s+t+.05)}click(){this.tone(880,.06,{type:"triangle",vol:.08})}hover(){this.tone(1320,.03,{type:"sine",vol:.03})}token(t=1){const e=880*Math.pow(1.06,Math.min(t,8));this.tone(e,.12,{type:"triangle",vol:.12}),this.tone(e*1.5,.16,{type:"sine",vol:.08,delay:.05})}nearMiss(){this.noise(.35,{freq:2400,slide:.3,q:2,vol:.25})}gate(t){(t?[523,659,784,1046]:[523,659,784]).forEach((n,s)=>this.tone(n,.25,{type:"triangle",vol:.1,delay:s*.05}))}combo(t){this.tone(330*Math.pow(1.122,t),.3,{type:"square",vol:.05,slide:1.5})}crash(){this.noise(1.2,{freq:400,type:"lowpass",vol:.7,slide:.2}),this.tone(70,.8,{type:"sine",vol:.6,slide:.4}),this.noise(.4,{freq:3e3,q:.5,vol:.3,delay:.05})}countTick(){this.tone(1800+Math.random()*200,.025,{type:"square",vol:.025})}cashDing(){[784,988,1318].forEach((t,e)=>this.tone(t,.5,{type:"triangle",vol:.1,delay:e*.07}))}purchase(){[261.6,329.6,392,523.3,659.3].forEach((e,n)=>this.tone(e,2.2,{type:"triangle",vol:.09,delay:n*.09,attack:.05})),this.noise(2,{freq:6e3,q:.4,vol:.05,attack:.5})}place(){this.tone(320,.12,{type:"sine",vol:.25,slide:.6}),this.noise(.12,{freq:900,vol:.12})}pickup(){this.tone(500,.08,{type:"sine",vol:.12,slide:1.4})}remove(){this.tone(400,.18,{type:"triangle",vol:.12,slide:.4})}invalid(){this.tone(180,.15,{type:"square",vol:.04})}achievement(){[659,880,1174].forEach((t,e)=>this.tone(t,.4,{type:"sine",vol:.1,delay:e*.1}))}whoosh(){this.noise(1.6,{freq:300,slide:6,q:.7,vol:.2,attack:.6})}engineStart(){if(!this.ok||this.engine)return;const t=this.ctx,e=t.createOscillator(),n=t.createOscillator();e.type="sawtooth",n.type="square";const s=t.createBiquadFilter();s.type="lowpass",s.frequency.value=600;const r=t.createGain();r.gain.value=1e-4,r.gain.setTargetAtTime(.07,t.currentTime,.3),e.connect(s),n.connect(s),s.connect(r).connect(this.buses.sfx),e.start(),n.start(),this.engine={osc:e,osc2:n,filter:s,gain:r}}engineUpdate(t,e){if(!this.engine||!this.ctx)return;const n=this.ctx.currentTime,s=55+t*70+(e?25:0);this.engine.osc.frequency.setTargetAtTime(s,n,.1),this.engine.osc2.frequency.setTargetAtTime(s*.5,n,.1),this.engine.filter.frequency.setTargetAtTime(500+t*900+(e?400:0),n,.1)}engineStop(){if(!this.engine||!this.ctx)return;const t=this.engine;t.gain.gain.setTargetAtTime(1e-4,this.ctx.currentTime,.15),setTimeout(()=>{try{t.osc.stop(),t.osc2.stop()}catch{}},600),this.engine=void 0}setAmbience(t){if(!this.ok)return;const e=this.ctx;if(this.amb){const l=this.amb;l.gain.gain.setTargetAtTime(1e-4,e.currentTime,.6),clearInterval(l.timer),setTimeout(()=>l.nodes.forEach(h=>{var u;try{(u=h.stop)==null||u.call(h),h.disconnect()}catch{}}),3e3),this.amb=void 0}if(t==="none")return;const n=e.createGain();n.gain.value=1e-4,n.gain.setTargetAtTime(1,e.currentTime,1.2),n.connect(this.buses.ambience);const s=[n],r=(l,h,u,d,f="lowpass")=>{const m=e.createBufferSource();m.buffer=this.noiseBuf,m.loop=!0;const _=e.createBiquadFilter();_.type=f,_.frequency.value=l,_.Q.value=h;const g=e.createGain();g.gain.value=u;const p=e.createOscillator(),y=e.createGain();p.frequency.value=d,y.gain.value=u*.8,p.connect(y).connect(g.gain),m.connect(_).connect(g).connect(n),m.start(),p.start(),s.push(m,_,g,p,y)};let o=()=>{};const a=()=>{const l=2200+Math.random()*1800,h=2+Math.floor(Math.random()*4);for(let u=0;u<h;u++)this.tone(l*(1+Math.random()*.2),.08,{type:"sine",vol:.04,delay:u*.11,slide:1.3,bus:"ambience"})};switch(t){case"meadow":r(500,.5,.08,.1),o=()=>Math.random()<.7&&a();break;case"forest":r(1800,.6,.05,.25,"bandpass"),r(3500,.8,.03,.9,"highpass"),o=()=>Math.random()<.35&&a();break;case"lake":r(700,.6,.06,.3),o=()=>{Math.random()<.25?(this.tone(480,.12,{type:"sawtooth",vol:.03,slide:.7,bus:"ambience"}),this.tone(460,.12,{type:"sawtooth",vol:.03,slide:.7,bus:"ambience",delay:.16})):Math.random()<.5&&this.noise(.4,{freq:1200,vol:.05,bus:"ambience"})};break;case"mountain":r(300,1.5,.1,.06),r(2500,.4,.06,.05,"highpass"),o=()=>Math.random()<.15&&this.tone(1600,.6,{type:"sine",vol:.03,slide:.7,bus:"ambience",attack:.1});break;case"beach":r(600,.5,.18,.12),o=()=>{Math.random()<.3&&(this.tone(1500,.25,{type:"triangle",vol:.03,slide:.8,bus:"ambience"}),this.tone(1400,.25,{type:"triangle",vol:.025,slide:.8,bus:"ambience",delay:.3}))};break;case"road":r(400,.5,.06,.2);break}const c=window.setInterval(o,1400);this.amb={nodes:s,gain:n,timer:c}}setMusic(t){if(t===this.musicMood||(this.musicMood=t,clearInterval(this.musicTimer),t==="none"||!this.ok))return;const e={intro:[[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,66]],farm:[[60,64,67,71],[57,60,64,67],[53,57,60,64],[55,59,62,67]],market:[[62,66,69,73],[59,62,66,69],[55,59,62,66],[57,61,64,68]],arcade:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]]},s=6e4/(t==="arcade"?118:72)/2,r=e[t],o=c=>440*Math.pow(2,(c-69)/12);this.musicStep=0;const a=()=>{if(!this.ok)return;const c=this.musicStep++,l=r[Math.floor(c/16)%r.length];if(c%16===0&&l.forEach(h=>this.tone(o(h-12),s/1e3*16,{type:"sine",vol:.035,bus:"music",attack:.8})),t==="arcade")c%2===0&&this.tone(o(l[0]-24),.2,{type:"triangle",vol:.09,bus:"music"}),c%4===2&&this.noise(.05,{freq:8e3,q:.5,vol:.04,bus:"music"}),c%8===4&&this.noise(.15,{freq:1800,q:.7,vol:.06,bus:"music"}),c%3===0&&this.tone(o(l[c%l.length]+12),.15,{type:"square",vol:.018,bus:"music"});else if(Math.random()<.55){const h=l[Math.floor(Math.random()*l.length)]+(Math.random()<.5?12:0);this.tone(o(h),1.4,{type:"triangle",vol:.03,bus:"music",attack:.01})}};this.musicTimer=window.setInterval(a,s)}}const te=new xv,_n=(i,t,e)=>i<t?t:i>e?e:i,Fi=(i,t,e)=>i+(t-i)*e,_e=(i,t,e)=>{const n=_n((e-i)/(t-i),0,1);return n*n*(3-2*n)},cn=(i,t,e,n)=>Fi(i,t,1-Math.exp(-e*n));function le(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function jr(i,t,e){let n=i*374761393+t*668265263+e*1442695041|0;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function yv(i,t,e=0){const n=Math.floor(i),s=Math.floor(t),r=i-n,o=t-s,a=r*r*(3-2*r),c=o*o*(3-2*o),l=jr(n,s,e),h=jr(n+1,s,e),u=jr(n,s+1,e),d=jr(n+1,s+1,e);return Fi(Fi(l,h,a),Fi(u,d,a),c)}function je(i,t,e=0,n=4){let s=.5,r=1,o=0,a=0;for(let c=0;c<n;c++)o+=yv(i*r,t*r,e+c*17)*s,a+=s,s*=.5,r*=2.03;return o/a}const Cn=i=>"$"+Math.round(i).toLocaleString("en-US"),ps=i=>Math.round(i).toLocaleString("en-US"),Hs=new A;function an(i,t,e,n,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;Hs.copy(t),Hs[n]=0,Hs.normalize();const l=.5*o/(o+a),h=1-Hs.angleTo(i)/c;return Math.sign(Hs[e])===1?h*l:a/(o+a)+l+l*(1-h)}class Mv extends En{constructor(t=1,e=1,n=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,s,s,s),s===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new A,c=new A,l=new A(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=h.length/6,m=new A,_=.5/s;for(let g=0,p=0;g<h.length;g+=3,p+=2)switch(a.fromArray(h,g),c.copy(a),c.x-=Math.sign(c.x)*_,c.y-=Math.sign(c.y)*_,c.z-=Math.sign(c.z)*_,c.normalize(),h[g+0]=l.x*Math.sign(a.x)+c.x*r,h[g+1]=l.y*Math.sign(a.y)+c.y*r,h[g+2]=l.z*Math.sign(a.z)+c.z*r,u[g+0]=c.x,u[g+1]=c.y,u[g+2]=c.z,Math.floor(g/f)){case 0:m.set(1,0,0),d[p+0]=an(m,c,"z","y",r,n),d[p+1]=1-an(m,c,"y","z",r,e);break;case 1:m.set(-1,0,0),d[p+0]=1-an(m,c,"z","y",r,n),d[p+1]=1-an(m,c,"y","z",r,e);break;case 2:m.set(0,1,0),d[p+0]=1-an(m,c,"x","z",r,t),d[p+1]=an(m,c,"z","x",r,n);break;case 3:m.set(0,-1,0),d[p+0]=1-an(m,c,"x","z",r,t),d[p+1]=1-an(m,c,"z","x",r,n);break;case 4:m.set(0,0,1),d[p+0]=1-an(m,c,"x","y",r,t),d[p+1]=1-an(m,c,"y","x",r,e);break;case 5:m.set(0,0,-1),d[p+0]=an(m,c,"x","y",r,t),d[p+1]=1-an(m,c,"y","x",r,e);break}}}const Ln={uTime:{value:0},uWind:{value:1},uNight:{value:0}},Sh=new Map;function Bt(i,t={}){const e=`${i}|${t.flat?1:0}|${t.rough??.85}|${t.emissive??""}|${t.ei??0}|${t.wind?1:0}|${t.metal??0}`;let n=Sh.get(e);return n||(n=new Fe({color:new lt(i),roughness:t.rough??.85,metalness:t.metal??0,flatShading:t.flat??!1}),t.emissive&&(n.emissive=new lt(t.emissive),n.emissiveIntensity=t.ei??1),t.wind&&Sv(n),Sh.set(e,n)),n}const Oi=new Fe({color:new lt("#2f3b48"),emissive:new lt("#ffc46b"),emissiveIntensity:0,roughness:.3}),pr=new Fe({color:new lt("#fff2c9"),emissive:new lt("#ffcf73"),emissiveIntensity:.3}),Nc=new Fe({color:new lt("#ff9a3c"),emissive:new lt("#ff6a1a"),emissiveIntensity:1.6,flatShading:!0});function Lu(i,t){Oi.emissiveIntensity=i*1.6,pr.emissiveIntensity=.25+i*2.4,Nc.emissiveIntensity=1.4+Math.sin(t*13)*.25+Math.sin(t*7.3)*.2}function Sv(i,t=.06){i.onBeforeCompile=e=>{e.uniforms.uTime=Ln.uTime,e.uniforms.uWind=Ln.uWind,e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform float uWind;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec4 wpW = modelMatrix * vec4(position, 1.0);
        #ifdef USE_INSTANCING
          wpW = modelMatrix * instanceMatrix * vec4(position, 1.0);
        #endif
        float hW = max(position.y, 0.0);
        float ph = wpW.x * 0.35 + wpW.z * 0.27;
        transformed.x += sin(uTime * 1.7 + ph) * ${t.toFixed(3)} * hW * uWind;
        transformed.z += cos(uTime * 1.3 + ph * 1.3) * ${(t*.7).toFixed(3)} * hW * uWind;`)},i.customProgramCacheKey=()=>"wind"+t}function Oc(i,t,e=.88){const n=new Fe({color:new lt(t),roughness:.15,metalness:.1,transparent:!0,opacity:e,flatShading:!0}),s=new lt(i);return n.onBeforeCompile=r=>{r.uniforms.uTime=Ln.uTime,r.uniforms.uShallow={value:s},r.vertexShader=r.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;
varying vec3 vWP;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        vec4 wpq = modelMatrix * vec4(position, 1.0);
        transformed.z += sin(wpq.x * 0.35 + uTime * 1.2) * 0.12 + cos(wpq.z * 0.3 + uTime * 0.9) * 0.1;
        vWP = wpq.xyz;`),r.fragmentShader=r.fragmentShader.replace("#include <common>",`#include <common>
uniform float uTime;
uniform vec3 uShallow;
varying vec3 vWP;`).replace("#include <color_fragment>",`#include <color_fragment>
        float sparkle = smoothstep(0.92, 1.0, sin(vWP.x * 1.7 + uTime * 2.0) * sin(vWP.z * 1.9 - uTime * 1.6));
        float band = 0.5 + 0.5 * sin(vWP.x * 0.08 + vWP.z * 0.06 + uTime * 0.4);
        diffuseColor.rgb = mix(diffuseColor.rgb, uShallow, band * 0.35);
        diffuseColor.rgb += sparkle * 0.35;`)},n.customProgramCacheKey=()=>"water"+i+t,n}const bh=new Map;function Xn(i,t){let e=bh.get(i);return e||(e=t(),bh.set(i,e)),e}const Dt={rbox:(i=.08)=>Xn("rbox"+i,()=>new Mv(1,1,1,2,i)),box:()=>Xn("box",()=>new En(1,1,1)),cyl:(i=10)=>Xn("cyl"+i,()=>new zi(.5,.5,1,i)),cone:(i=8)=>Xn("cone"+i,()=>new dr(.5,1,i)),ico:(i=1)=>Xn("ico"+i,()=>new So(.5,i)),sphere:()=>Xn("sph",()=>new Hi(.5,14,10)),prism:()=>Xn("prism",()=>{const i=new Su;i.moveTo(-.5,0),i.lineTo(.5,0),i.lineTo(0,1),i.closePath();const t=new Pc(i,{depth:1,bevelEnabled:!1});return t.translate(0,0,-.5),t}),torus:()=>Xn("torus",()=>new bo(.5,.12,6,16)),disc:()=>Xn("disc",()=>new Mi(.5,20).rotateX(-Math.PI/2))};function kt(i,t,e,n,s,r=[0,0,0],o){const a=new ee(t,e);return a.position.set(...n),a.scale.set(...s),a.rotation.set(...r),a.castShadow=!0,a.receiveShadow=!0,o&&(a.name=o),i.add(a),a}const Ot=(i,t,e,n,s,r)=>kt(i,Dt.rbox(),Bt(t),e,n,s,r),Yt=(i,t,e,n,s,r)=>kt(i,Dt.box(),Bt(t),e,n,s,r),Ft=(i,t,e,n,s,r)=>kt(i,Dt.cyl(),Bt(t),e,n,s,r),On=(i,t,e,n,s,r)=>kt(i,Dt.cone(),Bt(t,{flat:!0}),e,n,s,r),Qe=(i,t,e,n,s=!1)=>kt(i,Dt.ico(1),Bt(t,{flat:!0,wind:s}),e,n),ze=(i,t,e,n)=>kt(i,Dt.sphere(),Bt(t),e,n);function Pe(i,t,e=.06){const n=new lt(i),s={h:0,s:0,l:0};n.getHSL(s),n.setHSL((s.h+(t()-.5)*e*.5+1)%1,nc.clamp(s.s+(t()-.5)*e,0,1),nc.clamp(s.l+(t()-.5)*e,0,1));const r=o=>Math.round(o*24)/24;return n.setRGB(r(n.r),r(n.g),r(n.b)),"#"+n.getHexString()}function bv(){const i=new Ee,t=new Ee;i.add(t),Ot(t,"#f2c14a",[0,.7,0],[1.7,.6,3.4]),Ot(t,"#f2c14a",[0,.95,.55],[1.6,.35,1.6]),Ot(t,"#f4f2ee",[0,1.28,-.15],[1.4,.5,1.5]),kt(t,Dt.rbox(),Bt("#2f3b48",{rough:.2}),[0,1.3,-.15],[1.42,.36,1.2]),kt(t,Dt.rbox(),Bt("#2f3b48",{rough:.2}),[0,1.3,-.15],[1.2,.36,1.52]),Ot(t,"#e3664f",[0,.72,1.71],[1.5,.2,.08]),Ot(t,"#3a3d42",[0,.45,1.7],[1.6,.18,.2]),Ot(t,"#3a3d42",[0,.45,-1.7],[1.6,.18,.2]),Yt(t,"#f4f2ee",[0,1.005,.6],[.3,.02,1.6]);for(const s of[-.55,.55])kt(t,Dt.sphere(),pr,[s,.78,-1.7],[.3,.22,.12]);const e=new Fe({color:"#c0392b",emissive:"#ff3b2f",emissiveIntensity:.4});for(const s of[-.6,.6])kt(t,Dt.box(),e,[s,.8,1.72],[.35,.14,.05]);const n=[];for(const s of[-.85,.85])for(const r of[-1.1,1.1]){const o=new Ee;o.position.set(s,.42,r),Ft(o,"#24262a",[0,0,0],[.84,.36,.84],[0,0,Math.PI/2]),Ft(o,"#d9d4c9",[s>0?.13:-.13,0,0],[.4,.12,.4],[0,0,Math.PI/2]),i.add(o),n.push(o)}return{root:i,body:t,wheels:n,brake:e}}const wh=["#6f8fa8","#e3664f","#7fae6a","#a98be8","#f4f2ee","#3f6f8f","#d0814f","#e9c95a"];function wv(i,t){const e=new Ee,n=wh[t%wh.length],s=new Fe({color:"#f2a33a",emissive:"#ffae2a",emissiveIntensity:0});let r;i===0?(Ot(e,n,[0,.7,0],[1.7,.75,3.4]),Ot(e,"#f4f2ee",[0,1.3,.2],[1.5,.6,2]),kt(e,Dt.rbox(),Bt("#2f3b48",{rough:.2}),[0,1.33,.2],[1.52,.4,1.7]),r=[.85,1.7]):i===1?(Ot(e,n,[0,.8,0],[1.9,.8,4.2]),Ot(e,n,[0,1.45,-.6],[1.8,.7,1.5]),kt(e,Dt.rbox(),Bt("#2f3b48",{rough:.2}),[0,1.5,-.6],[1.82,.4,1.3]),Ot(e,"#b48a5e",[0,1.35,1.2],[1.4,.4,1.2]),r=[.95,2.1]):(Ot(e,"#f4f2ee",[0,1.6,.7],[2.2,2.2,4.2]),Ot(e,n,[0,1.1,-2],[2.1,1.4,1.5]),kt(e,Dt.rbox(),Bt("#2f3b48",{rough:.2}),[0,1.45,-2.4],[1.9,.6,.8]),Yt(e,n,[0,1.7,2.81],[2,1.5,.02]),r=[1.1,2.8]);const o=r[1]*.65;for(const c of[-1,1])for(const l of[-o,o])Ft(e,"#24262a",[c*(r[0]-.05),.4,l],[.8,.3,.8],[0,0,Math.PI/2]);const a=[];for(const c of[-1,1]){const l=kt(e,Dt.box(),s,[c*(r[0]-.15),.85,r[1]+.02],[.3,.16,.05]);l.userData.side=c,a.push(l)}for(const c of[-1,1])kt(e,Dt.box(),Bt("#c0392b"),[c*(r[0]-.5),.85,r[1]+.02],[.3,.16,.05]);return{g:e,half:r,blinkers:a}}function Ev(){const i=new Ee,t=new Fe({color:"#f6c945",emissive:"#c98a1a",emissiveIntensity:.55,metalness:.6,roughness:.3}),e=new ee(new zi(.55,.55,.14,18),t);e.rotation.x=Math.PI/2,e.castShadow=!0,i.add(e);const n=new ee(new zi(.32,.32,.16,6),Bt("#ffe58a",{emissive:"#e9b13a",ei:.6}));return n.rotation.x=Math.PI/2,i.add(n),i}function Tv(i){const t=new Ee;for(const n of[-1.75,1.75])Ft(t,"#f4f2ee",[n,1.6,0],[.3,3.2,.3]),Ft(t,i,[n,.15,0],[.6,.3,.6]);const e=new ee(new bo(1.75,.18,8,24,Math.PI),Bt(i,{emissive:i,ei:.5}));e.position.y=3.2,t.add(e);for(let n=0;n<5;n++){const s=n/4*Math.PI;ze(t,"#fff6d0",[Math.cos(s)*1.75,3.2+Math.sin(s)*1.75,.15],[.22,.22,.22]).material=pr}return t}function Av(){const i=new Ee,t=kt(i,Dt.cone(10),Bt("#f2793a"),[0,.45,0],[.6,.9,.6]);return t.material=Bt("#f2793a"),Ft(i,"#f4f2ee",[0,.45,0],[.42,.14,.42]),Yt(i,"#f2793a",[0,.04,0],[.75,.08,.75]),i}function Rv(){const i=new Ee;for(const t of[-1.2,1.2])Yt(i,"#f4f2ee",[t,.5,0],[.12,1,.12]);for(let t=0;t<4;t++)Yt(i,t%2?"#f4f2ee":"#e3664f",[-.9+t*.6,.85,0],[.6,.35,.1]);return i}function Cv(){const i=new Ee;return Ft(i,"#e0c068",[0,.65,0],[1.3,1.6,1.3],[0,0,Math.PI/2]),Ft(i,"#c9a24f",[.81,.65,0],[1.1,.04,1.1],[0,0,Math.PI/2]),Ft(i,"#c9a24f",[-.81,.65,0],[1.1,.04,1.1],[0,0,Math.PI/2]),i}function Pv(i,t){const e=new Ee;for(const a of[-1.4,1.4])Yt(e,"#7a5a3d",[a,1.4,0],[.18,2.8,.18]);const n=document.createElement("canvas");n.width=256,n.height=128;const s=n.getContext("2d");s.fillStyle=t,s.fillRect(0,0,256,128),s.fillStyle="#fbf6ec",s.font="bold 34px Georgia, serif",s.textAlign="center",s.fillText(i.split("|")[0],128,56),s.font="22px Georgia, serif",s.fillText(i.split("|")[1]??"",128,94);const r=new rr(n);r.colorSpace=We;const o=new ee(new En(3.4,1.7,.12),[Bt("#7a5a3d"),Bt("#7a5a3d"),Bt("#7a5a3d"),Bt("#7a5a3d"),new Fe({map:r}),Bt("#7a5a3d")]);return o.position.y=2.4,o.castShadow=!0,e.add(o),e}const Ut=()=>new Ee;function as(i){return({colors:t})=>{const e=Ut(),{w:n,d:s,h:r}=i,o=t.walls,a=t.roof,c=t.trim,l=t.door;Ot(e,"#8d8478",[0,.15,0],[n+.3,.3,s+.3]);const h=kt(e,Dt.rbox(.05),Bt(o),[0,.3+r/2,0],[n,r,s],void 0,"walls");if(h.userData.slot="walls",i.logs)for(let m=0;m<6;m++){const _=.45+m*r/6;Ft(e,Pe(o,le(m),.05),[0,_,s/2+.02],[.22,n+.1,.22],[0,0,Math.PI/2]),Ft(e,Pe(o,le(m+9),.05),[0,_,-s/2-.02],[.22,n+.1,.22],[0,0,Math.PI/2])}i.stoneBase&&Yt(e,"#9a948a",[0,.65,0],[n+.12,.7,s+.12]);for(const m of[-1,1])for(const _ of[-1,1])Yt(e,c,[m*n/2,.3+r/2,_*s/2],[.14,r,.14],void 0,"trim");i.floors>1&&Yt(e,c,[0,.3+r/2,0],[n+.06,.12,s+.06]);const u=i.floors;for(let m=0;m<u;m++){const _=.3+r/u*(m+.55);for(const g of[-.3,.3]){if(m===0&&Math.abs(g)<.1)continue;const p=g*n;kt(e,Dt.box(),Oi,[p,_,s/2+.03],[.55,.6,.06]),Yt(e,c,[p,_-.34,s/2+.06],[.7,.08,.12]),kt(e,Dt.box(),Oi,[p,_,-s/2-.03],[.55,.6,.06])}kt(e,Dt.box(),Oi,[n/2+.03,_,0],[.06,.6,.55]),kt(e,Dt.box(),Oi,[-n/2-.03,_,0],[.06,.6,.55])}const d=Yt(e,l,[0,.3+.55,s/2+.04],[.6,1.1,.08],void 0,"door");d.userData.slot="door",ze(e,"#d9b55a",[.18,.85,s/2+.1],[.07,.07,.07]);const f=.3+r;if(i.roof==="gable"||i.roof==="steep"){const m=i.roof==="steep"?n*.75:n*.45;kt(e,Dt.prism(),Bt(a,{flat:!0}),[0,f,0],[n+.5,m,s+.5],void 0,"roof"),kt(e,Dt.prism(),Bt(o),[0,f,0],[n,m*.96,s+.02])}else i.roof==="hip"?kt(e,Dt.cone(4),Bt(a,{flat:!0}),[0,f+n*.25,0],[n*1.5,n*.5,s*1.5],[0,Math.PI/4,0],"roof"):(Ot(e,a,[0,f+.1,0],[n+.4,.2,s+.4],void 0,"roof"),Yt(e,c,[0,f+.25,0],[n+.45,.08,s+.45]));if(i.chimney&&(Yt(e,"#9b6b55",[n*.28,f+n*.35,-s*.2],[.45,n*.7,.45]),e.userData.chimney=new A(n*.28,f+n*.72,-s*.2)),i.porch){Ot(e,"#a07a55",[0,.25,s/2+.7],[n*.7,.14,1.2]);for(const m of[-1,1])Ft(e,c,[m*n*.32,.95,s/2+1.2],[.12,1.3,.12]);Ot(e,a,[0,1.65,s/2+.75],[n*.75,.12,1.4],[.18,0,0])}if(i.deck){Ot(e,"#b48a5e",[0,.25,s/2+1.1],[n+.6,.12,2]);for(let m=-2;m<=2;m++)Ft(e,"#e9e2d6",[m*(n/4),.6,s/2+2.05],[.06,.6,.06]);Yt(e,"#e9e2d6",[0,.9,s/2+2.05],[n+.6,.06,.08])}return e}}const Lv=({colors:i})=>{const t=Ut();return Ot(t,i.walls,[0,1.5,0],[4.2,3,5.5],void 0,"walls"),kt(t,Dt.prism(),Bt(i.roof,{flat:!0}),[0,3,0],[4.8,2.2,6]),kt(t,Dt.prism(),Bt(i.walls),[0,3,0],[4.2,2.1,5.52]),Yt(t,i.trim,[0,1.2,2.78],[2,2.4,.06]),Yt(t,i.trim,[0,1.2,2.82],[2.6,.14,.06],[0,0,.83]),Yt(t,i.trim,[0,1.2,2.82],[2.6,.14,.06],[0,0,-.83]),kt(t,Dt.box(),Oi,[0,3.7,2.79],[.8,.6,.06]),t},Iv=({colors:i})=>{const t=Ut();Ft(t,i.walls,[0,2.6,0],[2,5.2,2],void 0);for(let e=1;e<5;e++)Ft(t,i.trim,[0,e*1.05,0],[2.04,.08,2.04]);return kt(t,Dt.sphere(),Bt(i.roof),[0,5.2,0],[2.05,1.6,2.05]),t},Dv=({colors:i})=>{const t=Ut();kt(t,Dt.cyl(8),Bt(i.walls,{flat:!0}),[0,2.4,0],[1.6,4.8,1.6]).scale.set(1.6,4.8,1.6),t.children[0].geometry=new zi(.32,.5,1,8),On(t,i.roof,[0,5.2,0],[1.9,1.1,1.9]);const e=Ut();e.position.set(0,4.4,.95),e.name="spin";for(let n=0;n<4;n++){const s=Ut();s.rotation.z=n*Math.PI/2,Yt(s,i.trim,[0,1.3,0],[.12,2.6,.06]),Yt(s,"#f2ead8",[.28,1.5,0],[.5,2,.03]),e.add(s)}return ze(e,"#5a4636",[0,0,0],[.35,.35,.35]),t.add(e),Yt(t,i.door,[0,.6,.79],[.5,1,.06]),t.userData.spin="z",t},Uv=({colors:i})=>{const t=Ut(),e=kt(t,Dt.cyl(12),Bt("#a9a196",{flat:!0}),[0,.45,0],[1.4,.9,1.4]);e.geometry=Dt.cyl(12),kt(t,Dt.disc(),Iu(),[0,.86,0],[1.1,1,1.1]);for(const n of[-1,1])Yt(t,"#7a5a3d",[n*.6,1.3,0],[.12,1.6,.12]);return kt(t,Dt.prism(),Bt(i.roof,{flat:!0}),[0,2.05,0],[1.6,.6,1.2],[0,Math.PI/2,0]),Ft(t,"#7a5a3d",[0,1.6,0],[.12,1.2,.12],[0,0,Math.PI/2]),t};let Nv=null;function Iu(){return Nv??(Nv=new Fe({color:"#4f9fbf",roughness:.1,metalness:.1}))}const Ov=()=>{const i=Ut(),t=new Fe({color:"#cfeff0",roughness:.1,transparent:!0,opacity:.45});Ot(i,"#a7a29a",[0,.1,0],[3.2,.2,4.4]),kt(i,Dt.box(),t,[0,.9,0],[3,1.5,4.2]),kt(i,Dt.prism(),t,[0,1.65,0],[3.1,1,4.2]);for(let e=-2;e<=2;e++)Yt(i,"#f2f2ee",[0,1.4,e*1.03],[3.05,.06,.06]);for(let e=0;e<6;e++)Qe(i,["#5fa05a","#e3664f","#e9c95a"][e%3],[-.8+e%2*1.6,.5,-1.5+Math.floor(e/2)*1.5],[.6,.5,.6]);return i},Fv=({seed:i})=>{const t=Ut(),e=le(i);return kt(t,Dt.cyl(14),Bt(Pe("#e0c068",e)),[0,.6,0],[1.2,1.2,1.2],[0,0,Math.PI/2]).scale.set(1.2,1.1,1.2),Ft(t,"#c9a24f",[.56,.6,0],[1,.04,1],[0,0,Math.PI/2]),t},kv=({colors:i})=>{const t=Ut();Ot(t,i.walls,[0,.9,.3],[1.1,.8,1.8]),Ot(t,i.walls,[0,1.55,-.4],[1.1,1,.9]),kt(t,Dt.box(),Oi,[0,1.65,-.4],[1.12,.55,.7]),Ot(t,i.roof,[0,2.1,-.4],[1.3,.1,1.1]),Ft(t,"#444",[.35,1.6,.8],[.12,.8,.12]);for(const e of[-1,1])Ft(t,"#2c2c2c",[e*.7,.7,-.5],[1.4,.45,1.4],[0,0,Math.PI/2]),Ft(t,i.trim,[e*.72,.7,-.5],[.6,.47,.6],[0,0,Math.PI/2]),Ft(t,"#2c2c2c",[e*.6,.4,1],[.8,.3,.8],[0,0,Math.PI/2]);return t},Bv=({seed:i})=>{const t=Ut(),e=le(i),n=2+Math.floor(e()*3);for(let s=0;s<n;s++){const r=.6+e()*.2,o=s<3?r/2:r*1.5;Ot(t,Pe("#b48a5e",e,.08),[s%3*.7-.6+(s>=3?.35:0),o,(e()-.5)*.2],[r,r,r],[0,e()*.4,0])}for(let s=0;s<4;s++)ze(t,["#e3664f","#e9c95a","#7cbf5a"][s%3],[-.6+s%2*.15,.68,-.05+(s>1?.15:0)],[.16,.16,.16]);return t};function Ci(i){return({seed:t})=>{const e=Ut(),n=le(t);Ot(e,"#7a5a3d",[0,.08,0],[3,.16,3],void 0);for(let s=0;s<3;s++)Yt(e,"#5e432d",[0,.17,-1+s],[2.8,.06,.35]);for(let s=0;s<3;s++)for(let r=0;r<4;r++){const o=-1.05+r*.7+(n()-.5)*.1,a=-1+s,c=.85+n()*.3;switch(i){case"wheat":for(let l=0;l<3;l++){const h=Ft(e,Pe("#e2c36a",n),[o+(l-1)*.15,.55*c,a],[.05,.9*c,.05]);h.material=Bt(Pe("#e2c36a",n),{wind:!0}),Qe(e,"#d8b24f",[o+(l-1)*.15,1.05*c,a],[.1,.28,.1],!0)}break;case"corn":Ft(e,"#6fa24a",[o,.9*c,a],[.08,1.7*c,.08]).material=Bt("#6fa24a",{wind:!0}),Qe(e,"#7fb555",[o,1.2*c,a],[.5,.9,.25],!0),Qe(e,"#efc845",[o+.1,1*c,a+.08],[.14,.35,.14]);break;case"tomato":Qe(e,"#4f8f45",[o,.5*c,a],[.45,.7,.45],!0),ze(e,"#e0473a",[o+.12,.45,a+.15],[.14,.14,.14]),ze(e,"#e0473a",[o-.1,.62,a+.12],[.12,.12,.12]);break;case"pumpkin":if(r%2===0){const l=ze(e,Pe("#e9873a",n),[o+.3,.38,a],[.55*c,.4*c,.55*c]);l.geometry=Dt.ico(2),Ft(e,"#5e7a3a",[o+.3,.62,a],[.05,.15,.05])}Qe(e,"#5f9a4a",[o-.1,.25,a],[.4,.2,.4],!0);break;case"sunflower":Ft(e,"#5f9a4a",[o,.8*c,a],[.06,1.6*c,.06]),Ft(e,"#f2c230",[o,1.6*c,a+.05],[.42,.06,.42],[Math.PI/2.4,0,0]),Ft(e,"#6a4325",[o,1.6*c,a+.08],[.2,.07,.2],[Math.PI/2.4,0,0]);break;case"carrot":Qe(e,"#6fbf4a",[o,.32,a],[.18,.3,.18],!0),On(e,"#ea8a2f",[o,.2,a],[.12,.12,.12],[Math.PI,0,0]);break;default:Qe(e,["#6fbf4a","#4f9a45","#88c45a"][(s+r)%3],[o,.3,a],[.4*c,.3*c,.4*c],!0)}}return e}}function Kn(i,t="#5f9a45",e="#7a5a3d"){const n=Ut(),s=2+i()*.8;Ft(n,e,[0,s/2,0],[.35,s,.35]);const r=4+Math.floor(i()*3);for(let o=0;o<r;o++){const a=o/r*Math.PI*2+i(),c=o===0?0:.7+i()*.4,l=1.4+i()*.7;Qe(n,Pe(t,i,.08),[Math.cos(a)*c,s+.4+i()*.8,Math.sin(a)*c],[l,l*.9,l],!0)}return n}function Di(i,t="#3f6f4f"){const e=Ut(),n=1+i()*.6;Ft(e,"#6a4a33",[0,.5,0],[.3,1,.3]);const s=3+Math.floor(i()*2);for(let r=0;r<s;r++){const o=(1-r/(s+1))*2.4,a=On(e,Pe(t,i,.06),[0,n+r*.9+.6,0],[o,1.6,o],[0,i()*3,0]);a.material=Bt(Pe(t,i,.06),{flat:!0,wind:!0})}return e}function Du(i){const t=Ut(),e=7,n=.25+i()*.35;let s=0,r=0;for(let a=0;a<e;a++)s+=n*.12*a*.3,r+=.6,Ft(t,a%2?"#a07a52":"#8f6b47",[s,r,0],[.32-a*.015,.62,.32-a*.015],[0,0,-n*.15*a*.3]);const o=new A(s,r+.3,0);for(let a=0;a<7;a++){const c=Ut();c.position.copy(o),c.rotation.y=a/7*Math.PI*2+i()*.3;const l=kt(c,Dt.box(),Bt(Pe("#4f9a4a",i),{flat:!0,wind:!0}),[1.1,-.25,0],[2.4,.06,.55],[0,0,-.35]);l.castShadow=!0,t.add(c)}return ze(t,"#6b4a2a",[o.x+.15,o.y-.2,.1],[.25,.25,.25]),t}const zv=({seed:i})=>{const t=le(i),e=Kn(t,"#6aa64a");for(let n=0;n<8;n++){const s=t()*Math.PI*2;ze(e,["#e0473a","#f0a03a"][n%2],[Math.cos(s)*1.1,2.6+t()*1.2,Math.sin(s)*1.1],[.2,.2,.2])}return e},Vv=({seed:i})=>Kn(le(i),"#f2a7bf","#6a4a3a"),Hv=({seed:i})=>{const t=Ut(),e=le(i);for(let n=0;n<3;n++)Qe(t,Pe("#5c9a4a",e,.1),[(e()-.5)*.8,.45,(e()-.5)*.8],[1+e()*.4,.9,1+e()*.4],!0);return t},Gv=({colors:i})=>{const t=Ut();return Ot(t,i.main,[0,.55,0],[3,1.1,.8]),t},Wv=({seed:i})=>{const t=Ut(),e=le(i),n=["#f2d14a","#f08aa8","#ffffff","#a98be8","#f2793a"];for(let s=0;s<16;s++){const r=(e()-.5)*2.6,o=(e()-.5)*2.6;Ft(t,"#5f9a45",[r,.2,o],[.03,.4,.03]),Qe(t,n[Math.floor(e()*n.length)],[r,.42,o],[.18,.12,.18],!0)}return t},Xv=({seed:i})=>{const t=Ut(),e=le(i);for(let n=0;n<7;n++){const s=On(t,Pe("#6fae4a",e,.1),[(e()-.5)*1.2,.3,(e()-.5)*1.2],[.15,.6+e()*.3,.15],[(e()-.5)*.3,0,(e()-.5)*.3]);s.material=Bt(Pe("#6fae4a",e,.1),{flat:!0,wind:!0})}return t};function mo(i,t="#9a958c"){const e=Ut(),n=1+Math.floor(i()*3);for(let s=0;s<n;s++){const r=.8+i()*.9,o=kt(e,Dt.ico(0),Bt(Pe(t,i),{flat:!0}),[(i()-.5)*1.2,r*.3,(i()-.5)*1.2],[r*1.3,r*.9,r],[i(),i(),i()]);o.castShadow=!0}return e}const Yv=({seed:i})=>{const t=Ut(),e=le(i);return Ft(t,"#7a5a3d",[0,.3,0],[.6,2.4,.6],[0,0,Math.PI/2]),Ft(t,"#c9a57a",[1.21,.3,0],[.5,.02,.5],[0,0,Math.PI/2]),Qe(t,"#6fae4a",[.3,.6,.1],[.3,.12,.3]),e()>.5&&ze(t,"#e8d6b8",[-.6,.65,.1],[.18,.1,.18]),t},qv=({colors:i,seed:t})=>{const e=Ut(),n=le(t);Ot(e,"#a59e93",[0,.18,0],[2.4,.36,1.2]),Ot(e,"#6a4a33",[0,.32,0],[2.2,.1,1]);for(let s=0;s<10;s++)Qe(e,s%3===0?"#5f9a45":Pe(i.main,n,.1),[(n()-.5)*2,.5,(n()-.5)*.8],[.3,.25,.3],!0);return e};function Ao(i,t,e,n,s,r=.16){const o=[];for(const a of[-1,1])for(const c of[-1,1]){const l=Ut();l.position.set(a*e,s,c*n),Ft(l,t,[0,-s/2,0],[r,s,r]),i.add(l),o.push(l)}i.userData.legs=o}const jv=({colors:i})=>{const t=Ut();Ao(t,"#f2eee6",.35,.6,.7),Ot(t,i.main,[0,1.05,0],[1,.75,1.7],void 0),Ot(t,"#2f2a28",[.2,1.2,.2],[.7,.5,.6]);const e=Ut();e.position.set(0,1.25,.95),Ot(e,i.main,[0,0,.2],[.55,.55,.6]),Ot(e,"#f0b4a8",[0,-.12,.52],[.45,.28,.12]);for(const n of[-1,1])On(e,"#efe6d2",[n*.2,.32,.1],[.08,.2,.08]),ze(e,"#1d1d1d",[n*.2,.08,.5],[.07,.07,.07]);return t.add(e),t.userData.head=e,t},Zv=({seed:i})=>{const t=Ut(),e=le(i);Ao(t,"#2f2a28",.25,.35,.45,.12);for(let s=0;s<6;s++)Qe(t,"#f4f1ea",[(e()-.5)*.4,.75+e()*.2,(e()-.5)*.7],[.6,.55,.6]);const n=Ut();return n.position.set(0,.85,.55),Ot(n,"#2f2a28",[0,0,.1],[.32,.35,.4]),t.add(n),t.userData.head=n,t},Kv=({colors:i})=>{const t=Ut();Ao(t,i.main,.25,.65,1,.15),Ot(t,i.main,[0,1.35,0],[.75,.7,1.8]);const e=Ut();return e.position.set(0,1.6,.9),Ot(e,i.main,[0,.35,.05],[.4,.9,.4],[.5,0,0]),Ot(e,i.main,[0,.75,.35],[.36,.36,.7],[.2,0,0]),Yt(e,"#3a2a20",[0,.55,-.15],[.12,.8,.3],[.5,0,0]),t.add(e),t.userData.head=e,Yt(t,"#3a2a20",[0,1.2,-.95],[.14,.8,.14],[.4,0,0]),t},$v=({colors:i})=>{const t=Ut();ze(t,i.main,[0,.35,0],[.45,.42,.55]);const e=Ut();e.position.set(0,.55,.22),ze(e,i.main,[0,.08,0],[.26,.28,.26]),On(e,"#f2a33a",[0,.06,.15],[.08,.14,.08],[Math.PI/2,0,0]),Yt(e,"#e0473a",[0,.25,0],[.05,.12,.14]),t.add(e),t.userData.head=e;for(const n of[-1,1])Ft(t,"#f2a33a",[n*.08,.1,0],[.04,.2,.04]);return t},Jv=({colors:i})=>{const t=Ut();ze(t,i.main,[0,.25,0],[.45,.32,.6]);const e=Ut();return e.position.set(0,.48,.22),ze(e,"#3f8a55",[0,0,0],[.24,.24,.24]),Yt(e,"#f2a33a",[0,-.03,.15],[.12,.05,.14]),t.add(e),t.userData.head=e,t},Qv=({colors:i})=>{const t=Ut();Ao(t,i.main,.16,.28,.35,.1),Ot(t,i.main,[0,.5,0],[.4,.38,.85]);const e=Ut();e.position.set(0,.75,.45),Ot(e,i.main,[0,0,.05],[.36,.34,.36]),Ot(e,"#3a2a20",[0,-.04,.27],[.18,.14,.18]);for(const s of[-1,1])Ot(e,"#5a3a28",[s*.17,.08,0],[.08,.25,.16]);t.add(e),t.userData.head=e;const n=Ft(t,i.main,[0,.65,-.45],[.06,.35,.06],[-.7,0,0]);return t.userData.tail=n,t},tx=()=>{const i=Ut(),t=le(3),e=new ee(new Mi(2.4,24),Oc("#7fd0d6","#3f8faa",.92));e.rotation.x=-Math.PI/2,e.position.y=.12,e.receiveShadow=!0,i.add(e);for(let n=0;n<14;n++){const s=n/14*Math.PI*2,r=.4+t()*.3;kt(i,Dt.ico(0),Bt(Pe("#a59e93",t),{flat:!0}),[Math.cos(s)*2.5,.1,Math.sin(s)*2.5],[r*1.3,r*.7,r],[t(),t(),t()])}for(let n=0;n<3;n++)Ft(i,"#5f9a45",[-.8+n*.7,.14,.5-n*.5],[.5,.03,.5]);return i.userData.water=2.2,i},ex=({colors:i})=>{const t=Ut();Ft(t,i.main,[0,.3,0],[2.6,.6,2.6]);const e=new ee(new Mi(1.15,20),Oc("#9fe0e6","#4f9fbf"));e.rotation.x=-Math.PI/2,e.position.y=.58,t.add(e),Ft(t,i.main,[0,.9,0],[.35,1.3,.35]),Ft(t,i.main,[0,1.55,0],[1.1,.15,1.1]);const n=kt(t,Dt.cone(10),new Fe({color:"#dff6ff",transparent:!0,opacity:.6}),[0,1.95,0],[.5,.7,.5]);return n.name="spray",t.userData.water=1.2,t},nx=({colors:i})=>{const t=Ut();for(let e=0;e<8;e++)Ot(t,Pe(i.main,le(e),.05),[0,.5,e*.62-2.2],[1.8,.12,.55]);for(let e=0;e<4;e++)for(const n of[-1,1])Ft(t,"#6a4a33",[n*.85,.1,e*1.5-2.2],[.18,1.6,.18]);return t},ix=({colors:i})=>{const t=Ut(),e=kt(t,Dt.sphere(),Bt(i.main),[0,.3,0],[1.3,.7,3]);return e.geometry=new Hi(.5,14,8,0,Math.PI*2,Math.PI/2,Math.PI/2),e.rotation.x=Math.PI,e.position.y=.55,Ot(t,"#b48a5e",[0,.45,0],[1,.08,.4]),Ot(t,"#b48a5e",[0,.45,.8],[.8,.08,.3]),t.userData.bob=!0,t},sx=({colors:i})=>{const t=Ut();Ft(t,i.main,[0,.4,0],[.25,.8,.25]),Ft(t,i.main,[0,.85,0],[.9,.15,.9]);const e=new ee(new Mi(.38,14),Iu());return e.rotation.x=-Math.PI/2,e.position.y=.94,t.add(e),t};function fa(i,t){return({seed:e,colors:n})=>{const s=Ut(),r=le(e),o=n.main??i;if(t)for(let a=0;a<5;a++){const c=kt(s,Dt.cyl(7),Bt(Pe(o,r,.08),{flat:!0}),[(r()-.5)*1.1,.04,(a-2)*.42],[.6+r()*.3,.08,.5+r()*.2],[0,r()*3,0]);c.castShadow=!1}else{const a=Ot(s,o,[0,.03,0],[1.6,.06,2]);if(a.castShadow=!1,i==="#b48a5e")for(let c=0;c<5;c++)Yt(s,"#8f6b47",[0,.07,-.8+c*.4],[1.6,.02,.03])}return s}}function Zr(i){return({colors:t})=>{const e=Ut(),n=t.main;if(i==="stone"){const s=le(7);for(let r=0;r<9;r++)kt(e,Dt.ico(0),Bt(Pe(n,s),{flat:!0}),[-1.3+r%5*.65,r<5?.25:.6,0],[.7,.45,.5],[s(),s(),s()]);return e}for(const s of[-1.4,0,1.4])Yt(e,n,[s,.6,0],[.16,1.2,.16]);if(i==="picket"){for(let s=0;s<11;s++)Yt(e,n,[-1.3+s*.26,.5,.06],[.14,.9,.05]),On(e,n,[-1.3+s*.26,1,.06],[.14,.14,.05]).geometry=Dt.cone(4);Yt(e,n,[0,.7,.03],[2.9,.08,.05])}else if(i==="gate"){for(const s of[.35,.9])Yt(e,n,[0,s,0],[2.6,.12,.07]);Yt(e,n,[0,.62,0],[2.6,.1,.07],[0,0,.2]),Ft(e,"#3a3a3a",[.6,.62,.08],[.1,.1,.1])}else for(const s of[.4,.9])Yt(e,n,[0,s,0],[2.9,.12,.08]);return e}}const rx=({colors:i})=>{const t=Ut();for(let e=0;e<3;e++)Ot(t,i.main,[0,.5,-.2+e*.2],[1.8,.07,.17]);Ot(t,i.main,[0,.95,-.35],[1.8,.3,.07],[-.15,0,0]);for(const e of[-1,1])Yt(t,"#3a3a3a",[e*.75,.3,0],[.08,.55,.55]);return t},ox=({colors:i})=>{const t=Ut();Ot(t,i.main,[0,.8,0],[1.4,.08,2.2]);for(const e of[-1,1])Ot(t,i.main,[e*.95,.45,0],[.35,.07,2.2]),Yt(t,"#8f6b47",[e*.45,.4,.8],[.08,.8,.08],[0,0,e*.4]),Yt(t,"#8f6b47",[e*.45,.4,-.8],[.08,.8,.08],[0,0,e*.4]);return Yt(t,"#e3664f",[0,.85,0],[1,.01,1]),t},ax=({colors:i})=>{const t=Ut();return Yt(t,"#7a5a3d",[0,.5,0],[.1,1,.1]),Ot(t,i.main,[0,1.1,0],[.35,.32,.6]),Yt(t,"#e0473a",[.2,1.25,-.1],[.03,.25,.08]),t},cx=({colors:i})=>{const t=Ut();return Yt(t,"#7a5a3d",[0,.9,0],[.1,1.8,.1]),Ot(t,i.main,[0,2,0],[.45,.5,.45]),kt(t,Dt.prism(),Bt("#7a5a3d",{flat:!0}),[0,2.25,0],[.6,.3,.55]),ze(t,"#2a2a2a",[0,2.05,.23],[.12,.12,.04]),t},lx=({colors:i})=>{const t=Ut();return Yt(t,"#7a5a3d",[0,1,0],[.1,2,.1]),Yt(t,"#7a5a3d",[0,1.5,0],[1.6,.08,.08]),Ot(t,i.main,[0,1.35,0],[.6,.75,.3]),ze(t,"#e9cf8a",[0,1.95,0],[.38,.38,.38]),Ft(t,"#8a6a3a",[0,2.15,0],[.7,.05,.7]),On(t,"#8a6a3a",[0,2.3,0],[.4,.3,.4]),t},hx=({colors:i})=>{const t=Ut();Ft(t,"#f2eee6",[0,1.1,0],[.06,2.2,.06]);const e=On(t,i.main,[0,2.2,0],[2.4,.5,2.4]);return e.geometry=Dt.cone(8),Ot(t,"#f2eee6",[.9,.2,.4],[.7,.12,1.6],[0,.3,0]),t},ux=({colors:i})=>{const t=Ut();return Ft(t,i.main,[0,1.2,0],[.1,2.4,.1]),Ft(t,i.main,[0,.08,0],[.4,.16,.4]),kt(t,Dt.ico(1),pr,[0,2.5,0],[.32,.38,.32]),On(t,i.main,[0,2.78,0],[.45,.2,.45]),t.userData.light=new A(0,2.5,0),t},dx=({colors:i})=>{const t=Ut();return Yt(t,i.main,[0,.75,0],[.08,1.5,.08]),Yt(t,i.main,[.25,1.48,0],[.5,.05,.05]),kt(t,Dt.box(),pr,[.45,1.25,0],[.18,.26,.18]),t.userData.light=new A(.45,1.25,0),t},fx=()=>{const i=Ut();Ft(i,"#6a4a33",[0,.7,0],[.08,1.4,.08]),Ft(i,"#3a3a3a",[0,1.45,0],[.2,.15,.2]);const t=kt(i,Dt.cone(6),Nc,[0,1.65,0],[.18,.35,.18]);return t.name="flame",i.userData.light=new A(0,1.6,0),i},px=()=>{const i=Ut(),t=le(5);for(let n=0;n<10;n++){const s=n/10*Math.PI*2;kt(i,Dt.ico(0),Bt(Pe("#8f8a80",t),{flat:!0}),[Math.cos(s)*.75,.15,Math.sin(s)*.75],[.35,.3,.35],[t(),t(),t()])}for(let n=0;n<3;n++)Ft(i,"#6a4a33",[0,.18,0],[.12,.9,.12],[Math.PI/2,n*Math.PI/3,.3]);const e=kt(i,Dt.cone(6),Nc,[0,.45,0],[.45,.6,.45]);return e.name="flame",i.userData.light=new A(0,.6,0),i.userData.smoke=new A(0,1,0),i},mx={house_country:as({w:3.6,d:3.2,h:2.6,roof:"gable",floors:2,chimney:!0,porch:!0}),house_modern:as({w:4.4,d:3.2,h:2.6,roof:"flat",floors:2,chimney:!1,porch:!1,deck:!0}),house_stone:as({w:3.2,d:2.8,h:1.8,roof:"steep",floors:1,chimney:!0,porch:!1,stoneBase:!0}),house_cabin:as({w:3.4,d:3,h:1.9,roof:"gable",floors:1,chimney:!0,porch:!0,logs:!0}),house_lake:as({w:4,d:3.4,h:2.8,roof:"steep",floors:2,chimney:!0,porch:!1,deck:!0}),house_villa:as({w:4.8,d:3.6,h:2.2,roof:"hip",floors:1,chimney:!1,porch:!1,deck:!0}),barn:Lv,silo:Iv,windmill:Dv,well:Uv,greenhouse:Ov,haybale:Fv,tractor:kv,crates:Bv,plot_veg:Ci("veg"),crop_wheat:Ci("wheat"),crop_corn:Ci("corn"),crop_tomato:Ci("tomato"),crop_pumpkin:Ci("pumpkin"),crop_sunflower:Ci("sunflower"),crop_carrot:Ci("carrot"),tree_oak:({seed:i})=>Kn(le(i)),tree_pine:({seed:i})=>Di(le(i)),tree_palm:({seed:i})=>Du(le(i)),tree_fruit:zv,tree_blossom:Vv,bush:Hv,hedge:Gv,wildflowers:Wv,grass_tuft:Xv,rock:({seed:i})=>mo(le(i)),log:Yv,flowerbed:qv,cow:jv,chicken:$v,sheep:Zv,horse:Kv,duck:Jv,dog:Qv,pond:tx,fountain:ex,dock:nx,boat:ix,birdbath:sx,path_stone:fa("#b5aea2",!0),path_dirt:fa("#b39472",!1),path_plank:fa("#b48a5e",!1),fence_wood:Zr("wood"),fence_picket:Zr("picket"),fence_stone:Zr("stone"),gate:Zr("gate"),bench:rx,picnic:ox,mailbox:ax,birdhouse:cx,scarecrow:lx,parasol:hx,lamp:ux,lantern:dx,torch:fx,firepit:px};function go(i,t,e=!0){const n=new Ee;i.updateMatrixWorld(!0);const s=[];i.traverse(o=>{o.isMesh&&s.push(o)});const r=new Wt;for(const o of s){const a=new Ec(o.geometry,o.material,t.length);for(let c=0;c<t.length;c++)r.multiplyMatrices(t[c],o.matrixWorld),a.setMatrixAt(c,r);a.castShadow=e,a.receiveShadow=!0,a.instanceMatrix.needsUpdate=!0,a.computeBoundingSphere(),n.add(a)}return n}function Uu(i,t,e,n,s){return new Wt().compose(new A(i,t,e),new bn().setFromEuler(new wn(0,n,0)),new A(s,s,s))}let Kr=null;function Fc(){if(Kr)return Kr;const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.35,"rgba(255,255,255,0.7)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Kr=new rr(i),Kr}const hi=[-4.8,-1.6,1.6,4.8],$r=6.4,Gs=[.8,1.7],An=-230,Ws=25,cs={distancePerUnit:1.25,token:25,nearMiss:50,gate:100,perfectGate:150,maxCombo:5};class gx{constructor(t){V(this,"scene",new du);V(this,"camera",new Ze(55,1,.5,900));V(this,"hooks");V(this,"car",bv());V(this,"entities",[]);V(this,"pools",{});V(this,"roadTex");V(this,"grassTex");V(this,"scenery",[]);V(this,"sun");V(this,"dust");V(this,"dustData",[]);V(this,"sparks");V(this,"sparkData",[]);V(this,"speedLines");V(this,"rnd",le(Date.now()&65535));V(this,"running",!1);V(this,"paused",!1);V(this,"crashed",!1);V(this,"crashTimer",0);V(this,"time",0);V(this,"speed",24);V(this,"carX",0);V(this,"carVX",0);V(this,"steer",0);V(this,"keys",{left:!1,right:!1,boost:!1});V(this,"touchSteer",0);V(this,"boostMeter",1);V(this,"boosting",!1);V(this,"distance",0);V(this,"points",0);V(this,"combo",1);V(this,"comboMeter",0);V(this,"stats",{tokens:0,near:0,gates:0,perfect:0,bestCombo:1});V(this,"nextRowZ",-60);V(this,"nextGateDist",260);V(this,"nextSignDist",120);V(this,"shake",0);V(this,"timeScale",1);V(this,"camPos",new A(0,9,13));V(this,"camLook",new A(0,0,-10));V(this,"crashSpin",new A);V(this,"crashVel",new A);V(this,"reducedMotion",!1);V(this,"ending",!1);V(this,"onKey",(t,e)=>{if(!this.running)return;const n=t.key.toLowerCase();if(n==="a"||n==="arrowleft")this.keys.left=e;else if(n==="d"||n==="arrowright")this.keys.right=e;else if(n==="w"||n==="arrowup"||n===" ")this.keys.boost=e;else return;t.preventDefault()});V(this,"kd",t=>this.onKey(t,!0));V(this,"ku",t=>this.onKey(t,!1));V(this,"pointers",new Map);V(this,"touchStartX",0);V(this,"dragMode",!1);V(this,"pd",t=>{!this.running||t.target.closest("button")||(this.pointers.set(t.pointerId,t.clientX),this.touchStartX=t.clientX,this.dragMode=!1,this.updateTouch())});V(this,"pm",t=>{this.pointers.has(t.pointerId)&&(this.pointers.set(t.pointerId,t.clientX),Math.abs(t.clientX-this.touchStartX)>24&&(this.dragMode=!0),this.updateTouch())});V(this,"pu",t=>{this.pointers.delete(t.pointerId),this.updateTouch()});V(this,"signs",[]);V(this,"signTexts",["GREEN MEADOW|$2,500","PINE FOREST|$6,000","LAKEFRONT|$12,000","MOUNTAIN VALLEY|$20,000","BEACHFRONT|$35,000","PRIVATE ISLAND|$60,000"]);V(this,"signIdx",0);V(this,"dustIdx",0);V(this,"sparkIdx",0);this.hooks=t;const e=this.scene;e.background=new lt("#f3cf9a"),e.fog=new wc("#f3cf9a",90,230);const n=new Ru("#ffe9c8","#6a7a4a",1.1);e.add(n),this.sun=new Cu("#ffd9a0",2.6),this.sun.position.set(-30,40,-20),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(1024,1024);const s=this.sun.shadow.camera;s.left=-25,s.right=25,s.top=30,s.bottom=-40,s.far=120,this.sun.shadow.bias=-6e-4,e.add(this.sun,this.sun.target);const r=new Hi(600,24,12),o=new In({side:Xe,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }",fragmentShader:`varying vec3 vP; void main(){ float h = clamp(vP.y,0.,1.); vec3 top = vec3(0.42,0.62,0.86); vec3 hor = vec3(0.99,0.82,0.6);
        vec3 c = mix(hor, top, pow(h, 0.55)); float d = max(dot(vP, normalize(vec3(-0.3,0.12,-1.0))),0.); c += vec3(1.,0.75,0.4)*(pow(d,300.)*1.5 + pow(d,8.)*0.3); gl_FragColor = vec4(c,1.); }`}),a=new ee(r,o);a.renderOrder=-10,e.add(a);for(let v=0;v<3;v++){const x=new ee(new dr(60+v*20,25+v*8,6),Bt(["#9cb57a","#a7b98a","#b8bf98"][v],{flat:!0}));for(let I=-3;I<=3;I++){const T=x.clone();T.position.set(I*90+v*40,-2,-330-v*60),T.scale.set(1,.6+(I+5)%3*.25,1),e.add(T)}}this.grassTex=this.makeGrassTexture();const c=new ee(new Dn(700,500),new Fe({map:this.grassTex,roughness:1}));c.rotation.x=-Math.PI/2,c.position.set(0,-.02,-200),c.receiveShadow=!0,e.add(c),this.roadTex=this.makeRoadTexture();const l=new ee(new Dn($r*2+2.4,500),new Fe({map:this.roadTex,roughness:.9}));l.rotation.x=-Math.PI/2,l.position.set(0,.01,-200),l.receiveShadow=!0,e.add(l);const h=(v,x,I,T,L,D)=>{const w=[];for(let k=0;k<x;k++){const U=this.rnd()<.5?-1:1;w.push({x:U*(I+this.rnd()*(T-I)),z:An+this.rnd()*(Ws-An),r:this.rnd()*6,s:L+this.rnd()*(D-L)})}const M=go(v,w.map(()=>new Wt)),R=M.children;v.updateMatrixWorld(!0);const B=[];v.traverse(k=>{k.isMesh&&B.push(k.matrixWorld.clone())}),R.forEach(k=>k.frustumCulled=!1),e.add(M),this.scenery.push({im:R,base:B,items:w})};h(Kn(le(1)),34,12,45,.9,1.6),h(Kn(le(5),"#7aab4f"),26,14,60,.9,1.5),h(Di(le(3)),30,16,70,1,1.8),h(mo(le(2)),14,9,30,.6,1.4);const u=new Ee,d=new ee(new En(.15,1.1,.15),Bt("#8f6b47"));d.position.y=.55;const f=new ee(new En(.08,.1,6),Bt("#8f6b47"));f.position.set(0,.85,0),u.add(d,f),d.castShadow=f.castShadow=!0;const m=80,_=u;{const v=[];for(let T=0;T<m;T++)v.push({x:T%2?9.5:-9.5,z:An+Math.floor(T/2)*6,r:0,s:1});const x=go(_,v.map(()=>new Wt));_.updateMatrixWorld(!0);const I=[];_.traverse(T=>T.isMesh&&I.push(T.matrixWorld.clone())),x.children.forEach(T=>T.frustumCulled=!1),e.add(x),this.scenery.push({im:x.children,base:I,items:v})}e.add(this.car.root);const g=new ee(new Mi(1.6,20),new Qn({color:"#000",transparent:!0,opacity:.18,depthWrite:!1}));g.rotation.x=-Math.PI/2,g.position.y=.03,g.scale.set(.7,1.3,1),this.car.root.add(g),this.dust=this.makePoints(120,"#d9c3a0",.9,!1);for(let v=0;v<120;v++)this.dustData.push({life:0,vx:0,vy:0,vz:0});this.sparks=this.makePoints(140,"#ffd36a",.5,!0);for(let v=0;v<140;v++)this.sparkData.push({life:0,vx:0,vy:0,vz:0});e.add(this.dust,this.sparks);const p=new Ae,y=new Float32Array(360);p.setAttribute("position",new Ie(y,3)),this.speedLines=new _u(p,new Tc({color:"#ffffff",transparent:!0,opacity:0})),this.speedLines.frustumCulled=!1;for(let v=0;v<60;v++)this.resetSpeedLine(v,!0);e.add(this.speedLines),this.bindInput()}makePoints(t,e,n,s){const r=new Ae;r.setAttribute("position",new Ie(new Float32Array(t*3).fill(-999),3));const o=new yo(r,new ur({color:e,size:n,map:Fc(),transparent:!0,depthWrite:!1,opacity:.8,blending:s?oo:gi}));return o.frustumCulled=!1,o}makeRoadTexture(){const t=document.createElement("canvas");t.width=256,t.height=256;const e=t.getContext("2d"),n=256,s=1.2/($r*2+2.4)*n;e.fillStyle="#c9a77a",e.fillRect(0,0,n,256),e.fillStyle="#5d5f66",e.fillRect(s,0,n-s*2,256);for(let a=0;a<1400;a++)e.fillStyle=`rgba(${Math.random()<.5?"255,255,255":"0,0,0"},0.05)`,e.fillRect(s+Math.random()*(n-s*2),Math.random()*256,2,2);e.fillStyle="#f4f2ee",e.fillRect(s+3,0,4,256),e.fillRect(n-s-7,0,4,256);const r=(n-s*2)/4;for(let a=1;a<4;a++){e.fillStyle=a===2?"#f2c14a":"#f4f2ee";for(let c=0;c<256;c+=64)e.fillRect(s+r*a-2,c,4,34)}const o=new rr(t);return o.wrapS=o.wrapT=Ms,o.repeat.set(1,500/16),o.colorSpace=We,o.anisotropy=8,o}makeGrassTexture(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.fillStyle="#9cbf6a",e.fillRect(0,0,256,256);for(let s=0;s<2500;s++){const r=Math.random();e.fillStyle=r<.3?"#8db35e":r<.6?"#a8c878":r<.97?"#94b964":"#e9d36a",e.fillRect(Math.random()*256,Math.random()*256,3,3+Math.random()*4)}for(let s=0;s<256;s+=32)e.fillStyle="rgba(255,240,180,0.08)",e.fillRect(s,0,14,256);const n=new rr(t);return n.wrapS=n.wrapT=Ms,n.repeat.set(30,22),n.colorSpace=We,n}updateTouch(){if(this.pointers.size===0){this.touchSteer=0;return}this.keys.boost=this.pointers.size>=2?!0:this.keys.boost&&!1;const t=[...this.pointers.values()].pop();this.dragMode?this.touchSteer=_n((t-this.touchStartX)/70,-1,1):this.touchSteer=t<window.innerWidth/2?-1:1}bindInput(){window.addEventListener("keydown",this.kd),window.addEventListener("keyup",this.ku),window.addEventListener("pointerdown",this.pd),window.addEventListener("pointermove",this.pm),window.addEventListener("pointerup",this.pu),window.addEventListener("pointercancel",this.pu)}start(t){this.reducedMotion=t;for(const e of this.entities)this.release(e);this.entities=[],this.running=!0,this.paused=!1,this.crashed=!1,this.ending=!1,this.crashTimer=0,this.time=0,this.speed=22,this.carX=0,this.carVX=0,this.steer=0,this.keys={left:!1,right:!1,boost:!1},this.touchSteer=0,this.pointers.clear(),this.boostMeter=1,this.distance=0,this.points=0,this.combo=1,this.comboMeter=0,this.stats={tokens:0,near:0,gates:0,perfect:0,bestCombo:1},this.nextRowZ=-70,this.nextGateDist=220,this.nextSignDist=90,this.timeScale=1,this.car.root.position.set(0,0,0),this.car.root.rotation.set(0,0,0),this.car.body.rotation.set(0,0,0),this.camPos.set(0,9,13);for(let e=0;e<6;e++)this.spawn("coin",0,-30-e*4);te.engineStart()}stop(){this.running=!1,te.engineStop()}setPaused(t){!this.running||this.crashed||(this.paused=t,t&&(this.keys={left:!1,right:!1,boost:!1}))}acquire(t,e=0){var o;const n=t+e;let r=((o=this.pools)[n]??(o[n]=[])).pop();if(!r){let a,c=[.5,.5],l;switch(t){case"traffic":{const h=wv(e%3,Math.floor(this.rnd()*8));a=h.g,c=h.half,l=h.blinkers;break}case"coin":a=Ev(),c=[.7,.7];break;case"cone":a=Av(),c=[.38,.38];break;case"barrier":a=Rv(),c=[1.3,.3];break;case"hay":a=Cv(),c=[.85,.7];break;default:a=Tv(["#e3664f","#4f9fbf","#7fae6a","#a98be8"][e%4]),c=[1.75,.3]}r={kind:t,obj:a,x:0,z:0,half:c,speed:0,active:!0,passed:!1,blinkers:l},r.obj.userData.key=n}return r.active=!0,r.passed=!1,r.laneTo=void 0,r.laneTimer=void 0,r.hitCooldown=0,this.scene.add(r.obj),r}release(t){var e,n;this.scene.remove(t.obj),t.active=!1,((e=this.pools)[n=t.obj.userData.key]??(e[n]=[])).push(t)}spawn(t,e,n,s=0){const r=this.acquire(t,s);return r.x=e,r.z=n,r.obj.position.set(e,t==="coin"?1:0,n),r.obj.rotation.set(0,0,0),r.speed=0,this.entities.push(r),r}get difficulty(){return _n(this.time/150,0,1)}spawnRow(t){const e=this.difficulty,n=[0,1,2,3],s=this.rnd()<.25+e*.45?2:1,r=this.time<10?1:Math.min(3,s+(this.rnd()<e*.3?1:0));for(let c=n.length-1;c>0;c--){const l=Math.floor(this.rnd()*(c+1));[n[c],n[l]]=[n[l],n[c]]}const o=n.slice(0,r),a=n.slice(r);for(const c of o){const l=this.rnd();if(l<.62){const h=this.rnd()<.55?0:this.rnd()<.6?1:2,u=this.spawn("traffic",hi[c],t+(this.rnd()-.5)*6,h);if(u.speed=this.speedTraffic(),e>.15&&this.rnd()<.15+e*.3){const d=c===0?1:c===3||this.rnd()<.5?-1:1;o.includes(c+d)||(u.laneTo=hi[c+d],u.laneTimer=1.6+this.rnd())}}else if(l<.78)for(let h=0;h<3;h++)this.spawn("cone",hi[c]+(h-1)*.9,t+h*.6);else l<.9?this.spawn("barrier",hi[c],t):this.spawn("hay",hi[c],t)}if(a.length&&this.rnd()<.75){const c=a[Math.floor(this.rnd()*a.length)],l=4+Math.floor(this.rnd()*3);for(let h=0;h<l;h++)this.spawn("coin",hi[c],t+8+h*3.2)}}speedTraffic(){return this.speed*(.35+this.rnd()*.2)}addPoints(t,e,n){const s=t*this.combo;this.points+=s;let r=null;if(n){const o=n.clone().project(this.camera);r={x:(o.x*.5+.5)*window.innerWidth,y:(-o.y*.5+.5)*window.innerHeight}}this.hooks.onEvent(e,s,r,this.combo)}addCombo(t){if(this.combo>=cs.maxCombo){this.comboMeter=Math.min(1,this.comboMeter+t);return}this.comboMeter+=t,this.comboMeter>=1&&(this.comboMeter=0,this.combo++,this.stats.bestCombo=Math.max(this.stats.bestCombo,this.combo),te.combo(this.combo),this.hooks.onEvent("combo",0,null,this.combo))}loseCombo(){this.combo>1&&this.combo--,this.comboMeter=0,this.hooks.onEvent("scrape",0,null,this.combo)}update(t){if(!this.running)return;const e=Math.min(t,.05);if(Ln.uTime.value+=e,Lu(0,Ln.uTime.value),this.paused){this.updateCamera(e);return}if(this.crashed){this.crashTimer+=e,this.timeScale=this.crashTimer<.9?.18:cn(this.timeScale,.6,2,e);const f=e*this.timeScale;this.speed=cn(this.speed,0,1.5,f),this.crashVel.y-=30*f,this.car.root.position.addScaledVector(this.crashVel,f),this.car.root.position.y<0&&(this.car.root.position.y=0,this.crashVel.y*=-.35,this.crashVel.x*=.7,this.crashSpin.multiplyScalar(.6)),this.car.root.rotation.x+=this.crashSpin.x*f,this.car.root.rotation.y+=this.crashSpin.y*f,this.car.root.rotation.z+=this.crashSpin.z*f,this.moveWorld(f),this.updateParticles(f),this.updateCamera(e),this.crashTimer>2.4&&!this.ending&&(this.ending=!0,this.running=!1,this.hooks.onEnd(this.result()));return}const n=e;this.time+=n;const s=this.difficulty,r=22+34*(1-Math.exp(-this.time/70));this.boosting=this.keys.boost&&this.boostMeter>.02,this.boosting?this.boostMeter=Math.max(0,this.boostMeter-n*.35):this.boostMeter=Math.min(1,this.boostMeter+n*.08),this.speed=cn(this.speed,r*(this.boosting?1.4:1),2.5,n);const o=_n((this.keys.right?1:0)-(this.keys.left?1:0)+this.touchSteer,-1,1);this.steer=cn(this.steer,o,12,n);const a=this.steer*(11+this.speed*.12);this.carVX=cn(this.carVX,a,10,n),this.carX+=this.carVX*n;const c=$r-Gs[0]+.5;Math.abs(this.carX)>c&&(this.carX=Math.sign(this.carX)*c,this.carVX*=-.3,this.shake=Math.max(this.shake,.25),this.emitSparks(new A(this.carX+Math.sign(this.carX)*.9,.5,0),8));const l=Math.abs(this.carX)>$r-1,h=this.car.root;h.position.x=this.carX,h.position.y=0,h.rotation.y=-this.carVX*.025,this.car.body.rotation.z=-this.carVX*.018,this.car.body.rotation.x=(this.boosting?-.04:0)+Math.sin(this.time*20)*.004,this.car.body.position.y=Math.sin(this.time*17)*.025+(l?Math.sin(this.time*50)*.04:0);for(const f of this.car.wheels)f.rotation.x-=this.speed*n*2.4;this.car.brake.emissiveIntensity=this.boosting?.2:.6;const u=this.speed*n;this.distance+=u,this.points+=u*cs.distancePerUnit*this.combo,this.addCombo(n*.025),this.comboMeter=Math.max(0,this.comboMeter-n*.012*this.combo),this.nextRowZ+=u;const d=Fi(34,19,s)+this.speed*.25;for(;this.nextRowZ>-An*0-0;)this.spawnRow(An),this.nextRowZ-=d;if(this.nextGateDist-=u,this.nextGateDist<=0){const f=Math.floor(this.rnd()*4),m=this.spawn("gate",hi[f],An-14,Math.floor(this.rnd()*4));m.half=[1.75,.3];for(let _=0;_<4;_++)this.spawn("coin",hi[f],An-14+6+_*3);this.nextGateDist=200+this.rnd()*120}this.nextSignDist-=u,this.nextSignDist<=0&&(this.spawnSign(),this.nextSignDist=260+this.rnd()*200),this.moveWorld(n),this.collide(n),this.updateParticles(n),(l||this.boosting||this.rnd()<.3)&&!this.reducedMotion&&this.emitDust(l?3:1),this.updateCamera(n),te.engineUpdate(_n((this.speed-20)/50,0,1),this.boosting),this.hooks.onScore(this.points,this.combo,this.comboMeter,this.speed*3.2,this.boostMeter)}spawnSign(){const t=this.signTexts[this.signIdx++%this.signTexts.length],e=Pv("LAND FOR SALE|"+t.split("|")[0],["#4f7f5a","#3f6f8f","#b5523b"][this.signIdx%3]);e.position.set((this.rnd()<.5?-1:1)*12,0,An),e.rotation.y=e.position.x>0?-.35:.35,this.scene.add(e),this.signs.push(e)}moveWorld(t){const e=this.speed*t;this.roadTex.offset.y+=e/16,this.grassTex.offset.y+=e/500*22;for(let r=this.entities.length-1;r>=0;r--){const o=this.entities[r];if(o.kind==="traffic"){if(o.z+=e-o.speed*t,o.laneTo!==void 0){o.laneTimer-=t;const a=Math.sin(this.time*14)>0?2:0,c=Math.sign(o.laneTo-o.x);for(const l of o.blinkers)l.material.emissiveIntensity=l.userData.side===c?a:0;if(o.laneTimer<=0&&(o.x=cn(o.x,o.laneTo,2.2,t),o.obj.rotation.y=-(o.laneTo-o.x)*.06,Math.abs(o.x-o.laneTo)<.05)){o.x=o.laneTo,o.laneTo=void 0,o.obj.rotation.y=0;for(const l of o.blinkers)l.material.emissiveIntensity=0}}}else o.z+=e;o.kind==="coin"&&(o.obj.rotation.y+=t*4),o.obj.position.x=o.x,o.obj.position.z=o.z,(o.z>Ws||o.z<An-60)&&(this.release(o),this.entities.splice(r,1))}for(let r=this.signs.length-1;r>=0;r--)this.signs[r].position.z+=e,this.signs[r].position.z>Ws&&(this.scene.remove(this.signs[r]),this.signs.splice(r,1));const n=new Wt,s=new Wt;for(const r of this.scenery)r.items.forEach((o,a)=>{if(o.z+=e,o.z>Ws+10&&(o.z-=Ws+10-An,o.r!==0||Math.abs(o.x)!==9.5)){const c=this.rnd()<.5?-1:1;o.x=c*(Math.abs(o.x)*(.85+this.rnd()*.3)),Math.abs(o.x)<10&&(o.x=Math.sign(o.x)*11)}n.compose(new A(o.x,0,o.z),new bn().setFromAxisAngle(new A(0,1,0),o.r),new A(o.s,o.s,o.s)),r.im.forEach((c,l)=>{s.multiplyMatrices(n,r.base[l]),c.setMatrixAt(a,s)})}),r.im.forEach(o=>o.instanceMatrix.needsUpdate=!0)}collide(t){const e=this.carX,n=new A(e,1,0);for(let s=this.entities.length-1;s>=0;s--){const r=this.entities[s],o=Math.abs(r.x-e),a=Math.abs(r.z),c=o<r.half[0]+Gs[0]-.12,l=a<r.half[1]+Gs[1]-.1;if(r.kind==="coin"){o<1.4&&a<1.6&&(this.stats.tokens++,this.boostMeter=Math.min(1,this.boostMeter+.04),this.addCombo(.08),te.token(this.combo),this.addPoints(cs.token,"token",r.obj.position.clone()),this.emitSparks(r.obj.position.clone(),6),this.release(r),this.entities.splice(s,1));continue}if(r.kind==="gate"){if(!r.passed&&r.z>0){r.passed=!0;const h=Math.abs(r.x-e);if(h<1.45){const u=h<.45;this.stats.gates++,u&&this.stats.perfect++,te.gate(u),this.addCombo(u?.7:.5),this.addPoints(u?cs.perfectGate:cs.gate,u?"perfect":"gate",new A(r.x,3,0))}else h<2.4&&(this.loseCombo(),this.shake=.4,this.emitSparks(new A(r.x+Math.sign(e-r.x)*1.75,1,0),14))}continue}if(c&&l){this.crash(r);return}if(!r.passed&&r.z>Gs[1]){r.passed=!0;const h=o-r.half[0]-Gs[0];h<.95&&h>-.15&&(this.stats.near++,te.nearMiss(),this.addCombo(.34),this.addPoints(cs.nearMiss,"near",n),this.shake=Math.max(this.shake,.12))}}}crash(t){this.crashed=!0,this.crashTimer=0,te.crash(),te.engineStop();const e=Math.sign(this.carX-t.x)||1;this.crashVel.set(e*6,9,4),this.crashSpin.set(2+Math.random()*2,e*6,e*3),this.shake=this.reducedMotion?.2:1.2,this.emitSparks(new A((this.carX+t.x)/2,1,t.z*.5),60);for(let n=0;n<20;n++)this.emitDust(2)}result(){return{points:Math.floor(this.points),distance:Math.floor(this.distance),tokens:this.stats.tokens,nearMisses:this.stats.near,gates:this.stats.gates,perfectGates:this.stats.perfect,bestCombo:this.stats.bestCombo}}emitDust(t){const e=this.dust.geometry.attributes.position;for(let n=0;n<t;n++){const s=this.dustIdx++%this.dustData.length,r=Math.random()<.5?-.85:.85;e.setXYZ(s,this.carX+r,.3,1.4),this.dustData[s]={life:.8,vx:(Math.random()-.5)*2,vy:1+Math.random(),vz:4+Math.random()*4}}}emitSparks(t,e){const n=this.sparks.geometry.attributes.position,s=this.reducedMotion?Math.ceil(e/3):e;for(let r=0;r<s;r++){const o=this.sparkIdx++%this.sparkData.length;n.setXYZ(o,t.x,t.y,t.z),this.sparkData[o]={life:.5+Math.random()*.4,vx:(Math.random()-.5)*10,vy:Math.random()*8+2,vz:(Math.random()-.5)*10}}}updateParticles(t){const e=(r,o,a,c)=>{const l=r.geometry.attributes.position;for(let h=0;h<o.length;h++){const u=o[h];u.life<=0||(u.life-=t,u.vy-=a*t,l.setXYZ(h,l.getX(h)+u.vx*t,Math.max(.05,l.getY(h)+u.vy*t),l.getZ(h)+(u.vz+c)*t),u.life<=0&&l.setXYZ(h,0,-999,0))}l.needsUpdate=!0};e(this.dust,this.dustData,-.5,this.speed*.3),e(this.sparks,this.sparkData,18,this.speed*.5);const n=this.speedLines.geometry.attributes.position,s=this.reducedMotion?0:_n((this.speed-40)/30,0,1)+(this.boosting?.5:0);if(this.speedLines.material.opacity=Math.min(.5,s*.4),s>0){for(let r=0;r<60;r++){const o=n.getZ(r*2)+this.speed*2.2*t;o>14?this.resetSpeedLine(r,!1):(n.setZ(r*2,o),n.setZ(r*2+1,o-3-this.speed*.05))}n.needsUpdate=!0}}resetSpeedLine(t,e){const n=this.speedLines.geometry.attributes.position,s=Math.random()*Math.PI*2,r=4+Math.random()*6,o=this.carX+Math.cos(s)*r,a=2+Math.abs(Math.sin(s))*r*.8,c=e?-Math.random()*60:-60;n.setXYZ(t*2,o,a,c),n.setXYZ(t*2+1,o,a,c-3)}updateCamera(t){const e=this.camera;if(this.crashed){const n=this.crashTimer,s=this.car.root.position,r=.4+n*.5,o=new A(s.x+Math.sin(r)*9,4.5,s.z+Math.cos(r)*9);this.reducedMotion&&o.set(s.x,8,s.z+11),this.camPos.lerp(o,1-Math.exp(-3*t)),this.camLook.lerp(new A(s.x,.8,s.z),1-Math.exp(-5*t))}else{const n=_n((this.speed-20)/40,0,1),s=new A(this.carX*.55,8.5+n*.8,12.5+n*1.5);this.camPos.x=cn(this.camPos.x,s.x,4,t),this.camPos.y=cn(this.camPos.y,s.y,3,t),this.camPos.z=cn(this.camPos.z,s.z,3,t),this.camLook.set(this.carX*.75,.5,-12);const r=55+(this.reducedMotion?0:n*9+(this.boosting?6:0));e.fov=cn(e.fov,r,3,t),e.updateProjectionMatrix()}e.position.copy(this.camPos),this.shake>0&&!this.reducedMotion?(e.position.x+=(Math.random()-.5)*this.shake,e.position.y+=(Math.random()-.5)*this.shake,this.shake=Math.max(0,this.shake-t*2.5)):this.shake=0,e.lookAt(this.camLook),this.sun.target.position.set(this.carX,0,-10),this.sun.position.set(this.carX-30,40,-30)}setAspect(t){this.camera.aspect=t,this.camera.zoom=t<.8?.62:1,this.camera.updateProjectionMatrix()}}const Eh={type:"change"},kc={type:"start"},Nu={type:"end"},Jr=new As,Th=new di,_x=Math.cos(70*nc.DEG2RAD),De=new A,Je=2*Math.PI,ye={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},pa=1e-6;class vx extends _v{constructor(t,e=null){super(t,e),this.state=ye.NONE,this.enabled=!0,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:$n.ROTATE,MIDDLE:$n.DOLLY,RIGHT:$n.PAN},this.touches={ONE:jn.ROTATE,TWO:jn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new bn,this._lastTargetPosition=new A,this._quat=new bn().setFromUnitVectors(t.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Mh,this._sphericalDelta=new Mh,this._scale=1,this._panOffset=new A,this._rotateStart=new nt,this._rotateEnd=new nt,this._rotateDelta=new nt,this._panStart=new nt,this._panEnd=new nt,this._panDelta=new nt,this._dollyStart=new nt,this._dollyEnd=new nt,this._dollyDelta=new nt,this._dollyDirection=new A,this._mouse=new nt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=yx.bind(this),this._onPointerDown=xx.bind(this),this._onPointerUp=Mx.bind(this),this._onContextMenu=Rx.bind(this),this._onMouseWheel=wx.bind(this),this._onKeyDown=Ex.bind(this),this._onTouchStart=Tx.bind(this),this._onTouchMove=Ax.bind(this),this._onMouseDown=Sx.bind(this),this._onMouseMove=bx.bind(this),this._interceptControlDown=Cx.bind(this),this._interceptControlUp=Px.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Eh),this.update(),this.state=ye.NONE}update(t=null){const e=this.object.position;De.copy(e).sub(this.target),De.applyQuaternion(this._quat),this._spherical.setFromVector3(De),this.autoRotate&&this.state===ye.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=Je:n>Math.PI&&(n-=Je),s<-Math.PI?s+=Je:s>Math.PI&&(s-=Je),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(De.setFromSpherical(this._spherical),De.applyQuaternion(this._quatInverse),e.copy(this.target).add(De),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=De.length();o=this._clampDistance(a*this._scale);const c=a-o;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const a=new A(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new A(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(a),this.object.updateMatrixWorld(),o=De.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Jr.origin.copy(this.object.position),Jr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Jr.direction))<_x?this.object.lookAt(this.target):(Th.setFromNormalAndCoplanarPoint(this.object.up,this.target),Jr.intersectPlane(Th,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>pa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>pa||this._lastTargetPosition.distanceToSquared(this.target)>pa?(this.dispatchEvent(Eh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Je/60*this.autoRotateSpeed*t:Je/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){De.setFromMatrixColumn(e,0),De.multiplyScalar(-t),this._panOffset.add(De)}_panUp(t,e){this.screenSpacePanning===!0?De.setFromMatrixColumn(e,1):(De.setFromMatrixColumn(e,0),De.crossVectors(this.object.up,De)),De.multiplyScalar(t),this._panOffset.add(De)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;De.copy(s).sub(this.target);let r=De.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Je*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Je*this._rotateDelta.x/e.clientHeight),this._rotateUp(Je*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new nt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function xx(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function yx(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Mx(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Nu),this.state=ye.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Sx(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case $n.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=ye.DOLLY;break;case $n.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}break;case $n.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=ye.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=ye.PAN}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(kc)}function bx(i){switch(this.state){case ye.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case ye.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case ye.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function wx(i){this.enabled===!1||this.enableZoom===!1||this.state!==ye.NONE||(i.preventDefault(),this.dispatchEvent(kc),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Nu))}function Ex(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Tx(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case jn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=ye.TOUCH_ROTATE;break;case jn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=ye.TOUCH_PAN;break;default:this.state=ye.NONE}break;case 2:switch(this.touches.TWO){case jn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=ye.TOUCH_DOLLY_PAN;break;case jn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=ye.TOUCH_DOLLY_ROTATE;break;default:this.state=ye.NONE}break;default:this.state=ye.NONE}this.state!==ye.NONE&&this.dispatchEvent(kc)}function Ax(i){switch(this._trackPointer(i),this.state){case ye.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case ye.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case ye.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case ye.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=ye.NONE}}function Rx(i){this.enabled!==!1&&i.preventDefault()}function Cx(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Px(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Lx="modulepreload",Ix=function(i){return"/games/let-it-grow/"+i},Ah={},Dx=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(l){return Promise.all(l.map(h=>Promise.resolve(h).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=o(e.map(l=>{if(l=Ix(l),l in Ah)return;Ah[l]=!0;const h=l.endsWith(".css"),u=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=h?"stylesheet":Lx,h||(d.as="script"),d.crossOrigin="",d.href=l,c&&d.setAttribute("nonce",c),document.head.appendChild(d),h)return new Promise((f,m)=>{d.addEventListener("load",f),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},ls=(i,t,e,n)=>({walls:i,roof:t,door:e,trim:n}),Et=i=>i,Ou=[Et({id:"house_country",label:"Country Farmhouse",category:"HOUSE",icon:"🏡",footprint:3,placement:"land",colorSlots:ls("#f2e6cf","#b5523b","#4f7f5a","#ffffff")}),Et({id:"house_modern",label:"Modern Farmhouse",category:"HOUSE",icon:"🏠",footprint:3.3,placement:"land",colorSlots:ls("#f4f2ee","#3a3d42","#c9a25a","#2e2f33")}),Et({id:"house_stone",label:"Stone Cottage",category:"HOUSE",icon:"🛖",footprint:2.6,placement:"land",colorSlots:ls("#b9b0a2","#5d6b78","#8a4f3a","#e9e2d6")}),Et({id:"house_cabin",label:"Woodland Cabin",category:"HOUSE",icon:"🪵",footprint:2.8,placement:"land",colorSlots:ls("#9a6b45","#4b5a3f","#5a3a28","#d9c3a0")}),Et({id:"house_lake",label:"Lake House",category:"HOUSE",icon:"🏘️",footprint:3.4,placement:"land",colorSlots:ls("#6f8fa8","#2f3b48","#f2e6cf","#ffffff")}),Et({id:"house_villa",label:"Beach Villa",category:"HOUSE",icon:"🏖️",footprint:3.6,placement:"land",colorSlots:ls("#fbf6ec","#d0814f","#3f8faa","#e9d6b8")}),Et({id:"barn",label:"Barn",category:"FARM",icon:"🛖",footprint:3.4,placement:"land",colorSlots:{walls:"#b5473b",roof:"#5a4a44",trim:"#ffffff"}}),Et({id:"silo",label:"Silo",category:"FARM",icon:"🗼",footprint:1.3,placement:"land",colorSlots:{walls:"#d9d4c9",roof:"#9aa3ab",trim:"#b5473b"}}),Et({id:"windmill",label:"Windmill",category:"FARM",icon:"🌬️",footprint:1.4,placement:"land",colorSlots:{walls:"#f2e6cf",roof:"#b5523b",trim:"#7a5a3d",door:"#4f7f5a"}}),Et({id:"well",label:"Well",category:"FARM",icon:"🪣",footprint:1.1,placement:"land",colorSlots:{roof:"#b5523b"}}),Et({id:"greenhouse",label:"Greenhouse",category:"FARM",icon:"🪴",footprint:2.5,placement:"land",colorSlots:{}}),Et({id:"haybale",label:"Hay Bale",category:"FARM",icon:"🌾",footprint:.8,placement:"land",colorSlots:{},vary:!0}),Et({id:"tractor",label:"Tractor",category:"FARM",icon:"🚜",footprint:1.4,placement:"land",colorSlots:{walls:"#d84a3a",roof:"#2e2f33",trim:"#f2c230"}}),Et({id:"crates",label:"Crates",category:"FARM",icon:"📦",footprint:1,placement:"land",colorSlots:{},vary:!0}),Et({id:"plot_veg",label:"Vegetable Plot",category:"FARM",icon:"🥬",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"crop_wheat",label:"Wheat",category:"FARM",icon:"🌾",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"crop_corn",label:"Corn",category:"FARM",icon:"🌽",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"crop_tomato",label:"Tomatoes",category:"FARM",icon:"🍅",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"crop_pumpkin",label:"Pumpkins",category:"FARM",icon:"🎃",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"crop_sunflower",label:"Sunflowers",category:"FARM",icon:"🌻",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"crop_carrot",label:"Carrots",category:"FARM",icon:"🥕",footprint:1.9,placement:"land",colorSlots:{}}),Et({id:"tree_oak",label:"Oak",category:"NATURE",icon:"🌳",footprint:1.3,placement:"land",colorSlots:{},vary:!0}),Et({id:"tree_pine",label:"Pine",category:"NATURE",icon:"🌲",footprint:1.1,placement:"land",colorSlots:{},vary:!0}),Et({id:"tree_palm",label:"Palm",category:"NATURE",icon:"🌴",footprint:.9,placement:"land",colorSlots:{},vary:!0}),Et({id:"tree_fruit",label:"Fruit Tree",category:"NATURE",icon:"🍎",footprint:1.3,placement:"land",colorSlots:{},vary:!0}),Et({id:"tree_blossom",label:"Blossom Tree",category:"NATURE",icon:"🌸",footprint:1.3,placement:"land",colorSlots:{},vary:!0}),Et({id:"bush",label:"Bush",category:"NATURE",icon:"🌿",footprint:.8,placement:"land",colorSlots:{},vary:!0}),Et({id:"hedge",label:"Hedge",category:"NATURE",icon:"🟩",footprint:1,placement:"land",colorSlots:{main:"#4f8a45"}}),Et({id:"wildflowers",label:"Wildflowers",category:"NATURE",icon:"🌼",footprint:1,placement:"land",colorSlots:{},vary:!0,overlap:!0}),Et({id:"grass_tuft",label:"Tall Grass",category:"NATURE",icon:"🌱",footprint:.6,placement:"land",colorSlots:{},vary:!0,overlap:!0}),Et({id:"rock",label:"Rocks",category:"NATURE",icon:"🪨",footprint:1,placement:"any",colorSlots:{},vary:!0}),Et({id:"log",label:"Log",category:"NATURE",icon:"🪵",footprint:1.1,placement:"land",colorSlots:{},vary:!0}),Et({id:"flowerbed",label:"Flower Bed",category:"NATURE",icon:"💐",footprint:1.2,placement:"land",colorSlots:{main:"#f08aa8"}}),Et({id:"cow",label:"Cow",category:"ANIMALS",icon:"🐄",footprint:1,placement:"land",colorSlots:{main:"#f4f1ea"},animal:"cow"}),Et({id:"chicken",label:"Chicken",category:"ANIMALS",icon:"🐔",footprint:.4,placement:"land",colorSlots:{main:"#f8f4ea"},animal:"chicken"}),Et({id:"sheep",label:"Sheep",category:"ANIMALS",icon:"🐑",footprint:.6,placement:"land",colorSlots:{},animal:"sheep"}),Et({id:"horse",label:"Horse",category:"ANIMALS",icon:"🐎",footprint:1.1,placement:"land",colorSlots:{main:"#8a5a3a"},animal:"horse"}),Et({id:"duck",label:"Duck",category:"ANIMALS",icon:"🦆",footprint:.4,placement:"any",colorSlots:{main:"#f2eee6"},animal:"duck"}),Et({id:"dog",label:"Dog",category:"ANIMALS",icon:"🐕",footprint:.5,placement:"land",colorSlots:{main:"#c98a4f"},animal:"dog"}),Et({id:"pond",label:"Pond",category:"WATER",icon:"💧",footprint:2.6,placement:"land",colorSlots:{}}),Et({id:"fountain",label:"Fountain",category:"WATER",icon:"⛲",footprint:1.4,placement:"land",colorSlots:{main:"#d9d4c9"}}),Et({id:"dock",label:"Dock",category:"WATER",icon:"🛶",footprint:1.2,placement:"any",colorSlots:{main:"#b48a5e"},overlap:!0}),Et({id:"boat",label:"Rowboat",category:"WATER",icon:"🚣",footprint:1.2,placement:"water",colorSlots:{main:"#e9e2d6"}}),Et({id:"birdbath",label:"Bird Bath",category:"WATER",icon:"🐦",footprint:.5,placement:"land",colorSlots:{main:"#d9d4c9"}}),Et({id:"path_stone",label:"Stepping Stones",category:"PATHS",icon:"🪨",footprint:.9,placement:"land",colorSlots:{main:"#b5aea2"},overlap:!0}),Et({id:"path_dirt",label:"Dirt Path",category:"PATHS",icon:"🟫",footprint:.9,placement:"land",colorSlots:{main:"#b39472"},overlap:!0}),Et({id:"path_plank",label:"Boardwalk",category:"PATHS",icon:"🟧",footprint:.9,placement:"land",colorSlots:{main:"#b48a5e"},overlap:!0}),Et({id:"fence_wood",label:"Rail Fence",category:"FENCES",icon:"🪵",footprint:.5,placement:"land",colorSlots:{main:"#8f6b47"},overlap:!0}),Et({id:"fence_picket",label:"Picket Fence",category:"FENCES",icon:"🤍",footprint:.5,placement:"land",colorSlots:{main:"#f4f2ee"},overlap:!0}),Et({id:"fence_stone",label:"Stone Wall",category:"FENCES",icon:"🧱",footprint:.5,placement:"land",colorSlots:{main:"#a59e93"},overlap:!0}),Et({id:"gate",label:"Gate",category:"FENCES",icon:"🚪",footprint:.5,placement:"land",colorSlots:{main:"#8f6b47"},overlap:!0}),Et({id:"bench",label:"Bench",category:"DECOR",icon:"🪑",footprint:.9,placement:"land",colorSlots:{main:"#a07a55"}}),Et({id:"picnic",label:"Picnic Table",category:"DECOR",icon:"🧺",footprint:1.2,placement:"land",colorSlots:{main:"#b48a5e"}}),Et({id:"mailbox",label:"Mailbox",category:"DECOR",icon:"📫",footprint:.4,placement:"land",colorSlots:{main:"#3f6f8f"}}),Et({id:"birdhouse",label:"Birdhouse",category:"DECOR",icon:"🏠",footprint:.4,placement:"land",colorSlots:{main:"#e9c95a"}}),Et({id:"scarecrow",label:"Scarecrow",category:"DECOR",icon:"🧑‍🌾",footprint:.6,placement:"land",colorSlots:{main:"#4f7fa8"}}),Et({id:"parasol",label:"Parasol & Lounger",category:"DECOR",icon:"⛱️",footprint:1.2,placement:"land",colorSlots:{main:"#e3664f"}}),Et({id:"lamp",label:"Lamp Post",category:"LIGHTING",icon:"💡",footprint:.4,placement:"land",colorSlots:{main:"#2e2f33"}}),Et({id:"lantern",label:"Lantern Hook",category:"LIGHTING",icon:"🏮",footprint:.4,placement:"land",colorSlots:{main:"#2e2f33"}}),Et({id:"torch",label:"Tiki Torch",category:"LIGHTING",icon:"🔥",footprint:.3,placement:"land",colorSlots:{}}),Et({id:"firepit",label:"Fire Pit",category:"LIGHTING",icon:"🪵",footprint:1,placement:"land",colorSlots:{}})],vn=Object.fromEntries(Ou.map(i=>[i.id,i])),Ux=[{id:"HOUSE",label:"House",icon:"🏡"},{id:"FARM",label:"Farm",icon:"🌾"},{id:"NATURE",label:"Nature",icon:"🌳"},{id:"ANIMALS",label:"Animals",icon:"🐄"},{id:"WATER",label:"Water",icon:"💧"},{id:"PATHS",label:"Paths",icon:"🪨"},{id:"FENCES",label:"Fences",icon:"🚧"},{id:"DECOR",label:"Decor",icon:"🪑"},{id:"LIGHTING",label:"Lighting",icon:"💡"}],Nx=["#f4f2ee","#f2e6cf","#e9c95a","#e3664f","#b5473b","#d0814f","#8a5a3a","#4f7f5a","#7fae6a","#6f8fa8","#3f6f8f","#a98be8","#f08aa8","#9a958c","#3a3d42","#1f2226"];class Ox{constructor(){V(this,"gltfCache",new Map);V(this,"loader",null)}create(t,e,n){const s=vn[t],r=mx[t];let o;try{o=r?r({colors:{...(s==null?void 0:s.colorSlots)??{},...e},seed:n}):this.missing()}catch(a){console.warn("[assets] builder failed for",t,a),o=this.missing()}return o.userData.assetId=t,s!=null&&s.model&&this.swapInModel(o,s.model),o}missing(){const t=new Ee,e=new ee(new En(1,1,1),new Fe({color:"#d9a6c9"}));return e.position.y=.5,t.add(e),t}async swapInModel(t,e){const n=await this.loadGLTF(e);if(!n)return;const s=t.userData;t.clear(),t.add(n.clone(!0)),t.userData=s}loadGLTF(t){let e=this.gltfCache.get(t);return e||(e=(async()=>{try{if(!this.loader){const{GLTFLoader:s}=await Dx(async()=>{const{GLTFLoader:r}=await import("./GLTFLoader-CizQfX22.js");return{GLTFLoader:r}},[]);this.loader=new s}const n=await this.loader.loadAsync(t);return n.scene.traverse(s=>{s.isMesh&&(s.castShadow=s.receiveShadow=!0)}),n.scene}catch(n){return console.warn("[assets] GLB failed, using procedural fallback:",t,n),null}})(),this.gltfCache.set(t,e)),e}}const ms=new Ox,nr=300,Rh=170,ge=26,Ch=i=>_e(ge*.85,ge*1.7,i);function Ph(i,t,e,n){return Fi(e,i,_e(n*.4,n,t))}const Fx={meadow:{height:(i,t)=>{const e=Math.hypot(i,t);let n=.6+(je(i*.05,t*.05,1)-.5)*1.4;n+=Ch(e)*(je(i*.018,t*.018,5)*14-3),n+=_e(70,105,e)*10;const s=25+Math.sin(t*.06)*5;return n=Ph(n,Math.abs(i-s),-1.1,4.2),n},water:-.45,colors:{low:"#8cc36a",high:"#b4d47a",shore:"#a8b878",rock:"#9a958c",dry:"#c9d68a"},sky:{top:"#5fa8e6",horizon:"#d8ecf0",sunsetTop:"#5a6fb0",sunsetHorizon:"#ffc48a"},fog:.0055,ambience:"meadow",waterColors:["#8fd6d8","#3f8faa"],oceanSize:nr},forest:{height:(i,t)=>{const e=Math.hypot(i,t);let n=.6+(je(i*.07,t*.07,11)-.5)*1.6;n+=Ch(e)*(je(i*.03,t*.03,12)*12-2),n+=_e(60,100,e)*14;const s=22+Math.sin(i*.08)*4;return n=Ph(n,Math.abs(t-s),-1,3.4),n},water:-.4,colors:{low:"#5f9a58",high:"#7fae62",shore:"#6f7a5a",rock:"#7d7a72",dry:"#8a8f5a"},sky:{top:"#6f9ec0",horizon:"#c9dcd6",sunsetTop:"#4f5f8f",sunsetHorizon:"#f2b07f"},fog:.01,ambience:"forest",waterColors:["#7fc0b8","#2f6f7a"],oceanSize:nr},lakefront:{height:(i,t)=>{const e=Math.hypot(i,t);let n=.7+(je(i*.05,t*.05,21)-.5)*1.2;n+=_e(30,70,Math.hypot(i,t+20))*_e(-20,10,t)*6;const r=-14+Math.sin(i*.05)*4+Math.sin(i*.13)*1.5-t;return n-=_e(-1,12,r)*4.5,n+=_e(-110,-150,t)*(8+je(i*.02,t*.02,22)*14),n+=_e(80,110,Math.abs(i))*10,n+(e>1e3,0)},water:-.35,colors:{low:"#86bb72",high:"#a6c97a",shore:"#cdbf98",rock:"#8f8b84"},sky:{top:"#7fb4e0",horizon:"#e6eef0",sunsetTop:"#6a6fb0",sunsetHorizon:"#ffb88f"},fog:.007,ambience:"lake",waterColors:["#9fdcdc","#3a86a8"],oceanSize:600},mountain:{height:(i,t)=>{const e=Math.hypot(i,t);let n=.8+(je(i*.05,t*.05,31)-.5)*1.5;const s=1-Math.abs(je(i*.025,t*.025,33)*2-1);n+=_e(34,85,e)*(18+s*38);const r=Math.hypot(i,t+50);n+=_e(20,9,r)*22;const o=Math.hypot(i,t+33);return n=Fi(-1.2,n,_e(3,6.5,o)),n},water:-.5,colors:{low:"#7fae6a",high:"#9cbf72",shore:"#8f9a7a",rock:"#8b8a86",snow:"#f4f6f8"},sky:{top:"#4f9ade",horizon:"#dfe9f0",sunsetTop:"#4a5a9a",sunsetHorizon:"#f6b48a"},fog:.005,ambience:"mountain",waterColors:["#a6e0e6","#3a7f9f"],oceanSize:nr},beachfront:{height:(i,t)=>{let e=.8+(je(i*.05,t*.05,41)-.5)*1;const n=-10+Math.sin(i*.06)*3+Math.sin(i*.17)*1;return e-=_e(-2,22,n-t)*5,e+=_e(32,80,t)*(6+je(i*.03,t*.03,42)*10),e+=_e(14,4,Math.hypot(i+46,t+6))*5,e},water:-.25,colors:{low:"#9cc66a",high:"#b8d27a",shore:"#f0dcae",rock:"#8f8578",dry:"#e6d3a2"},sky:{top:"#3fa6e0",horizon:"#e6f4f0",sunsetTop:"#6a5aa8",sunsetHorizon:"#ff9d6a"},fog:.0035,ambience:"beach",waterColors:["#6fe0d6","#1f8fb8"],oceanSize:900},island:{height:(i,t)=>{const e=Math.hypot(i,t),n=Math.atan2(t,i),s=40+Math.sin(n*3)*4+(je(Math.cos(n)*2,Math.sin(n)*2,51)-.5)*10,r=e/s;let o=.9+(je(i*.05,t*.05,52)-.5)*1;o+=_e(.55,.95,r)*0+_e(.75,1.25,r)*-6;const a=_e(.4,.95,-Math.sin(n));return o+=a*_e(.55,.9,r)*(1-_e(.95,1.08,r))*9,o+=_e(10,3,Math.hypot(i+6,t+30))*3,o},water:-.25,colors:{low:"#6fb35a",high:"#8fc66a",shore:"#f4e2b4",rock:"#8a7e70",dry:"#e9d8aa"},sky:{top:"#2f9ee0",horizon:"#eaf6f2",sunsetTop:"#7a4fa0",sunsetHorizon:"#ff8a5a"},fog:.0028,ambience:"beach",waterColors:["#5fe6d6","#0f7fb0"],oceanSize:1200}};function kx(i,t){const e=new Dn(nr,nr,Rh,Rh);e.rotateX(-Math.PI/2);const n=e.attributes.position,s=new Float32Array(n.count*3),r=new lt,o=new lt(i.colors.low),a=new lt(i.colors.high),c=new lt(i.colors.shore),l=new lt(i.colors.rock),h=new lt(i.colors.dry??i.colors.high),u=new lt(i.colors.snow??"#ffffff");for(let f=0;f<n.count;f++){const m=n.getX(f),_=n.getZ(f),g=i.height(m,_);n.setY(f,g);const p=.6,y=Math.hypot(i.height(m+p,_)-i.height(m-p,_),i.height(m,_+p)-i.height(m,_-p))/(2*p);r.copy(o).lerp(a,je(m*.08,_*.08,7)),r.lerp(h,_e(.55,.8,je(m*.03,_*.03,9))*.5),r.lerp(c,1-_e(i.water+.25,i.water+1.1,g)),r.lerp(l,_e(.55,1.1,y)),t&&r.lerp(u,_e(22,32,g+je(m*.1,_*.1,3)*6)),s[f*3]=r.r,s[f*3+1]=r.g,s[f*3+2]=r.b}e.setAttribute("color",new Ie(s,3)),e.computeVertexNormals();const d=new ee(e,new Fe({vertexColors:!0,roughness:.95,flatShading:!1}));return d.receiveShadow=!0,d.name="terrain",d}function Xs(i,t,e,n){const s=new dr(.05,.35,3);s.translate(0,.17,0);const r=Bt(e,{flat:!0,wind:!0}),o=new Ec(s,r,t),a=new lt;let c=0;for(let l=0;l<t*3&&c<t;l++){const h=(n()-.5)*120,u=(n()-.5)*120,d=i.height(h,u);d<i.water+.4||(o.setMatrixAt(c,Uu(h,d,u,n()*6,.6+n()*.9)),a.set(e).offsetHSL((n()-.5)*.05,0,.04+(n()-.5)*.08),o.setColorAt(c,a),c++)}return o.count=c,o.receiveShadow=!0,o}function Lh(i,t,e,n,s,r,o){const a=[];for(let c=0;c<e*6&&a.length<e;c++){const l=t()*Math.PI*2,h=n+Math.sqrt(t())*(s-n),u=Math.cos(l)*h,d=Math.sin(l)*h,f=i.height(u,d);f<i.water+.35||!r(u,d,f)||a.push(Uu(u,f-.05,d,t()*Math.PI*2,o[0]+t()*(o[1]-o[0])))}return a}class Yn{constructor(t,e,n,s,r,o=!1,a=1){V(this,"points");V(this,"vel");V(this,"base");this.count=t,this.box=s,this.mode=r;const c=new Ae,l=new Float32Array(t*3);this.base=new Float32Array(t*3),this.vel=new Float32Array(t);for(let h=0;h<t;h++)l[h*3]=(s.cx??0)+(Math.random()-.5)*s.x,l[h*3+1]=s.y[0]+Math.random()*(s.y[1]-s.y[0]),l[h*3+2]=(s.cz??0)+(Math.random()-.5)*s.z,this.base.set([l[h*3],l[h*3+1],l[h*3+2]],h*3),this.vel[h]=Math.random()*10;c.setAttribute("position",new Ie(l,3)),this.points=new yo(c,new ur({color:e,size:n,map:Fc(),transparent:!0,opacity:a,depthWrite:!1,blending:o?oo:gi,sizeAttenuation:!0})),this.points.frustumCulled=!1}update(t,e){const n=this.points.geometry.attributes.position,s=n.array,r=this.box;for(let o=0;o<this.count;o++){const a=this.vel[o],c=o*3;if(this.mode==="flutter"||this.mode==="firefly"){const l=this.mode==="firefly"?.3:.7;s[c]=this.base[c]+Math.sin(e*l+a)*3+Math.sin(e*2.7+a*2)*.3,s[c+2]=this.base[c+2]+Math.cos(e*l*.8+a)*3,s[c+1]=this.base[c+1]+Math.sin(e*3.1+a)*(this.mode==="firefly"?.4:.25)}else this.mode==="fall"?(s[c+1]-=t*(.6+a%1*.6),s[c]+=Math.sin(e+a)*t*.5,s[c+1]<r.y[0]&&(s[c+1]=r.y[1])):this.mode==="rise"?(s[c+1]+=t*(1.2+a%1),s[c]+=Math.sin(e*2+a)*t*.8,s[c+1]>r.y[1]&&(s[c+1]=r.y[0],s[c]=this.base[c])):s[c]=this.base[c]+Math.sin(e*.08+a)*6}n.needsUpdate=!0,this.mode==="firefly"&&(this.points.material.opacity=.2+.8*Math.abs(Math.sin(e*.7)))}}function Bx(i){const t=new Dn(i.oceanSize,i.oceanSize,90,90),e=new ee(t,Oc(i.waterColors[0],i.waterColors[1],.9));return e.rotation.x=-Math.PI/2,e.position.y=i.water,e.receiveShadow=!0,e.name="water",e}function zx(i,t,e,n){const s=new Ee,r=new Ae;r.setAttribute("position",new Ie(new Float32Array([0,0,0,.9,0,-.3,0,0,-.5]),3)),r.computeVertexNormals();const o=new Qn({color:t,side:xn}),a=[];for(let c=0;c<i;c++){const l=new Ee,h=new ee(r,o),u=new ee(r,o);u.scale.x=-1,l.add(h,u),s.add(l),a.push({g:l,l:h,r:u,ph:Math.random()*6,rad:n*(.6+Math.random()*.6),h:e+Math.random()*6})}return{group:s,update(c){for(const l of a){const h=c*.12+l.ph;l.g.position.set(Math.cos(h)*l.rad,l.h+Math.sin(c+l.ph)*1.5,Math.sin(h)*l.rad),l.g.rotation.y=-h;const u=Math.sin(c*9+l.ph)*.6;l.l.rotation.z=u,l.r.rotation.z=-u}}}}function Vx(i){const t=Fx[i],e=le(i.length*977+i.charCodeAt(0)*31),n=new Ee,s=i==="mountain",r=kx(t,s);n.add(r),n.add(Bx(t));const o=[],a=[],c=f=>(m,_)=>Math.hypot(m,_)>f,l=(f,m,_,g,p,y=c(ge+2),v=[.8,1.4])=>{const x=Math.ceil(_/m);for(let I=0;I<m;I++){const T=Lh(t,e,x,g,p,y,v);T.length&&n.add(go(f(le(I*13+7)),T))}},h=(f,m,_,g,p=[.8,2])=>{const y=Lh(t,e,f,m,_,c(ge+1),p);for(let v=0;v<3;v++)n.add(go(mo(le(v+3),g),y.filter((x,I)=>I%3===v)))},u=zx(i==="beachfront"||i==="island"?7:5,i==="forest"?"#2f3a2f":"#3a3a40",i==="mountain"?26:16,50);switch(n.add(u.group),a.push((f,m)=>u.update(m)),i){case"meadow":{n.add(Xs(t,3500,"#7fb85a",e)),l(y=>Kn(y,"#5f9a45"),4,46,ge+4,95),l(y=>Kn(y,"#7aab4f"),2,6,ge-4,ge+6,(y,v)=>Math.hypot(y,v)>ge-2);const f=new Yn(500,"#ffffff",.35,{x:110,y:[0,0],z:110},"mist"),m=f.points.geometry.attributes.position,_=new Float32Array(500*3),g=["#f2d14a","#f08aa8","#ffffff","#a98be8","#f2793a"].map(y=>new lt(y));for(let y=0;y<500;y++){const v=m.getX(y),x=m.getZ(y);m.setY(y,Math.max(t.height(v,x),t.water-2)+.25);const I=g[y%g.length];_.set([I.r,I.g,I.b],y*3)}f.points.geometry.setAttribute("color",new Ie(_,3)),f.points.material.vertexColors=!0,f.points.material.color.set("#ffffff"),n.add(f.points);const p=new Yn(40,"#ffd166",.45,{x:60,y:[.8,2.5],z:60},"flutter");n.add(p.points),a.push((y,v,x)=>{p.update(y,v),p.points.visible=x<.5});break}case"forest":{n.add(Xs(t,2200,"#5f9a58",e)),l(g=>Di(g,"#3f6f4f"),5,260,ge+1,100,c(ge+1),[1,1.9]),l(g=>Di(g,"#2f5f45"),3,60,ge+8,60,c(ge+6),[1.6,2.4]),h(40,ge+1,80,"#7d7a72");const f=new Yn(90,"#e6ff8a",.35,{x:70,y:[.5,3],z:70},"firefly",!0),m=new Yn(60,"#c98a3a",.25,{x:70,y:[0,14],z:70},"fall"),_=new Yn(40,"#e8f0ee",14,{x:100,y:[.8,2.4],z:100},"mist",!1,.14);n.add(f.points,m.points,_.points),a.push((g,p,y)=>{f.update(g,p),f.points.visible=y>.35,m.update(g,p),_.update(g,p)});break}case"lakefront":{n.add(Xs(t,2800,"#7fb562",e)),l(y=>Di(y,"#3f6f4f"),3,70,ge+6,95,(y,v)=>Math.hypot(y,v)>ge+4&&v>-12,[1,1.7]),l(y=>Di(y,"#4f7f55"),3,120,60,220,(y,v)=>v<-100,[1.4,2.4]),l(y=>Kn(y,"#6a9f4f"),2,16,ge+2,60,(y,v)=>v>-8&&Math.hypot(y,v)>ge+2);const f=ms.create("dock",{},3),m=16,_=-14+Math.sin(m*.05)*4+Math.sin(m*.13)*1.5;f.position.set(m,t.water+.15,_-3),f.scale.setScalar(1.5),n.add(f),o.push({x:m,z:_-3,r:3});const g=[];for(let y=0;y<4;y++){const v=ms.create("duck",{main:y===0?"#c98a4f":"#f2eee6"},y);n.add(v),g.push(v)}const p=new Yn(50,"#ffffff",18,{x:160,y:[.2,1.6],z:60,cz:-50},"mist",!1,.2);n.add(p.points),a.push((y,v,x)=>{g.forEach((I,T)=>{const L=v*.07+T*.5,D=-6+T*1.6;I.position.set(D+Math.cos(L)*14,t.water+.05+Math.sin(v*2+T)*.03,-30+Math.sin(L)*8),I.rotation.y=-L+Math.PI}),p.update(y,v),p.points.material.opacity=.05+.25*x});break}case"mountain":{n.add(Xs(t,2600,"#7fae6a",e)),l(v=>Di(v,"#3f6f4f"),5,180,ge+2,85,(v,x,I)=>Math.hypot(v,x)>ge+2&&I<20,[1,1.9]),h(55,ge+1,70,"#8b8a86",[1,3.5]);for(let v=0;v<5;v++){const x=e()*Math.PI*2,I=Math.cos(x)*(ge+6+e()*8),T=Math.sin(x)*(ge+6+e()*8);if(T<-20)continue;const L=mo(le(v+40),"#8b8a86");L.scale.set(2.5,4+e()*3,2.5),L.position.set(I,t.height(I,T)-.5,T),n.add(L)}const f=Hx(),m=new Fe({map:f,transparent:!0,opacity:.9,emissive:"#bfe9ff",emissiveIntensity:.25,side:xn,roughness:.2}),_=22,g=new ee(new Dn(4.5,_,1,1),m);g.position.set(0,_/2-1,-40.5),g.rotation.x=-.12,n.add(g),o.push({x:0,z:-33,r:7});const p=new Yn(70,"#ffffff",1.6,{x:6,y:[-.5,3],z:4,cz:-36},"rise",!1,.5);n.add(p.points);const y=new Yn(220,"#ffffff",.22,{x:90,y:[0,30],z:90},"fall",!1,.85);y.points.name="snow",n.add(y.points),a.push((v,x)=>{f.offset.y=x*.9%1,p.update(v,x),y.update(v,x)});break}case"beachfront":case"island":{const f=i==="island";if(n.add(Xs(t,f?1600:2200,f?"#6fb35a":"#9cc66a",e)),l(p=>Du(p),4,f?70:55,ge-2,f?46:90,(p,y,v)=>Math.hypot(p,y)>ge-2&&v<5,[1,1.6]),f||l(p=>Kn(p,"#6aa64a"),2,24,40,100,(p,y)=>y>30),l(p=>{const y=new Ee;for(let v=0;v<3;v++)kt(y,Dt.ico(1),Bt(Pe("#3f9a4a",p,.1),{flat:!0,wind:!0}),[p()-.5,.5,p()-.5],[1.4,1,1.4]);return y},2,50,ge+2,45,c(ge+2)),h(f?40:28,ge+4,f?55:80,"#8f8578",[1,3]),f){const p=ms.create("dock",{},9);p.scale.setScalar(1.6),p.rotation.y=Math.PI*.15,p.position.set(30,t.water+.15,30),n.add(p);const y=ms.create("boat",{main:"#f4f2ee"},1);y.position.set(34,t.water,35),y.scale.setScalar(1.4),n.add(y),a.push((v,x)=>{y.position.y=t.water-.05+Math.sin(x*1.3)*.08,y.rotation.z=Math.sin(x*1.1)*.05})}const m=new Yn(160,"#ffffff",.9,{x:1,y:[0,0],z:1},"mist",!1,.75),_=m.points.geometry.attributes.position;let g=0;for(let p=0;p<6e3&&g<160;p++){const y=(e()-.5)*140,v=(e()-.5)*140,x=t.height(y,v);Math.abs(x-t.water)<.12&&(_.setXYZ(g,y,t.water+.1,v),m.base.set([y,t.water+.1,v],g*3),g++)}m.count=g,_.needsUpdate=!0,n.add(m.points),a.push((p,y)=>{m.points.material.opacity=.4+.35*Math.sin(y*1.4)});break}}const d=n.getObjectByName("water");return a.push((f,m)=>{d.position.y=t.water+Math.sin(m*.7)*.06}),{id:i,group:n,height:t.height,waterLevel:t.water,buildRadius:ge,colliders:o,sky:t.sky,fogDensity:t.fog,ambience:t.ambience,camDistance:38,snow:s,terrain:r,update(f,m,_){for(const g of a)g(f,m,_)}}}function Hx(){const i=document.createElement("canvas");i.width=64,i.height=256;const t=i.getContext("2d");t.fillStyle="#9fd8ee",t.fillRect(0,0,64,256);for(let n=0;n<70;n++)t.fillStyle=`rgba(255,255,255,${.3+Math.random()*.6})`,t.fillRect(Math.random()*64,Math.random()*256,2+Math.random()*4,20+Math.random()*60);const e=new rr(i);return e.wrapS=e.wrapT=Ms,e.repeat.set(1,3),e}const Gx=600,Wx={MORNING:.3,DAY:.43,SUNSET:.735,NIGHT:.96},Xx=.31;function Yx(i){return i<.22||i>=.85?"Night":i<.28?"Sunrise":i<.38?"Morning":i<.64?"Day":i<.71?"Golden hour":i<.77?"Sunset":"Dusk"}class qx{constructor(t,e){V(this,"group",new Ee);V(this,"sun");V(this,"hemi");V(this,"dome");V(this,"stars");V(this,"moon");V(this,"clouds");V(this,"rain");V(this,"shooting");V(this,"fog");V(this,"t",Xx);V(this,"night",0);V(this,"cloudData",[]);V(this,"palette",{top:"#5fa8e6",horizon:"#d8ecf0",sunsetTop:"#5a6fb0",sunsetHorizon:"#ffc48a"});V(this,"fogBase",.006);V(this,"weather","clear");V(this,"weatherMix",{cloud:.35,mist:0,rain:0});V(this,"shootT",0);this.fog=new bc("#d8ecf0",.006),t.fog=this.fog,this.dome=new ee(new Hi(900,32,16),new In({side:Xe,depthWrite:!1,fog:!1,uniforms:{uTop:{value:new lt},uHorizon:{value:new lt},uSunDir:{value:new A},uSunColor:{value:new lt},uSunAmt:{value:1}},vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); gl_Position.z = gl_Position.w; }",fragmentShader:`uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uSunDir; uniform vec3 uSunColor; uniform float uSunAmt; varying vec3 vDir;
          void main(){
            float h = clamp(vDir.y, -1.0, 1.0);
            vec3 col = mix(uHorizon, uTop, pow(smoothstep(-0.05, 0.6, h), 0.7));
            float d = max(dot(normalize(vDir), normalize(uSunDir)), 0.0);
            col += uSunColor * (pow(d, 600.0) * 2.0 + pow(d, 12.0) * 0.35) * uSunAmt;
            col = mix(col, uHorizon * 0.9, smoothstep(0.0, -0.2, h));
            gl_FragColor = vec4(col, 1.0);
          }`})),this.dome.frustumCulled=!1,this.dome.renderOrder=-10,this.group.add(this.dome),this.hemi=new Ru("#cfe6ff","#5a5040",.9),this.group.add(this.hemi),this.sun=new Cu("#fff1d6",2.4),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(e,e);const n=this.sun.shadow.camera;n.left=n.bottom=-45,n.right=n.top=45,n.near=1,n.far=220,this.sun.shadow.bias=-5e-4,this.sun.shadow.normalBias=.04,this.group.add(this.sun,this.sun.target);const s=new Ae,r=[];for(let l=0;l<1400;l++){const h=Math.random(),u=Math.random()*.48+.02,d=h*Math.PI*2,f=Math.acos(1-u*2);r.push(Math.sin(f)*Math.cos(d)*700,Math.cos(f)*700,Math.sin(f)*Math.sin(d)*700)}s.setAttribute("position",new fe(r,3)),this.stars=new yo(s,new ur({color:"#ffffff",size:2.2,sizeAttenuation:!1,transparent:!0,opacity:0,fog:!1,depthWrite:!1})),this.stars.frustumCulled=!1,this.group.add(this.stars),this.moon=new ee(new Hi(18,20,14),new Qn({color:"#f4f1e4",fog:!1,transparent:!0})),this.group.add(this.moon),this.shooting=new ee(new Dn(40,.8),new Qn({color:"#ffffff",transparent:!0,opacity:0,fog:!1,depthWrite:!1})),this.group.add(this.shooting);const o=new So(1,1);this.clouds=new Ec(o,new Fe({color:"#ffffff",flatShading:!0,roughness:1,transparent:!0,opacity:.92}),80),this.clouds.castShadow=!0;for(let l=0;l<16;l++)this.cloudData.push({x:(Math.random()-.5)*300,z:(Math.random()-.5)*300,y:38+Math.random()*20,s:4+Math.random()*5,v:1.5+Math.random()*2});this.group.add(this.clouds);const a=new Ae,c=new Float32Array(900*6);for(let l=0;l<900;l++){const h=(Math.random()-.5)*90,u=Math.random()*40,d=(Math.random()-.5)*90;c.set([h,u,d,h+.1,u-.9,d],l*6)}a.setAttribute("position",new Ie(c,3)),this.rain=new _u(a,new Tc({color:"#bcd0e0",transparent:!0,opacity:.45})),this.rain.frustumCulled=!1,this.rain.visible=!1,this.group.add(this.rain),t.add(this.group)}setPalette(t,e){this.palette=t,this.fogBase=e}setWeather(t){this.weather=t}update(t,e,n,s){if(e==="AUTO")this.t=(this.t+t/Gx)%1;else{let R=Wx[e]-this.t;R>.5&&(R-=1),R<-.5&&(R+=1),this.t=(this.t+R*Math.min(1,t*2.5)+1)%1}const o=(this.t-.25)*Math.PI*2,a=Math.sin(o),c=new A(Math.cos(o)*.8,a,.45).normalize();this.night=1-_e(-.18,.08,a);const l=_e(.55,.08,a)*(1-this.night),h=this.weatherMix,u=this.weather==="clear"?.25:this.weather==="cloudy"||this.weather==="rain"?1:.5;h.cloud+=(u-h.cloud)*Math.min(1,t*.5),h.mist+=((this.weather==="mist"?1:this.weather==="rain"?.4:0)-h.mist)*Math.min(1,t*.5),h.rain+=((this.weather==="rain"?1:0)-h.rain)*Math.min(1,t*.8);const d=new lt(this.palette.top).lerp(new lt(this.palette.sunsetTop),l),f=new lt(this.palette.horizon).lerp(new lt(this.palette.sunsetHorizon),l),m=new lt("#0b1430"),_=new lt("#24304f");d.lerp(m,this.night),f.lerp(_,this.night);const g=new lt("#9aa6b0").lerp(_,this.night);d.lerp(g,h.cloud*.35+h.rain*.3),f.lerp(g,h.cloud*.25+h.rain*.3);const p=this.dome.material.uniforms;p.uTop.value.copy(d),p.uHorizon.value.copy(f),p.uSunDir.value.copy(c),p.uSunColor.value.set("#ffe0a8").lerp(new lt("#ff8a4a"),l),p.uSunAmt.value=(1-this.night)*(1-h.rain*.8),this.fog.color.copy(f),this.fog.density=this.fogBase*(1+h.mist*2.2+this.night*.3);const y=new lt("#fff1d6").lerp(new lt("#ff9a5a"),l),v=a>-.05?c:new A(-Math.cos(o)*.8,-a,.4).normalize();this.sun.color.copy(a>-.05?y:new lt("#9fb4ff")),this.sun.intensity=a>-.05?_n(a*6,0,1)*2.6*(1-h.cloud*.35-h.rain*.3):.35,this.sun.position.copy(n).addScaledVector(v,110),this.sun.target.position.copy(n),this.hemi.intensity=.35+(1-this.night)*.75,this.hemi.color.set("#cfe6ff").lerp(new lt("#6a7ab0"),this.night).lerp(new lt("#ffd0a8"),l*.5),this.hemi.groundColor.set("#5a5040").lerp(new lt("#1a1e2a"),this.night),this.stars.material.opacity=this.night*(1-h.cloud*.6),this.stars.rotation.y+=t*.004,this.moon.position.copy(new A(-Math.cos(o)*.6,-a*.9+.15,-.6).normalize().multiplyScalar(600)),this.moon.material.opacity=this.night,this.moon.visible=this.night>.02;const x=this.shooting.material;this.shootT-=t,this.night>.8&&this.shootT<-6&&Math.random()<t*.15&&!s&&(this.shootT=1.2,this.shooting.position.set((Math.random()-.5)*400,220+Math.random()*80,-400),this.shooting.rotation.z=-.3-Math.random()*.3,this.shooting.lookAt(0,0,0)),this.shootT>0?(this.shooting.translateX(t*350),x.opacity=Math.sin(this.shootT/1.2*Math.PI)):x.opacity=0;const I=new Wt,T=new bn;let L=0;const D=new lt("#ffffff").lerp(new lt("#ffc6a0"),l).lerp(new lt("#3a4560"),this.night).lerp(new lt("#8c96a0"),h.rain);this.clouds.material.color.copy(D);const w=Math.round(4+h.cloud*12);for(let M=0;M<this.cloudData.length;M++){const R=this.cloudData[M];R.x+=R.v*t*(s?.3:1),R.x>160&&(R.x=-160);for(let B=0;B<5;B++){const k=M<w?R.s*(1-Math.abs(B-2)*.18):1e-4;I.compose(new A(R.x+(B-2)*R.s*.75,R.y+B%2*R.s*.3,R.z+B*7%3-1),T,new A(k*1.3,k*.7,k)),this.clouds.setMatrixAt(L++,I)}}if(this.clouds.instanceMatrix.needsUpdate=!0,this.rain.visible=h.rain>.05,this.rain.visible){this.rain.material.opacity=h.rain*.45;const M=this.rain.geometry.attributes.position,R=M.array;for(let B=0;B<R.length;B+=6)R[B+1]-=t*30,R[B+4]-=t*30,R[B+1]<0&&(R[B+1]+=40,R[B+4]+=40);M.needsUpdate=!0,this.rain.position.set(n.x,0,n.z)}Ln.uNight.value=this.night,Ln.uWind.value=1+h.rain*.8+h.cloud*.3,Lu(this.night,Ln.uTime.value)}}const jx={cow:{r:6,speed:.7,idle:[3,7]},chicken:{r:4,speed:1.3,idle:[.6,2]},sheep:{r:5,speed:.8,idle:[2,5]},horse:{r:11,speed:1.4,idle:[2,6]},duck:{r:4,speed:.8,idle:[1,3]},dog:{r:4,speed:2.2,idle:[1,4]}};class Zx{constructor(t,e){V(this,"scene",new du);V(this,"camera",new Ze(42,1,.5,2e3));V(this,"controls");V(this,"sky");V(this,"env",null);V(this,"envCache",new Map);V(this,"objectsGroup",new Ee);V(this,"views",new Map);V(this,"animals",new Map);V(this,"smoke");V(this,"smokeData",[]);V(this,"smokeIdx",0);V(this,"lampLights",[]);V(this,"camMode","orbit");V(this,"flight",null);V(this,"marketAngle",.6);V(this,"time",0);V(this,"reducedMotion",!1);this.sky=new qx(this.scene,e),this.scene.add(this.objectsGroup),this.controls=new vx(this.camera,t);const n=this.controls;n.enableDamping=!0,n.dampingFactor=.08,n.minDistance=9,n.maxDistance=80,n.minPolarAngle=.25,n.maxPolarAngle=1.32,n.screenSpacePanning=!1,n.zoomSpeed=.9,n.rotateSpeed=.6,n.enabled=!1,n.mouseButtons={LEFT:$n.ROTATE,MIDDLE:$n.DOLLY,RIGHT:$n.PAN},n.touches={ONE:jn.ROTATE,TWO:jn.DOLLY_PAN};const s=new Ae;s.setAttribute("position",new Ie(new Float32Array(480).fill(-999),3)),this.smoke=new yo(s,new ur({color:"#e8e4dc",size:1.4,map:Fc(),transparent:!0,opacity:.45,depthWrite:!1})),this.smoke.frustumCulled=!1;for(let r=0;r<160;r++)this.smokeData.push({life:0,vx:0,vy:0});this.scene.add(this.smoke);for(let r=0;r<4;r++){const o=new sv("#ffbf6a",0,14,1.6);this.lampLights.push(o),this.scene.add(o)}}getEnvironment(t){let e=this.envCache.get(t);return e||(e=Vx(t),this.envCache.set(t,e)),e}showLand(t){const e=this.getEnvironment(t);this.env!==e&&(this.env&&this.scene.remove(this.env.group),this.scene.add(e.group),this.env=e,this.sky.setPalette(e.sky,e.fogDensity)),this.rebuildObjects(t)}rebuildObjects(t){for(const n of this.views.values())this.objectsGroup.remove(n);this.views.clear(),this.animals.clear();const e=ct.get().landStates[t];if(e&&ct.isOwned(t))for(const n of e.placedObjects)this.addView(n)}addView(t){const e=ms.create(t.assetId,t.colors,t.seed);e.userData.uid=t.uid,this.applyTransform(e,t),this.objectsGroup.add(e),this.views.set(t.uid,e);const n=vn[t.assetId];return n!=null&&n.animal&&this.animals.set(t.uid,{uid:t.uid,kind:n.animal,view:e,home:new nt(t.x,t.z),pos:new nt(t.x,t.z),target:new nt(t.x,t.z),heading:t.rotY,state:"idle",timer:Math.random()*2,phase:Math.random()*10}),e}removeView(t){const e=this.views.get(t);e&&this.objectsGroup.remove(e),this.views.delete(t),this.animals.delete(t)}refreshView(t){return this.removeView(t.uid),this.addView(t)}groundY(t,e,n="land"){if(!this.env)return 0;const s=this.env.height(t,e);return n!=="land"&&s<this.env.waterLevel?this.env.waterLevel:s}applyTransform(t,e){const n=vn[e.assetId],s=this.groundY(e.x,e.z,(n==null?void 0:n.placement)??"land"),r=this.env?this.slopeSink(e.x,e.z,((n==null?void 0:n.footprint)??1)*e.scale):0;t.position.set(e.x,s-r,e.z),t.rotation.y=e.rotY,t.scale.setScalar(e.scale);const o=this.animals.get(t.userData.uid??-1);o&&(o.home.set(e.x,e.z),o.pos.set(e.x,e.z),o.target.set(e.x,e.z))}slopeSink(t,e,n){const s=this.env.height,r=s(t,e);let o=r;for(let a=0;a<6;a++){const c=a/6*Math.PI*2;o=Math.min(o,s(t+Math.cos(c)*n,e+Math.sin(c)*n))}return _n(r-o,0,1.2)}enterOrbit(){this.camMode="orbit",this.controls.enabled=!0,this.controls.autoRotate=!1}enterPhoto(){this.camMode="photo",this.controls.enabled=!0,this.controls.autoRotate=!this.reducedMotion,this.controls.autoRotateSpeed=.35,this.controls.maxDistance=110}exitPhoto(){this.controls.autoRotate=!1,this.controls.maxDistance=80,this.enterOrbit()}enterMarket(){this.camMode="market",this.controls.enabled=!1}resetOrbitView(){this.controls.target.set(0,1,0),this.camera.position.set(26,22,30),this.controls.update()}flyIn(t,e){this.camMode="flight",this.controls.enabled=!1;const n=this.camera.position.clone();n.length()<60&&n.set(-90,70,110),this.flight={t:0,dur:this.reducedMotion?.8:t,from:n,to:new A(24,20,28),look:new A(0,1,0),done:e}}update(t,e){var o;this.time+=t,Ln.uTime.value+=t;const n=ct.get(),s=this.controls.target;this.sky.setWeather(n.weather),this.sky.update(t,n.timeMode,s,this.reducedMotion);const r=this.sky.night;if(this.env){this.env.update(t,this.time,r);const a=this.env.group.getObjectByName("snow");a&&(a.visible=n.weather!=="clear"||this.sky.t<.3)}if(this.camMode==="market"){this.marketAngle+=t*(this.reducedMotion?.02:.06);const a=62,c=new A(Math.cos(this.marketAngle)*a,34,Math.sin(this.marketAngle)*a);this.camera.position.lerp(c,1-Math.exp(-t*1.5)),this.camera.lookAt(0,2,0)}else if(this.camMode==="flight"&&this.flight){const a=this.flight;a.t+=t;const c=_e(0,1,Math.min(1,a.t/a.dur)),l=a.from.clone().lerp(a.to,c);l.y+=Math.sin(c*Math.PI)*12,this.camera.position.copy(l),this.camera.lookAt(a.look),a.t>=a.dur&&(this.controls.target.copy(a.look),this.flight=null,this.enterOrbit(),(o=a.done)==null||o.call(a))}else if(this.controls.enabled){this.controls.update();const a=this.controls.target,c=Math.hypot(a.x,a.z);if(c>30&&(a.x*=30/c,a.z*=30/c),a.y=cn(a.y,this.env?Math.max(this.env.height(a.x,a.z),this.env.waterLevel)+1:1,4,t),this.env){const l=Math.max(this.env.height(this.camera.position.x,this.camera.position.z),this.env.waterLevel)+2;this.camera.position.y<l&&(this.camera.position.y=l)}}e&&(this.updateAnimals(t),this.updateLife(t,r))}updateAnimals(t){if(!this.env)return;const e=this.env;for(const n of this.animals.values()){const s=jx[n.kind];if(n.timer-=t,n.timer<=0)if(n.state==="walk")n.state=n.kind==="cow"||n.kind==="sheep"||n.kind==="horse"||n.kind==="chicken"?"graze":"idle",n.timer=s.idle[0]+Math.random()*(s.idle[1]-s.idle[0]);else{let d=n.home.x,f=n.home.y;for(let m=0;m<8;m++){const _=Math.random()*Math.PI*2,g=Math.random()*s.r,p=n.home.x+Math.cos(_)*g,y=n.home.y+Math.sin(_)*g,v=e.height(p,y),x=v<e.waterLevel||this.inPond(p,y);if(n.kind==="duck"?x||m>5:!x&&v>e.waterLevel+.2){d=p,f=y;break}}if(n.kind==="dog"){const m=this.nearestHouse(n.home.x,n.home.y);m&&Math.random()<.5&&(d=m.x+(Math.random()-.5)*6,f=m.z+3+Math.random()*3)}n.target.set(d,f),n.state="walk",n.timer=8}let r=!1;if(n.state==="walk"){const d=n.target.x-n.pos.x,f=n.target.y-n.pos.y;if(Math.hypot(d,f)<.2)n.timer=0;else{let g=Math.atan2(d,f)-n.heading;for(;g>Math.PI;)g-=Math.PI*2;for(;g<-Math.PI;)g+=Math.PI*2;n.heading+=g*Math.min(1,t*4);const p=s.speed*n.view.scale.x;n.pos.x+=Math.sin(n.heading)*p*t,n.pos.y+=Math.cos(n.heading)*p*t,r=!0}}const o=e.height(n.pos.x,n.pos.y),c=o<e.waterLevel||n.kind==="duck"&&this.inPond(n.pos.x,n.pos.y)?o<e.waterLevel?e.waterLevel:o+.12:o;n.view.position.set(n.pos.x,c,n.pos.y),n.view.rotation.y=n.heading,n.phase+=t*(r?s.speed*9:1);const l=n.view.userData.legs;l&&l.forEach((d,f)=>d.rotation.x=r?Math.sin(n.phase+(f%2?Math.PI:0)+(f>1?Math.PI:0))*.5:0);const h=n.view.userData.head;if(h){const d=n.state==="graze"?n.kind==="chicken"?Math.sin(n.phase*6)>.3?.9:.1:.7:0;h.rotation.x=cn(h.rotation.x,d,6,t)}(n.kind==="chicken"||n.kind==="duck")&&(n.view.position.y+=r?Math.abs(Math.sin(n.phase))*.06:0);const u=n.view.userData.tail;u&&(u.rotation.z=Math.sin(this.time*12)*.5)}}inPond(t,e){for(const n of this.views.values()){const s=n.userData.water;if(s&&Math.hypot(n.position.x-t,n.position.z-e)<s*n.scale.x)return!0}return!1}nearestHouse(t,e){let n=null,s=1/0;for(const r of this.views.values()){if(!String(r.userData.assetId).startsWith("house_"))continue;const o=Math.hypot(r.position.x-t,r.position.z-e);o<s&&(s=o,n=r.position)}return n}updateLife(t,e){var l,h;const n=this.smoke.geometry.attributes.position,s=[],r=[],o=new A;for(const u of this.views.values()){const d=u.userData;if(d.chimney&&s.push(o.copy(d.chimney).applyMatrix4(u.matrixWorld).clone()),d.smoke&&s.push(o.copy(d.smoke).applyMatrix4(u.matrixWorld).clone()),d.light&&r.push(o.copy(d.light).applyMatrix4(u.matrixWorld).clone()),d.spin){const _=u.getObjectByName("spin");_&&(_.rotation.z+=t*1.2*Ln.uWind.value)}d.bob&&(u.position.y=(((l=this.env)==null?void 0:l.waterLevel)??0)-.05+Math.sin(this.time*1.4+u.position.x)*.07,u.rotation.z=Math.sin(this.time*1.1+u.position.z)*.05);const f=u.getObjectByName("flame");f&&(f.scale.y=((h=f.userData).sy??(h.sy=f.scale.y))*(1+Math.sin(this.time*17+u.position.x)*.15));const m=u.getObjectByName("spray");m&&(m.scale.y=.7+Math.sin(this.time*6)*.08)}const a=this.reducedMotion?1:3;for(const u of s)if(Math.random()<t*a){const d=this.smokeIdx++%this.smokeData.length;n.setXYZ(d,u.x,u.y,u.z),this.smokeData[d]={life:3.5,vx:.3+Math.random()*.3,vy:.8+Math.random()*.4}}for(let u=0;u<this.smokeData.length;u++){const d=this.smokeData[u];d.life<=0||(d.life-=t,n.setXYZ(u,n.getX(u)+d.vx*t,n.getY(u)+d.vy*t,n.getZ(u)),d.life<=0&&n.setXYZ(u,0,-999,0))}n.needsUpdate=!0;const c=this.controls.target;r.sort((u,d)=>u.distanceToSquared(c)-d.distanceToSquared(c)),this.lampLights.forEach((u,d)=>{const f=r[d];f&&e>.15?(u.position.copy(f),u.intensity=e*14):u.intensity=0})}}const Ys=i=>i?{...i,colors:{...i.colors}}:null,ma=[.6,.8,1,1.25,1.5,1.8];class Kx{constructor(t,e,n){V(this,"mode","idle");V(this,"enabled",!1);V(this,"assetId",null);V(this,"ghost",null);V(this,"ring");V(this,"selRing");V(this,"rot",0);V(this,"scale",1);V(this,"seed",1);V(this,"colors",{});V(this,"valid",!1);V(this,"hover",new A);V(this,"hasHover",!1);V(this,"selected",null);V(this,"down",null);V(this,"raycaster",new gv);V(this,"ndc",new nt);V(this,"movingOriginal",null);V(this,"history",new Map);V(this,"onDown",t=>{this.enabled&&(this.down={x:t.clientX,y:t.clientY,t:performance.now(),id:t.pointerId,touch:t.pointerType==="touch"},t.pointerType==="touch"&&this.onMove(t))});V(this,"onMove",t=>{if(!this.enabled||this.mode!=="placing"&&this.mode!=="moving")return;this.setNdc(t);const e=this.groundHit();this.hasHover=!!e,e&&this.hover.copy(e),this.updateGhost()});V(this,"onUp",t=>{if(!this.enabled||!this.down||this.down.id!==t.pointerId)return;const e=Math.hypot(t.clientX-this.down.x,t.clientY-this.down.y),n=this.down.touch;if(this.down=null,e>(n?14:6)&&!(n&&(this.mode==="placing"||this.mode==="moving")))return;if(this.setNdc(t),this.mode==="placing"||this.mode==="moving"){const r=this.groundHit();if(!r||(this.hover.copy(r),this.hasHover=!0,this.updateGhost(),n&&e>14))return;this.commit(t);return}const s=this.pickObject();s?this.select(s):this.mode==="selected"&&(this.deselect(),this.mode="idle",this.hooks.onMode("idle"))});V(this,"onKey",t=>{var s;if(!this.enabled)return;const e=(s=t.target)==null?void 0:s.tagName;if(e==="INPUT"||e==="TEXTAREA")return;const n=t.key.toLowerCase();if((t.ctrlKey||t.metaKey)&&n==="z"){t.preventDefault(),this.undo();return}n==="escape"?this.cancel():n==="r"?this.rotate(t.shiftKey?-1:1):(n==="delete"||n==="backspace")&&this.selected?this.deleteSelected():n==="m"&&this.selected?this.moveSelected():n==="c"&&this.selected?this.duplicate():n==="="||n==="+"?this.scaleStep(1):n==="-"&&this.scaleStep(-1)});this.world=t,this.dom=e,this.hooks=n;const s=new Lc(.85,1,40).rotateX(-Math.PI/2);this.ring=new ee(s,new Qn({color:"#6fdc8c",transparent:!0,opacity:.85,depthWrite:!1})),this.ring.renderOrder=5;const r=new ee(new Mi(.85,40).rotateX(-Math.PI/2),new Qn({color:"#6fdc8c",transparent:!0,opacity:.18,depthWrite:!1}));this.ring.add(r),this.ring.visible=!1,this.selRing=new ee(s,new Qn({color:"#f6d77a",transparent:!0,opacity:.95,depthWrite:!1})),this.selRing.visible=!1,t.scene.add(this.ring,this.selRing),e.addEventListener("pointerdown",this.onDown),e.addEventListener("pointermove",this.onMove),e.addEventListener("pointerup",this.onUp),e.addEventListener("pointerleave",()=>{this.hasHover=!1}),window.addEventListener("keydown",this.onKey)}record(t,e){const n=ct.get().activeLandId;if(!n)return;const s=this.history.get(n)??[];s.push({before:Ys(t),after:Ys(e)}),s.length>100&&s.shift(),this.history.set(n,s)}canUndo(){var e;const t=ct.get().activeLandId;return!!t&&(((e=this.history.get(t))==null?void 0:e.length)??0)>0}clearHistory(){this.history.clear()}undo(){var n;const t=ct.get().activeLandId;this.mode==="moving"&&this.cancel();const e=t?(n=this.history.get(t))==null?void 0:n.pop():void 0;if(!e)return!1;if(this.clearGhost(),this.deselect(),this.assetId=null,this.mode="idle",e.after&&(ct.removeObject(e.after.uid),this.world.removeView(e.after.uid)),e.before){ct.restoreObject(e.before);const s=ct.activeLand().placedObjects.find(r=>r.uid===e.before.uid);this.world.addView(s)}return te.remove(),this.hooks.onMode("idle"),!0}setEnabled(t){this.enabled=t,t||this.cancel()}startPlacing(t){this.clearGhost(),this.deselect();const e=vn[t];this.assetId=t,this.rot=e.defaultRotation??0,this.scale=e.defaultScale??1,this.colors={...e.colorSlots},this.newSeed(),this.makeGhost(),this.mode="placing",this.hooks.onMode("placing",t),this.applyTouchMode()}cancel(){if(this.mode==="moving"&&this.movingOriginal){const t=this.world.addView(this.movingOriginal);t.visible=!0,this.movingOriginal=null}this.clearGhost(),this.deselect(),this.assetId=null,this.mode="idle",this.hooks.onMode("idle"),this.applyTouchMode()}rotate(t=1){if(this.mode==="placing"||this.mode==="moving")this.rot+=t*Math.PI/4,this.updateGhost();else if(this.selected){const e=Ys(this.selected);ct.updateObject(this.selected.uid,{rotY:this.selected.rotY+t*Math.PI/4}),this.world.applyTransform(this.world.views.get(this.selected.uid),this.selected),this.record(e,this.selected),te.pickup()}}scaleStep(t){const e=this.mode==="selected"&&this.selected?this.selected.scale:this.scale;let n=ma.findIndex(r=>r>=e-.01);n<0&&(n=2);const s=ma[Math.max(0,Math.min(ma.length-1,n+t))];if(this.mode==="selected"&&this.selected){if(s===this.selected.scale)return;const r=Ys(this.selected);ct.updateObject(this.selected.uid,{scale:s}),this.record(r,this.selected),this.world.applyTransform(this.world.views.get(this.selected.uid),this.selected),this.selRing.scale.setScalar(this.ringSize(this.selected)),te.pickup(),this.hooks.onSelect(this.selected)}else this.scale=s,this.updateGhost()}duplicate(){if(!this.selected)return;const t=this.selected;this.startPlacing(t.assetId),this.rot=t.rotY,this.scale=t.scale,this.colors={...t.colors},this.makeGhost()}moveSelected(){if(!this.selected)return;const t=this.selected;this.movingOriginal={...t,colors:{...t.colors}},ct.removeObject(t.uid),this.world.removeView(t.uid),this.selRing.visible=!1,this.selected=null,this.assetId=t.assetId,this.rot=t.rotY,this.scale=t.scale,this.seed=t.seed,this.colors={...t.colors},this.makeGhost(),this.mode="moving",this.hooks.onMode("moving",t.assetId),this.applyTouchMode()}deleteSelected(){this.selected&&(this.record(this.selected,null),ct.removeObject(this.selected.uid),this.world.removeView(this.selected.uid),te.remove(),this.deselect(),this.mode="idle",this.hooks.onMode("idle"))}setColor(t,e){if(this.selected){const n=Ys(this.selected),s={...this.selected.colors,[t]:e};ct.updateObject(this.selected.uid,{colors:s}),this.world.refreshView(this.selected),this.record(n,this.selected),te.pickup(),this.hooks.onSelect(this.selected)}else this.mode==="placing"&&(this.colors[t]=e,this.makeGhost())}get placingAsset(){return this.assetId}newSeed(){this.seed=Math.floor(Math.random()*1e6);const t=this.assetId?vn[this.assetId]:null;if(t!=null&&t.vary){const e=le(this.seed);this.rot=e()*Math.PI*2,this.scale=.85+e()*.35}}makeGhost(){if(this.ghost&&this.world.scene.remove(this.ghost),!this.assetId)return;const t=ms.create(this.assetId,this.colors,this.seed);t.traverse(e=>{const n=e;if(n.isMesh){const r=n.material.clone();r.transparent=!0,r.opacity=.72,r.depthWrite=!0,n.material=r,n.castShadow=!1}}),this.ghost=t,this.world.scene.add(t),this.updateGhost()}clearGhost(){this.ghost&&this.world.scene.remove(this.ghost),this.ghost=null,this.ring.visible=!1}ringSize(t){var e;return Math.max(.6,(((e=vn[t.assetId])==null?void 0:e.footprint)??1)*t.scale*1.15)}updateGhost(){if(!this.ghost||!this.assetId)return;const t=this.hasHover;if(this.ghost.visible=t,this.ring.visible=t,!t)return;const e={x:this.hover.x,z:this.hover.z,rotY:this.rot,scale:this.scale,assetId:this.assetId};this.world.applyTransform(this.ghost,e),this.ghost.position.y+=.06,this.ring.position.set(e.x,this.ghost.position.y-.02,e.z),this.ring.scale.setScalar(this.ringSize(e));const n=this.validity(e.x,e.z,this.scale);this.valid=n===null;const s=this.valid?"#6fdc8c":"#ff8a7a";this.ring.material.color.set(s),this.ring.children[0].material.color.set(s),this.ghost.traverse(r=>{var a;const o=r.material;o&&r.isMesh&&((a=o.emissive)==null||a.set(this.valid?"#000000":"#ff3b2f"),o.emissiveIntensity=this.valid?0:.35)}),this.dom.dataset.valid=this.valid?"1":"0"}validity(t,e,n,s=-1){var h;const r=this.world.env;if(!r||!this.assetId)return"No land";const o=vn[this.assetId],a=o.footprint*n;if(Math.hypot(t,e)+a*.5>r.buildRadius)return"Outside your property line";const l=r.height(t,e)<r.waterLevel+.1;if(o.placement==="land"&&l)return"Too wet here";if(o.placement==="water"&&!l)return"Needs open water";if(o.placement==="land"&&this.world.slopeSink(t,e,a)>(o.category==="HOUSE"||o.id==="barn"?.9:1.15))return"Too steep";for(const u of r.colliders)if(Math.hypot(u.x-t,u.z-e)<u.r+a*.6)return"Something is already here";if(!o.overlap)for(const u of((h=ct.activeLand())==null?void 0:h.placedObjects)??[]){if(u.uid===s)continue;const d=vn[u.assetId];if(!(!d||d.overlap)&&Math.hypot(u.x-t,u.z-e)<(a+d.footprint*u.scale)*.8)return"Too close to "+d.label.toLowerCase()}return null}setNdc(t){const e=this.dom.getBoundingClientRect();this.ndc.set((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.world.camera)}groundHit(){const t=this.world.env;if(!t)return null;const e=this.raycaster.ray,n=new A;let s=0;for(let r=1;r<400;r+=.75){e.at(r,n);const o=Math.max(t.height(n.x,n.z),t.waterLevel);if(n.y<=o){let a=s,c=r;for(let l=0;l<10;l++){const h=(a+c)/2;e.at(h,n),n.y<=Math.max(t.height(n.x,n.z),t.waterLevel)?c=h:a=h}return e.at(c,n),n}s=r}return null}pickObject(){var e;const t=this.raycaster.intersectObjects(this.world.objectsGroup.children,!0);for(const n of t){let s=n.object;for(;s&&s.userData.uid===void 0;)s=s.parent;if(s)return((e=ct.activeLand())==null?void 0:e.placedObjects.find(r=>r.uid===s.userData.uid))??null}return null}commit(t){if(!this.assetId||!this.hasHover)return;if(!this.valid){te.invalid(),this.hooks.onInvalid(this.validity(this.hover.x,this.hover.z,this.scale)??"Can’t place here");return}const e=ct.addObject({assetId:this.assetId,x:this.hover.x,z:this.hover.z,rotY:this.rot,scale:this.scale,seed:this.seed,colors:{...this.colors}});if(!e)return;this.record(this.mode==="moving"?this.movingOriginal:null,e);const n=this.world.addView(e);n.scale.setScalar(e.scale*.6);const s=e.scale,r=performance.now(),o=()=>{const l=Math.min(1,(performance.now()-r)/260),h=s*(1+Math.sin(l*Math.PI)*.12)*(.6+.4*l);n.scale.setScalar(l>=1?s:h),l<1&&requestAnimationFrame(o)};requestAnimationFrame(o),te.place();const a=n.position.clone().project(this.world.camera),c=this.dom.getBoundingClientRect();if(this.hooks.onPlaced(e,t?{x:t.clientX,y:t.clientY}:{x:(a.x*.5+.5)*c.width,y:(-a.y*.5+.5)*c.height}),this.mode==="moving"){this.movingOriginal=null,this.clearGhost(),this.assetId=null,this.select(e);return}this.newSeed(),vn[this.assetId].vary?this.makeGhost():this.updateGhost()}select(t){this.clearGhost(),this.assetId=null,this.selected=t,this.mode="selected";const e=this.world.views.get(t.uid);this.selRing.visible=!!e,e&&(this.selRing.position.set(e.position.x,e.position.y+.08,e.position.z),this.selRing.scale.setScalar(this.ringSize(t))),te.pickup(),this.hooks.onSelect(t),this.hooks.onMode("selected",t.assetId)}deselect(){this.selected=null,this.selRing.visible=!1,this.hooks.onSelect(null)}applyTouchMode(){const t=this.mode==="placing"||this.mode==="moving";this.world.controls.touches.ONE=t?null:jn.ROTATE}update(t){if(this.selRing.visible){const e=1+Math.sin(t*5)*.05;this.selRing.scale.setScalar((this.selected?this.ringSize(this.selected):1)*e);const n=this.selected?this.world.views.get(this.selected.uid):null;n&&this.selRing.position.set(n.position.x,n.position.y+.08,n.position.z)}this.ring.visible&&(this.ring.material.opacity=.65+Math.sin(t*6)*.2)}}function P(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))if(!(r==null||r===!1))if(s==="class")n.className=r;else if(s==="style"&&typeof r=="object")Object.assign(n.style,r);else if(s.startsWith("on")&&typeof r=="function"){const o=s.slice(2).toLowerCase();o==="click"&&i==="button"?(n.addEventListener("click",a=>{te.click(),r(a)}),n.addEventListener("pointerenter",()=>te.hover())):n.addEventListener(o,r)}else s==="html"?n.innerHTML=r:n.setAttribute(s,r===!0?"":String(r));for(const s of e.flat())s==null||s===!1||n.append(s instanceof Node?s:document.createTextNode(String(s)));return n}const Ls=()=>document.getElementById("ui");let Ih=null;function ui(i){const t=Ih;return t&&(t.classList.add("out"),setTimeout(()=>t.remove(),450)),i.classList.add("screen"),Ls().append(i),Ih=i,i}function hc(i,t,e,n,s,r=!1){return new Promise(o=>{const a=performance.now();let c=0;const l=h=>{const u=Math.min(1,(h-a)/n),d=1-Math.pow(1-u,3);i.textContent=s(t+(e-t)*d),r&&h-c>55&&u<1&&(te.countTick(),c=h),u<1?requestAnimationFrame(l):o()};requestAnimationFrame(l)})}const xi=i=>new Promise(t=>setTimeout(t,i));let qs=null;function Fu(){return(!qs||!qs.isConnected)&&(qs=P("div",{class:"toast-area",role:"status","aria-live":"polite"}),Ls().append(qs)),qs}function $x(i){const t=po[i];if(!t)return;te.achievement();const e=P("div",{class:"toast"},P("span",{class:"e"},t.icon),P("div",{},P("span",{class:"k"},"SESSION ACHIEVEMENT"),P("b",{},t.title),P("small",{},t.desc)));Fu().append(e),setTimeout(()=>e.remove(),4100)}function ro(i){const t=P("div",{class:"mini-toast"},i);Fu().append(t),setTimeout(()=>t.remove(),2300)}let hs=null;async function us(i,t=!1){(!hs||!hs.isConnected)&&(hs=P("div",{class:"fade-veil"}),Ls().append(hs)),hs.classList.add("on"),await xi(t?60:460),await i(),await xi(60),hs.classList.remove("on")}function ku(){const i=P("span",{class:"v"},Cn(ct.get().sessionCash)),t=P("div",{class:"chip cash-chip",role:"status","aria-label":"Game cash balance"},P("span",{class:"k"},"GAME CASH"),i);let e=ct.get().sessionCash;const n=ct.subscribe(s=>{if(!t.isConnected)return n();s.sessionCash!==e&&(hc(i,e,s.sessionCash,700,Cn),e=s.sessionCash)});return t}function Bu(i){return P("button",{class:"icon-btn","aria-label":"Settings",title:"Settings",onClick:()=>cy(i)},"⚙️")}function Jx(){const i=P("i"),t=P("div",{class:"ld-sub"},"PREPARING YOUR ESCAPE…");return{el:P("div",{class:"loading",role:"progressbar","aria-label":"Loading"},P("div",{class:"sun-disc"}),P("div",{class:"landscape",html:`<svg viewBox="0 0 1200 400" preserveAspectRatio="none"><path d="M0 220 Q150 120 300 190 T600 170 T900 200 T1200 150 V400 H0Z" fill="#5a6f6a" opacity=".55"/><path d="M0 270 Q200 200 380 250 T760 240 T1200 230 V400 H0Z" fill="#3f5a4c"/><path d="M0 320 Q260 280 520 310 T1200 300 V400 H0Z" fill="#2c4636"/>${Array.from({length:14},(n,s)=>`<path d="M${60+s*85} ${300-s%3*12} l14 -46 l14 46z" fill="#22382b"/>`).join("")}</svg>`}),P("div",{class:"ld-center"},P("div",{class:"ld-title"},"Let It Grow"),t,P("div",{class:"bar"},i))),set(n,s){i.style.width=`${Math.round(n*100)}%`,t.textContent=s.toUpperCase()+"…"}}}function Dh(){Ls().append(P("div",{class:"screen webgl-error"},P("div",{},P("h1",{},"Your escape needs 3D graphics"),P("p",{},"This browser or device could not start WebGL. Try enabling hardware acceleration, updating your browser, or opening the game on another device."))))}function Qx(){ro("Graphics were interrupted. Reloading the view will start a fresh session.")}function ty(i){return P("div",{class:"intro"},P("div",{class:"brand"},"Let It Grow",P("small",{},"A SESSION-ONLY ESCAPE")),P("div",{class:"intro-card"},P("h1",{},P("span",{},"BUILD IT."),P("span",{},"ENJOY IT."),P("span",{},"LET IT GO.")),P("p",{},"Your world lives only for this play session. Your farms, land and game cash aren’t permanently saved. Refreshing or leaving starts a new adventure. Game cash has no real-world monetary value."),P("button",{class:"btn gold",autofocus:!0,onClick:()=>{te.unlock(),i.playArcade()}},"START MY ESCAPE",P("span",{class:"ico","aria-hidden":"true"},"→")),P("div",{class:"fine"},"Drive · Earn game cash · Buy land · Build anything, free")))}function ey(i){const t=P("div",{class:"val"},"0"),e=P("div",{class:"mult"},"x1"),n=P("i"),s=P("span",{class:"v"},"0"),r=P("i"),o=P("div",{class:"score-box"},P("div",{class:"lbl"},"POINTS"),t),a=P("div",{class:"hud","aria-label":"Driving HUD"},P("div",{class:"hud-top"},o),P("div",{class:"speedo"},s,P("span",{class:"u"}," KM/H"),P("div",{class:"boost",title:"Boost (W / ↑)"},r)),P("div",{class:"combo"},P("div",{class:"lbl"},"COMBO"),e,P("div",{class:"meter"},n)),P("div",{class:"touch-hint touch-only"},P("span",{},"◀ HOLD LEFT"),P("span",{},"TWO FINGERS = BOOST"),P("span",{},"HOLD RIGHT ▶")));let c=1,l=null;const h=["#fbf6ec","#fbf6ec","#f2e08a","#f2c86a","#f29a5a","#ff7a5a"];return{el:a,score(u,d,f,m,_){t.textContent=ps(u),e.textContent="x"+d,n.style.width=`${_n(f,0,1)*100}%`,s.textContent=String(Math.round(m)),r.style.width=`${_*100}%`,d!==c&&(e.style.color=h[d],e.classList.remove("bump"),e.offsetWidth,e.classList.add("bump"),c=d)},event(u,d,f,m){if(u==="combo"){js(a,m>=5?"MAX COMBO x5!":`COMBO x${m}`);return}if(u==="scrape"){js(a,"SCRAPED!");return}if(u==="near"&&js(a,"NEAR MISS!"),u==="perfect"&&js(a,"PERFECT GATE!"),u==="gate"&&js(a,"BONUS GATE"),!f)return;const _=P("div",{class:"float-pts"},"+"+ps(d));_.style.left=f.x+"px",_.style.top=f.y+"px",a.append(_);const g=o.getBoundingClientRect();requestAnimationFrame(()=>{_.style.transform=`translate(calc(-50% + ${g.left+g.width/2-f.x}px), calc(-50% + ${g.top+g.height/2-f.y}px)) scale(0.6)`,_.style.opacity="0"}),setTimeout(()=>_.remove(),700)},showTutorial(){const u=P("div",{class:"tutorial"},P("div",{class:"step"},P("b",{},"STEER"),P("span",{class:"mouse-only"},"A / D or ← →"),P("span",{class:"touch-only"},"Hold left / right")),P("div",{class:"step"},P("b",{},"DODGE"),P("span",{},"Traffic & cones")),P("div",{class:"step"},P("b",{},"EARN"),P("span",{},"Tokens, gates, near misses")));a.append(u),setTimeout(()=>u.classList.add("out"),4200),setTimeout(()=>u.remove(),4800)},setPaused(u){u&&!l?(l=P("div",{class:"pause-veil"},P("div",{},P("h2",{},"Paused"),P("button",{class:"btn gold",onClick:()=>this.setPaused(!1)},"KEEP DRIVING"))),a.append(l),l.querySelector("button").focus()):!u&&l&&(l.remove(),l=null,i.arcade.setPaused(!1),te.suspend(!1))}}}function js(i,t){i.querySelectorAll(".callout").forEach(n=>n.remove());const e=P("div",{class:"callout"},t);i.append(e),setTimeout(()=>e.remove(),950)}function ny(i,t,e,n){const s=(_,g,p)=>P("div",{class:"stat",style:{animationDelay:`${.15+p*.08}s`}},P("div",{class:"k"},_),P("div",{class:"v"},g)),r=P("div",{class:"pts"},"0"),o=P("div",{class:"cash"},"+"+Cn(0)),a=P("div",{class:"v"},Cn(e.before)),c=P("div",{class:"balance-row"},P("div",{class:"k"},"BALANCE"),a),l=P("div",{class:"hint-line"}),h=ct.get().ownedLandIds.length>0,u=P("div",{class:"actions",style:{opacity:"0",transition:"opacity .4s"}}),d=P("div"),f=P("div",{class:"panel",role:"dialog","aria-label":"Run results"},P("h2",{},e.earned<300?"SHORT GETAWAY":"GETAWAY COMPLETE"),P("div",{class:"sub"},`RUN ${ct.get().arcadeStats.runs} · THIS SESSION`),P("div",{class:"stats"},s("DISTANCE",ps(t.distance)+" m",0),s("TOKENS",ps(t.tokens),1),s("NEAR MISSES",ps(t.nearMisses),2),s("BEST COMBO","x"+t.bestCombo,3)),P("div",{class:"convert"},P("div",{class:"arrow"},"TOTAL POINTS"),r,P("div",{class:"arrow"},"↓  1 POINT = $1 GAME CASH"),o),c,d,l,u),m=P("div",{class:"results"},f);return(async()=>{await xi(i.reducedMotion?50:650),await hc(r,0,e.earned,i.reducedMotion?50:1100,ps,!0),o.textContent="+"+Cn(e.earned)+" GAME CASH",o.classList.add("on"),te.cashDing(),await xi(350),await hc(a,e.before,e.after,i.reducedMotion?50:900,Cn),c.classList.add("glow");const _=gn.filter(x=>!ct.isOwned(x.id)&&x.price<=e.after),g=gn.find(x=>!ct.isOwned(x.id)&&x.price>e.after);e.earned===0?l.textContent="Every escape counts. Steer clear of traffic and grab those tokens!":_.length?l.textContent=`You can afford ${_[_.length-1].name}!`:g&&(l.textContent=`${Cn(g.price-e.after)} more for ${g.name}. One more run?`),n&&e.earned>0&&d.replaceWith(P("div",{class:"paradise"},"YOUR FIRST PIECE OF PARADISE IS WAITING."));const p=P("button",{class:"btn primary",onClick:()=>i.playArcade()},"▶ PLAY AGAIN"),y=P("button",{class:"btn "+(_.length?"gold":""),onClick:()=>i.openMarket(_.length?_[_.length-1].id:void 0)},"EXPLORE LAND"),v=P("div",{class:"row"},p,y);u.append(v),h&&u.append(P("button",{class:"btn",onClick:()=>i.openFarm()},"🏡 VISIT FARM")),u.style.opacity="1",(_.length?y:p).focus()})(),m}function iy(i){const t=P("div",{class:"market"}),e=P("div",{class:"veil"}),n=ct.get(),s=P("div",{class:"topbar"},P("div",{class:"brand",style:{position:"static"}},"Destinations",P("small",{},"OWN AS MANY AS YOU CAN EARN")),P("div",{class:"spacer"}),ku(),n.activeLandId?P("button",{class:"btn small hide-sm",onClick:()=>i.openFarm()},"🏡 MY FARM"):null,P("button",{class:"btn small primary",onClick:()=>i.playArcade()},"▶ PLAY"),Bu(i)),r=P("div",{class:"dest-main"}),o=P("div",{class:"strip",role:"tablist","aria-label":"Destinations"});t.append(e,s,P("div",{class:"dest"},r,o));const a=()=>gn.findIndex(u=>u.id===i.marketFocus),c=async u=>{const d=(a()+u+gn.length)%gn.length;await i.previewLand(gn[d].id),l()},l=()=>{const u=lr[i.marketFocus],d=ct.get(),f=ct.isOwned(u.id),m=ct.shortfall(u.id),_=a();let g;if(f)g=P("div",{class:"price-col"},P("div",{class:"price owned"},"✓ OWNED"),P("button",{class:"btn primary",onClick:()=>i.visitLand(u.id)},"VISIT PROPERTY"));else if(m===0){const y=P("button",{class:"btn gold"},"BUY LAND");y.addEventListener("click",()=>{y.setAttribute("disabled",""),p.classList.add("purchase-glow"),i.buyLand(u.id)||y.removeAttribute("disabled")}),g=P("div",{class:"price-col"},P("div",{class:"price"},Cn(u.price)),P("div",{class:"need",style:{color:"var(--forest)"}},"YOU CAN AFFORD THIS"),y)}else g=P("div",{class:"price-col"},P("div",{class:"price"},Cn(u.price)),P("div",{class:"need"},`YOU NEED ${Cn(m)} MORE`),P("div",{class:"progress","aria-label":"Progress toward this land"},P("i",{style:{width:`${_n(d.sessionCash/u.price,0,1)*100}%`}})),P("button",{class:"btn primary",onClick:()=>i.playArcade()},"▶ PLAY TO EARN"));const p=P("div",{class:"dest-card"},P("div",{},P("div",{class:"tier"},`DESTINATION ${_+1} OF ${gn.length}`),P("h2",{},u.name),P("div",{class:"tag"},u.tagline),P("div",{class:"mood"},u.mood),P("div",{class:"feats"},u.features.map(y=>P("span",{},y)))),g);r.replaceChildren(P("button",{class:"arrow-btn prev","aria-label":"Previous destination",onClick:()=>c(-1)},"‹"),p,P("button",{class:"arrow-btn next","aria-label":"Next destination",onClick:()=>c(1)},"›")),o.replaceChildren(...gn.map(y=>{const v=ct.isOwned(y.id),x=!v&&ct.shortfall(y.id)===0;return P("button",{role:"tab","aria-current":String(y.id===u.id),"aria-label":`${y.name}, ${v?"owned":x?"affordable":"locked"}`,onClick:async()=>{y.id!==i.marketFocus&&(await i.previewLand(y.id),l())}},P("span",{class:"st"},v?"✓":x?"★":"🔒"),y.name)}))};l();const h=u=>{if(!t.isConnected)return window.removeEventListener("keydown",h);document.querySelector(".modal-back")||(u.key==="ArrowLeft"&&c(-1),u.key==="ArrowRight"&&c(1))};return window.addEventListener("keydown",h),t}function sy(i){return P("div",{class:"reveal"},P("div",{},P("h1",{},P("span",{},"YOUR LAND."),P("span",{},"YOUR RULES.")),P("div",{class:"where"},i.toUpperCase()+" · OWNED")))}function ry(i){const t=ct.get(),e=lr[t.activeLandId],n=i.builder,s=P("div",{class:"farm-ui"}),r=P("div",{class:"seg hide-sm",role:"group","aria-label":"Time of day"}),o=()=>r.replaceChildren(...["AUTO","DAY","SUNSET","NIGHT"].map(U=>P("button",{"aria-pressed":String(ct.get().timeMode===U),onClick:()=>{ct.setTimeMode(U),o()}},U)));o();const a=[{w:"clear",i:"☀️",n:"Clear"},{w:"cloudy",i:"⛅",n:"Partly cloudy"},{w:"mist",i:"🌫️",n:"Mist"},{w:"rain",i:"🌧️",n:"Light rain"}],c=P("button",{class:"icon-btn","aria-label":"Weather",title:"Weather"}),l=()=>{const U=a.find(X=>X.w===ct.get().weather);c.textContent=U.i,c.title="Weather: "+U.n};c.addEventListener("click",()=>{te.click();const U=a.findIndex(H=>H.w===ct.get().weather),X=a[(U+1)%a.length];ct.setWeather(X.w),ro(X.i+" "+X.n),l()}),l();const h=P("span",{style:{fontSize:"11px",opacity:"0.7",letterSpacing:".1em"}}),u=P("div",{class:"topbar"},P("div",{class:"chip land-chip"},P("span",{class:"dot",style:{background:e.accent}}),e.name.toUpperCase(),h),ku(),P("div",{class:"spacer"}),r,c,P("button",{class:"icon-btn","aria-label":"Photo mode",title:"Photo mode",onClick:()=>i.enterPhoto()},"📷"),P("button",{class:"btn small",onClick:()=>i.openMarket(),title:"My properties & destinations"},"🗺 LAND"),P("button",{class:"btn small primary",onClick:()=>i.playArcade()},"▶ ONE MORE RUN"),Bu(i));let d="HOUSE";const f=P("div",{class:"cats",role:"tablist","aria-label":"Build categories"}),m=P("div",{class:"tray",role:"listbox","aria-label":"Items"}),_=P("button",{class:"undo-btn",title:"Undo (Ctrl+Z)","aria-label":"Undo last change",onClick:()=>{n.undo()||ro("Nothing to undo"),g()}},"↶ UNDO"),g=()=>_.toggleAttribute("disabled",!n.canUndo()),p=U=>m.scrollBy({left:U*m.clientWidth*.8,behavior:"smooth"}),y=P("button",{class:"tray-arrow left","aria-label":"Scroll items left",onClick:()=>p(-1)},"‹"),v=P("button",{class:"tray-arrow right","aria-label":"Scroll items right",onClick:()=>p(1)},"›"),x=()=>{y.toggleAttribute("hidden",m.scrollLeft<4),v.toggleAttribute("hidden",m.scrollLeft+m.clientWidth>=m.scrollWidth-4)};m.addEventListener("scroll",x),m.addEventListener("wheel",U=>{Math.abs(U.deltaY)>Math.abs(U.deltaX)&&(m.scrollLeft+=U.deltaY,U.preventDefault())},{passive:!1});let I=null;m.addEventListener("pointerdown",U=>{U.pointerType==="mouse"&&(I={x:U.clientX,left:m.scrollLeft,moved:!1})}),window.addEventListener("pointermove",U=>{if(I){const X=U.clientX-I.x;Math.abs(X)>5&&(I.moved=!0),m.scrollLeft=I.left-X}}),window.addEventListener("pointerup",()=>setTimeout(()=>I=null,0)),m.addEventListener("click",U=>{I!=null&&I.moved&&(U.stopPropagation(),U.preventDefault())},!0);const T=P("div",{class:"dock"},P("div",{class:"dock-head"},f,_),P("div",{class:"tray-wrap"},y,m,v)),L=ct.subscribe((U,X)=>{if(!T.isConnected)return L();(X==="objects"||X==="active-land")&&g()}),D=()=>f.replaceChildren(...Ux.map(U=>P("button",{role:"tab","aria-pressed":String(U.id===d),onClick:()=>{d=U.id,D(),w()}},P("span",{"aria-hidden":"true"},U.icon),U.label.toUpperCase()))),w=()=>{m.replaceChildren(...Ou.filter(U=>U.category===d).map(U=>P("button",{class:"item",role:"option","aria-pressed":String(n.placingAsset===U.id),"aria-label":U.label,onClick:()=>{n.placingAsset===U.id?n.cancel():n.startPlacing(U.id),w()}},P("span",{class:"e","aria-hidden":"true"},U.icon),P("span",{class:"n"},U.label)))),m.scrollLeft=0,requestAnimationFrame(x),m.style.animation="none",m.offsetWidth,m.style.animation=""};D(),w();const M=P("div",{class:"passthrough"}),R=U=>{const X=vn[U],H=P("span",{class:"why"}),tt=P("div",{class:"place-hint",role:"status"},P("span",{},X.icon+" "+X.label),P("span",{class:"mouse-only",style:{opacity:".75"}},"· Click to place · R rotate · Esc done"),P("span",{class:"touch-only",style:{opacity:".75"}},"· Drag to position"),H,P("button",{class:"btn small",onClick:()=>n.rotate(1),"aria-label":"Rotate"},"⟳"),P("button",{class:"btn small touch-only gold",onClick:()=>n.commit()},"PLACE"),P("button",{class:"btn small primary",onClick:()=>{n.cancel(),w()}},"DONE"));M.replaceChildren(tt),tt._why=H};let B=!1;const k=U=>{const X=vn[U.assetId],H=(dt,xt,zt,ie="")=>P("button",{class:"tool "+ie,onClick:zt,"aria-label":xt},P("span",{class:"e","aria-hidden":"true"},dt),xt),tt=Object.keys(X.colorSlots),ht=[P("div",{class:"selbar",role:"toolbar","aria-label":X.label+" tools"},P("div",{class:"ttl"},X.icon+" "+X.label),H("✥","MOVE",()=>n.moveSelected()),H("⟳","ROTATE",()=>n.rotate(1)),H("−","SMALLER",()=>n.scaleStep(-1)),H("+","BIGGER",()=>n.scaleStep(1)),H("⧉","COPY",()=>n.duplicate()),tt.length?H("🎨","COLOR",()=>{B=!B,k(U)}):null,H("🗑","DELETE",()=>n.deleteSelected(),"danger"),H("✓","DONE",()=>{n.cancel()}))];if(B&&tt.length){let dt=tt[0];const xt=P("div",{class:"swatches"}),zt=()=>{var j;const ie=(j=ct.activeLand())==null?void 0:j.placedObjects.find(et=>et.uid===U.uid);xt.replaceChildren(tt.length>1?P("div",{class:"slots"},...tt.map(et=>P("button",{"aria-pressed":String(et===dt),onClick:()=>{dt=et,zt()}},et.toUpperCase()))):P("div",{class:"slots"},P("button",{"aria-pressed":"true"},"COLOR")),P("div",{class:"grid"},...Nx.map(et=>P("button",{style:{background:et},"aria-label":"Color "+et,"aria-pressed":String((ie==null?void 0:ie.colors[dt])===et),onClick:()=>{n.setColor(dt,et),zt()}}))))};zt(),ht.push(xt)}M.replaceChildren(...ht)};return s.append(u,M,T),{el:s,onSelect(U){U?k(U):n.mode!=="placing"&&n.mode!=="moving"&&M.replaceChildren()},onMode(U,X){U==="placing"||U==="moving"?(B=!1,R(X)):U==="idle"&&(M.replaceChildren(),B=!1),w()},onPlaced(U,X){const H=P("div",{class:"place-pop",style:{left:X.x+"px",top:X.y+"px"}});s.append(H),setTimeout(()=>H.remove(),650)},onInvalid(U){var H;const X=(H=M.firstElementChild)==null?void 0:H._why;X?(X.textContent="· "+U,setTimeout(()=>{X.textContent==="· "+U&&(X.textContent="")},1600)):ro(U)},showFreeBanner(){const U=P("div",{class:"free-banner",role:"dialog","aria-label":"Builder tutorial"},P("h3",{},"THE LAND WAS THE HARD PART. EVERYTHING YOU BUILD HERE IS FREE."),P("p",{},"Pick anything from the toolbar and place it on your property. Click a placed object to move, rotate, resize, recolor or remove it."),P("div",{class:"keys mouse-only"},P("span",{},"Drag · orbit"),P("span",{},"Scroll · zoom"),P("span",{},"Right-drag · pan"),P("span",{},"R · rotate")),P("div",{class:"keys touch-only"},P("span",{},"1 finger · orbit"),P("span",{},"2 fingers · zoom & pan"),P("span",{},"Tap · select")),P("button",{class:"btn primary",onClick:()=>{U.remove(),n.startPlacing(oy(e.id)),d="HOUSE",D(),w()}},"START BUILDING"));s.append(U),U.querySelector("button").focus()},tick(){const U=i.world.sky.t,X=" · "+Yx(U).toUpperCase();h.textContent!==X&&(h.textContent=X)}}}function oy(i){return{meadow:"house_country",forest:"house_cabin",lakefront:"house_lake",mountain:"house_stone",beachfront:"house_villa",island:"house_villa"}[i]}function ay(i){const t=["MORNING","DAY","SUNSET","NIGHT"],e=P("div",{class:"seg",role:"group","aria-label":"Lighting"}),n=()=>e.replaceChildren(...t.map(o=>P("button",{"aria-pressed":String(ct.get().timeMode===o),onClick:()=>{ct.setTimeMode(o),n()}},o)));n();const s=P("div",{class:"letterbox",style:{pointerEvents:"none"}},P("div",{class:"photo-label"},"PHOTO MODE · DRAG TO FRAME YOUR SHOT"),P("div",{class:"photo-bar",style:{pointerEvents:"auto"}},e,P("button",{class:"btn small primary",onClick:()=>i.exitPhoto()},"✕ EXIT"))),r=o=>{if(!s.isConnected)return window.removeEventListener("keydown",r);o.key==="Escape"&&i.exitPhoto()};return window.addEventListener("keydown",r),s}function cy(i){var l;const t=ct.get().settings,e=(h,u)=>{const d=P("output",{},Math.round(t[u]*100)+"%"),f=P("input",{type:"range",min:"0",max:"100",value:String(Math.round(t[u]*100)),"aria-label":h+" volume"});return f.addEventListener("input",()=>{ct.setSetting(u,Number(f.value)/100),d.textContent=f.value+"%"}),P("label",{class:"setting"},h,f,d)},n=P("input",{type:"checkbox"});n.checked=t.reducedMotion,n.addEventListener("change",()=>ct.setSetting("reducedMotion",n.checked));const s=P("select",{"aria-label":"Graphics quality",style:{font:"inherit",fontWeight:"700",padding:"6px 10px",borderRadius:"10px"}},...["auto","high","low"].map(h=>P("option",{value:h,selected:t.quality===h},h.toUpperCase())));s.addEventListener("change",()=>ct.setSetting("quality",s.value));const r=ct.get().sessionAchievements,o=P("div",{class:"modal-back"}),a=()=>{o.remove(),window.removeEventListener("keydown",c)},c=h=>h.key==="Escape"&&a();window.addEventListener("keydown",c),o.addEventListener("click",h=>h.target===o&&a()),o.append(P("div",{class:"modal",role:"dialog","aria-modal":"true","aria-label":"Settings"},P("h2",{},"Settings"),e("Master","master"),e("Music","music"),e("Effects","sfx"),e("Ambience","ambience"),P("label",{class:"toggle"},"Reduced motion",n),P("label",{class:"toggle"},"Graphics quality",s),P("h2",{style:{fontSize:"18px",marginTop:"18px"}},`Session achievements · ${r.length}/${Object.keys(po).length}`),P("div",{class:"ach-list"},...Object.entries(po).map(([h,u])=>P("div",{class:r.includes(h)?"on":""},P("span",{},u.icon),P("b",{},u.title),P("span",{style:{opacity:".7"}},u.desc)))),P("div",{class:"danger-zone"},P("p",{},"Want a fresh adventure? Starting over clears this session completely."),P("button",{class:"btn danger small",onClick:()=>{a(),ly(i)}},"START OVER")),P("div",{class:"session-note"},"Nothing here is ever saved — not even these settings. Game cash has no real-world monetary value."),P("div",{class:"row"},P("button",{class:"btn primary",onClick:a},"DONE")))),Ls().append(o),(l=o.querySelector("input"))==null||l.focus()}function ly(i){const t=P("div",{class:"modal-back"}),e=()=>t.remove(),n=P("button",{class:"btn primary",onClick:e},"KEEP PLAYING");t.append(P("div",{class:"modal",role:"alertdialog","aria-modal":"true","aria-label":"Start over?"},P("h2",{},"START OVER?"),P("p",{},"This will erase all land, farms, game cash and progress from your current session."),P("div",{class:"row"},n,P("button",{class:"btn danger",onClick:()=>{e(),i.startOver()}},"START OVER")))),Ls().append(t),n.focus()}class hy{constructor(t){V(this,"renderer");V(this,"world");V(this,"arcade");V(this,"builder");V(this,"hud",null);V(this,"farmUi",null);V(this,"clock",new ov);V(this,"mode","world");V(this,"isMobile",matchMedia("(pointer: coarse)").matches||Math.min(screen.width,screen.height)<600);V(this,"maxPR");V(this,"pr");V(this,"fpsAcc",0);V(this,"fpsFrames",0);V(this,"busy",!1);V(this,"marketFocus","meadow");V(this,"cameFromFarm",!1);this.canvas=t,this.renderer=new a_({canvas:t,antialias:!this.isMobile,powerPreference:"high-performance"}),this.renderer.outputColorSpace=We,this.renderer.toneMapping=Fh,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Nh,this.maxPR=Math.min(window.devicePixelRatio||1,this.isMobile?1.75:2),this.pr=this.maxPR,this.renderer.setPixelRatio(this.pr),this.world=new Zx(t,this.isMobile?1024:2048),this.arcade=new gx({onScore:(e,n,s,r,o)=>{var a;return(a=this.hud)==null?void 0:a.score(e,n,s,r,o)},onEvent:(e,n,s,r)=>{var o;return(o=this.hud)==null?void 0:o.event(e,n,s,r)},onEnd:e=>this.endRun(e)}),this.builder=new Kx(this.world,t,{onSelect:e=>{var n;return(n=this.farmUi)==null?void 0:n.onSelect(e)},onMode:(e,n)=>{var s;return(s=this.farmUi)==null?void 0:s.onMode(e,n)},onPlaced:(e,n)=>{var s;return(s=this.farmUi)==null?void 0:s.onPlaced(e,n)},onInvalid:e=>{var n;return(n=this.farmUi)==null?void 0:n.onInvalid(e)}}),this.applySettings(),ct.subscribe((e,n)=>{n.startsWith("achievement:")&&$x(n.split(":")[1]),n==="settings"&&this.applySettings()}),window.addEventListener("resize",()=>this.resize()),window.addEventListener("orientationchange",()=>setTimeout(()=>this.resize(),200)),document.addEventListener("visibilitychange",()=>{const e=document.hidden;e&&this.arcade.setPaused(!0),te.suspend(e),e&&this.hud&&this.hud.setPaused(!0)}),window.addEventListener("blur",()=>{var e;this.mode==="arcade"&&this.arcade.running&&(this.arcade.setPaused(!0),(e=this.hud)==null||e.setPaused(!0))}),t.addEventListener("webglcontextlost",e=>{e.preventDefault(),Qx()}),this.resize()}get reducedMotion(){return ct.get().settings.reducedMotion}applySettings(){const t=ct.get().settings;te.setVolumes({master:t.master,music:t.music,sfx:t.sfx,ambience:t.ambience}),this.world.reducedMotion=t.reducedMotion,document.documentElement.classList.toggle("reduced-motion",t.reducedMotion),t.quality==="low"?(this.maxPR=1,this.renderer.shadowMap.enabled=!1):(this.maxPR=Math.min(window.devicePixelRatio||1,this.isMobile?1.75:2),this.renderer.shadowMap.enabled=!0),this.pr=Math.min(this.pr,this.maxPR),t.quality==="high"&&(this.pr=this.maxPR),this.renderer.setPixelRatio(this.pr),this.renderer.shadowMap.needsUpdate=!0,this.world.scene.traverse(e=>{const n=e.material;n&&(n.needsUpdate=!0)})}resize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.world.camera.aspect=t/e,this.world.camera.fov=t/e<.8?58:42,this.world.camera.updateProjectionMatrix(),this.arcade.setAspect(t/e)}async preload(t){const e=[["Paving the getaway road",()=>this.renderer.compile(this.arcade.scene,this.arcade.camera)],["Growing the meadow",()=>this.world.showLand("meadow")],["Lighting the sky",()=>this.renderer.compile(this.world.scene,this.world.camera)],["Planting the pines",()=>this.world.getEnvironment("forest")]];for(let n=0;n<e.length;n++){t(n/e.length,e[n][0]),await xi(30);try{e[n][1]()}catch(s){console.warn("[preload]",e[n][0],s)}}t(1,"Ready")}start(){const t=()=>{var n;requestAnimationFrame(t);const e=Math.min(this.clock.getDelta(),.1);if(this.adaptQuality(e),this.mode==="arcade")this.arcade.update(e),this.renderer.render(this.arcade.scene,this.arcade.camera);else{const s=ct.get().scene;this.world.update(e,s==="FARM"||s==="PHOTO_MODE"||s==="LAND_PURCHASE"||s==="LAND_SELECTION"||s==="INTRO"),this.builder.update(performance.now()/1e3),(n=this.farmUi)==null||n.tick(),this.renderer.render(this.world.scene,this.world.camera)}};t()}adaptQuality(t){if(ct.get().settings.quality==="auto"&&(this.fpsAcc+=t,this.fpsFrames++,this.fpsAcc>2)){const e=this.fpsFrames/this.fpsAcc;this.fpsAcc=0,this.fpsFrames=0;const n=this.isMobile?.75:1;if(e<45&&this.pr>n)this.pr=Math.max(n,this.pr-.25);else if(e>58&&this.pr<this.maxPR)this.pr=Math.min(this.maxPR,this.pr+.25);else return;this.renderer.setPixelRatio(this.pr),this.resize()}}setScene(t){ct.setScene(t)}showIntro(){this.setScene("INTRO"),this.mode="world",this.world.showLand("meadow"),ct.setTimeMode("AUTO"),this.world.sky.t=.68,this.world.enterMarket(),this.world.camera.position.set(-70,40,60),ui(ty(this))}playArcade(){this.busy||(this.busy=!0,te.unlock(),this.builder.setEnabled(!1),this.farmUi=null,us(()=>{this.mode="arcade",this.setScene("ARCADE"),ct.beginRun(),this.arcade.start(this.reducedMotion),this.hud=ey(this),ui(this.hud.el),ct.get().seenDriveTutorial||(this.hud.showTutorial(),ct.markTutorial("drive")),te.setAmbience("road"),te.setMusic("arcade"),this.busy=!1},this.reducedMotion))}endRun(t){this.arcade.stop();const e=ct.get().arcadeStats.runs===0,n=ct.completeRun(t);this.hud=null,this.setScene("ARCADE_RESULTS"),te.setMusic("intro"),ui(ny(this,t,n,e))}openMarket(t){var s,r;if(this.busy)return;this.busy=!0;const e=ct.get();this.cameFromFarm=e.scene==="FARM",this.builder.setEnabled(!1),this.farmUi=null;const n=t??((s=gn.find(o=>!ct.isOwned(o.id)&&o.price>e.sessionCash))==null?void 0:s.id)??((r=gn.find(o=>!ct.isOwned(o.id)))==null?void 0:r.id)??"meadow";this.marketFocus=n,us(()=>{this.arcade.stop(),this.mode="world",this.setScene("LAND_SELECTION"),this.world.showLand(n),this.world.enterMarket(),this.world.camera.position.set(80,50,40),ct.get().timeMode==="AUTO"&&(this.world.sky.t=Math.max(this.world.sky.t,.3)),ui(iy(this)),te.setMusic("market"),te.setAmbience(this.world.env.ambience),this.busy=!1},this.reducedMotion)}async previewLand(t){this.marketFocus=t,await us(()=>{this.world.showLand(t),this.world.camera.position.set(80,50,40),te.setAmbience(this.world.env.ambience)},this.reducedMotion)}buyLand(t){return this.busy||!ct.purchaseLand(t)?!1:(this.busy=!0,te.purchase(),this.setScene("LAND_PURCHASE"),ct.setActiveLand(t),(async()=>(await xi(this.reducedMotion?50:650),await us(()=>{this.world.showLand(t),this.world.camera.position.set(-110,80,120),ui(sy(lr[t].name)),te.whoosh(),te.setAmbience(this.world.env.ambience),te.setMusic("farm")},this.reducedMotion),this.world.flyIn(5,()=>{this.busy=!1,this.openFarm()})))(),!0)}visitLand(t){this.busy||!ct.isOwned(t)||(this.busy=!0,us(()=>{ct.setActiveLand(t),this.mode="world",this.world.showLand(t),this.world.resetOrbitView(),te.setAmbience(this.world.env.ambience),te.setMusic("farm"),this.busy=!1,this.openFarm()},this.reducedMotion))}openFarm(){var e;const t=ct.get();if(!t.activeLandId)return this.openMarket();this.mode="world",this.setScene("FARM"),((e=this.world.env)==null?void 0:e.id)!==t.activeLandId&&this.world.showLand(t.activeLandId),this.world.exitPhoto(),this.builder.setEnabled(!0),this.farmUi=ry(this),ui(this.farmUi.el),t.seenBuilderTutorial||(ct.markTutorial("builder"),this.farmUi.showFreeBanner())}enterPhoto(){this.builder.setEnabled(!1),this.farmUi=null,this.setScene("PHOTO_MODE"),this.world.enterPhoto(),ui(ay(this))}exitPhoto(){this.openFarm()}startOver(){us(()=>{this.arcade.stop(),this.builder.setEnabled(!1),ct.resetSession(),this.builder.clearHistory(),this.farmUi=null,this.hud=null,this.showIntro()},this.reducedMotion)}}function uy(){try{const i=document.createElement("canvas");return!!(i.getContext("webgl2")||i.getContext("webgl"))}catch{return!1}}async function dy(){const i=Jx();if(ui(i.el),!uy()){i.el.remove(),Dh();return}await xi(250);let t;try{t=new hy(document.getElementById("scene"))}catch(e){console.error(e),i.el.remove(),Dh();return}await t.preload((e,n)=>i.set(e,n)),t.start(),await xi(400),t.showIntro()}dy();export{l_ as $,vy as A,Ie as B,lt as C,Cu as D,ee as E,Sy as F,_u as G,gu as H,Ec as I,xy as J,yo as K,fr as L,yy as M,_r as N,Ce as O,sv as P,bn as Q,Ms as R,We as S,py as T,Ee as U,nt as V,Ze as W,nc as X,ou as Y,mu as Z,My as _,gy as a,ao as a0,tc as a1,fu as a2,Be as a3,fo as a4,uo as a5,Eo as a6,ae as a7,vi as a8,wo as a9,yi as aa,ei as ab,my as b,Ey as c,Ts as d,wy as e,Wt as f,A as g,th as h,by as i,Ty as j,_y as k,Ni as l,Co as m,yd as n,Pn as o,sn as p,Aa as q,Ui as r,ur as s,Wi as t,Tc as u,Fe as v,xn as w,Qn as x,xe as y,Ae as z};
