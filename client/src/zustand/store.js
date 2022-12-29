import create from "zustand"; // create로 zustand를 불러옵니다.
import { useCookies } from "react-cookie";

const useStore = create(() => ({
  GetToken: () => {
    const [cookies] = useCookies(["ikuzo"]);
    const token = cookies.ikuzo.token;
    return token;
  },
  GetId: () => {
    const [cookies] = useCookies(["ikuzo"]);
    const id = cookies.ikuzo.id;
    return id;
  },
}));

export default useStore;
