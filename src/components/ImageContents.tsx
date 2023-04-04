import styled from '@emotion/styled';
import React, { useState } from 'react';
import ImageViwer from '@/components/ImageViewer';

function ImageContents({ data, setImageViewer }: { data: any[]; setImageViewer: any; }) {

  return (
    <ImageContentsContainer>
      <div className='mainBanner' onClick={() => setImageViewer({ isShow: true, url: data[0].link })}>
        <img src={data[0].thumbnail} alt="" />
      </div>
      <ul>
      {
        data.filter((_: any, idx: number) => idx > 0).map((item: any, idx: number) => (
          <li key={idx} className='subImage' onClick={() => setImageViewer({ isShow: true, url: item.link })}>
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
    img {
      border-radius: 15px;
      width: 100%;
      max-height: 350px;
      object-fit: cover;
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      @media (max-width: 800px) {
        max-height: 150px;
      }
    }
  }
  ul {
    display: flex;
    overflow: auto;
    padding-bottom: 10px;
    width: 100%;
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
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 10px;
      }
    }
  }
`;