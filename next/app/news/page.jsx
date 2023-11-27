"use client";

import * as React from "react"; 
import styles from './styles.css'
import { useRouter } from "next/navigation";

export default function page(){
    const [publications, setPublications] = React.useState(null);
    const router = useRouter();

    React.useEffect(() => {
        console.log("News page");
        fetch(`http://localhost:8080/api/publications`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPublications(data);
                data.forEach(element => {
                    console.log(element.CreatedAt);
                    console.log(element.title);
                    console.log(element.abstract);
                });
            })
            .catch((err) => console.log(err));
    }, []);

    const handleRedirect = (publication) => {
        router.push(publication.doi_link);
    }
    
    return (
        (publications === null) ?
        <section className="main">
            <h2>Latest News</h2>
            <hr />
            <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" className="main-perfil-img"></img>
        </section>
        :
        <section className="main">
            <h2>Latest News</h2>
            <hr />
            <section className="latest_news">
                <div className="first_card" onClick={() => handleRedirect(publications[0])}>
                    <figure>
                        <img src="/Images/Home1.jpg" alt="aaa" />
                    </figure>
                    <div className="contenido">
                        <p className="category">{publications[0].CreatedAt.toString().substring(0,10)}</p>
                        <h3 className="new_title">{publications[0].title}</h3>
                        <p className="category">
                            {publications[0].abstract}
                        </p>
                    </div>
                </div>
                {publications.map((_, index) => 
                    {
                        let validacion = index % 2 == 0 ? `<div className="news_section">` : "";
                        let validacion2 = index % 1 == 0 ? `</div>` : "";
                        let current = publications[index+1];
                        return (
                            <React.Fragment>
                                <div dangerouslySetInnerHTML={{ __html: validacion }}></div>
                                <div className="card" href="google.com" onClick={() => handleRedirect(current)}>
                                    <figure>
                                        <img src="/Images/Home2.jpg" alt="aaa" />
                                    </figure>
                                    <div className="contenido">
                                        <p className="date">{publications[index+1] && publications[index+1].CreatedAt.toString().substring(0,10)}</p>
                                        <h3 className="new_title">{publications[index+1] && publications[index+1].title}</h3>
                                        <p className="category">{publications[index+1] && publications[index+1].abstract}</p>
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: validacion2 }}></div>
                            </React.Fragment>
                            )
                    }
                )}
            </section>
        </section>
      );
}