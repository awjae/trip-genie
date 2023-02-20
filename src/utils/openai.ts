import { OpenAIApi, Configuration } from 'openai';
import { InputForm } from '../types';

let config = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});
const openai = new OpenAIApi(config);

const makeText = ({ destination, days }: InputForm) => {
  return `${destination} 여행 계획을 ${parseInt(days)-1}박${days}일 일정으로 위도, 경도를 포함해서 추천해줘`;
}

export const getPlan = async ({ destination, days }: InputForm) => {
  if (!destination || !days) return

  const text = makeText({destination, days});

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
    res(result);
  })
}
