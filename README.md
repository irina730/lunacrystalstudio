# Luna Crystal Studio — 静态展示网站

这是把原 Shopify 网站 https://www.lunacrystalstudio.com 复制出来的**纯展示版**。
外观、图片、商品文案与原站一致,但**没有购物车 / 结账 / 付款**功能。
所有图片都已下载到本地,取消 Shopify 后不会失效。

---

## 一、目录结构

```
lunacrystal-site/
├── index.html            首页
├── shop.html             全部商品(带筛选)
├── learn.html            水晶科普
├── our-story.html        品牌故事
├── contact.html          联系我们
├── product/              14 个商品详情页
└── assets/
    ├── css/style.css     样式
    ├── js/main.js        交互(菜单/图库/筛选/FAQ)
    └── images/           所有图片(banner、logo、商品图)
```

## 二、本地预览

在 `lunacrystal-site` 目录里运行:

```bash
cd ~/lunacrystal-site
python3 -m http.server 4599
```

然后浏览器打开 http://localhost:4599

---

## 三、免费上线(推荐 Cloudflare Pages,永久免费)

这是个纯静态网站,任何静态托管都能放,**不再需要每月付 Shopify 的钱**。

### 方式 A:Cloudflare Pages(推荐,免费、快、自带 CDN 和 HTTPS)
1. 注册 https://dash.cloudflare.com → 左侧 **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. 把整个 `lunacrystal-site` 文件夹拖进去上传
3. 部署完会给你一个 `xxx.pages.dev` 的临时网址,先确认能正常打开
4. 再进 **Custom domains** 绑定你的 `lunacrystalstudio.com`(见第四步)

### 方式 B:Netlify(同样免费,拖拽最简单)
1. 注册 https://app.netlify.com → **Add new site** → **Deploy manually**
2. 把 `lunacrystal-site` 文件夹拖进去,立刻就有一个 `xxx.netlify.app` 网址
3. 之后在 **Domain settings** 绑定自定义域名

---

## 四、把 lunacrystalstudio.com 域名迁过来

**关键:先确认域名注册在哪里。**

- 如果域名是当初在 **Shopify 买的**:进 Shopify 后台 → Settings → Domains,先点 **Transfer away / 解锁域名**,把它转出到一个独立注册商(如 Cloudflare Registrar / GoDaddy / Namecheap)。这一步要几天,**建议在退订 Shopify 之前先做**,否则可能连域名一起丢。
- 如果域名是在 **别的注册商买的**(GoDaddy / Namecheap 等),只是接到了 Shopify:那就简单,直接改 DNS 即可。

**改 DNS 指向新网站**(以 Cloudflare Pages / Netlify 为例):
1. 在新托管商后台添加自定义域名 `lunacrystalstudio.com`,它会告诉你要填的记录
2. 到你的域名 DNS 设置里:
   - 把原来指向 Shopify 的 `A` 记录 / `CNAME` 删掉
   - 按新托管商给的值,添加 `CNAME`(www)和根域名记录
3. 等 DNS 生效(几分钟到几小时),HTTPS 证书会自动签发

**顺序建议:先上线新站 → 再迁 DNS → 确认新站正常 → 最后退订 Shopify。**
这样中间不会有网站打不开的空档。

---

## 五、联系表单(重要:第一次要激活)

联系页和首页订阅框的表单用的是 **FormSubmit.co**(免费,无需服务器),
所有留言都会发到 **lunacrystalstudio@gmail.com**。

⚠️ **网站上线后,你要先自己在联系页填一次表单并提交一次**:
1. FormSubmit 会给 lunacrystalstudio@gmail.com 发一封 **确认激活邮件**
2. 点邮件里的链接激活
3. 激活后,以后所有访客的留言就会自动转发到你邮箱

（在本地 `localhost` 测试不算,必须在真实上线的网址上激活一次。）

## 六、以后想改内容?

- 改文字:直接编辑对应的 `.html` 文件
- 换图片:替换 `assets/images/` 里的文件(保持同名最省事)
- 加 / 删商品:商品页在 `product/` 文件夹,首页和 shop 页的卡片在对应 html 里
- 改完重新上传到托管商即可(Cloudflare/Netlify 都支持覆盖部署)
- 改了 CSS 或 JS 后,把 `.html` 里的 `?v=2` 改成 `?v=3`(等)就能让访客加载到新版、不受浏览器缓存影响

> 邮箱已设为 lunacrystalstudio@gmail.com。**Instagram / TikTok 链接目前还是占位的**,记得在 `contact.html` 和各页脚里换成你真实的主页地址。
