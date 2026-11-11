import {useState} from "react";
function AdCreate( {credentials}) {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [city,setCity] = useState("");
    const [category,setCategory] = useState("");

    function handleSubmit(event){
        event.preventDefault();
        const adsData ={
            title,
            description,
            price,
            city,
            category
        }

        fetch(
            "http://localhost:8080/api/ads",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json","Authorization": "Basic " + credentials
                },
                body: JSON.stringify(adsData)

            }
        ).then(response =>{
            if (!response.ok){
                throw new Error("istek hatalı")
            }
            console.log("kayıt başarılı")
            setTitle("");
            setDescription("");
            setPrice("");
            setCity("");
            setCategory("");
        })
            .catch(error=>{
                console.error("error",error);
            })

    }


    return(
        <form onSubmit={handleSubmit}>
            <input value={title} onChange={event => setTitle(event.target.value)}/>
            <textarea value={description} onChange={event => setDescription(event.target.value)}/>
            <input value={price} onChange={event => setPrice(event.target.value)}/>
            <input value={city} onChange={event => setCity(event.target.value)}/>
            <input value={category} onChange={event => setCategory(event.target.value)}/>
            <button>Kaydet</button>
        </form>
    );


}
export default AdCreate;