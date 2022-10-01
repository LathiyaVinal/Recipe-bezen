import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const Container = styled.div`
  padding: 20px 50px;
  margin-top:80px;
`;

const Wrapper = styled.div`
  display: flex;
  width:100%;
  flex-wrap: wrap;
  margin-top: 30px;
`;

const ImageContainer = styled.div`
  flex:1;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
  background-size: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-size: 45px;
  font-weight: 400;
  border-bottom:2px dotted #f96747;
`;

const Ingredient = styled.span`
  color: black;
  font-weight: bold;
  font-size: 28px;
`;

const Desc = styled.li`
  font-weight: 200;
  color: gray;
  font-size: 20px;
`;

const Hr = styled.hr`
  height: 0.1rem;
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: lightgray;
`;

const Li = styled.span`
  text-decoration:none;
  margin-top:10px;
  color:gray;
  font-weight:600;
  font-size:18px;
`;

const H1 = styled.p`
  color:black;
  font-weight:bold;
  margin:0;
  font-size:20px;
  align-items:center;
  display:flex;
  justify-content:center;
  text-align:center;
`;

const H2 = styled.p`
  color:gray;
  font-weight:600;
  margin:0;
  font-size:18px;
  align-items:center;
  display:flex;
  justify-content:center;
  text-align:center;
`;

const DivSub = styled.div`
  display:flex;
  margin-top:30px;
  flex-direction:column;
`;

const DivSubs = styled.div`
  display:flex;
  margin-top:10px;
  flex-direction:column;
`;

const Divstep = styled.div`
  display:flex;
  align-items:center;
  flex-direction:row;
  margin-top:10px;
`;

const Divsteps = styled.div`
  display:flex;
  align-items:center;
  flex-direction:row;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/recipe/find/" + id);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  return (
    <>
      <Navbar title="Recipe" />
      <Container>
        <Title>{product.title}</Title>
        <Wrapper>
          <ImageContainer>
            <Image src={product.img} alt={product.img} />
          </ImageContainer>
          <InfoContainer>
            <Ingredient>Description</Ingredient>
            <DivSub>
              <Divsteps>
                <H2 style={{ textAlign: "left" }}>{product.desc}</H2>
              </Divsteps>
            </DivSub>
          </InfoContainer>
        </Wrapper>
        <Hr />

        <InfoContainer>
          <Ingredient>Ingredients</Ingredient>
          {product.ingredients && product.ingredients.map((item, index) => {
            return (
              <DivSub>
                <Divsteps>
                  <CheckBoxOutlineBlankIcon style={{ fontSize: "20px", color: "gray", marginRight: "10px" }} />
                  <H2>{item}</H2>
                </Divsteps>
              </DivSub>
            )
          })}
        </InfoContainer>

        <Hr />
        <Ingredient>Directions</Ingredient>
        {product.steps && product.steps.map((item, index) => {
          return (
            <DivSub>
              <Divstep>
                <CheckCircleIcon style={{ fontSize: "20px", color: "gray", marginRight: "10px" }} />
                <H1>Step {index+1}</H1>
              </Divstep>
              <Li>{item}</Li>
            </DivSub>
          )
        })}
      </Container>
    </>
  );
};

export default Product;
