#### 调用方法

```js
<uni-xunfei
:is_Speech="is_Speech"
initFn="handxenamse"
keyWordName="checkcolleges"
@searchKey="(val) => schoolName = val"
> </uni-xunfei>
```

#### 参数说明

1. initFn 页面刷新的方法名
2. is_Speech 是否开启语音识别
3. keyWordName 关键字
4. @searchKey 关键字回调

#### 以下文件添加自己页面语音的关键字

> 写入页面提示的关键字 keyWordName="checkcolleges"

/Users/songyanbin/Desktop/yhpn_project01_app/RuoYi-App-master/components/uni-xunfei/keyWords.js

#### 调用 demo

pageSec/checkcolleges/index
