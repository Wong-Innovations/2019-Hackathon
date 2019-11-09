var glob = require('glob');
var path = require('path');

module.exports = function(app) {
  app.get('/sheet', (req, res) => {
    if (req.query.sheetname) {
      glob(__dirname + `/sheets/*/${req.query.sheetname}.mxl`, (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.forEach((file) => {
            res.sendFile(file);
          });
        }
      });
    } else if (req.query.skill) {
      glob(__dirname + `/sheets/difficulty_${req.query.skill}/*.mxl`, (err, files) => {
        if (err) {
          console.log(err);
        } else {
          var index = Math.floor(Math.random * files.length);
          res.sendFile(files[index]);
        }
      });
    } else {
      res.send('Missing Required Queries');
    }
  });

  app.put('/sheet', (req, res) => {
    new formidable.IncomingForm().parse(req)
      .on('fileBegin', (name, file) => {
          file.path = __dirname + '/sheets/staging' + file.name;
      })
      .on('file', (name, file) => {
        console.log('Uploaded file', name, file);
      });
    // Here I'll want to run spawn_process
    res.send('PUTTING SHEET');
  });
}

/*
Example URI: "localhost/3000/sheet?skill=3&sheetname=happy-birthday"
sheet-body-object: {
  skill: "3",
  sheetname: "happy-birthday"
}
*/