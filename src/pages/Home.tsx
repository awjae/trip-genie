import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import airplane from '@/images/airplane.png';
import hatchback from '@/images/hatchback.png';
import { getPlan } from '@/utils/openai';
import { getPlan_server } from '@/utils/searchAPI';
import { InputForm } from '@/types/input';
import Board from '@/components/Board';
import { MOCK_CARDLIST, MOCK_DATA } from '@/assets/mock';
import Bot from '@/components/Bot';
import useDataStore from '@/store/dataStore';
import useInputStore from '@/store/inputStore';
import Info from '@/components/Info';

function Home() {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState<InputForm>({
    contry: "",
    destination: "",
    days: "",
    animationSteps: 0,
  });
  // const [inputForm, setInputForm] = useState<InputForm>({
  //   contry: "대한민국",
  //   destination: "제주도",
  //   days: "4",
  //   animationSteps: 0,
  // });
  const [botState, setBotState] = useState({animationSteps: 0});
  const [defaultCardList, setDefaultCardList] = useState<any[]>();
  const setInput = useInputStore((state: any) => state.setInput);
  const setData = useDataStore((state: any) => state.setData);
  const [curtain, setCurtain] = useState(false);

  const getPlanAPI = useMutation('getPlan', () => getPlan_server(inputForm), {
    onSuccess(data: any, variables, context) {
      setBotState({animationSteps: 2});
      setData(data.validateResponse);
    },
    onError(error, variables, context) {
      setBotState({animationSteps: 3});
    },
  })

  const validationInputForm = () => {
    if (inputForm.contry === "") return true;
    if (inputForm.destination === "") return true;
    if (inputForm.days === "") return true;
    return false
  }
  const getPlanAPIHandler = async () => {
    if (validationInputForm()) return;
    await playAnalyzeAnimation(); 
    getPlanAPI.mutate();
    // if (process.env.NODE_ENV === "development") {
    //   setBotState({animationSteps: 2}); 
    //   setData(MOCK_DATA);
    // } else {
    //   getPlanAPI.mutate();
    // }
  } 
  const playAnalyzeAnimation = async () => {
    setInputForm({...inputForm, animationSteps: 1});
    await new Promise((res, rej) => {
      setTimeout(() => {
        setInputForm({...inputForm, animationSteps: 2});
        res(1);
      },500);
    })
    await new Promise((res, rej) => {
      setTimeout(() => {
        setInputForm({...inputForm, animationSteps: 3});
        setBotState({...botState, animationSteps: 1});
        navigate('?list=1');
        res(1);
      },1200);
    })
    await new Promise((res, rej) => {
      setTimeout(() => {
        setDefaultCardList(MOCK_CARDLIST);
        res(1);
      },500);
    })
  } 
  const FormAnimationStepHanlder = () => {
    if (inputForm.animationSteps === 0) {
      return '';
    }
    if (inputForm.animationSteps === 1) {
      return 'scaledown';
    }
    return 'scaledown rightdown';
  }

  const goDetail = () => {
    setCurtain(true);
    setInput({ contry: inputForm.contry, destination: inputForm.destination, days: inputForm.days });
    setTimeout(() => {
      navigate('/detail');
    },1800);
  }

  return (
    <HomeContainer>
      <img src={airplane} alt="" />
      <img src={hatchback} alt="" />
        <Main className={FormAnimationStepHanlder()}>
          <Form className='inputForm'>
            <h1>트립지니 - AI 여행플래너</h1>
            <input type="text" placeholder='어느 나라?' value={inputForm.contry} onChange={(e) => setInputForm({...inputForm, contry: e.target.value})}/>
            <input type="text" placeholder='어느 지역?' value={inputForm.destination} onChange={(e) => setInputForm({...inputForm, destination: e.target.value})}/>
            <input type="number" placeholder='몇 일?' value={inputForm.days} onChange={(e) => setInputForm({...inputForm, days: e.target.value})} min="0" step="1"/>
            <button onClick={getPlanAPIHandler}>완료!</button>
          </Form>
          <Bot animationSteps={botState.animationSteps} goDetail={goDetail}></Bot>
        </Main>
        {
          inputForm.animationSteps === 3 && defaultCardList && (
            <Board cardList={defaultCardList}></Board>
          )
        }   
        {
          curtain && (
            <Curtain></Curtain>
          )
        }
      <Info></Info>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.section`
  position: relative;
  height: 100vh;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC') repeat 0 0;
  color: #999;
  text-align: center;
  overflow: hidden;
  animation: bg-scrolling-reverse .92s infinite;
  animation-timing-function: linear;
  @keyframes bg-scrolling-reverse {
    100% { background-position: 50px 50px }
  }

  & > img:first-of-type {
    position: absolute;
    width: 180px;
    height: 180px;
    animation: airplane 25s infinite;
    @keyframes airplane {
      0% {
        left: 5vw;
        bottom: -180px;
      }
      30% {
        left: 80vw;
        bottom: calc(100vh + 180px);
      }
      100% {
        left: 80vw;
        bottom: calc(100vh + 180px);
      }
    }
  }
  & > img:nth-of-type(2) {
    position: absolute;
    width: 100px;
    height: 100px;
    animation: car 25s infinite;
    @keyframes car {
      0% {
        left: -120px;
        top: 10vh;
      }
      70% {
        left: -120px;
        top: 10vh;
      }
      100% {
        left: calc(100vw + 240px);
        top: 80vh;
      }
    }
  }
`;
const Main = styled.main`
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform: translate(50%, 50%);
  
  &.scaledown .inputForm {
    scale: 0;
    opacity: 0;
  }
  &.rightdown {
    right: 250px;
    bottom: 250px;
    transition: all 1s cubic-bezier(.71,-0.3,.83,.95);
  }
  @media (max-width: 800px) {
    width: 80vw;
  }
`;
const Form = styled.div`
  display: flex; 
  flex-direction: column;
  padding: 25px;
  border-radius: 20px;
  background-color: #fafafa;
  box-shadow:  22px 22px 43px #d4d4d4,
              -22px -22px 43px #ffffff;
  transition: all 0.5s ease-in;
  transform-origin: bottom right;
  h1 {
    position: absolute;
    left: 0px;
    top: -30px;
    display: inline-block;
    padding: 1px 4px;
    color: #25353d;
    background-color: #fafafa;
    border: 2px solid #00bcd4;
    border-radius: 8px;
    font-size: 20px;
  }
  input {
    padding: 15px;
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    letter-spacing: 1.2px;
  }
  input::-webkit-inner-spin-button {
    appearance: none;
  }
  button {
    margin: 20px auto 0px;
    display: inline-block;
    width: 150px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #e8e8e8;
    cursor: pointer;
    &:hover {
      background-color: #00bcd4;
      color: #fff;
    }
  }
  *:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const Curtain = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  transform: translateX(100%);
  animation: curtain 2s;
  z-index: 2;
  @keyframes curtain {
    0% {
      transform: translateX(100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(0%);
    }
  }
`;