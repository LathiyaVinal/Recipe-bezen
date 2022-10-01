import React from "react";
import styled from "styled-components";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import bgCover from "../images/coverbg.jpg";

const Container = styled.div`
    margin-top: 70px;
    height:80vh;
    flex-direction:column;
    width: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${bgCover});
`;

const H1 = styled.h1`
    padding: 5px 15px;
    display:flex;
    justify-content:center;
    align-items:center;
    color: white;
    background-color: rgba(0,0,0,0.7);
`;

const H4 = styled.h3`
  color:white;
  font-weight:normal;
  display:flex;
  width: 50%;
  text-align:center;
`;

const Header = () => {

  return (
    <Container>
         <H1>Taste of Home</H1>
         <H4>simply recipes is here to help you cook delicious meals with less stress and more joy. we offer recipes and cooking advice for home.</H4>
    </Container>
  );
};

export default Header;
