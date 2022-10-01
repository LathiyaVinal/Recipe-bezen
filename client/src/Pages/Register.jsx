import React, { useState } from 'react'
import styled from 'styled-components'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import { login, register } from '../redux/apiCalls';
import Navbar from './Navbar';
import image from "../images/login_bgcover.jpg"

const Container = styled.div`
    with:100vw;
    height:100vh;    
    background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(${image})
      center;
      display:flex;
      align-items:center;
      justify-content:center;
`;

const Wrapper = styled.div`
    padding:20px;
    width:40%;
    background-color:white;
`;

const Title = styled.h1`
    fonr-size:2px;
    font-weight:300;

`;

const Form = styled.form`
    display:flex;
    flex-wrap:wrap;
`;

const Agreement = styled.span`
    font-size:12px;
    margin:20px 0px;
`;

const Input = styled.input`
    flex:1;
    min-width:40%;
    margin:12px 10px 0px 0px;
    padding:10px;
`;

const Button = styled.button`
    width:40%;
    border:none;
    padding:15px 12px;
    background-color:#f96747;
    color:white;
    cursor:pointer;
`;


const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const { currentUser, error } = useSelector((state) => {
        return state.user;
    });

    const registerUSer = async () => {
        await register(dispatch, { username, password, email });
    }

    if (currentUser) {
        toast.success("Registration successful.", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500,
            hideProgressBar: false
        });

        setTimeout(() => {
            navigate("/");
        }, 3000);
    }

    return (
        <>
            <Navbar title="Recipe" />
            <Container>
                <Wrapper>
                    <ToastContainer />
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>
                        <Input placeholder="name" autocomplete="off"/>
                        <Input placeholder="last name" autocomplete="off"/>
                        <Input placeholder="username" autocomplete="off" onChange={(e) => setUsername(e.target.value)} />
                        <Input placeholder="email" autocomplete="off" onChange={(e) => setEmail(e.target.value)} />
                        <Input type="password" placeholder="password" autocomplete="off" onChange={(e) => setPassword(e.target.value)} />
                        <Input type="password" placeholder="confirm password" autocomplete="off" />

                        <Agreement>
                            By creating an account, I consent to the processing of my personal
                            data in accordance with the <b>PRIVACY POLICY</b>
                        </Agreement>
                        <Button type="button" onClick={registerUSer}>CREATE</Button>
                    </Form>
                </Wrapper>
            </Container>
        </>

    )
}

export default Register