export type Geometry = {
  type: 'MultiPolygon';
  coordinates: [number, number][][][];
};

export type GeoFeature = {
  type: 'Feature';
  properties: {
    adcode: number;
    name: string;
    center: [number, number];
    centroid: [number, number];
    childrenNum: number;
    level: string;
    parent: { adcode: number };
    subFeatureIndex: number;
    acroutes: number[];
  };
  geometry: Geometry;
};

export type GeoFeatureCollection = {
  type: 'FeatureCollection';
  features: GeoFeature[];
};