import styled from '@emotion/styled';
import React from 'react';
import closeIcon from '@/images/close.png';
import iconNoImage from '@/images/no-photo.png';

function ImageViewer({ url, close }: { url: string; close: Function; }) {

  const defaultImg = (e: any) => {
    e.target.src = iconNoImage;
  }

  return (
    <ImageViewerContainer>
      <span className='closeIcon' onClick={() => close()}>
        <img src={closeIcon} alt="" width={32} height={32}/>
      </span>
      <Dimmed onClick={() => close()}></Dimmed>
      <div className='imageWrapper'>
        <img src={url} referrerPolicy="no-referrer" alt="" onError={defaultImg}/>
      </div>
    </ImageViewerContainer>
  )
}

export default ImageViewer;

const ImageViewerContainer = styled.section`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  .imageWrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      max-width: 80vw;
      max-height: 80vh;
    }
  }
  .closeIcon {
    position: absolute;
    display: inline-block;
    top: 25px;
    right: 25px;
    cursor: pointer;
    filter: invert(1);
  }
`;
const Dimmed = styled.div`
  background-color: rgba(0,0,0, .7) ;
  width: 100vw;
  height: 100vh;
`;