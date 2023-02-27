import { create } from 'zustand'

const useDataStore = create((set) => ({
  data: {},
  setData: (data: any) => set((state: any) => ({ data: data })),
}))

export default useDataStore;