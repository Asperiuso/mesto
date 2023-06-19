const presets = [
  ["@babel/preset-env", {
      targets: {
          edge: '18',
          ie: '11',
          firefox: '90',
          chrome: '94',
          safari: '15',
      },
      useBuiltIns: "entry"
  }]
]

module.exports = { presets }
