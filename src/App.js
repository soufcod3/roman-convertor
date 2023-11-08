import { useState } from "react";
import "./App.css";
import { romanNumberConverter } from "roman-numerals-converter-hetic";

function App() {
  const [result, setResult] = useState("");
  const [inputNumber, setInputNumber] = useState("");

  const handleConvert = (number) => {
    console.log('result', romanNumberConverter(number))
    setResult(romanNumberConverter(number))
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container d-flex flex-column align-items-center gap-3">
          <div className="card p-5 d-flex flex-column align-items-center gap-3" style={{'width': 'fit-content'}}>
          <h4 className="text-center">Convertisseur</h4>
          <input
            className="form-control"
            type="number"
            placeholder="1-3999"
            min={1}
            max={3999}
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
            style={{'width': "300px"}}
          />
          <button className="btn btn-success" type="submit" onClick={() => handleConvert(inputNumber)} style={{'width': 'fit-content'}}>
            Convertir
          </button>
          </div>
          <div className="card p-5 d-flex flex-column align-items-center gap-3" style={{'width': 'fit-content'}}>
            <h4 className="text-center">Résultat</h4>
          <input type="text" value={result} style={{'width': "300px"}} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
