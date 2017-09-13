module.exports = function (grunt) {
    var nodeExec = require.resolve('.bin/babel-node' + (process.platform === 'win32' ? '.cmd' : ''));

    grunt.initConfig({
        mocha_nyc: {
            target: {
                src: 'test/*.test.js',
                options: {
                    //coverageFolder: 'lcov',
                    coverage: true,
                    noColors: true,
                    dryRun: false,
                    //root: './test',
                    //root: './tasks',
                    //print: 'detail',
                    check: {
                        lines: 1
                    },
                    excludes: ['test/excluded*.js', '**/other.js'],
                    mochaOptions: ['--bail', '--debug-brk'],
                    reporter: 'spec',
                    reportFormats: ['text'],
                    nycOptions: ['-a'],
                    require: ['test/*1.js'],
                }
            }
        }
    });

    grunt.event.on('coverage', function (content, done) {
        console.log(content.slice(0, 15) + '...');
        done();
    });

    require('./tasks')(grunt);

    grunt.registerTask('default', ['mocha_nyc:target']);
};
