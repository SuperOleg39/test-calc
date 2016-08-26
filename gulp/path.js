export default {
        build: {
            html:    './',
            js:      './js/',
            css:     './css/',
            fonts:   './fonts/',
            img:     './img/'
        },
        src: {
            html:    'src/html/*.jade',
            js:      'src/js/*.js',
            css:     'src/css/*.styl',
            fonts:   'src/fonts/**/*.*',
            img:     'src/img/**/*.*'
        },
        watch: {
            html:    'src/html/**/*.jade',
            js:      'src/js/**/*.js',
            css:     'src/css/**/*.styl',
            fonts:   'src/fonts/**/*.*',
            img:     'src/img/**/*.*',
            all:     'build/**/*.*'
        },
        clean: './build'
    };
