"use client"

import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import styles from './estilos.css'


export default function page() {
  useEffect(() => {
    fetch('http://127.0.0.1:8080/send/email')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error en la solicitud fetch:", error));
  }, []);
  

  return (
    <div>
      <section className='primer-block'>
          <h1>Stay tuned for the <br /><i className='parrafo-azul'>latest updates</i></h1>
          <h2>on Alzheimer's recent discoveries</h2>
          <form action="">
            <TextField fullWidth label="Enter your e-mail to be up to date" id="fullWidth" />  
            <button className='parrafo-azul boton'>Suscribe</button> 
          </form>
      </section>
      <div class="container_wave">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path d="M0.00,49.98 C127.25,169.25 311.23,-48.83 500.00,49.98 L500.00,150.00 L0.00,150.00 Z">
          </path>
        </svg>
      </div>
      <section className="segundo-bloque">
        <h2>What is alzheimer?</h2>
        <hr />
        <div className="content">
          <div className='izquierda'>
            <h2><b>About 5.8 million in the United States who have alzheimer's disease </b></h2>
            <p>it accounts 60-80% of dementia cases</p>
          </div>
          <div className="derecha">
            <p>Alzheimer's is a type of dementia that affects memory, thinking and behavior. Symptoms eventually grow severe enough to interfere with daily tasks. Alzheimer's is the most common cause of dementia, a general term for memory loss and other cognitive abilities serious enough to interfere with daily life.</p>
          </div>
        </div>
      </section>

      <section className="latest_news">
        <h2>Latest News</h2>
        <hr />
        <div className="news_section">
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
    </div>
    
  )
}
