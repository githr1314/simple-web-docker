import BooksModel from "../models/BooksModel";
import cheerio from "cheerio";
import fs from "fs";
import { Readable } from "stream";

class BooksController {
  async actionList(ctx) {
    ctx.status = 200;
    const model = new BooksModel();
    const data = await model.getBooksList();
    const html = await ctx.render("books/list", {
      data
    });

    if (ctx.request.headers["x-pjax"]) {
      // 页面切换
      const $ = cheerio.load(html);
      const tableHtml = $.html(".table");
      ctx.res.write(tableHtml)

      const jsHtml = $.html(".lazyload-js");
      ctx.res.write(jsHtml)
      ctx.res.end()
    } else {
      // 刷新浏览器，或 a 标签跳转
      await new Promise(()=>{
        const stream = new Readable()
        stream.push(html)
        stream.push(null)
        stream.pipe(ctx.res)
      })
    }
  }

  async actionIndex(ctx, next) {
    // render 是 koa-swig 提供的
    ctx.body = await ctx.render("books/index", {
      data: "图书首页，欢迎！"
    });
  }

  async actionCreate(ctx, next) {
    ctx.body = await ctx.render("books/create", {
      data: "新增图书页，你好！"
    });
  }

  async actionBigpipe(ctx) {
    ctx.status = 200;
    // bigpipe1
    // ctx.res.write('big')
    // ctx.res.write('-')
    // ctx.res.write('pipe')
    // ctx.res.end()

    // bigpipe2 hack 避免 ok
    // await new Promise(()=>{
    //   const stream = fs.createReadStream('./test.html')
    //   stream.pipe(ctx.res)
    // })

    // bigpipe3
    // await new Promise(() => {
    //   const stream = fs.createReadStream("./test.html");
    //   stream.on("data", data => {
    //     ctx.res.write(data);
    //   });
    //   stream.on("end", () => {
    //     ctx.res.end();
    //   });
    // });

    const html = fs.readFileSync('./test.html')
    ctx.res.write(html)

    const renderHeader = await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve('<script>loadData("header","头部内容")</script>')
      },1000)
    })
    ctx.res.write(renderHeader)

    const renderContent = await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve('<script>loadData("content","content内容")</script>')
      },1000)
    })
    ctx.res.write(renderContent)

    const renderFooter = await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve('<script>loadData("footer","footer内容")</script>')
      },1000)
    })
    ctx.res.write(renderFooter)

    ctx.res.end()
  }
}

export default BooksController;
