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
      <Typography variant="h4" component="h1">
        About Us
      </Typography>
      <hr />
      <div className={styles.news_section}>
        <Box>
          <div className={styles.card}>
            <h3 className={styles.date}>12 Jun 23</h3>
            <p className={styles.news_title}>How to sell drugs online</p>
          </div>
        </Box>
      </div>
    </Container>
  );
}
