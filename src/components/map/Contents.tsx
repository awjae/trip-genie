import { ContentsType } from '@/types/contents';
import { Destination } from '@/types/map';
import { getSearchImage } from '@/utils/searchAPI';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import BlogContents from '@/components/map/BlogContents';
import ImageContents from '@/components/ImageContents';
import { getPlaceReason } from '@/utils/openai';
import { getPlaceReason_server } from '@/utils/searchAPI';
import useInputStore from '@/store/inputStore';
import useMapStore from '@/store/mapStore';

function Contents({ title, data, click, setImageViewer }: ContentsType) {
  const [selectedList, setSelectedList] = useState(data.map(item => ({...item, isActive: false })));
  const [imageList, setImageList] = useState<any>([]);
  const input = useInputStore((state: any) => state.input);
  const [reason, setReason] = useState("");
  const setPlaceReason = useMapStore((state: any) => state.setPlaceReason);
  const placeReasonStore = useMapStore((state: any) => state.placeReason);
  const imageSearchCache = useMapStore((state: any) => state.imageSearchCache);
  const setImageSearchCache = useMapStore((state: any) => state.setImageSearchCache);
  const [currController, setCurrController] = useState(new AbortController());

  const imageSearch = useMutation('searchImage', getSearchImage, {
    onSuccess(data, variables, context) {
      const items = JSON.parse(data).items;
      setImageSearchCache(variables, items);
      setImageList(items);
    },
  });
  const placeReason = useMutation('placeReason', getPlaceReason_server, {
    onSuccess(data, variables, context) {
      if (!data || !data.body || !variables.place) return
      if (data.body === "development") {
        setReason("개발자 모드 API 처리 : chatGPT");
        return
      }
      window.sessionStorage.removeItem("isAbort");
      placeReasonAsyncFn(variables.place, data);
    },
  });
  const placeReasonAsyncFn = async (place: string, response: any) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let result = '';
    //call by value 로 인해 sesstion 처리
    while (true) {
      const { done, value } = await reader.read();
      if (window.sessionStorage.getItem("isAbort")) {
        setReason("");
        window.sessionStorage.removeItem("isAbort");
        break;
      };
      if (done) break;
      const chunk = decoder.decode(value);
      const validate = chunk.split("\n").filter(item => item !== '').filter(item => item !== "data: [DONE]").map(el => JSON.parse(el.slice(6)))
      .filter(json => json?.choices[0].delta.content).map(json => json.choices[0].delta.content);
      if (validate[0]) {
        result += validate[0];
        setReason(result);
      }
    }
    setPlaceReason(place, result);
  } 

  const itemClickHandler = (item: Destination, idx: number) => {
    if (selectedList[idx].isActive) return
    setReason("");
    currController.abort();
    const tempController = new AbortController();
    window.sessionStorage.setItem("isAbort", "true");
    if (placeReasonStore[item.destination]) {
      setReason(placeReasonStore[item.destination]);
    } else {
      console.log(tempController.signal)
      placeReason.mutate({ contry: input.contry, destination: input.destination, place: item.destination, signal: tempController.signal });
    }
    setSelectedList(selectedList.map((el, jdx) => idx === jdx ? {...el, isActive: true} : {...el, isActive: false}));
    setCurrController(tempController);
    click(item);
  };

  useEffect(() => {
    setSelectedList(data.map((item, idx) => {
      if (idx === 0) {
        if (placeReasonStore[item.destination]) {
          setReason(placeReasonStore[item.destination]);
        } else {
          placeReason.mutate({ contry: input.contry, destination: input.destination, place: item.destination });
        }
        return {...item, isActive: true };
      }
      return {...item, isActive: false };
    }));
  }, [data])

  useEffect(() => {
    const target = selectedList.find(item => item.isActive);
    if (!target || !target.destination) return
    if (imageSearchCache[target.destination]) {
      setImageList(imageSearchCache[target.destination]);
    } else {
      imageSearch.mutate(target.destination);
    }
    
    return () => {
      window.sessionStorage.setItem("isAbort", "true");
      currController.abort();
    }
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
              </li>
            )
          })
        }
      </SelectedListWrapper>
      <TextArea>
        {reason}
      </TextArea>
      {
        imageList.length > 0 && (
          <ImageContents data={imageList} setImageViewer={setImageViewer}></ImageContents>
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
  @media (max-width: 800px) {
    width: calc(100vw - 40px);
    background-color: #fff;
    height: 80vh;
    min-height: 350px;
    box-shadow: rgb(0 0 0 / 24%) 0px -5px 8px;
    padding-top: 5px;
    header {
      display: none;
    }
  }
`;

const SelectedListWrapper = styled.ul`
  display: flex;
  justify-content: space-between;  
  margin: 10px 0;
  overflow-x: auto;
  li {
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #e5c967;
    width: 25%;
    height: 50px;
    &:not(:last-of-type) {
      margin-right: 10px;
    }
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
    @media (max-width: 800px) {
      width: 25%;
      height: 30px;
      h2 {
        font-size: 14px;
      }
    }
  }
`;

const TextArea = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.4;
  @media (max-width: 800px) {
    font-size: 12px;
  }
`;