import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { romanNumberConverter } from "roman-numerals-converter-hetic";
import nerd from './nerd.gif'

function App() {
  const [result, setResult] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const [convertType, setConvertType] = useState("toRoman");
  const [showGif, setShowGif] = useState(false)

  const handleConvertToRoman = (number) => {
    setResult(romanNumberConverter(number));
  };

  const romanToArabic = (roman) => {
    const romanNumerals = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    let arabicNumeral = 0;
    let prevValue = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
      const numeral = roman[i];
      const value = romanNumerals[numeral];

      if (value < prevValue) {
        arabicNumeral -= value;
      } else {
        arabicNumeral += value;
      }

      prevValue = value;
    }

    return arabicNumeral;
  };

  const handleConvertToArabic = useCallback((romanNumber) => {
    setResult(romanToArabic(romanNumber));
  }, []);

  const handleConvert = useCallback(() => {
    switch (convertType) {
      case "toRoman":
        handleConvertToRoman(inputNumber);
        break;
      case "toArabic":
        handleConvertToArabic(inputNumber);
        break;
      default:
        break;
    }
    setShowGif(true)
  }, [convertType, inputNumber, handleConvertToArabic]);

  useEffect(() => {
    showGif && setTimeout(() => {
      setShowGif(false)
    }, 2000)
  }, [showGif])

  return (
    <div className="App">
      <header className="App-header">
        <div className="container d-flex flex-column align-items-center gap-3">
          <div
            className="card p-5 d-flex flex-column align-items-center gap-3"
            style={{ width: "fit-content" }}
          >
            <h4 className="text-center">Convertisseur</h4>
            <div className="d-flex gap-4">
              <label>
                <input
                  type="radio"
                  checked={convertType=== "toRoman"}
                  onChange={() => setConvertType('toRoman')}
                />
                Vers Romain
              </label>
              <label>
                <input
                  type="radio"
                  checked={convertType=== "toArabic"}
                  onChange={() => setConvertType('toArabic')}
                />
                Vers Arabe
              </label>
            </div>
            {
              convertType === 'toRoman' 
              ?
              <input
                className="form-control"
                type="number"
                placeholder="1-3999"
                min={1}
                max={3999}
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)}
                style={{ width: "300px" }}
              />
              :
              <input
              className="form-control"
              type="text"
              placeholder="MCDXIV"
              pattern="^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$"
              value={inputNumber}
              onChange={(e) => setInputNumber(e.target.value.toUpperCase())}
              style={{ width: "300px" }}
            />
            }
            
            <button
              className="btn btn-success"
              type="submit"
              onClick={() => handleConvert()}
              style={{ width: "fit-content" }}
            >
              Convertir
            </button>
          </div>
          <div
            className="card p-5 d-flex flex-column align-items-center gap-3"
            style={{ width: "fit-content" }}
          >
            <h4 className="text-center">Résultat</h4>
            <input type="text" value={result} style={{ width: "300px" }} />
          </div>
        </div>
        {
          showGif && 
        <img src={nerd} className="position-absolute bottom-0 end-0" alt="Geek" />
        }
      </header>
    </div>
  );
}

export default App;
