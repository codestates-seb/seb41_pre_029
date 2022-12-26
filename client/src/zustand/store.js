import create from "zustand"; // create로 zustand를 불러옵니다.
import axios from "axios";

const useStore = create((set) => ({
  async getInitialQuestions(url) {
    const response = await axios.get(url, {
      headers: {
        "ngrok-skip-browser-warning": "skip", //ngrok오류로 인해 넣어준 헤더
      },
    });
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
