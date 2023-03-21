import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Map, View, Feature, Overlay } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import { get, Projection } from 'ol/proj';
import 'ol/ol.css';
import useMapStore from '@/store/mapStore';
import useDataStore from '@/store/dataStore';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import mapPointIcon from '@/images/map-point.png';
import homeIcon from '@/images/home.png';
import { Destination } from '@/types/map';
import { Geometry, Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Contents from '@/components/map/Contents';
import { Link, useNavigate } from 'react-router-dom';
import ImageViwer from '@/components/ImageViewer';
import { appHeight } from '@/utils/utils';

function Detail() {
  const map = useMapStore((state: any) => state.map);
  const setMap = useMapStore((state: any) => state.setMap);
  const data = useDataStore((state: any) => state.data);
  const [leftNav, setLeftNav] = useState<number>();
  const [isActiveRightContents, setIsActiveRightContents] = useState(false);
  const navigate = useNavigate();
  const [mapPopover, setMapPopover] = useState({
    popup: {},
    isShow: false,
    title: "",
    content: "",
    left: 0,
    top: 0,
  });
  const mapPopupRef = useRef<HTMLInputElement>(null);
  const moveStartFn = useCallback(() => {
    setMapPopover({...mapPopover, isShow: false});
  }, []);
  const [imageViewer, setImageViewer] = useState({
    isShow: false,
    url: "",
  });

  const setPointLayer = (data: any) => {
    if (Object.keys(data).length < 1) return
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 32],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: mapPointIcon,
      }),
    });
    for (let day in data) {
      const iconFeatureList:Feature<Geometry>[] = [];
      data[day].forEach((target: Destination) => {
        const iconFeature = new Feature({
          geometry: new Point([target.longitude, target.latitude]),
          name: target.destination,
          desc: target.description,
          population: 4000,
          rainfall: 500,
        });
        iconFeature.setStyle(iconStyle);
        iconFeatureList.push(iconFeature);
      });
      const vectorSource = new VectorSource({
        features: iconFeatureList,
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });
      vectorLayer.set("name", `${day}`);
      map.addLayer(vectorLayer);
    }
    map.getView().setCenter(map.getLayers().getArray().filter((mapItem: any) => mapItem.get("name") === "DAY 1")[0].getSource().getExtent());
  };

  const setClickInteraction = () => {
    map.on('click', function (evt: any) {
      setMapPopover({...mapPopover, isShow: false});
      const feature = map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
        return feature;
      });
      if (!feature) {
        return;
      }
      const [left, top] = map.getPixelFromCoordinate(feature.getGeometry().getCoordinates()).map((pixel: number) => Math.floor(pixel));
      setMapPopover({...mapPopover, isShow: true, title: feature.get("name"), content: feature.get("desc"), left: left, top: top});
    });
    map.on('movestart', moveStartFn);
  };

  const setPopup = () => {
    if (!mapPopupRef.current) return;
    const popup = new Overlay({
      element: mapPopupRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
    });
    map.addOverlay(popup);
    setMapPopover({...mapPopover, popup: popup});
  };

  const laftNavHandler = (idx: number) => {
    setMapPopover({...mapPopover, isShow: false});
    map.getLayers().getArray().forEach((layer: any) =>  layer.setOpacity(1));
    if (leftNav === idx) {
      setIsActiveRightContents(false);
      setLeftNav(-1);
      return
    }
    setLeftNav(idx);
    setIsActiveRightContents(true);
    map.getLayers().getArray().filter((layer: any, idx: number) => idx > 0).filter((layer:any) => layer.get("name") !== `DAY ${idx + 1}`).forEach((layer: any) => layer.setOpacity(.3));
    contentsClickHandler(data[Object.keys(data)[idx]][0]);
  }

  const contentsClickHandler = (item: any) => {
    setMapPopover({...mapPopover, isShow: false});
    map.removeEventListener('movestart', moveStartFn);
  
    map.getView().animate({
      center: [Number(item.longitude), Number(item.latitude)],
      duration: 500,
    }, () => {
      setTimeout(() => {
        const pixel = map.getPixelFromCoordinate([Number(item.longitude), Number(item.latitude)]);
        pixel[1] -= 15;
        map.dispatchEvent({
          type: 'click',
          pixel: pixel,
        });
        map.addEventListener('movestart', moveStartFn);
      }, 100)
    });
  }
 
  useEffect(() => {
    if (!isActiveRightContents && Object.keys(data).length === 0) {
      navigate('/');
      return
    }
    const temp = new Map({
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        projection: get('EPSG:4326') as Projection,
        center: [126.936743, 37.486479],
        zoom: 12
      }),
    })
    setMap(temp);

    appHeight();
    window.addEventListener("resize", appHeight);
    
    return () => {
      temp.setTarget(undefined)
      window.removeEventListener("resize", appHeight);
    };
  }, []);
  
  useEffect(() => {
    if (Object.keys(map).length > 0) {
      setPointLayer(data);
      setPopup();
      setClickInteraction();
    }
  }, [map]);

  return (
    <DetailContainer>
      <MapWrapper>
        <div id="map"></div>
        { isActiveRightContents && leftNav !== undefined && (
          <Contents title={leftNav} data={data[Object.keys(data)[leftNav]]} click={contentsClickHandler} setImageViewer={setImageViewer}></Contents>
        )}
        <Link to={'/'} className='home'>
          <img src={homeIcon} alt="홈으로" />
        </Link>
      </MapWrapper>
      <div id="mapPopup" style={{ left: mapPopover.left - 107, top: mapPopover.top - 122 }} className={String(mapPopover.isShow)}>
        <span>
          <em>{mapPopover.title}</em><br></br>
          {mapPopover.content}
        </span>
      </div>
      {
        Object.keys(data).length > 0 && (
          <LeftNav>
            <ul>
            {
              Object.keys(data).map((key, idx) => (
                <li key={idx} onClick={() => laftNavHandler(idx)} className={leftNav === idx ? 'active' : ''}>
                  {(idx + 1) + ' 일'}
                </li>
              ))
            }
            </ul>
          </LeftNav>
        )
      }
      {
        imageViewer.isShow && (
          <ImageViwer url={imageViewer.url} close={() => setImageViewer({ ...imageViewer, isShow: false })}></ImageViwer>
        )
      }
    </DetailContainer>
  )
}

