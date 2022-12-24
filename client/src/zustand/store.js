import create from "zustand"; // create로 zustand를 불러옵니다.
import axios from "axios";

const useStore = create((set, get, _state) => ({
  questions: [],
  async getInitialQuestions(url) {
    const response = await axios.get(url, {
      headers: {
        "ngrok-skip-browser-warning": "skip", //ngrok오류로 인해 넣어준 헤더
      },
    });
    return response.data;
  },
}));

export default useStore;
