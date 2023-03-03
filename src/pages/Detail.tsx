import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { Map, View, Feature, Overlay } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat, get, Projection } from 'ol/proj';
import 'ol/ol.css';
import useMapStore from '@/store/mapStore';
import useDataStore from '@/store/dataStore';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import mapPointIcon from '@/images/map-point.png';
import { Destination, MapData } from '@/types/map';
import { Geometry, Point } from 'ol/geom';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';


function Detail() {
  const map = useMapStore((state: any) => state.map);
  const setMap = useMapStore((state: any) => state.setMap);
  const data = useDataStore((state: any) => state.data);
  const [leftNav, setLeftNav] = useState<number>();
  const [mapPopover, setMapPopover] = useState({
    popup: {},
    isShow: false,
    title: "",
    content: "",
    left: 0,
    top: 0,
  });
  const mapPopupRef = useRef<HTMLInputElement>(null);

  const setPointLayer = (data: any) => {
    if (Object.keys(data).length < 1) return
    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
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
    map.on('movestart', () => {
      setMapPopover({...mapPopover, isShow: false});
    });
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
    if (leftNav === idx) {
      setLeftNav(-1);
      return
    }
    setLeftNav(idx);
  }
 
  useEffect(() => {
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
        zoom: 10
      }),
    })
    setMap(temp);
    return () => temp.setTarget(undefined);
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
      </MapWrapper>
      <div id="mapPopup" style={{ left: mapPopover.left - 82, top: mapPopover.top - 160 }} className={String(mapPopover.isShow)}>
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
    </DetailContainer>
  )
}

export default Detail;

const DetailContainer = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
  #mapPopup {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 130px;
    height: 70px;
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
`;

const MapWrapper = styled.section`
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
`;

const LeftNav = styled.nav`
  position: fixed;
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
`;