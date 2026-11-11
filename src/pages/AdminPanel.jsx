import {useEffect, useState} from "react";

function AdminPanel({credentials}) {

    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    function loadPassiveAds() {

        setLoading(true);
        setError("");

        fetch(
            "http://localhost:8080/api/admin/ads/passive",
            {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + credentials
                }
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("Pasif ilanlar alınamadı");
                }

                return response.json();
            })
            .then(data => {
                setAds(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError("Pasif ilanlar yüklenirken hata oluştu");
                setLoading(false);
            });
    }

    function approveAd(adId) {

        fetch(
            `http://localhost:8080/api/admin/ads/${adId}/approve`,
            {
                method: "PUT",
                headers: {
                    "Authorization": "Basic " + credentials
                }
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("İlan onaylanamadı");
                }

                console.log("İlan onaylandı");

                loadPassiveAds();
            })
            .catch(error => {
                console.error("Approve error:", error);
            });
    }

    function rejectAd(adId) {

        fetch(
            `http://localhost:8080/api/admin/ads/${adId}/reject`,
            {
                method: "PUT",
                headers: {
                    "Authorization": "Basic " + credentials
                }
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("İlan reddedilemedi");
                }

                console.log("İlan reddedildi");

                loadPassiveAds();
            })
            .catch(error => {
                console.error("Reject error:", error);
            });
    }

    useEffect(() => {

        if (!credentials) {
            return;
        }

        loadPassiveAds();

    }, [credentials]);

    return (
        <div>

            <h2>Admin Paneli</h2>

            {loading ? (
                <p>Pasif ilanlar yükleniyor...</p>
            ) : error ? (
                <p>{error}</p>
            ) : ads.length === 0 ? (
                <p>Onay bekleyen ilan bulunmuyor.</p>
            ) : (
                ads.map(ad => (
                    <div key={ad.id}>

                        <h3>{ad.title}</h3>

                        <p>{ad.description}</p>

                        <p>Fiyat: {ad.price}</p>

                        <p>Şehir: {ad.city}</p>

                        <p>Kategori: {ad.category}</p>

                        <button onClick={() => approveAd(ad.id)}>
                            ONAYLA
                        </button>

                        <button onClick={() => rejectAd(ad.id)}>
                            REDDET
                        </button>

                    </div>
                ))
            )}

        </div>
    );
}

export default AdminPanel;