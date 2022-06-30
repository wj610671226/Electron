# 自动发布
以github为服务器的发布流程

1、package.json配置


"scripts": {
    // 以github为服务器的发布
    "release": "cross-env GH_TOKEN="token" electron-builder --publish always",
    "prerelease": "yarn run build && npm run buildMain"
}

"build": {
    "publish": ["github"]
}

2、命令行 npm run release,然后导github 发布
 
3、代码中配置更新下载代码 electron-updater