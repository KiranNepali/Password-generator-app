import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState(false);

  //useref for copy password
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRZTUVWXYZ";
    if (number) str += "0123456789";
    if (character) str += "!”#@%*&`+-*=)({}";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, number, character]);

  //cop pass
  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="max-w-md m-auto  mt-60 bg-slate-400 rounded-md p-11 ">
        <h1 className="text-xl text-center mb-10  font-bold  tracking-wider">
          PASSWORD GENERATOR
        </h1>
        <input
          type="text"
          value={password}
          className="outline-none px-14 py-1 mb-2"
          placeholder="password"
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClip}
          className="border-none bg-yellow-800 text-white px-3 py-1"
        >
          Copy
        </button>
        <div className="length">
          <input
            onChange={(e) => {
              setLength(e.target.value);
            }}
            type="range"
            min={6}
            max={15}
            // value={length}
            className="cursor-pointer mr-2"
          />
          <label>{length}</label>
        </div>
        <div className="number">
          <input
            //change prev values with new
            onChange={() => {
              setNumber((prev) => !prev);
            }}
            type="checkbox"
            defaultChecked={Number}
            className=" mr-2"
          />
          <label>Number</label>
        </div>
        <div className="character">
          <input
            //change prev values with new
            onChange={() => {
              setCharacter((prev) => !prev);
            }}
            type="checkbox"
            defaultChecked={character}
            className=" mr-2"
          />
          <label>Character</label>
        </div>
      </div>
    </>
  );
}

export default App;