export default Detail;

const DetailContainer = styled.main`
  min-width: 800px;
  width: 100vw;
  height: var(--vh); 
  background-color: #f0f0f0;
  #mapPopup {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 180px;
    height: 50px;
    padding: 16px;
    background-color: #efefef;
    font-size: 16px;
    text-align: center;
    line-height: 22px;
    letter-spacing: 1px;
    box-shadow: 0 4px 10px 0 rgb(0 0 0 / 40%);
    span {
      white-space: pre-wrap;
      font-size: 14px;
      word-break: keep-all;
      em {
        font-family: 'IM-Bold';
        font-size: 20px;
        font-style: normal;
        word-break: keep-all;
      }
    }
    &:after {
      display: block;
      content: "";
      position: absolute;
      bottom: -11px;
      left: 50%;
      margin-left: -18px;
      border-right: 20px transparent solid;
      border-top: 12px #efefef solid;
      border-left: 20px transparent solid;
    }
    &.false {
      display: none;
    }
    &.true {
      display: flex;
    }
  } 
  @media (max-width: 800px) {
    width: 100vw;
    min-width: initial;
  }
`;

const MapWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
  .home {
    position: fixed;
    left: 25px;
    bottom: 25px;
    border-radius: 50%;
    padding: 10px;
    background-color: #fff;
    width: 32px;
    height: 32px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    img {
      width: 100%;
      height: 100%;
    }
    @media (max-width: 800px) { 
      left: initial;
      bottom: initial;
      right: 15px;
      top: 15px;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const LeftNav = styled.nav`
  position: fixed;
  margin-left: 30px;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #fff;
    width: 100px;
    height: 50px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    cursor: pointer;
    &:hover, &.active {
      box-shadow: rgba(157, 255, 0, 0.24) 0px 3px 8px;
      scale: 1.05;
    }
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 800px) {
    margin-left: 0;
    li {
      width: 50px;
      border-radius: 0 10px 10px 0;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }
`;

