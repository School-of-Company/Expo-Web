"use client";

import Script from "next/script";
import { useRef } from "react";

const LAT = 35.189184;
const LNG = 126.918027;

/* 사용하는 카카오맵 SDK API만 최소한으로 타입 선언한다. */
type LatLng = object;
interface KakaoMaps {
  load(callback: () => void): void;
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (container: HTMLElement, options: { center: LatLng; level: number }) => {
    addControl(control: object, position: number): void;
  };
  Marker: new (options: { map: object; position: LatLng }) => object;
  ZoomControl: new () => object;
  ControlPosition: { RIGHT: number };
}

declare global {
  interface Window {
    kakao: { maps: KakaoMaps };
  }
}

/** 행사장 위치를 마커로 표시하는 카카오 지도. 라우트 이동 후 재마운트될 때도 onReady로 다시 그린다. */
export default function KakaoMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const initMap = () => {
    window.kakao.maps.load(() => {
      if (!containerRef.current) return;
      const { maps } = window.kakao;
      const center = new maps.LatLng(LAT, LNG);
      const map = new maps.Map(containerRef.current, { center, level: 3 });
      new maps.Marker({ map, position: center });
      map.addControl(new maps.ZoomControl(), maps.ControlPosition.RIGHT);
    });
  };

  return (
    <>
      <Script
        id="kakao-map-sdk"
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onReady={initMap}
      />
      <div
        ref={containerRef}
        role="region"
        aria-label="전남광주통합특별시교육청AI교육원 위치 지도"
        className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xlarge border border-border-default bg-bg-subtle"
      />
    </>
  );
}
