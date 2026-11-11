import {useState,useEffect} from "react";

function AdDetail({adId,credentials}) {
    const [ad,setAd]= useState(null);

    useEffect(() =>{

            if (!adId || !credentials) {
                return;
            }
        fetch(

            `http://localhost:8080/api/ads/${adId}`,
            {
                method:"GET",
                headers: {
                    "Authorization": "Basic " + credentials
                }

            }

        ).then(response => {
            if (!response.ok) {
                throw new Error("İlan detayı alınamadı");
            }

            return response.json();
        })
            .then(data=>setAd(data))
            .catch(error => {
                console.error("Error:", error);
            })



    },[adId,credentials]
    );

    if (ad === null) {
        return <p>İlan yükleniyor...</p>;
    }

    return (
        <div>
            <h2>{ad.title}</h2>
            <p>{ad.description}</p>
            <p>Fiyat: {ad.price}</p>
            <p>Şehir: {ad.city}</p>
            <p>Kategori: {ad.category}</p>
            <p>Görüntülenme: {ad.viewCount}</p>
        </div>
    );

}



export default AdDetail;