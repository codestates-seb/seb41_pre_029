import create from "zustand"; // create로 zustand를 불러옵니다.
import axios from "axios";

const useStore = create((set) => ({
  async getInitialQuestions() {
    const response = await axios.get("/questions");
    return response.data;
  },
  // async getInitialMembers() {
  //   const response = await axios.get("/members/1");
  //   return response.data;
  // },
  // increasePopulation: () => set((state) => console.log(state)),
  // removeAllBears: () => set(),
}));

export default useStore;
