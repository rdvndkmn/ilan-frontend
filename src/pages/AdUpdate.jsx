import {useEffect, useState} from "react";

function AdUpdate({adId, credentials}) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [category, setCategory] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!adId || !credentials) {
            return;
        }

        setLoading(true);
        setError("");

        fetch(
            `http://localhost:8080/api/ads/${adId}`,
            {
                method: "GET",
                headers: {
                    "Authorization": "Basic " + credentials
                }
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("İlan bilgileri alınamadı");
                }

                return response.json();
            })
            .then(data => {

                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
                setCity(data.city);
                setCategory(data.category);

                setLoading(false);
            })
            .catch(error => {

                console.error("Ad load error:", error);

                setError("İlan bilgileri yüklenirken hata oluştu");
                setLoading(false);
            });

    }, [adId, credentials]);


    function handleSubmit(event) {

        event.preventDefault();

        const adData = {
            title,
            description,
            price,
            city,
            category
        };

        fetch(
            `http://localhost:8080/api/ads/${adId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + credentials
                },

                body: JSON.stringify(adData)
            }
        )
            .then(response => {

                if (!response.ok) {
                    throw new Error("İlan güncellenemedi");
                }

                console.log("İlan başarıyla güncellendi");
            })
            .catch(error => {
                console.error("Update error:", error);
            });
    }


    if (loading) {
        return <p>İlan bilgileri yükleniyor...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>

            <h2>İlan Güncelle</h2>

            <form onSubmit={handleSubmit}>

                <input
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    placeholder="Başlık"
                />

                <textarea
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder="Açıklama"
                />

                <input
                    type="number"
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                    placeholder="Fiyat"
                />

                <input
                    value={city}
                    onChange={event => setCity(event.target.value)}
                    placeholder="Şehir"
                />

                <input
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                    placeholder="Kategori"
                />

                <button type="submit">
                    İlanı Güncelle
                </button>

            </form>

        </div>
    );
}

export default AdUpdate;