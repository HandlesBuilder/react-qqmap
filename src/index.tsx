import React, { useEffect } from 'react';

type MapOptions = {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  rotation?: number;
  pitch?: number;
  scale?: number;
  offset?: {
    x: number;
    y: number;
  };
  draggable?: boolean;
  scrollable?: boolean;
  pitchable?: boolean;
  rotatable?: boolean;
  doubleClickZoom?: boolean;
  mapZoomType?: any;
  boundary?: any;
  mapStyleId?: string;
  baseMap?: any;
  viewMode?: string;
  showControl?: boolean;
  renderOptions?: Record<string, any>;
  clip?: Record<string, any>;
};

export type QQMapProps = {
  apiKey: string;
  options?: MapOptions;
};

class QQMap {
  static state = {
    // 构造器：TMap
    constructor: (window as any).TMap,
    // 实例 map
    instance: null
  };

  static loadScript = (apiKey: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${apiKey}`;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  static init = (options?: MapOptions) => {
    const { center, ...rest } = options || {};

    // 定义地图中心点坐标（默认坐标为天安门）
    const LatLng = new this.state.constructor.LatLng(
      center?.lat || 39.908802,
      center?.lng || 116.397502
    );

    // 定义map变量，调用 TMap.Map() 构造函数创建地图
    const map = new this.state.constructor.Map(
      document.getElementById('QQMap'),
      {
        center: LatLng,
        ...rest
      }
    );

    this.state.instance = map;

    return map;
  };

  static render = (props: QQMapProps) => {
    const { apiKey, options } = props;

    useEffect(() => {
      if (!this.state.constructor) {
        this.loadScript(apiKey).then(() => {
          this.state.constructor = (window as any).TMap;
          this.init(options);
        });
      } else {
        this.init(options);
      }
      return () => {};
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id='QQMap' />;
  };
}

export default QQMap.render;
