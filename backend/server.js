// 네이버 기계번역 API 예제
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const MOCK_DATA = require('./data.ts');
const path = require('path');
require('dotenv').config();
const axios = require('axios');
const { Readable } = require('stream')
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, '../build/static')));
app.use('/bot.png', express.static(path.join(__dirname, '../build/bot.png')));
app.use('/manifest.json', express.static(path.join(__dirname, '../build/manifest.json')));
app.use('/og_image.png', express.static(path.join(__dirname, '../build/og_image.png')));


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

const makeText = ({ contry, destination, days }) => {
  let text = `${contry} ${destination} 주요 관광지 ${days}일 여행 일정을 JSON format으로 데이터만 알려주세요.`
  return text;
}
app.post('/openai', async function (req, res) {
  const {contry, destination, days} = req.body;
  if (!destination || !days) return res.status(405).err();
  const text = makeText({contry, destination, days});

  const config = {
    model: "gpt-3.5-turbo",
    messages: [
      {"role":"system", "content": `----foramt----\n{"DAY 1":[{"destination":"","latitude":"","longitude":""},{"destination":"","latitude":"","longitude":""},{"destination":"","latitude":"","longitude":""}]}"}`},
      {"role":"user", "content": text}
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: false,
  };
  
  const api = new Promise((res, rej) => {
    request('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    }, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        res(JSON.parse(body));
      } else {
        rej(err);
      }
    })
  })

  const result = await api;
  let str = result.choices[0].message.content;
  if (!str) res.err('데이터 불량');
  str = str.replaceAll("\n","").replaceAll("\\\"","\"").replaceAll("]}{","],").replaceAll("]{","],{").replaceAll("]},{","],").replaceAll("],{\"","],\"").replaceAll("}D","},D").replaceAll("]\"","],\"").replace("{ {", "{").replaceAll("\\'","\'").replace("{```{", "{").replace('}```"}',"}");
  if (str[str.length-1] === ".") {
    str = str.slice(0, -1);
  }
  if (str[0] !== "{") {
    str = `{${str}`;
  }
  if (str[str.length-1] !== "\"" && str[str.length-1] !== "}") {
    str = `${str}"}`;
  }
  if (str[str.length-1] !== "}") {
    str = `${str}}`;
  }

  const validateResult = {
    ...result,
    validateResponse: JSON.parse(str),
  }
  res.status(200).json(validateResult);
});
app.post('/openai/stream', async function (req, res) {
  const {contry, destination, place, signal} = req.body;
  console.log(signal)
  const text = makePlaceText({contry, destination, place});
  const config = {
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "You are travel planner"},
      {"role":"user", "content": text}
    ],
    temperature: .5,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  };
  const requestOptions = {
    url: 'https://api.openai.com/v1/completions',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(config),
    signal: signal
  };

  const stream = request(requestOptions);

  stream.on('data', (data) => {
    // 스트림에서 데이터를 읽고 처리하는 코드를 작성하십시오.
    const result = JSON.parse(data.toString());
    console.log(result);
  });
  stream.on('error', (error) => {
    console.error(error);
  });
  // stream.on('response', (response) => {
  //   console.log(response.statusCode);
  //   console.log(response.headers['content-type']);
  // });
});

const makePlaceText = ({ contry, destination, place }) => {
  let text = `${contry} ${destination}의 관광지 ${place}을 추천하는 이유를 간단하게 100자 이내로 알려주세요.`;
  return text;
}
app.post('/crawling', async function (req, res) {
  const { url } = req.body;
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data); 

});

app.listen(3000, () => {
  console.log('http://127.0.0.1:3000/translate app listening on port 3010!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
app.get('/detail', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(
    "User-agent: *\nAllow: /"
  );
});

