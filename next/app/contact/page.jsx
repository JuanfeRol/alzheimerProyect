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
        Contact
      </Typography>
      <hr />
      <div className={styles.news_section}>
      <Box>
          <div className={styles.card}>
            <h2 className={styles.date}>Email us!</h2>
            <p className={styles.news_title}>juan.perezrold@alumnobuap.mx</p>
            <p className={styles.news_title}>daniel.hachac@alumno.buap.mx</p>
            <p className={styles.news_title}>marcos.dominguezba@alumno.buap.mx</p>
            <p className={styles.news_title}>paola.perezram@alumno.buap.mx</p>
            <p className={styles.news_title}>samanta.reyestl@alumno.buap.mx</p>
            <p className={styles.news_title}>david.carrilloc@alumno.buap.mx</p>
          </div>
        </Box>
      </div>
    </Container>
  );
}
