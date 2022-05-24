import { Routes, Route} from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/home/navigation.component";
import Signin from "./routes/sign-in/sign-in.component";

const App = () => {
    return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="signin" element={<Signin />} />
      </Route>
    </Routes>
  );
};

export default App;