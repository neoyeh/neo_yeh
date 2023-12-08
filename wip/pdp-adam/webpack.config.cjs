const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line no-unused-vars
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const request = require('request');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssRTLCSS = require('postcss-rtlcss');
const cssnano = require('cssnano');

/*= ========================================================
=       project settings                              =
========================================================= */
const settings = require('./settings.json');

const {
    htmlList, bodyClass, useRtlCss,
} = settings;

const assets = {
    root: 'media/',
    scss: 'scss-src/',
    css: 'css/',
    js: {
        src: 'js-src/',
        dest: 'js/',
    },
    img: {
      src: 'img-src/',
      dest: 'images',
    },
};
// eslint-disable-next-line no-unused-vars
const paths = {
    scss: assets.root + assets.scss,
    css: assets.root + assets.css,
    jsSrc: assets.root + assets.js.src,
    jsDest: assets.root + assets.js.dest,
    imgSrc: assets.root + assets.img.src,
    imgDest: assets.root + assets.img.dest,
    templates: 'templates/',
};

/*= ============================================>>>>>
= html templete list =
===============================================>>>>> */
const htmlJsonList = {};
htmlList.forEach((list) => {
    htmlJsonList[list.name] = list.name;
    // htmlJsonList[list.name] = require(`./${list.name}.json`);
});
const configs = [...Array(2)].map((e, i) => ({
    mode: 'development',
    entry: {
        default: path.resolve(__dirname, 'src/default.js'),
    },
    output: {
        path: path.resolve(__dirname, assets.root),
        filename: 'js/[name].js',
        clean: false,
        assetModuleFilename: 'images/[name][ext]',
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './'),
        },
        port: 3333,
        // open: true,
        hot: true,
        compress: true,
        historyApiFallback: {
            index: '/default.html',
        },
        watchFiles: [`src/template/${htmlList[0].name}.html`],
        client: {
            logging: 'none',
        },
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ['> 1%', 'last 3 versions'],
                                }),
                                (i === 0) ? postcssRTLCSS({ safeBothPrefix: true }) : undefined,
                                // postcssRTLCSS({safeBothPrefix: true}),
                                cssnano({ preset: 'default' }),
                            ],
                        },
                    },
                },
                {
                    loader: 'string-replace-loader',
                    options: {
                        multiple: [
                            {
                                // eslint-disable-next-line no-useless-escape
                                search: /(?:;)\s*\/\*(?:\!)\s*rtl\s*:\s*(.*?)\s*\*\//g,
                                replace(match, p1) {
                                    return `/*rtl:${p1}*/;`;
                                },
                            },
                            {
                                search: /replaceBodyClass/g,
                                replace: bodyClass,
                            },
                        ],
                    },
                }, 'sass-loader'],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [
                                autoprefixer({
                                    overrideBrowserslist: ['> 1%', 'last 3 versions'],
                                }),
                                (i === 0) ? postcssRTLCSS({ safeBothPrefix: true }) : undefined,
                                // postcssRTLCSS({safeBothPrefix: true}),
                                cssnano({ preset: 'default' }),
                            ],
                        },
                    },
                },
                {
                    loader: 'string-replace-loader',
                    options: {
                        // eslint-disable-next-line no-useless-escape
                        search: /(?:;)\s*\/\*(?:\!)\s*rtl\s*:\s*(.*?)\s*\*\//g,
                        replace(match, p1) {
                        return `/*rtl:${p1}*/;`;
                        },
                    },
                }],
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            },
        ],
    },
    externals: {
        // jquery: 'jQuery',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new MiniCssExtractPlugin({
            // filename: 'css/[name].css',
            filename: `${
                // eslint-disable-next-line no-nested-ternary
                useRtlCss
                ? (i === 0 ? 'css/[name]-rtl.css' : 'css/[name].css')
                : (i === 0 ? 'css/[name].css' : 'css/[name]-rtl.css')
            }`,
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerPort: 3001
        // }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // jquery: {
                //     test: /[\\/]node_modules[\\/](jquery)[\\/]/,
                //     name: 'jquery',
                //     chunks: 'all',
                //     enforce: true,
                //     priority: -10,
                //     reuseExistingChunk: true,
                // },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    enforce: true,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                styles: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
}));

// eslint-disable-next-line no-unused-vars
const configPromise = new Promise((resolve, reject) => {
    function configCallback(env, argv) {
        console.log('===configPromise===');
        const defaultSetting = {
            chunks: ['vendor', 'default'],
            filename: 'default.html',
            template: 'src/template/default.html',
            bodyClass,
            minify: false,
            inject: false,
            cache: false,
        };
        if (argv.mode === 'development') {
            configs[0].devtool = 'source-map';
            for (let i = 0; i < htmlList.length; i += 1) {
                const name = (htmlList[i].useDefaultTepmlate) ? htmlList[0].name : htmlList[i].name;
                configs[0].plugins.push(
                    new HtmlWebpackPlugin({
                        ...defaultSetting,
                        filename: `${htmlList[i].name}.html`,
                        template: `src/template/${name}.html`,
                        json: htmlJsonList[htmlList[i].name],
                    }),
                );
            }
            return configs[0];
        }
        if (argv.mode === 'production') {
            configs[0].output.publicPath = `/${assets.root}`;
            configs[1].output.publicPath = `/${assets.root}`;
            for (let i = 0; i < htmlList.length; i += 1) {
                const name = (htmlList[i].useDefaultTepmlate) ? htmlList[0].name : htmlList[i].name;
                configs[0].plugins.push(
                    new HtmlWebpackPlugin({
                        ...defaultSetting,
                        filename: `html/${htmlList[i].name}.html`,
                        template: `src/template/${name}.html`,
                        json: htmlJsonList[htmlList[i].name],
                    }),
                    new HtmlReplaceWebpackPlugin([{
                        pattern: /(<!--\s)build:empty(\s-->)[^]+?(<!--\sendbuild\s-->)/g,
                        replacement: '',
                    }, {
                        pattern: 'slug-completed',
                        replacement: '',
                    }]),
                );
                configs[1].plugins.push(
                    new HtmlWebpackPlugin({
                        ...defaultSetting,
                        filename: `../${htmlList[i].name}-prototype.html`,
                        template: `src/template/${name}.html`,
                        json: htmlJsonList[htmlList[i].name],
                    }),
                    new HtmlReplaceWebpackPlugin([{
                        pattern: /(<!--\s)build:empty(\s-->)[^]+?(<!--\sendbuild\s-->)/g,
                        replacement: '',
                    }, {
                        pattern: 'slug-completed',
                        replacement: '',
                    }]),
                );
                configs[1].plugins.push(
                    new HtmlReplaceWebpackPlugin([{
                        pattern: '/media/',
                        replacement: 'media/',
                    }, {
                        pattern: /(<!--\s)build:empty(\s-->)[^]+?(<!--\sendbuild\s-->)/g,
                        replacement: '',
                    }, {
                        pattern: 'slug-completed',
                        replacement: '',
                    }]),
                );
            }
            return configs[1];
        }
        console.log('===configPromise fail!!!!===');
        return false;
    }
    resolve(configCallback);
});

module.exports = configPromise;
