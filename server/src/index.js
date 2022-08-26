const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));

const muilpartyMiddleware = multipart({ uploadDir: './uploads'});

app.post('/upload', muilpartyMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({message: files});
});

app.get('/downloadExcel', (req, res) => {
  res.download('./uploads/report.xlsx');
});

app.get('/downloadPdf', (req, res) => {
  res.download('./uploads/report.pdf');
});

app.use((err, req, res, next) => res.json({error: err.message}));

app.listen(8000, () => {
  console.log('Servidor porta 8000');
});
