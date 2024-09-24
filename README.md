[Project title]

    "Go Binance"

[Project description]

   ＊＊＊　What it does　＊＊＊
   
    User can send “ASTR” from Binance to Metamask.

   ＊＊＊　The problem it solves　＊＊＊
   
    Avoid users withdraw (send) “ASTR” to H160 address from “Binance Exchange”.
    Background:
    Some users coldn’t take out them asset (“ASTR”) due to erroneous remittance from Binance to Metamask.

    You can send “ASTR” from Binance to Metamask without gox.  
    For avoid doing mistake, unused options were removed. 
    Therefore you can convert only H160 address to SS58 address here. 
    If you input SS58 address to convert, it will not converted the address and indicated to “invalid”. 
    Avoid you send “ASTR” to H160 address from “Binance.com”.  

   ＊＊＊　Challenges I ran into　＊＊＊
   
    To be automated "convert H160 address to SS58 address", 
    //then "assign SS58 to H160".
    //It's mean the H160 address == SS58 address.
    //Then the Binance recognize the H160 address with they have no XVM.
    //Or... withdraw the Gox-“ASTR“ which sended to H160 address from Binance.

   ＊＊＊　Technologies I used　＊＊＊
   
    XVM
    Hoon's Address converter

   ＊＊＊　How we built it　＊＊＊
   
    Repeat research and simulations.
    

[Name of bounty participated]

    "Token Bridge Contract Between WASM and EVM"

[Way to access the project]

   ＊＊＊ Github repo ＊＊＊
   
    https://github.com/plticmd/Go-Binance

   ＊＊＊ Live demo ＊＊＊
   
    https://go-binance-togy.vercel.app/

   ＊＊＊ youtube ＊＊＊
   
    https://youtu.be/vUmtR2KnneM


   ✔️ yarn install
   ✔️ yarn build
   ✔️ yarn start
