import "@copilotkit/react-ui/styles.css";
import "./App.css";
import Body from "./components/Body";
import { Toaster } from "react-hot-toast";
import CopilotHelper from "./components/CopilotHelper";

function App() {
  return (
    <div className="App">
      <Body />
      <Toaster />
      <CopilotHelper />
    </div>
  );
}

export default App;
