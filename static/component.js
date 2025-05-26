class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const fetchCompile = url => fetch(url).then(WebAssembly.compileStreaming);

const instantiateCore = WebAssembly.instantiate;

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}


let exports0;
let memory0;
let realloc0;
let postReturn0;
let postReturn1;
let exports0Generate;

function generate(arg0, arg1) {
  var ptr0 = realloc0(0, 0, 4, 84);
  var val1 = arg0;
  var len1 = val1.byteLength;
  var ptr1 = realloc0(0, 0, 1, len1 * 1);
  var src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
  (new Uint8Array(memory0.buffer, ptr1, len1 * 1)).set(src1);
  dataView(memory0).setInt32(ptr0 + 4, len1, true);
  dataView(memory0).setInt32(ptr0 + 0, ptr1, true);
  var {name: v2_0, noTypescript: v2_1, instantiation: v2_2, importBindings: v2_3, map: v2_4, compat: v2_5, noNodejsCompat: v2_6, base64Cutoff: v2_7, tlaCompat: v2_8, validLiftingOptimization: v2_9, tracing: v2_10, noNamespacedExports: v2_11, guest: v2_12, multiMemory: v2_13, asyncMode: v2_14 } = arg1;
  var ptr3 = utf8Encode(v2_0, realloc0, memory0);
  var len3 = utf8EncodedLen;
  dataView(memory0).setInt32(ptr0 + 12, len3, true);
  dataView(memory0).setInt32(ptr0 + 8, ptr3, true);
  var variant4 = v2_1;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(ptr0 + 16, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(ptr0 + 16, 1, true);
    dataView(memory0).setInt8(ptr0 + 17, e ? 1 : 0, true);
  }
  var variant6 = v2_2;
  if (variant6 === null || variant6=== undefined) {
    dataView(memory0).setInt8(ptr0 + 18, 0, true);
  } else {
    const e = variant6;
    dataView(memory0).setInt8(ptr0 + 18, 1, true);
    var variant5 = e;
    switch (variant5.tag) {
      case 'async': {
        dataView(memory0).setInt8(ptr0 + 19, 0, true);
        break;
      }
      case 'sync': {
        dataView(memory0).setInt8(ptr0 + 19, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`InstantiationMode\``);
      }
    }
  }
  var variant8 = v2_3;
  if (variant8 === null || variant8=== undefined) {
    dataView(memory0).setInt8(ptr0 + 20, 0, true);
  } else {
    const e = variant8;
    dataView(memory0).setInt8(ptr0 + 20, 1, true);
    var variant7 = e;
    switch (variant7.tag) {
      case 'js': {
        dataView(memory0).setInt8(ptr0 + 21, 0, true);
        break;
      }
      case 'hybrid': {
        dataView(memory0).setInt8(ptr0 + 21, 1, true);
        break;
      }
      case 'optimized': {
        dataView(memory0).setInt8(ptr0 + 21, 2, true);
        break;
      }
      case 'direct-optimized': {
        dataView(memory0).setInt8(ptr0 + 21, 3, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant7.tag)}\` (received \`${variant7}\`) specified for \`BindingsMode\``);
      }
    }
  }
  var variant13 = v2_4;
  if (variant13 === null || variant13=== undefined) {
    dataView(memory0).setInt8(ptr0 + 24, 0, true);
  } else {
    const e = variant13;
    dataView(memory0).setInt8(ptr0 + 24, 1, true);
    var vec12 = e;
    var len12 = vec12.length;
    var result12 = realloc0(0, 0, 4, len12 * 16);
    for (let i = 0; i < vec12.length; i++) {
      const e = vec12[i];
      const base = result12 + i * 16;var [tuple9_0, tuple9_1] = e;
      var ptr10 = utf8Encode(tuple9_0, realloc0, memory0);
      var len10 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len10, true);
      dataView(memory0).setInt32(base + 0, ptr10, true);
      var ptr11 = utf8Encode(tuple9_1, realloc0, memory0);
      var len11 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len11, true);
      dataView(memory0).setInt32(base + 8, ptr11, true);
    }
    dataView(memory0).setInt32(ptr0 + 32, len12, true);
    dataView(memory0).setInt32(ptr0 + 28, result12, true);
  }
  var variant14 = v2_5;
  if (variant14 === null || variant14=== undefined) {
    dataView(memory0).setInt8(ptr0 + 36, 0, true);
  } else {
    const e = variant14;
    dataView(memory0).setInt8(ptr0 + 36, 1, true);
    dataView(memory0).setInt8(ptr0 + 37, e ? 1 : 0, true);
  }
  var variant15 = v2_6;
  if (variant15 === null || variant15=== undefined) {
    dataView(memory0).setInt8(ptr0 + 38, 0, true);
  } else {
    const e = variant15;
    dataView(memory0).setInt8(ptr0 + 38, 1, true);
    dataView(memory0).setInt8(ptr0 + 39, e ? 1 : 0, true);
  }
  var variant16 = v2_7;
  if (variant16 === null || variant16=== undefined) {
    dataView(memory0).setInt8(ptr0 + 40, 0, true);
  } else {
    const e = variant16;
    dataView(memory0).setInt8(ptr0 + 40, 1, true);
    dataView(memory0).setInt32(ptr0 + 44, toUint32(e), true);
  }
  var variant17 = v2_8;
  if (variant17 === null || variant17=== undefined) {
    dataView(memory0).setInt8(ptr0 + 48, 0, true);
  } else {
    const e = variant17;
    dataView(memory0).setInt8(ptr0 + 48, 1, true);
    dataView(memory0).setInt8(ptr0 + 49, e ? 1 : 0, true);
  }
  var variant18 = v2_9;
  if (variant18 === null || variant18=== undefined) {
    dataView(memory0).setInt8(ptr0 + 50, 0, true);
  } else {
    const e = variant18;
    dataView(memory0).setInt8(ptr0 + 50, 1, true);
    dataView(memory0).setInt8(ptr0 + 51, e ? 1 : 0, true);
  }
  var variant19 = v2_10;
  if (variant19 === null || variant19=== undefined) {
    dataView(memory0).setInt8(ptr0 + 52, 0, true);
  } else {
    const e = variant19;
    dataView(memory0).setInt8(ptr0 + 52, 1, true);
    dataView(memory0).setInt8(ptr0 + 53, e ? 1 : 0, true);
  }
  var variant20 = v2_11;
  if (variant20 === null || variant20=== undefined) {
    dataView(memory0).setInt8(ptr0 + 54, 0, true);
  } else {
    const e = variant20;
    dataView(memory0).setInt8(ptr0 + 54, 1, true);
    dataView(memory0).setInt8(ptr0 + 55, e ? 1 : 0, true);
  }
  var variant21 = v2_12;
  if (variant21 === null || variant21=== undefined) {
    dataView(memory0).setInt8(ptr0 + 56, 0, true);
  } else {
    const e = variant21;
    dataView(memory0).setInt8(ptr0 + 56, 1, true);
    dataView(memory0).setInt8(ptr0 + 57, e ? 1 : 0, true);
  }
  var variant22 = v2_13;
  if (variant22 === null || variant22=== undefined) {
    dataView(memory0).setInt8(ptr0 + 58, 0, true);
  } else {
    const e = variant22;
    dataView(memory0).setInt8(ptr0 + 58, 1, true);
    dataView(memory0).setInt8(ptr0 + 59, e ? 1 : 0, true);
  }
  var variant29 = v2_14;
  if (variant29 === null || variant29=== undefined) {
    dataView(memory0).setInt8(ptr0 + 60, 0, true);
  } else {
    const e = variant29;
    dataView(memory0).setInt8(ptr0 + 60, 1, true);
    var variant28 = e;
    switch (variant28.tag) {
      case 'sync': {
        dataView(memory0).setInt8(ptr0 + 64, 0, true);
        break;
      }
      case 'jspi': {
        const e = variant28.val;
        dataView(memory0).setInt8(ptr0 + 64, 1, true);
        var {imports: v23_0, exports: v23_1 } = e;
        var vec25 = v23_0;
        var len25 = vec25.length;
        var result25 = realloc0(0, 0, 4, len25 * 8);
        for (let i = 0; i < vec25.length; i++) {
          const e = vec25[i];
          const base = result25 + i * 8;var ptr24 = utf8Encode(e, realloc0, memory0);
          var len24 = utf8EncodedLen;
          dataView(memory0).setInt32(base + 4, len24, true);
          dataView(memory0).setInt32(base + 0, ptr24, true);
        }
        dataView(memory0).setInt32(ptr0 + 72, len25, true);
        dataView(memory0).setInt32(ptr0 + 68, result25, true);
        var vec27 = v23_1;
        var len27 = vec27.length;
        var result27 = realloc0(0, 0, 4, len27 * 8);
        for (let i = 0; i < vec27.length; i++) {
          const e = vec27[i];
          const base = result27 + i * 8;var ptr26 = utf8Encode(e, realloc0, memory0);
          var len26 = utf8EncodedLen;
          dataView(memory0).setInt32(base + 4, len26, true);
          dataView(memory0).setInt32(base + 0, ptr26, true);
        }
        dataView(memory0).setInt32(ptr0 + 80, len27, true);
        dataView(memory0).setInt32(ptr0 + 76, result27, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant28.tag)}\` (received \`${variant28}\`) specified for \`AsyncMode\``);
      }
    }
  }
  const ret = exports0Generate(ptr0);
  let variant39;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len32 = dataView(memory0).getInt32(ret + 8, true);
      var base32 = dataView(memory0).getInt32(ret + 4, true);
      var result32 = [];
      for (let i = 0; i < len32; i++) {
        const base = base32 + i * 16;
        var ptr30 = dataView(memory0).getInt32(base + 0, true);
        var len30 = dataView(memory0).getInt32(base + 4, true);
        var result30 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr30, len30));
        var ptr31 = dataView(memory0).getInt32(base + 8, true);
        var len31 = dataView(memory0).getInt32(base + 12, true);
        var result31 = new Uint8Array(memory0.buffer.slice(ptr31, ptr31 + len31 * 1));
        result32.push([result30, result31]);
      }
      var len34 = dataView(memory0).getInt32(ret + 16, true);
      var base34 = dataView(memory0).getInt32(ret + 12, true);
      var result34 = [];
      for (let i = 0; i < len34; i++) {
        const base = base34 + i * 8;
        var ptr33 = dataView(memory0).getInt32(base + 0, true);
        var len33 = dataView(memory0).getInt32(base + 4, true);
        var result33 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr33, len33));
        result34.push(result33);
      }
      var len37 = dataView(memory0).getInt32(ret + 24, true);
      var base37 = dataView(memory0).getInt32(ret + 20, true);
      var result37 = [];
      for (let i = 0; i < len37; i++) {
        const base = base37 + i * 12;
        var ptr35 = dataView(memory0).getInt32(base + 0, true);
        var len35 = dataView(memory0).getInt32(base + 4, true);
        var result35 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr35, len35));
        let enum36;
        switch (dataView(memory0).getUint8(base + 8, true)) {
          case 0: {
            enum36 = 'function';
            break;
          }
          case 1: {
            enum36 = 'instance';
            break;
          }
          default: {
            throw new TypeError('invalid discriminant specified for ExportType');
          }
        }
        result37.push([result35, enum36]);
      }
      variant39= {
        tag: 'ok',
        val: {
          files: result32,
          imports: result34,
          exports: result37,
        }
      };
      break;
    }
    case 1: {
      var ptr38 = dataView(memory0).getInt32(ret + 4, true);
      var len38 = dataView(memory0).getInt32(ret + 8, true);
      var result38 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr38, len38));
      variant39= {
        tag: 'err',
        val: result38
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant39;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
}
let exports0GenerateTypes;

