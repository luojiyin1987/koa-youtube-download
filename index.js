const serve = require('koa-static');
const Koa = require('koa');
const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const app = new Koa();


async function createUrl(dirName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, dirName);
        const fileArray = [];
        fs.readdir(filePath, (err, files) => {
            if (err) {
                reject(err);
            }

            files.forEach((file) => {
                console.log(file);
                fileArray.push(`<li> <a href="/${file}">${file}</a></li>`);
            })
            console.log('fileArray', fileArray);
            resolve(`<ul>${fileArray.join('')}</ul>`);
        })

    })
}




router.get('/downloaded',  async ctx => {
     ctx.body = await createUrl('downloaded');
})

// or use absolute paths
app.use(serve(__dirname + '/public'));
app.use(serve(__dirname + '/downloaded'));

app.use(router.routes());

app.listen(3000);

console.log('listening on port 3000');