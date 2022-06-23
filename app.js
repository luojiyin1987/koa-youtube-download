const serve = require('koa-static');
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const app = new Koa();

const downloadIng = {};

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

async function youtubeDownload(url) {
    const cmd = `cd ./downloaded/ &&  yt-dlp  ${url}`;

    return new Promise((resolved, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.err("download error", error);
                reject(error);
            }
            console.log(stdout ? stdout : stderr);
            resolved(stdout ? 1 : stderr)
        })
    })
}



router.get('/downloaded', async ctx => {
    ctx.body = await createUrl('downloaded');
})

router.post('/download', async ctx => {
    console.log(ctx.request.body);
    const { URL } = ctx.request.body;
    if (downloadIng[URL]) {
        ctx.body = {msg:'this URL is downloading'}
    } else { 
        downloadIng[URL] = true;
        ctx.body = await youtubeDownload(URL);
        delete downloadIng[URL]
    }
})
     

// or use absolute paths
app.use(serve(__dirname + '/public'));
app.use(serve(__dirname + '/downloaded'));
app.use(bodyParser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(router.routes());


app.listen(3000);

console.log('listening on port 3000');