import styled from '@emotion/styled';
import React from 'react'

function Board({ cardList }: { cardList: any[]; }) {
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
        { cardList && cardList.map((card, key) => {
            return <Card key={key}>
              <div className='background' style={{backgroundImage: `url(${(card.url)}`}}></div>
              <div className='info'>
                <p>{card.contry}</p>
                <p>{card.destination}</p>
                <p>{card.days-1}박 {card.days}일</p>
              </div>
            </Card>
          })
        }
        </div>
      </div>
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
  }
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 19px;
    background-color: rgba(0,0,0, .2);
    width: 100%;
    height: 100%;
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