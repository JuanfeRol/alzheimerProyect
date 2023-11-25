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

        fetch(`http://localhost:8080/api/user/${userID}`)
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
        </section>
      );
}