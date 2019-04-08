const presets = [
  [
    ' @babel/preset-env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.7',
      },
      useBuiltIn: 'usage',
    },
  ],

];


module.exports = { presets };
