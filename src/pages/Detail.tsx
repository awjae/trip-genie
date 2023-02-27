import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Map, View } from 'ol';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat, get, Projection } from 'ol/proj';
import 'ol/ol.css';
import useMapStore from '@/store/mapStore';


function Detail() {
  const map = useMapStore((state: any) => state.map);
  const setMap = useMapStore((state: any) => state.setMap);

  useEffect(() => {
    const temp = new Map({
      layers: [
        new Tile({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        projection: get('EPSG:3857') as Projection,
        center: fromLonLat([126.936743, 37.486479], get('EPSG:3857') as Projection),
        zoom: 15
      }),
    })
    setMap(temp);
    return () => temp.setTarget(undefined);
  }, []);
  
useEffect(() => {
  console.log(map)
}, [map])


  return (
    <DetailContainer>
      <MapWrapper>
        <div id="map"></div>
      </MapWrapper>
    </DetailContainer>
  )
}

export default Detail;

const DetailContainer = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
`;

const MapWrapper = styled.section`
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
`;