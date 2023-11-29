import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import styles from './estilos.css';

export default function AboutUs() {
  return (
    <Container>
      <Typography variant="h4" component="h1"  style={{ textAlign: 'center' }}>
        About Us
      </Typography>
      <hr />
      <div className={styles.news_section}>
      <Box>
          <div className={styles.card}>
            <h2 className={styles.date}>Project's Purpose</h2>
            <p className={styles.news_title}>Regarding the implementation of our project, it was planned in such a way
             that users from different contexts would have access to it to stay informed about the latest news or research on Alzheimer's.
             The goal of this project goes beyond simply keeping users informed; it is much more extensive. One of the purposes is to raise 
             awareness and educate the population about this mental illness, including early detection and possible treatments.</p>
          </div>
        </Box>
        <Box>
          <div className={styles.card}>
            <h3 className={styles.date}>Our History</h3>
            <p className={styles.news_title}>We are a team composed of six members, university students from BUAP 
            pursuing a degree in computer science engineering. We started with the purpose of completing a final project 
            for the software engineering course, and now we aim to reach the general public to educate the population.</p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.date}>Meet the team</h3>
            <p className={styles.news_title}>The team is composed of: Samanta Reyes Tlapanco, David Carrillo Castillo, Daniel Hachac Salas,
            Juan Felipe Pérez Roldán, Marcos Domínguez Barrientos, and Paola Michelle Pérez Ramírez. The leaders for the development of this software 
            project are Samanta Reyes Tlapanco and David Carrillo Castillo, as they have the most knowledge and experience to share with the other team members. With their leadership, it has been possible to successfully complete the project, 
            turning it into a enriching experience for the entire team.</p>
          </div>
        </Box>
      </div>
    </Container>
  );
}
