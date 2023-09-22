"use client"

import React, { useEffect } from 'react'
import styles from './estilos.css'


export default function page() {
  useEffect(() => {
    fetch('http://127.0.0.1:8080/send/email')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error en la solicitud fetch:", error));
  }, []);
  

  return (
    <div className='primer-block'>
        <h1>Stay tuned for the <i className='parrafo-azul'>latest updates</i></h1>
        <h2>on Alzheimer's recent discoveries</h2>
        <p>Enter your email to be up to date</p>
        <button className='parrafo-azul boton'>Suscribe</button>   
        <h3>What is alzheimer?</h3>
        <p><b>About 5.8 million in the United States who have alzheimer's disease </b>it accounts 60-80% of dementia cases</p>
        <p>Alzheimer's is a type of dementia that affects memory, thinking and behavior. Symptoms eventually grow severe enough to interfere with daily tasks. Alzheimer's is the most common cause of dementia, a general term for memory loss and other cognitive abilities serious enough to interfere with daily life.</p>
        <h2>Latest News</h2>   
    </div>
  )
}
