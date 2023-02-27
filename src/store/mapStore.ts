import { create } from 'zustand'

const useMapStore = create((set) => ({
  map: {},
  setMap: (obj: Object) => set((state: any) => ({map: obj })),
  element: {},
  setElement: () => set((state: any) => ({element: state.element})),
}))

export default useMapStore;