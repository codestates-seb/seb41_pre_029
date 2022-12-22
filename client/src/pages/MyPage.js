import EditProfile from "../components/EditProfile";
import DeleteProfile from "../components/DeleteProfile";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

//주석

const MyPage = () => {
  return (
    <>
      <Nav />
      <EditProfile />
      <DeleteProfile />
      <Footer />
    </>
  );
};

export default MyPage;
