
import './App.css'
import Login from "./pages/Login.jsx";

import Header from "./components/Header.jsx";
import {useState,useEffect} from "react";
import AdCreate from "./pages/AdCreate.jsx";
import AdList from "./pages/AdList.jsx";
import AdDetail from "./pages/AdDetail.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";

function App() {

    const [count, setCount] = useState(0);
    const [name, setName]=useState("");
    const [credentials,setCredentials]=useState("");
    const [selectedAdId,setSelectedAdId] = useState(null)
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {

        if (!credentials) {
            setCurrentUser(null);
            return;
        }

        fetch("http://localhost:8080/api/users/me", {
            method: "GET",
            headers: {
                "Authorization": "Basic " + credentials
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Kullanıcı bilgisi alınamadı");
                }

                return response.json();
            })
            .then(data => {
                setCurrentUser(data);
            })
            .catch(error => {
                console.error("Current user error:", error);
                setCurrentUser(null);
            });

    }, [credentials]);



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


          {currentUser?.role === "ADMIN" && (
              <AdminPanel credentials={credentials} />
          )}


      </>

  )

}


export default App
