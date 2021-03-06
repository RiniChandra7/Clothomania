import { Routes, Route} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/home/navigation.component";
import Shop from "./routes/shop/shop.component";
import Signin from "./routes/sign-in/sign-in.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
    return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="signin" element={<Signin />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;