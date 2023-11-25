"use client";

import * as React from "react"; 
import styles from './styles.css'

export default function page(){
    const [publications, setPublications] = React.useState(null);

    React.useEffect(() => {
        console.log("News page");
        fetch(`http://localhost:8080/api/publications`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPublications(data);
            })
            .catch((err) => console.log(err));
    }, []);
    
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
                <div className="first_card">
                    <figure>
                        <img src="/Images/Home1.jpg" alt="aaa" />
                    </figure>
                    <div className="contenido">
                        <p className="date">12 Jun 23</p>
                        <h3 className="new_title">How to sell drugs online</h3>
                        <p className="category">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste unde saepe sed
                            voluptatum, quibusdam, quidem, quas voluptates quos doloribus quae
                            voluptatibus. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam, aliquid.
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, illo.
                        </p>
                    </div>
                </div>
                <div className="news_section">
                    <div className="card">
                        <figure>
                            <img src="/Images/Home2.jpg" alt="aaa"/>
                        </figure>
                        <div className="contenido">
                            <p className="date">12 Jun 23</p>
                            <h3 className="new_title">How to sell drugs online</h3>
                            <p className="category">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste unde saepe sed.</p>
                        </div>
                    </div>
                    <div className="card">
                        <figure>
                            <img src="/Images/Home2.jpg" alt="aaa" />
                        </figure>
                        <div className="contenido">
                            <p className="date">12 Jun 23</p>
                            <h3 className="new_title">How to sell drugs online</h3>
                            <p className="category">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste unde saepe sed.</p>
                        </div>
                    </div>
                </div>
                <div className="news_section">
                    <div className="card">
                        <figure>
                            <img src="/Images/Home2.jpg" alt="aaa"/>
                        </figure>
                        <div className="contenido">
                            <p className="date">12 Jun 23</p>
                            <h3 className="new_title">How to sell drugs online</h3>
                            <p className="category">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste unde saepe sed.</p>
                        </div>
                    </div>
                    <div className="card">
                        <figure>
                            <img src="/Images/Home2.jpg" alt="aaa" />
                        </figure>
                        <div className="contenido">
                            <p className="date">12 Jun 23</p>
                            <h3 className="new_title">How to sell drugs online</h3>
                            <p className="category">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste unde saepe sed.</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
      );
}