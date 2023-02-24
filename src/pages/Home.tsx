import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import styled from '@emotion/styled';
import airplane from '@/images/airplane.png';
import hatchback from '@/images/hatchback.png';
import botIcon from '@/images/bot.png';
import botIcon_analyze from '@/images/bot_analyze.png';
import { getPlan } from '@/utils/openai';
import { InputForm } from '@/types/input';

function Home() {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState<InputForm>({
    contry: "",
    destination: "",
    days: "",
    animationSteps: 0,
  });
  const [isDimmed, setIsDimmed] = useState(false);
  const [botState, setBotState] = useState({
    animationSteps: 0,
  })

  const getPlanAPI = useMutation('getPlan', () => getPlan(inputForm), {
    onSuccess(data: any, variables, context) {
      setIsDimmed(false);
      if (data.status === 200) {
        console.log(data.validateResponse);
      }
    },
    onError(error, variables, context) {
        console.log(error);
    },
  })
  const getPlanAPIHandler = async () => {
    // setIsDimmed(true);
    await playAnalyzeAnimation(); 
    // getPlanAPI.mutate();
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     setIsDimmed(false);
    //   }, 5000)
    // });
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
  } 
  const FormAnimationStepHanlder = () => {
    if (inputForm.animationSteps === 0) {
      return '';
    }
    if (inputForm.animationSteps === 1) {
      return 'scaledown';
    }
    if (inputForm.animationSteps === 2) {
      return 'scaledown rightdown';
    }
    if (inputForm.animationSteps === 3) {
      return 'scaledown rightdown';
    }
  }

  return (
    <HomeContainer>
      <img src={airplane} alt="" />
      <img src={hatchback} alt="" />
        <Main className={FormAnimationStepHanlder()}>
          <Form className='inputForm'>
            <input type="text" placeholder='국가' value={inputForm.contry} onChange={(e) => setInputForm({...inputForm, contry: e.target.value})}/>
            <input type="text" placeholder='지역' value={inputForm.destination} onChange={(e) => setInputForm({...inputForm, destination: e.target.value})}/>
            <input type="number" placeholder='일 수' value={inputForm.days} onChange={(e) => setInputForm({...inputForm, days: e.target.value})}/>
            <button onClick={getPlanAPIHandler}>해줘!</button>
          </Form>
          <BotIconContainer>
            {
              botState.animationSteps !== 0 ?
                <span className='analyze'>
                  <img src={botIcon_analyze} alt="" />
                </span>
              :
              <img src={botIcon} alt="" />
            }
          </BotIconContainer>
        </Main>
        {
          inputForm.animationSteps === 3 && (
            <BoardContainer>
              <div className='backrgound'>
                <div></div>
                <div></div>
              </div>
              <div className='list'>

              </div>
            </BoardContainer>
          )
        }
      {
        isDimmed && (
          <Dimmed></Dimmed>
        )
      }
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
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  &.scaledown .inputForm {
    scale: 0;
    opacity: 0;
  }
  &.rightdown {
    left: 80%;
    top: 75%;
    transition: all 1s cubic-bezier(.71,-0.3,.83,.95);
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
      background-color: #b4b3ff;
    }
  }
  *:not(:last-child) {
    margin-bottom: 15px;
  }
`;
const BotIconContainer = styled.div`
  position: absolute;
  right: -25px;
  bottom: -25px;
  img {
    width: 80px;
    height: 80px;
  }
  .analyze::after {
    content: '생각중...';
    position: absolute;
    display: inline-block;
    width: 100px;
    left: calc(50% - 30px);
    bottom: -30px;
  }
`;
const BoardContainer = styled.section`
  position: absolute;
  width: 100vw;
  height: 65vh;
  top: 45%;
  transform: translateY(-50%);
  .backrgound {
    width: 100%;
    height: 100%;
    div {
      width: 100vw;
      height: 50%;
      background-color: rgba(0, 0, 0, .7);
      border: none;
      outline: none;
      font-size: 0px;
    }
    div:first-of-type {
      animation: progressLeft 1s;
      @keyframes progressLeft {
        0% { width: 0% }
        100% { width: 100% }
      }
    }
    div:last-of-type {
      animation: progressright 1s;
      position: absolute;
      @keyframes progressright {
        0% { left: 100% }
        100% { left: 0% }
      }
    }
  }
`;
const Dimmed = styled.section`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .7);
`;
