import { create } from 'zustand'

interface SocialModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;

}

const useSocialModal = create<SocialModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose:()=>set({isOpen:false})
}))

export default useSocialModal;