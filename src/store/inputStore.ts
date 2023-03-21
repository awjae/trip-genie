import { InputForm } from '@/types/input';
import { create } from 'zustand'

const useDataStore = create((set) => ({
  input: {},
  setInput: ({ contry, destination, days }: InputForm) => set((state: any) => ({ input: { contry, destination, days }})),
}))

export default useDataStore;