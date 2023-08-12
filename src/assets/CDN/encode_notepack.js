/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.17.1.
 * Original file: /npm/notepack.io@2.2.0/lib/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
var t={};function e(t,e,s){for(var i=0,f=0,r=s.length;f<r;f++)(i=s.charCodeAt(f))<128?t.setUint8(e++,i):i<2048?(t.setUint8(e++,192|i>>6),t.setUint8(e++,128|63&i)):i<55296||i>=57344?(t.setUint8(e++,224|i>>12),t.setUint8(e++,128|i>>6&63),t.setUint8(e++,128|63&i)):(f++,i=65536+((1023&i)<<10|1023&s.charCodeAt(f)),t.setUint8(e++,240|i>>18),t.setUint8(e++,128|i>>12&63),t.setUint8(e++,128|i>>6&63),t.setUint8(e++,128|63&i))}function s(t,e,i){var f=typeof i,r=0,h=0,n=0,o=0,_=0,a=0;if("string"===f){if(_=function(t){for(var e=0,s=0,i=0,f=t.length;i<f;i++)(e=t.charCodeAt(i))<128?s+=1:e<2048?s+=2:e<55296||e>=57344?s+=3:(i++,s+=4);return s}(i),_<32)t.push(160|_),a=1;else if(_<256)t.push(217,_),a=2;else if(_<65536)t.push(218,_>>8,_),a=3;else{if(!(_<4294967296))throw new Error("String too long");t.push(219,_>>24,_>>16,_>>8,_),a=5}return e.push({_str:i,_length:_,_offset:t.length}),a+_}if("number"===f)return Math.floor(i)===i&&isFinite(i)?i>=0?i<128?(t.push(i),1):i<256?(t.push(204,i),2):i<65536?(t.push(205,i>>8,i),3):i<4294967296?(t.push(206,i>>24,i>>16,i>>8,i),5):(n=i/Math.pow(2,32)>>0,o=i>>>0,t.push(207,n>>24,n>>16,n>>8,n,o>>24,o>>16,o>>8,o),9):i>=-32?(t.push(i),1):i>=-128?(t.push(208,i),2):i>=-32768?(t.push(209,i>>8,i),3):i>=-2147483648?(t.push(210,i>>24,i>>16,i>>8,i),5):(n=Math.floor(i/Math.pow(2,32)),o=i>>>0,t.push(211,n>>24,n>>16,n>>8,n,o>>24,o>>16,o>>8,o),9):(t.push(203),e.push({_float:i,_length:8,_offset:t.length}),9);if("object"===f){if(null===i)return t.push(192),1;if(Array.isArray(i)){if((_=i.length)<16)t.push(144|_),a=1;else if(_<65536)t.push(220,_>>8,_),a=3;else{if(!(_<4294967296))throw new Error("Array too large");t.push(221,_>>24,_>>16,_>>8,_),a=5}for(r=0;r<_;r++)a+=s(t,e,i[r]);return a}if(i instanceof Date){var u=i.getTime();return n=Math.floor(u/Math.pow(2,32)),o=u>>>0,t.push(215,0,n>>24,n>>16,n>>8,n,o>>24,o>>16,o>>8,o),10}if(i instanceof ArrayBuffer){if((_=i.byteLength)<256)t.push(196,_),a=2;else if(_<65536)t.push(197,_>>8,_),a=3;else{if(!(_<4294967296))throw new Error("Buffer too large");t.push(198,_>>24,_>>16,_>>8,_),a=5}return e.push({_bin:i,_length:_,_offset:t.length}),a+_}if("function"==typeof i.toJSON)return s(t,e,i.toJSON());var g=[],w="",p=Object.keys(i);for(r=0,h=p.length;r<h;r++)"function"!=typeof i[w=p[r]]&&g.push(w);if((_=g.length)<16)t.push(128|_),a=1;else if(_<65536)t.push(222,_>>8,_),a=3;else{if(!(_<4294967296))throw new Error("Object too large");t.push(223,_>>24,_>>16,_>>8,_),a=5}for(r=0;r<_;r++)a+=s(t,e,w=g[r]),a+=s(t,e,i[w]);return a}if("boolean"===f)return t.push(i?195:194),1;if("undefined"===f)return t.push(212,0,0),3;throw new Error("Could not encode")}var i=function(t){var i=[],f=[],r=s(i,f,t),h=new ArrayBuffer(r),n=new DataView(h),o=0,_=0,a=-1;f.length>0&&(a=f[0]._offset);for(var u,g=0,w=0,p=0,v=i.length;p<v;p++)if(n.setUint8(_+p,i[p]),p+1===a){if(g=(u=f[o])._length,w=_+a,u._bin)for(var c=new Uint8Array(u._bin),l=0;l<g;l++)n.setUint8(w+l,c[l]);else u._str?e(n,w,u._str):void 0!==u._float&&n.setFloat64(w,u._float);_+=g,f[++o]&&(a=f[o]._offset)}return h};function f(t){if(this._offset=0,t instanceof ArrayBuffer)this._buffer=t,this._view=new DataView(this._buffer);else{if(!ArrayBuffer.isView(t))throw new Error("Invalid argument");this._buffer=t.buffer,this._view=new DataView(this._buffer,t.byteOffset,t.byteLength)}}f.prototype._array=function(t){for(var e=new Array(t),s=0;s<t;s++)e[s]=this._parse();return e},f.prototype._map=function(t){for(var e={},s=0;s<t;s++)e[this._parse()]=this._parse();return e},f.prototype._str=function(t){var e=function(t,e,s){for(var i="",f=0,r=e,h=e+s;r<h;r++){var n=t.getUint8(r);if(0!=(128&n))if(192!=(224&n))if(224!=(240&n)){if(240!=(248&n))throw new Error("Invalid byte "+n.toString(16));(f=(7&n)<<18|(63&t.getUint8(++r))<<12|(63&t.getUint8(++r))<<6|(63&t.getUint8(++r))<<0)>=65536?(f-=65536,i+=String.fromCharCode(55296+(f>>>10),56320+(1023&f))):i+=String.fromCharCode(f)}else i+=String.fromCharCode((15&n)<<12|(63&t.getUint8(++r))<<6|(63&t.getUint8(++r))<<0);else i+=String.fromCharCode((31&n)<<6|63&t.getUint8(++r));else i+=String.fromCharCode(n)}return i}(this._view,this._offset,t);return this._offset+=t,e},f.prototype._bin=function(t){var e=this._buffer.slice(this._offset,this._offset+t);return this._offset+=t,e},f.prototype._parse=function(){var t,e=this._view.getUint8(this._offset++),s=0,i=0,f=0,r=0;if(e<192)return e<128?e:e<144?this._map(15&e):e<160?this._array(15&e):this._str(31&e);if(e>223)return-1*(255-e+1);switch(e){case 192:return null;case 194:return!1;case 195:return!0;case 196:return s=this._view.getUint8(this._offset),this._offset+=1,this._bin(s);case 197:return s=this._view.getUint16(this._offset),this._offset+=2,this._bin(s);case 198:return s=this._view.getUint32(this._offset),this._offset+=4,this._bin(s);case 199:return s=this._view.getUint8(this._offset),i=this._view.getInt8(this._offset+1),this._offset+=2,[i,this._bin(s)];case 200:return s=this._view.getUint16(this._offset),i=this._view.getInt8(this._offset+2),this._offset+=3,[i,this._bin(s)];case 201:return s=this._view.getUint32(this._offset),i=this._view.getInt8(this._offset+4),this._offset+=5,[i,this._bin(s)];case 202:return t=this._view.getFloat32(this._offset),this._offset+=4,t;case 203:return t=this._view.getFloat64(this._offset),this._offset+=8,t;case 204:return t=this._view.getUint8(this._offset),this._offset+=1,t;case 205:return t=this._view.getUint16(this._offset),this._offset+=2,t;case 206:return t=this._view.getUint32(this._offset),this._offset+=4,t;case 207:return f=this._view.getUint32(this._offset)*Math.pow(2,32),r=this._view.getUint32(this._offset+4),this._offset+=8,f+r;case 208:return t=this._view.getInt8(this._offset),this._offset+=1,t;case 209:return t=this._view.getInt16(this._offset),this._offset+=2,t;case 210:return t=this._view.getInt32(this._offset),this._offset+=4,t;case 211:return f=this._view.getInt32(this._offset)*Math.pow(2,32),r=this._view.getUint32(this._offset+4),this._offset+=8,f+r;case 212:return i=this._view.getInt8(this._offset),this._offset+=1,0===i?void(this._offset+=1):[i,this._bin(1)];case 213:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(2)];case 214:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(4)];case 215:return i=this._view.getInt8(this._offset),this._offset+=1,0===i?(f=this._view.getInt32(this._offset)*Math.pow(2,32),r=this._view.getUint32(this._offset+4),this._offset+=8,new Date(f+r)):[i,this._bin(8)];case 216:return i=this._view.getInt8(this._offset),this._offset+=1,[i,this._bin(16)];case 217:return s=this._view.getUint8(this._offset),this._offset+=1,this._str(s);case 218:return s=this._view.getUint16(this._offset),this._offset+=2,this._str(s);case 219:return s=this._view.getUint32(this._offset),this._offset+=4,this._str(s);case 220:return s=this._view.getUint16(this._offset),this._offset+=2,this._array(s);case 221:return s=this._view.getUint32(this._offset),this._offset+=4,this._array(s);case 222:return s=this._view.getUint16(this._offset),this._offset+=2,this._map(s);case 223:return s=this._view.getUint32(this._offset),this._offset+=4,this._map(s)}throw new Error("Could not parse")};var r=function(t){var e=new f(t),s=e._parse();if(e._offset!==t.byteLength)throw new Error(t.byteLength-e._offset+" trailing bytes");return s},h=t.encode=i,n=t.decode=r;export{n as decode,t as default,h as encode};