import "./App.css";
import SensorsInfo from "./components/SensorsInfo/SensorsInfo";
import SettingsForm from "./components/SettingsFroms/SettingsForm";

const App = () => {

  return (
    <div className="App">
      <SettingsForm></SettingsForm>
      <SensorsInfo></SensorsInfo>
    </div>
  );
};

export default App;
