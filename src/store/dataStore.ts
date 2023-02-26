import { create } from 'zustand'

const useDataStore = create((set) => ({
  data: {},
  setData: () => set((state: any) => ({ ...state, data: state })),
}))

export default useDataStore;