// 加载模块
const {task,src,dest,watch,series,parallel} = require('gulp');
// 用于加载其他gulp插件
const load = require('gulp-load-plugins')();
// nodejs的del模块用于删除文件
const del = require('del');

// 删除dist目录
let delDist = async ()=>{
  await del('./dist');
}

// 处理图片
let image = async ()=>{
  src('./images/*.*')
  .pipe(dest('./dist/images'))
}

// 处理数据
let data = async ()=>{
  src('./data/*.*')
  .pipe(dest('./dist/data'))
  .pipe(load.connect.reload())
}

// 处理sass
let sass = async ()=>{
  src('./sass/*.scss')
  .pipe(load.sassChina())
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/styles'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/styles'))
}

let css = async ()=>{
  src('./styles/*.css')
  .pipe(load.rev())
  .pipe(load.minifyCss())
  .pipe(dest('./dist/styles'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/styles'))
}

// 处理js
let script = async ()=>{
  src('./script/*.js')
  .pipe(load.rev())
  .pipe(load.babel({presets: ['@babel/env']}))
  .pipe(load.uglify())
  .pipe(dest('./dist/script'))
  .pipe(load.rev.manifest())
  .pipe(dest('./rev/js'))
}

// 处理html
let html = async ()=>{
  setTimeout(()=>{
    src(['./rev/**/*.json','./pages/*.html'])
    .pipe(load.revCollector({replaceReved:true}))
    .pipe(load.minifyHtml())
    .pipe(dest('./dist/pages'))
  },2000)
}



// 启动服务，自动刷新
let connect = async ()=>{
  load.connect.server({
    root: './dist',
    livereload: true,
    port: 3001
  });
}

// 构建生产包
// task('build',series('delDist','image','data','css','sass','script','html','connect'))

task('build', async()=>{
  await delDist();
  await css();
  await sass();
  await script();
  await data();
  await image();
  await html();
  await connect();
})