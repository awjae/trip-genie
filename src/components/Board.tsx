import styled from '@emotion/styled';
import React, { useState } from 'react';
import closeIcon from '@/images/close.png';
import staticImage_1 from '@/images/staticImage_1.png';
import staticImage_2 from '@/images/staticImage_2.png';
import staticImage_3 from '@/images/staticImage_3.png';
import staticImage_4 from '@/images/staticImage_4.png';

function Board({ cardList }: { cardList: any[]; }) {
  const [subBoard, setSubBoard] = useState(false);
  const [staticExample, setStaticExample] = useState<string>();
  const staticImage = [staticImage_1, staticImage_2, staticImage_3, staticImage_4];
  const cardClickHanlder = (idx: number) => {
    setSubBoard(true);
    setStaticExample(staticImage[idx]);
  }

  return (
    <BoardContainer>
      <div className='backrgound'>
        <div></div>
        <div></div>
      </div>
      <div className='list'>
        { cardList && (
            <h1>이렇게 만들어 보겠습니다!</h1>
          )
        }
        <div className='cardListWrapper'>
        { cardList && cardList.map((card, key) => (
            <Card key={key} onClick={() => cardClickHanlder(key)}>
              <div className='background' style={{backgroundImage: `url(${(card.url)}`}}></div>
              <div className='info'>
                <p>{card.contry}</p>
                <p>{card.destination}</p>
                <p>{card.days-1}박 {card.days}일</p>
              </div>
            </Card>
          ))
        }
        </div>
      </div>
      <SubBoard className={subBoard ? 'active' : ''}>
        <span onClick={() => setSubBoard(false)}><img src={closeIcon} alt="닫기" width={18} height={19}/></span>
        <div className='staticImageWrapper'><img src={staticExample} alt="예시 이미지" /></div>
      </SubBoard>
    </BoardContainer>
  )
}

export default Board

const BoardContainer = styled.section`
  position: absolute;
  width: 100vw;
  height: 65vh;
  top: 45%;
  transform: translateY(-50%);
  .backrgound {
    position: absolute;
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
  .list {
    position: absolute;
    width: 100%;
    height: 100%;
    h1 {
      margin: 20px;
      color: #e8e8e8;
      font-size: 36px;
    }  
    .cardListWrapper {
      display: flex;
      margin: 0px 5vw;
      width: calc(100% - 10vw);
      height: calc(100% - 90px);
      align-items: center;
      justify-content: space-between;
      transition: filter .2s linear;
      &:hover article:not(:hover) .background:not(:hover) {
        filter: brightness(0.5) saturate(0) contrast(1) blur(10px);
      }
    }
  }
`;
const Card = styled.article`
  position: relative;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 30px;
  width: 20%;
  height: 75%;
  text-align: left;
  font-family: 'IM-Bold';
  color: rgba(255,255,255,0.9);
  box-shadow: rgba(255, 255, 255, 0.25) 0px 7px 29px 0px;
  opacity: 1;
  animation: card 2s;
  transition: transform .2s linear;
  cursor: pointer;
  .background {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    left: 0px;
    top: 0px;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    transition: filter .2s linear;
    &::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 0px;
      border-radius: 19px;
      background-color: rgba(0,0,0, .3);
      width: 100%;
      height: 100%;
    }
  }
  @keyframes card {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
  }
  div {
    position: absolute;
    p {
      margin-bottom: 10px;
      letter-spacing: 4px;
    }
  }
  &:hover {
    transform: scale(1.05) translateZ(0);
  }
`;
const SubBoard = styled.section`
  position: fixed;
  z-index: 1;
  top: 50%;
  left: -85vw;
  transform: translateY(-50%);
  background-color: #fff;
  border-radius: 0 25px 25px 0;
  width: 70%;
  height: 80vh;
  transition: left 1s;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px;
  &.active {
    left: 0px;
  }
  span { 
    position: absolute;
    cursor: pointer;
    right: 25px;
    top: 25px;
  }
  .staticImageWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    img {
      width: 80%;
      height: 80%;
    }
  }
`;