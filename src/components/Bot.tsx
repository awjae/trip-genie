import React from 'react';
import botIcon from '@/images/bot.png';
import botIcon_analyze from '@/images/bot_analyze.png';
import botIcon_ok from '@/images/bot_ok.png';
import styled from '@emotion/styled';

function Bot({ animationSteps, goDetail }: {animationSteps: number; goDetail: Function;}) {

  const botSrc = (step: number) => {
    if (step === 2) return botIcon_ok;
    if (step === 1) return botIcon_analyze;
    return botIcon
  }
  const botClass = (step: number) => {
    if (step === 1) return 'analyze';
    if (step === 2) return 'bounce';
    return '';
  }
  const botClickHandler = () => {
    if (animationSteps !== 2) return
    goDetail();
  }

  return (
    <BotIconContainer className={botClass(animationSteps)} onClick={botClickHandler}>
      <span>
        <img src={botSrc(animationSteps)} alt="" />
      </span>
    </BotIconContainer>
  )
}

export default Bot

const BotIconContainer = styled.div`
  position: absolute;
  right: -25px;
  bottom: -25px;
  img {
    width: 80px;
    height: 80px;
  }
  &.analyze span::after {
    content: '생각중...';
    position: absolute;
    display: inline-block;
    width: 100px;
    left: calc(50% - 30px);
    bottom: -30px;
  }
  &.bounce {
    animation: bounce 5s infinite;
    @keyframes bounce {
      0% {
        bottom: -25px;
      }
      5% {
        bottom: -20px;
      }
      10% {
        bottom: -25px;
      }
      18% {
        bottom: -10px;
      }
      28% {
        bottom: -25px;
      }
    }
    span {
      cursor: pointer;
    }
    span::after {
      content: '완료!';
      position: absolute;
      display: inline-block;
      width: 100px;
      left: calc(50% - 35px);
      bottom: -30px;
    }
  }
`;