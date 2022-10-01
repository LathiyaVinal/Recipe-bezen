import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, searchProducts } from "../redux/apiCalls";
import RecipeItem from "./RecipeItem";
import styled from "styled-components";
import img1 from "../images/batter.png";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
`;

const NewTask = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 5vh;
  justify-content: center;
`;

const Input = styled.input`
  width: 35%;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #111111;
  font-weight: 500;
  position: relative;
  padding-left: 20px;
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  border-radius: 10px 0px 0px 10px;
  border: 2px solid lightgray;

  &:focus {
    outline: none;
    border-color: #ff5733;
  }
`;

const Image = styled.img`

  padding: 10px;
  background-color: #ff5733;
  border-radius: 0px 10px 10px 0px;

  &:hover {
    background-color: #ff7f62;
  }
`;

const EmptyView = styled.h1`
  color:gray;
  
`;

const RecipeList = () => {
  const { products, isFetching, error } = useSelector((state) => state.recipe);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts(dispatch);
  }, []);

  const handleSearchEvent = () => {
    if (search === "") {
      getAllProducts(dispatch);
    } else {
      searchProducts(dispatch, search);
    }
  };

  return (
    <div>
      <NewTask>
        <Input
          type="text"
          id="inputText"
          autocomplete="off"
          placeholder="Search here.."
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image onClick={handleSearchEvent} src={img1} />
      </NewTask>
      <Container>
        {products.length > 0 ? products.map((item) => (
          <RecipeItem key={item._id} item={item} />
        )) : <EmptyView>No recipe found!</EmptyView>}
      </Container>
    </div>
  );
};

export default RecipeList;
