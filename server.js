const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const {spawn} =require('child_process');

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const python=spawn('python',['script.py']);
  python.stdout.on('data',(data)=>{console.log(data).toString()});


  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});


var test = './client/public/uploads/Test.csv'
if (fs.existsSync(test))
{
  const python=spawn('python',['script.py']);
  python.stdout.on('data',(data)=>{console.log(`${data}`)});
  python.stderr.on('data',(data)=>{console.error(`error${data}`)})
}
else
  console.log('Check existance of Test.csv',test)


app.listen(5000, () => console.log('Server Started...'));