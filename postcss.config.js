
module.exports = {
  plugins: [
    'postcss-import',
    'postcss-advanced-variables',
    'postcss-custom-media',
    'postcss-nested',
    [
      'postcss-preset-env',
      { autoprefixer: { flexbox: 'no-2009' }, stage: 3, features: { 'custom-properties': !1 } }
    ],
    [
      'postcss-pxtorem',
      {
        propList: [
          'font',
          'font-size',
          '*gap',
          'line-height',
          'letter-spacing',
          'margin*',
          'padding*',
          '*height',
          '*width',
          'top',
          'bottom',
          'left',
          'right',
          'transform',
          'border-radius'
        ]
      }
    ]
  ]
};
