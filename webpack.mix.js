let mix = require('laravel-mix');

mix.js('src/js/app.js', 'dist/')
    .sass('src/sass/app.scss', 'dist/')
    .options({
        processCssUrls: false
    })
    .setPublicPath('dist');

module.exports = {
    module: {
        loaders: [
            {
                test: /flickity/,
                loader: 'imports?define=>false&this=>window'
            }
        ]
    }
};