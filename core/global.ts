import { create } from 'zustand'
type GlobalState = {
    global_selectedCourseName: string
    global_selectedSectionName: string,
    global_setCourseName: (name: string) => void
    global_setSectionName: (name: string) => void
    global_clearAll: () => void
}

const useGlobalStore = create<GlobalState>(set => ({
    global_selectedCourseName: '',
    global_selectedSectionName: '',
    global_selectedChatID: '',
    global_setCourseName: (name) => set({ global_selectedCourseName: name }),
    global_setSectionName: (name) => set({ global_selectedSectionName: name }),
    global_clearAll: () => set({ global_selectedCourseName: '', global_selectedSectionName: '' })
}))

export default useGlobalStore