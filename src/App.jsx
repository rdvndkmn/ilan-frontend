
import './App.css'
import Login from "./pages/Login.jsx";

import Header from "./components/Header.jsx";
import {useState} from "react";
import AdCreate from "./pages/AdCreate.jsx";
import AdList from "./pages/AdList.jsx";
import AdDetail from "./pages/AdDetail.jsx";

function App() {

    const [count, setCount] = useState(0);
    const [name, setName]=useState("");
    const [credentials,setCredentials]=useState("");
    const [selectedAdId,setSelectedAdId] = useState(null)

    function handleClick() {
        setCount(count+1);
    }





  return (
      <>
          <Header title = "ilan sistemi"/>
          <Login onLogin={setCredentials} />
          <AdCreate credentials={credentials} />
          <AdList
              credentials={credentials}
              setSelectedAdId={setSelectedAdId}
          />
          {selectedAdId !== null && (
              <AdDetail
                  adId={selectedAdId}
                  credentials={credentials}
              />
          )}

      <button onClick={handleClick}>Bana {count} defa tıklandı </button>

          <input value={name} onChange={event => setName(event
              .target.value)}/>
          <h1>Merhaba {name}</h1>




      </>

  )

}


export default App
