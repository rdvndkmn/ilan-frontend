import {useState} from "react";

function Login({onLogin}) {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function handleSubmit(event){
        event.preventDefault()
        const  rawCredentials = email+":"+password;
        const credentials = btoa(rawCredentials);

        fetch(
            "http://localhost:8080/api/ads/latest",
        {
            method: "GET",
            headers: {"Authorization": "Basic " + credentials},
        }

        ).then(response =>{

            if (!response.ok){
                throw new Error("hatalı veri girildi.");
            }
            console.log("giriş başarılı");
            onLogin(credentials);
            setEmail("");
            setPassword("");


        })
            .catch(error =>{
                console.error("Error",error);
            })
    }


    return(
        <form onSubmit={handleSubmit}>
            <input value={email} onChange={event => setEmail(event.target.value)} type={"email"}/>
            <input value={password} onChange={event => setPassword(event.target.value)} type={"password"}/>
            <button>Giriş yap</button>

        </form>

    );
}

export default Login;