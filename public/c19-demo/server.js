// example code https://stackoverflow.com/questions/42174711/how-to-upload-image-from-frontend-to-backend

var multer = require('multer')
var upload = multer({dest : 'uploads/'}).single('photo') 
//make sure you have access to write files
//make sure 'photo' matches up with the field entered at the front end e.g. formdata.append('photo', ...)

app.post('/imageupload',upload,function(req,res){
    //req.file will now be available as a json object, save to mongodb, re: filename, path etc
    res.send('rabbit')
})


exports.addads = function(req, res) {
var addads = req.app.db.model('Adds');
      var data = { imageTitle       : req.body.imageTitle,
                   img              : "http://localhost:4040/"+req.body.img, };
      var query = addads(data);
      query.save(function(err,data)  {
        if(err) {
          console.log(err.toString());
        } else  { 
          //  console.log('Adds Added Successfully');
            res.json({ success: true });
            update_routers(req);
          }
      });
};

 //Image Logic  
    var file_url = '';
    var storage = multer.diskStorage({ //multers disk storage settings
        //console.log("sdfas");
        destination: function (req, file, cb) {
            cb(null, 'public/img/');
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            file_url = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]
            cb(null, file_url);
        }
    });

    var upload = multer({ //multer settings
                    storage: storage
                }).single('file');

    /** API path that will upload the files */
    app.post('/uploadImage', function(req, res) {
      //  console.log("req*****", req.fields);
        upload(req,res,function(err){
            if(err){
                 res.json({error_code:1,err_desc:err});
                 return;
            }
            console.log("file_url", file_url);
            exec('convert '+ "public/img/" + file_url + " -resize 100x100 " + "public/img/" + file_url, function (err, out) {
              if (err) {
                console.log("error", err);
              } else {
                console.log("success");
                res.json({error_code:0,err_desc:null, file_url: 'img/'+file_url});
              }
           });
        });
    });