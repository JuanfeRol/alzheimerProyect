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
      <div className="curveado">
        <img src="/img2.svg" alt="hhh"/> 
      </div>

      <section className="segundo-bloque">
        <div className='izquierda'>
          <p><b>About 5.8 million in the United States who have alzheimer's disease </b></p>
          <p>it accounts 60-80% of dementia cases</p>
        </div>
        <h3>What is alzheimer?</h3>
        <p>Alzheimer's is a type of dementia that affects memory, thinking and behavior. Symptoms eventually grow severe enough to interfere with daily tasks. Alzheimer's is the most common cause of dementia, a general term for memory loss and other cognitive abilities serious enough to interfere with daily life.</p>
      </section>
    </div>
    
  )
}
