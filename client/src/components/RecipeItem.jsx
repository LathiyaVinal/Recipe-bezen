import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import img1 from "../images/batter.png";

const Info = styled.span`
  width: 100%;
  height: 25%;
  font-weight: 600;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
`;

const ImageConta = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-image: url(${img1});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 3;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  position: relative;
  width: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff5733;
  height: 260px;
  border-radius: 10px;
  flex-direction: column;

  &:hover ${ImageConta} {
    opacity: 1;
    transition: all 0.7s ease;
  }
`;

const Containersub = styled.div`
  width:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
`;

const Image = styled.img`
  height: 75%;
  width:100%;
  background-size:cover;
  object-fit:cover;
  border-radius: 10px 10px 0 0;
`;

const RecipeItem = ({ item }) => {

  return (
    <Link style={{ textDecoration: "none" }} to={`/recipeitem/${item._id}`}>
      <Container>
        <Containersub>
          <Image src={item.img} />
          <Info>{item.title}</Info>
        </Containersub>
        <ImageConta />
      </Container>
    </Link>
  );
};

export default RecipeItem;
