'use strict';
/**
 * 編譯步驟:
 * 安裝 nodeJS  https://nodejs.org/
 * 安裝 webpack $ npm install webpack -g
 * $ cd /專案目錄
 * $ npm install
 * $ tsd install
 *
 *              測試站發佈: $ npm run dev
 *     測試站發佈 + minify: $ npm run minify
 *         livereload監控: $ npm run watch
 * webpack-dev-server監控: $ npm run serve
 *     正式站發佈 + minify: $ npm run release
 *     
 * 
 * livereload 程式
 * <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
 */

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'), // 跟gulp-clean一樣也是清除檔案，但用法比較簡單
    path = require('path'),
    webpack = require("webpack"),
    WebpackDevServer = require("webpack-dev-server");


var port = 8080;

var onError = function(err) {
    console.log(err); // 詳細錯誤訊息
    notify().write(err); // 簡易錯誤訊息
    this.emit('end'); // 中斷程序不往下走
}

///////////////////////////////
// webpack 設定
///////////////////////////////
var webpackConfig = {
    entry: {
        app: './src/js/app.js',
        formPage: './src/js/formPage.js'
    },
    externals: {},
    resolve: {
        alias: {},
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [],
    output: {
        //path: path.join(__dirname, "build", "1.0.0"),
        path: path.join(__dirname, "build"),
        publicPath: "build/",
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[hash].js" // require.ensure動態產生的js會依照這規則
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};

var webpackConfig_pc = {
    entry: {
        indexPage:'./src/pc/js/indexPage.js'

    },
    externals: {},
    resolve: {
        alias: {},
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    plugins: [],
    output: {
        //path: path.join(__dirname, "build", "1.0.0"),
        path: path.join(__dirname, "build/pc"),
        publicPath: "build/pc",
        filename: 'js/[name].js',
        chunkFilename: "js/[name].[hash].js" // require.ensure動態產生的js會依照這規則
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};

///////////////////////////////
// Default task
///////////////////////////////
gulp.task('default', ['clear', 'copyAll'], function() {
    gulp.start(['webpack', 'webpack_PC']);
});

///////////////////////////////
// Server
///////////////////////////////
gulp.task('server', ['copyAll'], function() {
    gulp.start(['webpack-dev-server', 'webpack-dev-server_pc']);
});

///////////////////////////////
// Watch
///////////////////////////////

gulp.task('watch', ['copyAll', 'webpack', 'webpack_PC', 'connect'], function() {
    gulp.watch('src/js/**/*', ['webpack']).on('change', function(event) {
        // deleted, changed, added
    });
    gulp.watch('src/asset/**/*', ['copySVG']);
    gulp.watch('src/img/**/*', ['copyImg']);
    gulp.watch('src/js/vendor/**/*', ['copyVendor']);
    gulp.watch('src/css/**/*', ['copyCSS']);
    gulp.watch('src/fonts/**/*', ['copyFont']);
    gulp.watch('src/template/**/*', ['copyTemplate']);
    gulp.watch('src/*.*', ['copyHtml']);
    gulp.watch('src/*', ['webpack']);

    //pc
    gulp.watch('src/pc/js/**.*', ['webpack_PC']);
    gulp.watch('src/pc/asset/**/*', ['copySVG_PC']);
    gulp.watch('src/pc/img/**/*', ['copyImg_PC']);
    gulp.watch('src/pc/js/vendor/**/*', ['copyVendor_PC']);
    gulp.watch('src/pc/css/**/*', ['copyCSS_PC']);
    gulp.watch('src/pc/fonts/**/*', ['copyFont_PC']);
    gulp.watch('src/pc/map/**/*', ['copyMap_PC']);
    gulp.watch('src/pc/*.*', ['copyHtml_PC']);
    gulp.watch('src/pc/*', ['webpack_PC']);
    
});

// livereload
gulp.task('connect', function() {
    $.connect.server({
        root: 'build',
        port: port,
        livereload: { port: 35729 }
    });
    $.util.log("[livereload]", "http://localhost:" + port + "/");
});

///////////////////////////////
// webpack bundle
///////////////////////////////
gulp.task("webpack", function(callback) {
    // run webpack
    var Config = Object.create(webpackConfig);
    if (process.env.DEPLOY === "1") {
        Config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            // 壓縮js文件等同 webpack -p 但好像快一些
            compress: {
                warnings: false
            }
        }));
    }
    webpack(Config, function(err, stats) {
        if (err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
        gulp.src(['src/*']).pipe($.connect.reload());
        /* 檢視webpack設定與編譯資源細項時打開 */
        // console.log(stats);
    });
});

gulp.task("webpack_PC", function(callback) {
    // run webpack
    var Config = Object.create(webpackConfig_pc);
    if(process.env.DEPLOY === "1"){
      Config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        // 壓縮js文件等同 webpack -p 但好像快一些
        compress: {
          warnings: false
        }
      }));
    }
    webpack( Config, function(err, stats) {
        if(err) throw new $.util.PluginError("webpack", err);
        $.util.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
        gulp.src(['src/*']).pipe($.connect.reload());
        /* 檢視webpack設定與編譯資源細項時打開 */
        // console.log(stats);
    });
});


gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var Config = Object.create(webpackConfig);
    Config.devtool = "eval";
    Config.debug = true;

    var compiler = webpack(Config);

    new WebpackDevServer(compiler, {
        publicPath: "/" + Config.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(port, "localhost", function(err) {
        if (err) throw new $.util.PluginError("webpack-dev-server", err);
        // Server listening
        $.util.log("[webpack-dev-server]", "http://localhost:" + port + "/webpack-dev-server/build/");
        // keep the server alive or continue?
        // callback();
    });
});

