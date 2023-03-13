import styled from '@emotion/styled';
import React from 'react'

function ImageContents({ data }: { data: any[] }) {
  return (
    <ImageContentsContainer>
      <div className='mainBanner'>
        <img src={data[0].thumbnail} alt="" />
      </div>
      <ul>
      {
        data.filter((_: any, idx: number) => idx > 0).map((item: any, idx: number) => (
          <li key={idx} className='subImage'>
            <img src={item.thumbnail} alt="" />
          </li>
        ))
      }
      </ul>
    </ImageContentsContainer>
  )
}

export default ImageContents;

const ImageContentsContainer = styled.section`
  .mainBanner {
    h2 {
      font-size: 21px;
    }
    img {
      width: 100%;
    }
  }
  ul {
    display: flex;
    overflow: auto;
    padding-bottom: 10px;
    width: 342px;
    li {
      width: 105px;
      height: 80px;
      &:not(:last-child) {
        margin-right: 15px;
      }
      img {
        width: 105px;
        overflow: hidden;
        object-fit: cover;
        height: 80px;
        border-radius: 15px;
      }
    }
  }
`;