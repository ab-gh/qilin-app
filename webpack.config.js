const path              = require( "path" );
const Webpack           = require( "webpack" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );

module.exports = {
    entry : [
        "babel-polyfill",
        "./src/index.js"
    ],

    output : {
        path     : path.resolve( __dirname, "./dist" ),
        filename : "index.min.js"
    },

    devtool : "source-map",
    context : __dirname,
    target  : "node-webkit",

    module : {
        rules : [
            {
                test : /\.(jpg|jpeg|png|woff|woff2|eot|otf|ttf|svg)$/,
                use  : "url-loader?limit=1000"
            },
            {
                test : /\.json$/,
                use  : "json-loader"
            },
            {
                test : /\.js$/,
                use  : "babel-loader",
                exclude : /(node_modules|bower_components)/
            },
            {
                test : /\.scss$/,
                use  : ExtractTextPlugin.extract( {
                    use : [
                        "css-loader",
                        "postcss-loader",
                        "sass-loader"
                    ]
                } )
            }
        ]
    },

    plugins : [
        new Webpack.LoaderOptionsPlugin( {
            options : {
                postcss : [
                    require( "autoprefixer" )
                ],
                devServer : {
                    inline : true
                }
            }
        } ),

        new HtmlWebpackPlugin( {
            template : "./src/index.html"
        } ),

        new ExtractTextPlugin( {
            filename  : "./index.min.css",
            allChunks : true
        } ),

        new Webpack.DefinePlugin( {
            "process.env" : {
                NODE_ENV : JSON.stringify( "development" ),
            },
        } ),

        // new Webpack.optimize.UglifyJsPlugin( {
        //     compress : {
        //         warnings : false,
        //     },
        //     output : {
        //         comments : false,
        //     },
        // } )
    ]
};
