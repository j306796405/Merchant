module.exports = function (grunt) {
    grunt.file.defaultEncoding = 'utf8';
    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**编译sass样式*/
        /*sass: {
            dist: {
                options: {
                    style: 'compressed',   //压缩输出
                    sourcemap:'none'  //无sourcemaps 输出
                },
                files: {
                    '../web/css/public.css': '../web/scss/public.scss',
                    '../web/css/zzt.css': '../web/scss/zzt.scss'
                }
            }
        },*/
        sass: {
            options: {
                style: 'compressed',   //压缩输出
                sourcemap:'none'  //无sourcemaps 输出
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '../web/scss',
                    src: ['*.scss'],
                    dest: '../web/css',
                    ext: '.css'
                }]
            }
        },
        /**检查JS规范*/
        jshint: {
            all: {
                src: '../web/**/*.js'
            },
            options: {
                jshintrc: '.jshintrc'
            }
        },
        /**压缩js*/
        uglify: {
            options: {
                mangle: false,
                /**生成注解*/
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> -  <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            /*buid: {
                files: {
                    '../web/js/zzt.js': ['../web/_js/zzt.js']
                }
            },*/
            build: {
                expand: true,
                cwd: "../web/_js",
                src: ["*.js", "!*.min.js"],
                dest: "../web/js",
                ext: ".js"
            }
        },
        /**PC上图片自动合并插件*/
        sprite: {
            options: {
                // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                imagepath: '../web/img/sprite/',
                // 映射CSS中背景路径，支持函数和数组，默认为 null
                imagepath_map: null,
                // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                spritedest: '../web/img/',
                // 替换后的背景路径，默认为 file.dest 和 spritedest 的相对路径
                spritepath: null,
                // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                padding: 2,
                // 是否使用 image-set 作为2x图片实现，默认不使用
                useimageset: false,
                // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                newsprite: false,
                // 给雪碧图追加时间戳，默认不追加
                spritestamp: false,
                // 在CSS文件末尾追加时间戳，默认不追加
                cssstamp: true,
                // 默认使用二叉树最优排列算法
                algorithm: 'binary-tree',
                // 默认使用`pixelsmith`图像处理引擎
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    // 启用动态扩展
                    expand: true,
                    // css文件源的文件夹
                    cwd: '../web/scss/',
                    // 匹配规则
                    src: '*.scss',
                    // 导出css和sprite的路径地址
                    dest: '../web/css/',
                    // 导出的css名
                    ext: '.css'
                }]
            }
        },
        /**监听所有代码改变，执行对应的插件实时更新代码*/
        watch:{
            js:{
                files:"../web/**/*.js",
                tasks:["newer:uglify"]
            },
            css:{
                files:"../web/**/*.scss",
                tasks:["sass"],
                options:{
                    spawn: false
                }
            }
        }
    });

    // 使用插件
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks("grunt-css-sprite");
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 在终端中输入grunt时需要做些什么
    grunt.registerTask("default", ['watch','uglify']);
    grunt.registerTask('css:sass', ['sass']);
    grunt.registerTask('js', ['uglify']);
}