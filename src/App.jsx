import { useEffect, useState, useCallback, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");

  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [lowerAllowed, setLowerAllowed] = useState(false);
  const [upperAllowed, setUpperCase] = useState(false);
  const [copied, setCopied] = useState(false);

  let refPassword = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (lowerAllowed) str += lowerCase;
    if (upperAllowed) str += upperCase;
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "?></)(*&^%$#@!{}[]`~':;";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [lowerAllowed, upperAllowed, numberAllowed, charAllowed, length]);

  const copyPasswordClipboard = useCallback(() => {
    refPassword.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Hide "copied" text after 1 second
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator, lowerAllowed, upperAllowed]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-600 to-red-600">
      <div className="max-w-1/2 p-6 rounded-lg border border-gray-300 shadow-xl bg-white">
        <h1 className="text-gray-900 text-3xl font-bold text-center mb-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-gray-700 bg-gray-200 border border-gray-300 shadow-inner"
            placeholder="Password"
            readOnly
            ref={refPassword}
          />
          <button
            onClick={copyPasswordClipboard}
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white px-6 py-2 rounded-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="flex text-sm gap-x-2 mt-4">
          <div className="flex flex-col items-center gap-y-2">
            <label className="text-gray-700">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer rounded-sm"
            />
            <label htmlFor="numberInput" className="text-gray-700">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer rounded-sm"
            />
            <label htmlFor="characterInput" className="text-gray-700">Characters</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={lowerAllowed}
              id="lowerInput"
              onChange={() => setLowerAllowed((prev) => !prev)}
              className="cursor-pointer rounded-sm"
            />
            <label htmlFor="lowerInput" className="text-gray-700">Lowercase</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={upperAllowed}
              id="uppercase"
              onChange={() => setUpperCase((prev) => !prev)}
              className="cursor-pointer rounded-sm"
            />
            <label htmlFor="uppercase" className="text-gray-700">Uppercase</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
