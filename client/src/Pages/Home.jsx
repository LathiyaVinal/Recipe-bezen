import React from 'react'
import RecipeList from '../components/RecipeList'
import Navbar from './Navbar';
import styled from 'styled-components';
import Header from './Header';

const H1 = styled.h1`
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Home = () => {
    return (
        <div>
            <Navbar title="Recipe" enableAdd="true" enableMy="true" authentication="true"/>
            <Header />
            <H1>Recipe</H1>
            <RecipeList />
        </div>
    )
}

export default Home