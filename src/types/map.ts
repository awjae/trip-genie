export type Destination = {
  "destination": string;
  "description": string;
  "latitude": number;
  "longitude": number;
}
export type MapData = {
  [day: string]: Destination[]; 
}