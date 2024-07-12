import { create } from "zustand";

const userImages = create((set=>({
    images:[],
    setImages:(images)=> set({images})
})))


export default userImages