function generateTypes(arg0, arg1) {
  var ptr0 = realloc0(0, 0, 4, 92);
  var ptr1 = utf8Encode(arg0, realloc0, memory0);
  var len1 = utf8EncodedLen;
  dataView(memory0).setInt32(ptr0 + 4, len1, true);
  dataView(memory0).setInt32(ptr0 + 0, ptr1, true);
  var {wit: v2_0, world: v2_1, tlaCompat: v2_2, instantiation: v2_3, map: v2_4, features: v2_5, guest: v2_6, asyncMode: v2_7 } = arg1;
  var variant6 = v2_0;
  switch (variant6.tag) {
    case 'source': {
      const e = variant6.val;
      dataView(memory0).setInt8(ptr0 + 8, 0, true);
      var ptr3 = utf8Encode(e, realloc0, memory0);
      var len3 = utf8EncodedLen;
      dataView(memory0).setInt32(ptr0 + 16, len3, true);
      dataView(memory0).setInt32(ptr0 + 12, ptr3, true);
      break;
    }
    case 'binary': {
      const e = variant6.val;
      dataView(memory0).setInt8(ptr0 + 8, 1, true);
      var val4 = e;
      var len4 = val4.byteLength;
      var ptr4 = realloc0(0, 0, 1, len4 * 1);
      var src4 = new Uint8Array(val4.buffer || val4, val4.byteOffset, len4 * 1);
      (new Uint8Array(memory0.buffer, ptr4, len4 * 1)).set(src4);
      dataView(memory0).setInt32(ptr0 + 16, len4, true);
      dataView(memory0).setInt32(ptr0 + 12, ptr4, true);
      break;
    }
    case 'path': {
      const e = variant6.val;
      dataView(memory0).setInt8(ptr0 + 8, 2, true);
      var ptr5 = utf8Encode(e, realloc0, memory0);
      var len5 = utf8EncodedLen;
      dataView(memory0).setInt32(ptr0 + 16, len5, true);
      dataView(memory0).setInt32(ptr0 + 12, ptr5, true);
      break;
    }
    default: {
      throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant6.tag)}\` (received \`${variant6}\`) specified for \`Wit\``);
    }
  }
  var variant8 = v2_1;
  if (variant8 === null || variant8=== undefined) {
    dataView(memory0).setInt8(ptr0 + 20, 0, true);
  } else {
    const e = variant8;
    dataView(memory0).setInt8(ptr0 + 20, 1, true);
    var ptr7 = utf8Encode(e, realloc0, memory0);
    var len7 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 28, len7, true);
    dataView(memory0).setInt32(ptr0 + 24, ptr7, true);
  }
  var variant9 = v2_2;
  if (variant9 === null || variant9=== undefined) {
    dataView(memory0).setInt8(ptr0 + 32, 0, true);
  } else {
    const e = variant9;
    dataView(memory0).setInt8(ptr0 + 32, 1, true);
    dataView(memory0).setInt8(ptr0 + 33, e ? 1 : 0, true);
  }
  var variant11 = v2_3;
  if (variant11 === null || variant11=== undefined) {
    dataView(memory0).setInt8(ptr0 + 34, 0, true);
  } else {
    const e = variant11;
    dataView(memory0).setInt8(ptr0 + 34, 1, true);
    var variant10 = e;
    switch (variant10.tag) {
      case 'async': {
        dataView(memory0).setInt8(ptr0 + 35, 0, true);
        break;
      }
      case 'sync': {
        dataView(memory0).setInt8(ptr0 + 35, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant10.tag)}\` (received \`${variant10}\`) specified for \`InstantiationMode\``);
      }
    }
  }
  var variant16 = v2_4;
  if (variant16 === null || variant16=== undefined) {
    dataView(memory0).setInt8(ptr0 + 36, 0, true);
  } else {
    const e = variant16;
    dataView(memory0).setInt8(ptr0 + 36, 1, true);
    var vec15 = e;
    var len15 = vec15.length;
    var result15 = realloc0(0, 0, 4, len15 * 16);
    for (let i = 0; i < vec15.length; i++) {
      const e = vec15[i];
      const base = result15 + i * 16;var [tuple12_0, tuple12_1] = e;
      var ptr13 = utf8Encode(tuple12_0, realloc0, memory0);
      var len13 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len13, true);
      dataView(memory0).setInt32(base + 0, ptr13, true);
      var ptr14 = utf8Encode(tuple12_1, realloc0, memory0);
      var len14 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len14, true);
      dataView(memory0).setInt32(base + 8, ptr14, true);
    }
    dataView(memory0).setInt32(ptr0 + 44, len15, true);
    dataView(memory0).setInt32(ptr0 + 40, result15, true);
  }
  var variant20 = v2_5;
  if (variant20 === null || variant20=== undefined) {
    dataView(memory0).setInt8(ptr0 + 48, 0, true);
  } else {
    const e = variant20;
    dataView(memory0).setInt8(ptr0 + 48, 1, true);
    var variant19 = e;
    switch (variant19.tag) {
      case 'list': {
        const e = variant19.val;
        dataView(memory0).setInt8(ptr0 + 52, 0, true);
        var vec18 = e;
        var len18 = vec18.length;
        var result18 = realloc0(0, 0, 4, len18 * 8);
        for (let i = 0; i < vec18.length; i++) {
          const e = vec18[i];
          const base = result18 + i * 8;var ptr17 = utf8Encode(e, realloc0, memory0);
          var len17 = utf8EncodedLen;
          dataView(memory0).setInt32(base + 4, len17, true);
          dataView(memory0).setInt32(base + 0, ptr17, true);
        }
        dataView(memory0).setInt32(ptr0 + 60, len18, true);
        dataView(memory0).setInt32(ptr0 + 56, result18, true);
        break;
      }
      case 'all': {
        dataView(memory0).setInt8(ptr0 + 52, 1, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant19.tag)}\` (received \`${variant19}\`) specified for \`EnabledFeatureSet\``);
      }
    }
  }
  var variant21 = v2_6;
  if (variant21 === null || variant21=== undefined) {
    dataView(memory0).setInt8(ptr0 + 64, 0, true);
  } else {
    const e = variant21;
    dataView(memory0).setInt8(ptr0 + 64, 1, true);
    dataView(memory0).setInt8(ptr0 + 65, e ? 1 : 0, true);
  }
  var variant28 = v2_7;
  if (variant28 === null || variant28=== undefined) {
    dataView(memory0).setInt8(ptr0 + 68, 0, true);
  } else {
    const e = variant28;
    dataView(memory0).setInt8(ptr0 + 68, 1, true);
    var variant27 = e;
    switch (variant27.tag) {
      case 'sync': {
        dataView(memory0).setInt8(ptr0 + 72, 0, true);
        break;
      }
      case 'jspi': {
        const e = variant27.val;
        dataView(memory0).setInt8(ptr0 + 72, 1, true);
        var {imports: v22_0, exports: v22_1 } = e;
        var vec24 = v22_0;
        var len24 = vec24.length;
        var result24 = realloc0(0, 0, 4, len24 * 8);
        for (let i = 0; i < vec24.length; i++) {
          const e = vec24[i];
          const base = result24 + i * 8;var ptr23 = utf8Encode(e, realloc0, memory0);
          var len23 = utf8EncodedLen;
          dataView(memory0).setInt32(base + 4, len23, true);
          dataView(memory0).setInt32(base + 0, ptr23, true);
        }
        dataView(memory0).setInt32(ptr0 + 80, len24, true);
        dataView(memory0).setInt32(ptr0 + 76, result24, true);
        var vec26 = v22_1;
        var len26 = vec26.length;
        var result26 = realloc0(0, 0, 4, len26 * 8);
        for (let i = 0; i < vec26.length; i++) {
          const e = vec26[i];
          const base = result26 + i * 8;var ptr25 = utf8Encode(e, realloc0, memory0);
          var len25 = utf8EncodedLen;
          dataView(memory0).setInt32(base + 4, len25, true);
          dataView(memory0).setInt32(base + 0, ptr25, true);
        }
        dataView(memory0).setInt32(ptr0 + 88, len26, true);
        dataView(memory0).setInt32(ptr0 + 84, result26, true);
        break;
      }
      default: {
        throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant27.tag)}\` (received \`${variant27}\`) specified for \`AsyncMode\``);
      }
    }
  }
  const ret = exports0GenerateTypes(ptr0);
  let variant33;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len31 = dataView(memory0).getInt32(ret + 8, true);
      var base31 = dataView(memory0).getInt32(ret + 4, true);
      var result31 = [];
      for (let i = 0; i < len31; i++) {
        const base = base31 + i * 16;
        var ptr29 = dataView(memory0).getInt32(base + 0, true);
        var len29 = dataView(memory0).getInt32(base + 4, true);
        var result29 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr29, len29));
        var ptr30 = dataView(memory0).getInt32(base + 8, true);
        var len30 = dataView(memory0).getInt32(base + 12, true);
        var result30 = new Uint8Array(memory0.buffer.slice(ptr30, ptr30 + len30 * 1));
        result31.push([result29, result30]);
      }
      variant33= {
        tag: 'ok',
        val: result31
      };
      break;
    }
    case 1: {
      var ptr32 = dataView(memory0).getInt32(ret + 4, true);
      var len32 = dataView(memory0).getInt32(ret + 8, true);
      var result32 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr32, len32));
      variant33= {
        tag: 'err',
        val: result32
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant33;
  postReturn1(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
}

const $init = (() => {
  let gen = (function* init () {
    const module0 = fetchCompile(new URL('./component.core.wasm', import.meta.url));
    ({ exports: exports0 } = yield instantiateCore(yield module0));
    memory0 = exports0.memory;
    realloc0 = exports0.cabi_realloc;
    postReturn0 = exports0.cabi_post_generate;
    postReturn1 = exports0['cabi_post_generate-types'];
    exports0Generate = exports0.generate;
    exports0GenerateTypes = exports0['generate-types'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;

export { generate, generateTypes,  }