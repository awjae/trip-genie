// 네이버 기계번역 API 예제
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const MOCK_DATA = require('./data.ts');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../build/static')));


const PAPAGO_ID = process.env.REACT_APP_PAPAGO_ID_3;
const PAPAGO_PW = process.env.REACT_APP_PAPAGO_PW_3;

// app.post('/translate', function (req, res) {
//   res.status(200).json(MOCK_DATA); return

//   const api_url = 'https://openapi.naver.com/v1/papago/n2mt';
//   const query = req.body.text;
//   let tempTextList = "";
//   for (let key in query) {
//     query[key].forEach(item => {
//       tempTextList += `${item.destination}?? `; 
//       tempTextList += `${item.description}## `; 
//     });
//   }
//   const options = {
//     url: api_url,
//     form: {
//       'source': 'en',
//       'target': 'ko',
//       'text': tempTextList
//     },
//     headers: {
//       'X-Naver-Client-Id': PAPAGO_ID,
//       'X-Naver-Client-Secret': PAPAGO_PW
//     }
//   };
//   request.post(options, function (error, response, body) {
//     if (error) {
//       console.log(error);
//       return;
//     }
//     if (body.indexOf('010') > -1) {
//       res.status(200).json({"error" : "한도 초과"});
//       return;
//     }

//     try {
//       const resultText = JSON.parse(body).message.result.translatedText;
//       const tempArr = resultText.split("##").map(item => item.split("?? "));
//       const newObject = Object.assign(query);
//       let i = 0;
//       for (let key in newObject) {
//         newObject[key].forEach(item => {
//           item.destination = tempArr[i][0];
//           item.description = tempArr[i][1];
//           i++;
//         });
//       }
//       res.status(200).json(newObject);
//     } catch (error) {
//       console.log(JSON.parse(body))
//     }
//   });
// });
app.post('/searchBlog', function (req, res) {
  const { query } = req.body;
  const api_url = `https://openapi.naver.com/v1/search/blog?query=${encodeURI(query)}`;
  const options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': PAPAGO_ID,
      'X-Naver-Client-Secret': PAPAGO_PW
    }
  };
  request.get(options, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    
    res.status(200).json(body);
  });
});
app.post('/searchImage', function (req, res) {
  const { query } = req.body;
  const api_url = `https://openapi.naver.com/v1/search/image?query=${encodeURI(query+' 여행')}`;
  const options = {
    url: api_url,
    headers: {
      'X-Naver-Client-Id': PAPAGO_ID,
      'X-Naver-Client-Secret': PAPAGO_PW
    }
  };
  request.get(options, function (error, response, body) {
    if (error) {
      console.log(error);
      return;
    }
    
    res.status(200).json(body);
  });
});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/translate app listening on port 3010!');
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})