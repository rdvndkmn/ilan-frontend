
import './App.css'

import Header from "./components/Header.jsx";
import {useState} from "react";

function App() {

    const [count, setCount] = useState(0);
    const [name, setName]=useState("");

    function handleClick() {
        setCount(count+1);
    }



  return (
      <>
          <Header title = "ilan sistemi"/>

      <button onClick={handleClick}>Bana {count} defa tıklandı </button>

          <input value={name} onChange={event => setName(event
              .target.value)}/>
          <h1>Merhaba {name}</h1>
      </>

  )

}


export default App
