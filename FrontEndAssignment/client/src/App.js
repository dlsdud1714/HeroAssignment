import EngergySources from './components/EnergySources';
import './App.css';
import EnergyCards from './components/EnergyCards/EnergyCards';
import Gauge from './components/EnergyCards/EnergyCard/Gauge/Gauge';

function App() {
  return (
    <div className="App">
     {/* <EngergySources/> */}
     <EnergyCards/>
     {/* <Gauge/> */}
    </div>
  );
}

export default App;
