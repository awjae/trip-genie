import styled from '@emotion/styled';
import React, { useState } from 'react';
import warningIcon from '@/images/warning.png';
import closeIcon from '@/images/close.png';

function Info() {
  const [infoLayer, setInfoLayer] = useState(false);

  return (
    <InfoContainer>
      <div className='imageWrapper' onClick={() => setInfoLayer(true)}>
        <img src={warningIcon} alt="문의하기 아이콘" width={36} height={36}/>
      </div>
      <InfoLayer className={infoLayer ? 'active' : ''}>
        <span onClick={() => setInfoLayer(false)}><img src={closeIcon} alt="닫기" width={10} height={10}/></span>
        <p>chatGPT의 '환상'현상이 나타날 수 있습니다.</p>
        <p>기타문의 : djwotmd@gmail.com</p>
      </InfoLayer>
    </InfoContainer>
  )
}

export default Info;

const InfoContainer = styled.section`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1;
  .imageWrapper {
    background-color: #fff;
    border-radius: 50%;
    height: 36px;
    cursor: pointer;
  }
`;

const InfoLayer = styled.div`
  position: absolute;
  right: -300px;
  top: 0px;
  display: flex;
  flex-direction: column;
  border: 2px solid #ffc048;
  border-radius: 15px;
  background-color: #fff;
  padding: 15px 10px;
  font-size: 13px;
  width: 240px;
  transition: right 1s cubic-bezier(.48,-0.69,.51,1.6);
  &.active {
    right: 0px;
  }
  img { 
    position: absolute;
    cursor: pointer;
    right: 5px;
    top: 5px;
  }
  p:not(:last-child) {
    margin-bottom: 5px;
  }
`;