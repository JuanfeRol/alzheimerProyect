"use client";

import * as React from "react"; 
import styles from './styles.css'

export default function page(){
    
    return (
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
                        </div>
                    </div>
                    <div className="card">
                        <figure>
                            <img src="/Images/Home2.jpg" alt="aaa" />
                        </figure>
                        <div className="contenido">
                            <p className="date">12 Jun 23</p>
                            <h3 className="new_title">How to sell drugs online</h3>
                        </div>
                    </div>
                </div>
            </section>
        </section>
      );
}