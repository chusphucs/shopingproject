import { useLocation } from "react-router-dom";
import Filter from "./components/Filter";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MenuAcc from "./components/MenuAcc";

function App(props) {
  let param = useLocation();

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            {param["pathname"].includes("user") ? <MenuAcc /> : <Filter />}
          </div>
          <div className="col-sm-9 padding-right">{props.children}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
