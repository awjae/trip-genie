import styled from '@emotion/styled';
import React from 'react'

function Contents() {
  return (
    <ContentsContainer>Contents</ContentsContainer>
  )
}

export default Contents;

const ContentsContainer = styled.section`
  width: 50vw;
  animation: rightToLeft 1s;
  @keyframes rightToLeft {
    0% {
      width: 0;
    }
  }
`;