# GAP 2016 這個夏天和Gap一起放肆玩
![author](https://img.shields.io/badge/front--end-Erikson-blue.svg)
![author](https://img.shields.io/badge/back--end-Julian-yellow.svg)

Gap 抽獎活動，手機版有做抽獎跟留資料的功能，pc版只有資訊頁跟活動辦法頁
![img](doc/gap.jpg)

## 切版位置
> <a href="http://cell.webgene.com.tw/GAP/event/2016/summer/" target="_blank">http://cell.webgene.com.tw/GAP/event/2016/summer/</a>
> 
> smb://cell-webgene/webgene/misc/GAP/event/2016/summer/
>
> \\\cell-webgene\webgene\misc\gap\event\2016\summer\


## 測試站

> \\\cell2-webgene\htdocs\gap2016
> 
> smb://cell2-webgene/htdocs/gap2016
> 
> <a href="http://cell2.webgene.com.tw/gap2016/" target="_blank">http://cell2.webgene.com.tw/gap2016/</a>


## 正式站
> <a href="http://gaptaiwan.com.tw/longlivesummer/" target="_blank">http://gaptaiwan.com.tw/longlivesummer/</a>


## Source List

項目                                       | folder
------------------------------------------|-----------
API                                       | [/ api-doc](http://git.webgene.tw/webgene/2016-gap-LongLivesSummer/tree/master/doc/api.md)
前端 source                  			  | [/ front-end](http://git.webgene.tw/webgene/2016-gap-LongLivesSummer/tree/master/front-end)
後端 source                  			  | [/ back-end](http://git.webgene.tw/webgene/2016-gap-LongLivesSummer/tree/master/back-end)



## FTP帳密
> 連結: `gaptaiwan.com.tw/longlivesummer`
> 
> 帳號: `gap_lls_ftp`
> 
> 密碼: `tAbrdW4eU3`

## 後台帳密
> 連結: `gaptaiwan.com.tw/longlivesummer/admin/login.php`
> 
> 帳號: `webgene`
> 
> 密碼: `87682550`

## Front-End Build Workflow

```
編譯步驟:
 * 安裝 nodeJS  https://nodejs.org/
 * 安裝 webpack $ npm install webpack -g
 * $ cd /專案目錄
 * $ npm install
 *
 *              測試站發佈: $ npm run dev
 *         livereload監控: $ npm run watch
 *     正式站發佈 + minify: $ npm run release
$ npm run release  // 正式站發佈 + minify

發佈於 /build
```