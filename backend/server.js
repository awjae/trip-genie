// 네이버 기계번역 API 예제
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PAPAGO_ID = process.env.REACT_APP_PAPAGO_ID_3;
const PAPAGO_PW = process.env.REACT_APP_PAPAGO_PW_3;

app.post('/translate', function (req, res) {
  const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
  const query = req.body.text;
  let tempTextList = "";
  for (let key in query) {
    query[key].forEach(item => {
      tempTextList += `${item.destination}?? `; 
      tempTextList += `${item.description}!! `; 
    });
  }
  const options = {
    url: api_url,
    form: {
      'source': 'en',
      'target': 'ko',
      'text': tempTextList
    },
    headers: {
      'X-Naver-Client-Id': PAPAGO_ID,
      'X-Naver-Client-Secret': PAPAGO_PW
    }
  };
  request.post(options, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    if (body.indexOf('010') > -1) {
      res.status(200).json({"error" : "한도 초과"});
      return;
    }

    try {
      const resultText = JSON.parse(body).message.result.translatedText;
      const tempArr = resultText.split("!! ").map(item => item.split("?? "));
      const newObject = Object.assign(query);
      let i = 0;
      for (let key in newObject) {
        newObject[key].forEach(item => {
          item.destination = tempArr[i][0];
          item.description = tempArr[i][1];
          i++;
        });
      }
      res.status(200).json(newObject);
    } catch (error) {
      console.log(JSON.parse(body))
    }
  });
});
app.listen(3010, () => {
  console.log('http://127.0.0.1:3010/translate app listening on port 3010!');
});
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/build/index.html')
// })