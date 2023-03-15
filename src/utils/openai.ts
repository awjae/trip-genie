import { OpenAIApi, Configuration, CreateCompletionRequest } from 'openai';
import { InputForm } from '@/types/input';

let config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(config);

const makeText = ({ contry, destination, days }: InputForm) => {
  // let text = `Write only data in json format for a ${days}-day itinerary of major tourist spots in ${destination}, ${contry}.
  // {"DAY 1": [{"destination":"","description":"","latitude":"","longitude":""}, {"destination":"","description":"","latitude":"","longitude":""}, {"destination":"","description":"","latitude":"","longitude":""}]`;
  let text = `${contry} ${destination} 주요 관광지 ${4}일 일정 데이터만 json 형식으로 작성. value는 한글로.
  ----foramt----
  {"DAY 1": [{"destination":"","latitude":"","longitude":""}, {"destination":"","latitude":"","longitude":""}, {"destination":"","latitude":"","longitude":""}]`;
  for (let i = 2; i <= Number(days); i++) {
    text += `, "DAY ${i}": [{"destination":"","latitude":"","longitude":""}, {"destination":"","latitude":"","longitude":""}, {"destination":"","latitude":"","longitude":""}]`;
  }
  text += `}.`;
  return text;
}
// const makeText = ({ contry, destination, days }: InputForm) => {
//   let text = `${contry} ${destination} 주요 관광지 ${days}일 여행 일정을 알려주세요.`
//   return text;
// }

export const getPlan = async ({ contry, destination, days }: InputForm) => {
  if (!destination || !days) return

  const text = makeText({contry, destination, days});

  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  // const config = {
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {"role":"system", "content": `----foramt----\n{"DAY 1":[{"destination":"","latitude":"","longitude":""},{"destination":"","latitude":"","longitude":""},{"destination":"","latitude":"","longitude":""}]}"}`},
  //     {"role":"user", "content": text}
  //   ],
  //   temperature: 1,
  //   max_tokens: 2048,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   stream: false,
  // };
  // return fetch('https://api.openai.com/v1/completions', {
  //   method: 'POST',
  //   headers: {
  //     Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  //   },
  //   body: JSON.stringify(config),
  // })

  return new Promise((res, rej) => {
    let str = result.data.choices[0].text;
    if (!str) rej("데이터 불량");
    str = str!.replaceAll("\n","").replaceAll("\\\"","\"").replaceAll("]}{","],").replaceAll("]{","],{").replaceAll("]},{","],").replaceAll("],{\"","],\"").replaceAll("}D","},D").replaceAll("]\"","],\"").replace("{ {", "{").replaceAll("\\'","\'");
    if (str![str.length-1] === ".") {
      str = str.slice(0, -1);
    }
    if (str![0] !== "{") {
      str = `{${str}`;
    }
    if (str![str.length-1] !== "\"" && str![str.length-1] !== "}") {
      str = `${str}"}`;
    }
    if (str![str.length-1] !== "}") {
      str = `${str}}`;
    }
    try {
      const validateResult = {
        ...result,
        validateResponse: JSON.parse(str),
      }
      res(validateResult);
    } catch (error) {
      console.log(str);
      rej(false);
    }
  })
}
