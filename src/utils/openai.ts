import { OpenAIApi, Configuration } from 'openai';
import { InputForm } from '@/types/input';

let config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(config);

const makeText = ({ contry, destination, days }: InputForm) => {
  // return `${destination} 여행 계획을 ${parseInt(days)-1}박${days}일 일정으로 위도, 경도를 포함해서 추천해줘`;
  // return `${contry} ${destination ? destination + "지역의 " : ""}여행 계획을 ${days}일 일정으로 위도, 경도를 포함해서 json format으로 알려줘. 단, 하루에 3개의 일정으로 예상되는 데이터만 포함해줘.
  // return `${contry} ${destination ? destination + "지역의 " : ""}주요 관광지 여행 계획을 ${days}일 일정으로 위도, 경도를 포함해서 json format으로 알려줘.
  // return `${contry} ${destination ? destination + "지역의 " : ""}주요 관광지 ${days}곳을 위도, 경도를 포함해서 json format으로 알려줘.
  // {"DAY n" : [{"name":"", "lat": "", "lng": ""}]}`;
  let text = `Write only data in json format for a ${days}-day itinerary of major tourist spots in ${destination}, ${contry}.
format example: {"DAY 1": [{"destination":"","description":"","latitude":"","longitude":""}, {"destination":"","description":"","latitude":"","longitude":""}, {"destination":"","description":"","latitude":"","longitude":""}]`;
  for (let i = 2; i <= Number(days); i++) {
    text += `, "DAY ${i}": [{"destination":"","description":"","latitude":"","longitude":""}, {"destination":"","description":"","latitude":"","longitude":""}, {"destination":"","description":"","latitude":"","longitude":""}]`;
  }
  text += `}.`;
  return text;
}

export const getPlan = async ({ contry, destination, days }: InputForm) => {
  if (!destination || !days) return

  const text = makeText({contry, destination, days});

  const result = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 1,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })

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
