import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct, updateProduct } from '../redux/apiCalls';
import { userRequest } from '../requestMethods';
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar';

const TopContainer = styled.div`
     display:flex;
     flex-wrap:wrap;
     margin-top:80px;F
    flex-wrap:wrap;
`;
const Container = styled.div`
    flex-direction:column;
    height:auto;
    width:200px;
    height:230px;
    padding:10px;
    margin:20px;
    display:flex;
    border-radius:10px;
    justify-content:center;
    align-items:center;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.4);
`;

const Image = styled.img`
    width:130px;
    height:150px;
    justify-content:center;
    align-items:center;
    margin:auto;
`;

const Button = styled.button`
    border:none;
    font-size:14px;
    font-weight:500;
    background-color:white;
    a:link && {
        text-decoration: none; 
    }
`;

const Title = styled.div`
    justify-content:left;
    align-items:left;
    display:flex;
    padding-left:10px;
    color:black;
    font-weight:bold;
    margin-top:5px;
`;

const Bottom = styled.div`
    justify-content:space-between;
    display:flex;
    margin-top:10px;
`;

const Div = styled.div`
    justify-content:center;
    align-items:center;
    display:flex;
    flex-direction:column;
    width:100vw;
    height:100vh;
    color:gray;
`;

const H1 = styled.h1`
    justify-content:center;
    align-items:center;
    display:flex;
    width:100vw;
    color:gray;
`;

const Box = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:10px;
    padding:3px;
    height:28px;
    border-radius:5px;
    border:1px solid lightgray;

    &:hover{
        background-color:#e9f5f5;
    }
`;



const MenuItem = styled.div`
  font-size: 14px;
  margin-left: 30px;
  font-weight: 500;
  padding: 5px 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  background-color: black;
  &:hover {
    border-radius: 5px;
    background-color: #222d32;
  }
`;



const MyRecipe = () => {

    const { currentUser } = useSelector((state) => state.user);
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        const getUsersRecipe = async () => {
            try {
                const res = await userRequest.get("/recipe/user/" + currentUser._id);
                setProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        }

        getUsersRecipe();
    }, []);

    const handleEditEvent = (item) => {

        navigate(`/update/${item._id}`);
    }

    const handleDeleteEvent = async (item) => {
        await deleteProduct(dispatch, item._id);
        navigate(-1);
    }

    return (
        <>
            <Navbar title="My recipe" />
            {product.length > 0 ?
                <TopContainer>{product.map((item) => {
                    return (
                        <div>
                            <Container>
                                <Image src={item.img}></Image>
                                <Title>{item.title}</Title>
                                <Bottom>

                                    <Box onClick={() => handleEditEvent(item)}>
                                        <EditIcon style={{ color: "gray", fontSize: "medium", backgroundColor: "transparent" }} />
                                        <Button style={{ color: "gray", backgroundColor: "transparent" }}>Edit</Button>
                                    </Box>

                                    <Box onClick={() => handleDeleteEvent(item)}>
                                        <DeleteIcon style={{ color: "red", fontSize: "medium", backgroundColor: "transparent" }} />
                                        <Button style={{ color: "red", backgroundColor: "transparent" }}>Delete</Button>
                                    </Box>
                                </Bottom>
                            </Container>
                        </div>
                    )
                })}
                </TopContainer> :
                <Div>
                    <H1>No recipe found!</H1>
                    {<Link style={{ textDecoration: "none" }} to="/newreciepe">
                        <MenuItem>Add Recipe</MenuItem>
                    </Link>}
                </Div>}

        </>
    )
}

export default MyRecipe