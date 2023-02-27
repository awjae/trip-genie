import { create } from 'zustand'

const useMapStore = create((set) => ({
  map: {},
  setMap: () => set((state: any) => ({ ...state, map: state })),
  element: {},
  setElement: () => set((state: any) => ({element: state})),
}))

export default useMapStore;