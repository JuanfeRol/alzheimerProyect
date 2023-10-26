"use client";

import * as React from "react"; 
import styles from './styles.css'

export default function page(){
    
    return (
        <section className="main">
            <h2>News Content</h2>
            <section className="latest_news">
                <div className="news_section">
                    <div className="card">
                        <p className="date">12 Jun 23</p>
                        <h3 className="new_title">How to sell drugs online</h3>
                    </div>
                    <div className="card">
                        <p className="date">12 Jun 23</p>
                        <h3 className="new_title">How to sell drugs online</h3>
                    </div>
                    <div className="card">
                        <p className="date">12 Jun 23</p>
                        <h3 className="new_title">How to sell drugs online</h3>
                    </div>                    
                </div>
            </section>
        </section>
      );
}