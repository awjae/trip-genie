import React from 'react';
import botIcon from '@/images/bot.png';
import botIcon_analyze from '@/images/bot_analyze.png';
import styled from '@emotion/styled';

function Bot({ animationSteps }: {animationSteps: number;}) {
  return (
    <BotIconContainer>
      {
        animationSteps !== 0 ?
          <span className='analyze'>
            <img src={botIcon_analyze} alt="" />
          </span>
        :
        <img src={botIcon} alt="" />
      }
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
  .analyze::after {
    content: '생각중...';
    position: absolute;
    display: inline-block;
    width: 100px;
    left: calc(50% - 30px);
    bottom: -30px;
  }
`;