import { Body } from "./Body/Body";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import { ShuffledBackground} from "./ShuffledBackground/ShuffledBackground";

export const Base = () => {
  return (
    <>
      <ShuffledBackground/>
      <Header />
      <Body />
      <Footer />
    </>
  );
};