gulp.task("webpack-dev-server_pc", function(callback) {
    // Start a webpack-dev-server
    var Config = Object.create(webpackConfig_pc);
    Config.devtool = "eval";
    Config.debug = true;

    var compiler = webpack(Config);

    new WebpackDevServer(compiler, {
        publicPath: "/" + Config.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(port, "localhost", function(err) {
        if (err) throw new $.util.PluginError("webpack-dev-server", err);
        // Server listening
        $.util.log("[webpack-dev-server]", "http://localhost:" + port + "/webpack-dev-server/build/");
        // keep the server alive or continue?
        // callback();
    });
});

///////////////////////////////
// Clean
///////////////////////////////
gulp.task('clean', function(callback) {
    del(['build/img', 'build/pc/img']).then(paths => {
        callback();
    });
});
gulp.task('cleanCSS', function(callback) {
    del(['build/css/*.css', 'build/pc/css/*.css']).then(paths => {
        callback();
    });
});
// 當發現圖片被快取一直無法更新時執行一下 $ gulp clear
gulp.task('clear', function(done) {
    return $.cache.clearAll(done);
});
//////////////////////////////////////////////////////////////
// Minify Img & SVG & vendor JS & CSS & font
//////////////////////////////////////////////////////////////
gulp.task('copyAll', ['copySVG', 'copyImg', 'copyVendor', 'copyCSS', 'copyFont', 'copyTemplate', 'copyHtml','copySVG_PC', 'copyImg_PC', 'copyVendor_PC', 'copyCSS_PC', 'copyFont_PC', 'copyMap_PC', 'copyHtml_PC'], function(callback) {
    callback();
});
gulp.task('copySVG', [], function() {
    return gulp.src(['src/asset/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/asset'))
        .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/asset'))
        .pipe($.connect.reload());
});
gulp.task('copySVG_PC', [], function() {
    return gulp.src(['src/pc/asset/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/pc/asset'))
        .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/pc/asset'))
        .pipe($.connect.reload());
});
gulp.task('copyImg', [], function() {
    return gulp.src(['src/img/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/img'))
        .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/img'))
        .pipe($.connect.reload());
});
gulp.task('copyImg_PC', [], function() {
    return gulp.src(['src/pc/img/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/pc/img'))
        .pipe($.cache($.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/pc/img'))
        .pipe($.connect.reload());
});
gulp.task('copyVendor', [], function() {
    return gulp.src(['src/js/vendor/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/js/vendor'))
        .pipe($.connect.reload());
});
gulp.task('copyVendor_PC', [], function() {
    return gulp.src(['src/pc/js/vendor/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/pc/js/vendor'))
        .pipe($.connect.reload());
});
gulp.task('copyCSS', [], function() {
    return gulp.src(['src/css/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(process.env.DEPLOY === "1" ? $.minifyCss() : $.util.noop())
        .pipe(gulp.dest('build/css'))
        .pipe($.connect.reload());
});
gulp.task('copyCSS_PC', [], function() {
    return gulp.src(['src/pc/css/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(process.env.DEPLOY === "1" ? $.minifyCss() : $.util.noop())
        .pipe(gulp.dest('build/pc/css'))
        .pipe($.connect.reload());
});
gulp.task('copyFont', [], function() {
    return gulp.src(['src/fonts/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/fonts'))
        .pipe($.connect.reload());
});
gulp.task('copyFont_PC', [], function() {
    return gulp.src(['src/pc/fonts/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/pc/fonts'))
        .pipe($.connect.reload());
});
gulp.task('copyTemplate', [], function() {
    return gulp.src(['src/template/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/template'))
        .pipe($.connect.reload());
});
gulp.task('copyMap_PC', [], function() {
    return gulp.src(['src/pc/map/**/*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/pc/map'))
        .pipe($.connect.reload());
});
gulp.task('copyHtml', [], function() {
    return gulp.src(['src/*.*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/'))
        .pipe($.connect.reload());
});
gulp.task('copyHtml_PC', [], function() {
    return gulp.src(['src/pc/*.*'])
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe(gulp.dest('build/pc/'))
        .pipe($.connect.reload());
});

///////////////////////////////
// Build Styles
///////////////////////////////
gulp.task('styles', ['cleanCSS'], function() {
    return gulp.src('src/sass/**/*.scss')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.compass({
            // config_file: './config.rb',
            css: './build/css',
            sass: './src/sass',
            image: './src/img'
        }))
        .pipe($.autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(process.env.DEPLOY === "1" ? $.minifyCss() : $.util.noop())
        .pipe(gulp.dest('build/css'))
        //.pipe($.notify({ message: 'Styles task complete' }))
        .pipe($.connect.reload());
});
gulp.task('styles_PC', ['cleanCSS'], function() {
    return gulp.src('src/pc/sass/**/*.scss')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.compass({
            // config_file: './config.rb',
            css: './build/pc/css',
            sass: './src/pc/sass',
            image: './src/pc/img'
        }))
        .pipe($.autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(process.env.DEPLOY === "1" ? $.minifyCss() : $.util.noop())
        .pipe(gulp.dest('build/pc/css'))
        //.pipe($.notify({ message: 'Styles task complete' }))
        .pipe($.connect.reload());
});
