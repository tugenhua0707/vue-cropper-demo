
var fs = require('fs');
var zlib = require('zlib');
var rollup = require('rollup');
var uglify = require('uglify-js');
var version = process.env.VERSION || require('../package.json').version;

var banner =
  'vue-cropper v' + version + '\n' +
  '(c) ' + new Date().getFullYear() + ' tugenhua0707@qq.com \n' +
  '@license MIT'

// commonjs build

rollup.rollup({
  entry: 'src/index.js'
}).then(function(bundle) {
  // 生成一个 bundle + sourcemap
  return write('dist/vue-cropper.common.js', bundle.generate({
    format: 'cjs'
  }).code)
}).then(function() {
  return rollup.rollup({
    entry: 'src/index.js'
  }).then(function(bundle) {
    return write('dist/vue-cropper.js', bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'vue-cropper'
    }).code)
  })
}).then(function() {
  // 生产环境构建
  return rollup.rollup({
    entry: 'src/index.js'
  }).then(function(bundle) {
    var code = bundle.generate({
      format: 'umd',
      moduleName: 'vue-cropper'
    }).code;
    var minified = banner + '\n' + uglify.minify(code, {
      formString: true
    }).code;
    return write('dist/vue-cropper.min.js', minified)
  }).then(zip)
}).catch(logError); 

function write (dest, code) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(dest, code, function(err) {
      if (err) {
        return reject(err);
      }
      console.log(blue(dest) + ' ' + getSize(code));
      resolve();
    })
  });
}

function zip () {
  return new Promise(function(resolve, reject) {
    fs.readFile('dist/vue-cropper.min.js', function(err, buf) {
      if (err) {
        return reject(err);
      }
      zlib.gzip(buf, function(err, buf) {
        if (err) {
          return reject(err);
        }
        write('dist/vue-cropper.min.js.gz', buf).then(resolve);
      })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}


