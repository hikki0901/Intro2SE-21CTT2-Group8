import React from "react";
import Heading from "./Heading";
import Footer from "./Footer";


const appStyle = {
    margin: "0",
    padding: "0",
    height: "100vh",
    backgroundColor: "#FFF9F2"
}

function App(){
    return(
        <div style={appStyle}>
            <Heading/>
            <Footer />
        </div>
    );
}

export default App