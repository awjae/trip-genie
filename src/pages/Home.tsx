import React, { useState } from 'react';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import airplane from '@images/airplane.png';
import hatchback from '@images/hatchback.png';
import { InputForm } from '../types/index';
import { getPlan } from '../utils/openai';

function Home() {
  const [inputForm, setInputForm] = useState<InputForm>({
    contry: "",
    destination: "",
    days: "",
  });
  const [isDimmed, setIsDimmed] = useState(false);

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
    setIsDimmed(true);
    getPlanAPI.mutate();
  }

  return (
    <HomeContainer>
      <img src={airplane} alt="" />
      <img src={hatchback} alt="" />
      <Main>
        <input type="text" placeholder='국가' value={inputForm.contry} onChange={(e) => setInputForm({...inputForm, contry: e.target.value})}/>
        <input type="text" placeholder='지역' value={inputForm.destination} onChange={(e) => setInputForm({...inputForm, destination: e.target.value})}/>
        <input type="number" placeholder='일 수' value={inputForm.days} onChange={(e) => setInputForm({...inputForm, days: e.target.value})}/>
        <button onClick={getPlanAPIHandler}>해줘!</button>
      </Main>
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
  animation: bg-scrolling-reverse .92s infinite;
  animation-timing-function:         linear;

  @keyframes bg-scrolling-reverse {
    100% { background-position: 50px 50px }
  }

  img:first-of-type {
    left: 0px;
    top: 0px;
    width: 180px;
    height: 180px;
  }
`;

const Main = styled.main`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex; 
  flex-direction: column;
  padding: 25px;
  border-radius: 20px;
  background-color: #fafafa;
  box-shadow:  22px 22px 43px #d4d4d4,
              -22px -22px 43px #ffffff;
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

const Dimmed = styled.section`
  position: fixed;
  left: 0;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .7);
`;
