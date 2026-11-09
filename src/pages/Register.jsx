import {useState} from "react";

function Register() {
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    function handleSubmit(event){
        event.preventDefault()
        const userData = {
            name,
            surname,
            phone,
            email,
            password
        }

        fetch(
            "http://localhost:8080/api/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)//Javasicript Jsona çevir.
            }
        ).then(response => {

            if (!response.ok) {
                throw new Error("İstek Hatası");
            }

            console.log("Kayıt başarılı");
            setName("")
            setPassword("")
            setSurname("")
            setEmail("")
            setPhone("")
        })
            .catch(error => {
                console.error("Error:", error);
            });

    }

    return(

      <form onSubmit={handleSubmit}>
          <input value={name} onChange={event => setName(event.target.value)} type={"text"}/>
          <input value={surname} onChange={event => setSurname(event.target.value)} type={"text"}/>
          <input value={phone} onChange={event => setPhone(event.target.value)} type={"tel"}/>
          <input value={email} onChange={event => setEmail(event.target.value)} type={"email"}/>
          <input value={password} onChange={event => setPassword(event.target.value)} type={"password"}/>
          <button>Kayıt Ol</button>



      </form>

    );
}

export default Register;


