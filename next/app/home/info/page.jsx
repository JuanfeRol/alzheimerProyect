'use client'

import React, { use, useEffect } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import { redirect } from "next/dist/server/api-utils";

export default function infooo() {

    // Login
    const [Item, setIteam] = React.useState("");
  
    const handleLogin = () => {
      fetch("http://localhost:8080/api/publications")
        .then((res) => res.json())
        .then((data) => setIteam(data))
        .catch((err) => console.log(err));
    } 


  return (
    <div>{Item}{handleLogin}</div>

  )
}
