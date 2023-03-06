import { ContentsType } from '@/types/contents';
import styled from '@emotion/styled';

function Contents({ title, data, click }: ContentsType) {

  return (
    <ContentsContainer>
      <header>{title + 1}일차!</header>
      <ul>
        { 
          data.length > 0 && data.map((item, idx) => {
            return (
              <li key={idx} onClick={() => click(item)}>
                <h2>{item.destination}</h2>
                <p>{item.description}</p>
              </li>
            )
          })
        }
      </ul>
    </ContentsContainer>
  )
}

export default Contents;

const ContentsContainer = styled.section`
  padding: 20px;
  width: 48vw;
  cursor: pointer;
  //애니매이션 시, re-render 됨... 어떻게 하면 최적화?
  /* animation: rightToLeft 1s;
  @keyframes rightToLeft {
    0% {
      width: 0;
    }
  } */
  header {
    margin-bottom: 40px;
    border-radius: 15px;
    background-color: #fedf73;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-family: 'IM-Bold';
    font-size: 32px;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  }
  ul li {
    border-radius: 15px;
    padding: 20px;
    background-color: #ffeba4;
    width: calc(100% - 40px);
    &:not(:last-child) {
      margin-bottom: 20px;
    }
    h2 {
      margin-bottom: 10px;
    }
  }
`;