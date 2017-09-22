import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';

const plugins = [
  commonjs({
    ignoreGlobal: true,
  }),
  nodeResolve(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.SELECTOR': JSON.stringify('#templateContainer > tbody > tr:nth-child(2)',
  ),
  }),
  babel({
    babelrc: false,
    presets: [
      [
        'env',
        {
          modules: false,
          targets: { browsers: 'last 2 Chrome versions' },
        },
      ],
    ],
    plugins: ['external-helpers', 'transform-class-properties'],
  }),
];

export default {
  input: 'src/content.js',
  output: {
    file: 'copy-selector/content.js',
    format: 'iife',
  },
  plugins,
};
