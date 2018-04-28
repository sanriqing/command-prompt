import babel from 'rollup-plugin-babel'
export default {
    entry:'./index.js',
    format:'cjs',
    output:{
        file:'./dist/bundle.js',
        format:'cjs',
        name:'prompt'
    },
    plugins:[
        babel({
            exclude: "node_modules/**",
            runtimeHelpers: true
        })
    ]
}