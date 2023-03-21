import { create } from 'zustand'

const useMapStore = create((set) => ({
  map: {},
  setMap: (obj: Object) => set((state: any) => ({map: obj })),
  element: {},
  setElement: () => set((state: any) => ({element: state.element})),
  placeReason: {},
  setPlaceReason: (place: string, reason: string) => set((state: any) => ({ placeReason: { ...state.placeReason, [place]: reason }})),
  imageSearchCache: {},
  setImageSearchCache: (destination: string, items: string) => set((state: any) => ({ imageSearchCache: { ...state.imageSearchCache, [destination]: items }})),
}))

export default useMapStore;