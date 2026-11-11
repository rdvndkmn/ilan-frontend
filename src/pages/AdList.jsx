import {useState} from "react";
import {useEffect} from "react";

function AdList({setSelectedAdId,credentials}){
    const [ads,setAds] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");


    useEffect(()=>{

            if (!credentials) {
                return;
            }
            fetch(
                "http://localhost:8080/api/ads/latest",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Basic " + credentials
                    }

                }
            ).then(response => response.json())
                .then(data => {setAds(data), setLoading(false)})
                .catch(error => {
                    console.error(error);
                    setError("İlanlar yüklenirken hata");
                    setLoading(false);
                })

            console.log("AdList Çalıştı")


    },[credentials]
    );

    return(
        <>

        <h2>Son İlan </h2>

            {loading ? (
                <p>İlanlar yükleniyor...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                ads.map(ad => (
                    <div key={ad.id}
                         onClick={() => setSelectedAdId(ad.id)}
                    >
                        <h3>{ad.title}</h3>
                        <p>{ad.price}</p>
                        <p>{ad.city}</p>
                    </div>
                ))
            )}

        </>

    );


}
export default AdList;