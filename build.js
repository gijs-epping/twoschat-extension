import * as esbuild from 'esbuild';

// Bundle vectorStore.js
await esbuild.build({
  entryPoints: ['services/vectorStore.js'],
  bundle: true,
  outfile: 'dist/vectorStore.bundle.js',
  format: 'esm',
  platform: 'browser',
  target: ['chrome58'],
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});

console.log('Build complete');
