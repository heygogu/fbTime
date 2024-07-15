import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Header.js"
import Body from "./Body.js";

const App=()=>{
    return(
        <>
       <Header/>
       <Body/>
       </>
    )
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>)