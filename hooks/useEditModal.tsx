import { create } from 'zustand'

interface EditCareerSenseModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useEditMdoal = create<EditCareerSenseModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose:()=>set({isOpen:false})
}))

export default useEditMdoal;