import React, { useCallback, useState, useMemo } from "react";
//import "./App.css";
// import "./toggle-button.css";
import * as polkadotCryptoUtils from "@polkadot/util-crypto";
import * as polkadotUtils from "@polkadot/util";


const SS58_PREFIX = 5;

function App() {
  const [addressType, setAddressType] = useState<"H160" | "SS58">("H160");
  //const [addressType, setAddressType] = useState<"H160" | "SS58">("SS58");
  const [addressInput, setAddressInput] = useState<string>("");
  const [addressPrefix, setAddressPrefix] = useState(SS58_PREFIX);

  const evmToPlm = useCallback(() => {
    if (
      addressInput &&
      addressType === "H160" &&
      polkadotCryptoUtils.isEthereumAddress(addressInput)
    ) {
      return polkadotCryptoUtils.evmToAddress(addressInput, addressPrefix);
    } else {
      return "invalid";
    }
  }, [addressInput, addressPrefix, addressType]);

  const resultAddress = useMemo(() => {
    if (addressType === "H160") return evmToPlm();
  
    else return "invalid";
   }, [evmToPlm, addressType]);

  
  return (
    <div className="card">
    <div className="App">
      <header className="App-header">
       
       
        <p>Input Metamask Address</p>
        <input
          type="text"
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
        ></input>

       
        <p>result address⬇︎</p>
        <input
          type="text"
          value={resultAddress}
          onChange={(e) => setResultAddress(e.target.value)}
        ></input>
         <h3>⬆️Copy and go <a href="https://www.binance.com/en/my/wallet/account/main/withdrawal/crypto/ASTR" target="_blank"><u>Binance</u></a> to paste</h3>
      </header>
    </div>
    </div>
  );
}

export default App;
