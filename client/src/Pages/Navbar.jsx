import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";
import img1 from "../images/batter.png";
import { mobile } from "../responsive";
import { ToastContainer, toast } from "react-toastify";

const Wrapper = styled.div`
  padding-right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flexDirection: "column" })};
`;

const Left = styled.div`
  flex: 1;
  margin-left:20px;
  display: flex;
  color:white;
  justify-content: flex-start;
  align-items: center;
  ${mobile({ flexDirection: "column" })};
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

const Image = styled.img`
  padding: 5px;
`;

const Navbar = ({ title, enableAdd, enableMy, authentication}) => {

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const currUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const logoutUser = () => {
    logout(dispatch);
  };

  const handleMyRecipeClickEvent = () => {
    if (currUser) {
      navigate("/myrecipe");
    } else {
      setShowToast(true);
    }
  }

  const handleAddRecipeClickEvent = () => {
    if (currUser) {
      navigate("/newreciepe");
    } else {
      setShowToast(true);
    }
  }

  if (showToast) {
    setShowToast(false);
    toast.info("You need to login first!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
      hideProgressBar: false
    });
  }

  return (
    <div>
      <nav>
        <Wrapper>
          <ToastContainer />
          <Link style={{ textDecoration: "none" }} to="/">
            <Left>
              <h1>{title}</h1>
              <Image src={img1} />
            </Left>
          </Link>
          <Right>


            {enableAdd === "true" &&
              <MenuItem onClick={handleAddRecipeClickEvent}>Add Recipe</MenuItem>
            }

            {enableMy === "true" &&
              <MenuItem onClick={handleMyRecipeClickEvent}> My Recipe</MenuItem>
            }

            {
              authentication === "true" &&
              (currUser ? (
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
              ) : (
                <>
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <MenuItem>Register</MenuItem>
                  </Link>
                  <Link style={{ textDecoration: "none" }} to="/login">
                    <MenuItem>Login</MenuItem>
                  </Link>
                </>
              ))
            }

          </Right>
        </Wrapper>
      </nav>
    </div>
  );
};

export default Navbar;
