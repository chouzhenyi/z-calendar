// 插件代码
class MyWebpackPlugin {
  constructor(options) {
    console.log(options);
  }
  
  apply(compiler) {
    // 在emit阶段插入钩子函数
    compiler.hooks.afterEmit.tapPromise('MyWebpackPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        for (const filename of Object.keys(compilation.assets)) {
          console.log(filename);
          resolve();
        }
      })
    });
  }
};

module.exports = MyWebpackPlugin;
