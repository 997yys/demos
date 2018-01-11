const gulp=require('gulp');
const webserver=require('gulp-webserver');
const path=require('path');
const fs=require("fs");
gulp.task("web",function(){
    gulp.src(".")
    .pipe(webserver({
        host:"localhost",
        port:8090,
        fallbase:"index.html"
    }))
})
gulp.task("server",function(){
    gulp.src(".")
    .pipe(webserver({
        host:"localhost",
        port:8080,
        middleware:function(req,res,next){
            var filename=req.url.split("/")[1];
            var filepath=path.join(__dirname,"data",".json");
            switch(req.url){
                case "/data":
                getData(res,filepath);
                break;
            }
        }
    }))
})
const getData=(res,filepath)=>{
    fs.readFile(filepath,(err,data)=>{
        if(err){
            res.end("error")
        }else{
            res.end(data)
        }
    })
}