import { atom } from "recoil";

export const connexState = atom({
    key: 'connected',
    default: { username: '', room: '' }
})