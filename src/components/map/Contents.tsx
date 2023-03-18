import { ContentsType } from '@/types/contents';
import { Destination } from '@/types/map';
import { getSearchImage } from '@/utils/searchAPI';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import BlogContents from '@/components/map/BlogContents';
import ImageContents from '@/components/ImageContents';

function Contents({ title, data, click }: ContentsType) {
  const [selectedList, setSelectedList] = useState(data.map(item => ({...item, isActive: false })));
  const [imageList, setImageList] = useState<any>([]);

  const itemClickHandler = (item: Destination, idx: number) => {
    if (selectedList[idx].isActive) return
    setSelectedList(selectedList.map((el, jdx) => idx === jdx ? {...el, isActive: true} : {...el, isActive: false}));
    click(item);
  };
  
  const imageSearch = useMutation('searchImage', getSearchImage, {
    onSuccess(data, variables, context) {
      setImageList(JSON.parse(data).items);
    },
  });

  useEffect(() => {
    setSelectedList(data.map((item, idx) => {
      if (idx === 0) {
        return {...item, isActive: true };
      }
      return {...item, isActive: false };
    }));
  }, [data])

  useEffect(() => {
    const target = selectedList.find(item => item.isActive);
    if (!target || !target.destination) return
    imageSearch.mutate(target.destination);
  }, [selectedList])
  

  return (
    <ContentsContainer>
      <header>{title + 1}일차!</header>
      <SelectedListWrapper>
        { 
          selectedList.length > 0 && selectedList.map((item, idx) => {
            return (
              <li key={idx} onClick={() => itemClickHandler(item, idx)} className={item.isActive ? 'active' : ''}>
                <h2>{item.destination}</h2>
                {/* <p>{item.description}</p> */}
              </li>
            )
          })
        }
      </SelectedListWrapper>
      {
        imageList.length > 0 && (
          <ImageContents data={imageList}></ImageContents>
        )
      }
      <BlogContents></BlogContents>
    </ContentsContainer>
  )
}

export default Contents;

const ContentsContainer = styled.section`
  padding: 20px;
  width: 50vw;
  overflow: auto;
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
`;

const SelectedListWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  li {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 10px;
    background-color: #e5c967;
    width: 25%;
    height: 50px;
    &:hover, &.active {
      background-color: #fedf73;
    }
    h2 {
      font-size: 16px;
      width: 100%;
      word-break: keep-all;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
    }
  }
`;