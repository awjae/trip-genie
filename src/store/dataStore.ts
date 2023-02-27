import { MapData } from '@/types/map';
import { create } from 'zustand'

const useDataStore = create((set) => ({
  data: {},
  setData: (data: MapData[]) => set((state: any) => ({ data: data })),
}))

export default useDataStore;