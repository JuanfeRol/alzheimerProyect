"use client";

import * as React from "react"; 
import styles from './styles.css'
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function page(){

    const router = useRouter();
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const user = document.cookie.split(';').find((item) => item.includes('user'));
        if(!user){
            router.push('/');
        }
        console.log("User cookie: " + user);
        const userID = user.split('=')[1];
        console.log("User ID: " + userID);

        fetch(`http://alzproject.ddns.net/api/user/${userID}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setUser(data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleCloseSession = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push('/');
    }

    const handlePubs = () => {
        fetch(`http://alzproject.ddns.net/api/use/scrapper`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Publicaciones obtenidas");
            })
            .catch((err) => console.log(err));
    }

    const handleSends = () => {
        fetch(`http://alzproject.ddns.net/api/send/publications`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                alert("Publicaciones enviadas");
            })
            .catch((err) => console.log(err));
    }

    const handleUpdate = () => {
        fetch(`http://alzproject.ddns.net/api/use/chatgpt`)
            .then((data) => {
                console.log(data);
                alert("Publicaciones actualizadas");
            })
            .catch((err) => console.log(err));
    }

    const handleDelete = () => {
        let userID = prompt("Ingresa el ID del usuario a dar de baja");

        fetch(`http://alzproject.ddns.net/api/user/${userID}`,{
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                alert("Usuario dado de baja");
            })
            .catch((err) => console.log(err));
    }
    
    return (
        (user === null) ?
        <section className="main">
            <h2>Perfil Dashboard</h2>
            <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" className="main-perfil-img"></img>
        </section>
        :
        <section className="main">
            <h2>Perfil Dashboard</h2>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCElEQVR4nO2Zz0obURTGf2OLpi/QuBI3Lly22gdw0624skEUQaHpSlqDfQHFVWteQoX2Abop9RF04cptEkFREFMoYmvKhTMg004wOndyz3h+8EGYG5L7fffm/jkBwzAMwzAMwzAMwzAMw/BNBEwAc8B7kXv9UtoKyzBQB1pAJ0WubQsoUyAiYA342cV4Um2gVoQZUQJ2ezCe1I58hkoiYPsB5mN91ToT1jIwH2sVZTwHLjMMoC2LqBrqGZqP9RklDADHHgJoaVkLJj2Yj+UOS8Ez5zGACgqoeQxAxW6w6jGADyig4jGAWRQw4TGAFyggAhoezDe1bIPIlTbrAD7xyI/CZZRRyzAAVzV6tNfhL5p++0lKUtS4r/ltzQWRmEgOR+0ejF/KtFc78v+jLFfaZhfjDVnt3SJaWCI50FRulcUr8qxQI24Yxj+U5LL0BqgCH0VVeebahigQEfAK2AAOgOs7bIHuPfvAupTXVC6Mg8ACcJjBSfAIWAGeoYBIaoLd/gC9r5qh1wRHgT0PxpP6AYwQGFPASQ7mY50BrwmEt8DvHM3Hct+53G/zS8CfPpiPdQO865f5GelAp89yAzCdt/kx4CIA87evz+N5mX8iB5VOYHJ9eppHAPMBmE3TYh4BfAvAaJq+5xHAaQBG03SeRwC/AjCaJtc372wCVwGYTepKbp2GYXBn/gIcmHnJ2f8WNwAAAABJRU5ErkJggg==" className="main-perfil-img"></img>
            <p>Name: {user.name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Email: <a href="mailto:{user.email}">{user.email}</a></p>
            <Button onClick={() => handleCloseSession()}>Cerrar Sesión</Button>
            <hr />
            { user.ID === 1 ? 
            <React.Fragment>
            
                <Button>Admin Dashboard</Button>
                
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Button onClick={() => handlePubs()}>Obtener publicaciones</Button>
                        <Button onClick={() => handleSends()}>Enviar por correo la publicacion</Button>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <Button onClick={() => handleUpdate()}>Actualizar la publicacion con GPT</Button>
                        <Button onClick={() => handleDelete()}>Dar de baja usuario</Button>
                    </div>
                </div>
                
                
            </React.Fragment>
            : null }
        </section>
      );
}
