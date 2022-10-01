import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateProduct } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import PublishIcon from '@mui/icons-material/Publish';
import "../styles/newProduct.css";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from "react";
import app from "../firebase";
import Navbar from './Navbar';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductTitle = styled.div`
    display:flex;
    justify-content:space-between;
    padding-left:20px;
    padding-right:20px;
    align-items:center;
    color:white;
`;


const Button = styled.button`
    margin-left:20px;
    padding:8px 22px;
    background-color: #1670BE;
  border: none;
  border-radius:5px;
  font-weight: 550;
  outline: none;
  color: white;

  &:hover{
    background-color: #58a7ec;
  }
`;


const UpdateProduct = () => {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const product = useSelector(state => state.recipe.products.find((product) => product._id === productId));

    const [inputs, setInPuts] = useState(product);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState(product.img);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setInPuts(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleClick = async (e) => {
        e.preventDefault();

        setInPuts({ ...inputs, img: imageUrl });

        const product1 = { ...inputs };

        if (inputs) {
            if (inputs.title && inputs.title !== "") {
                if (inputs.desc && inputs.desc !== "") {
                    if (inputs.ingredients && inputs.ingredients !== "") {
                        if (inputs.steps && inputs.steps !== "") {
                            if (inputs.img && inputs.img !== "") {
                                await updateProduct(productId, product1, dispatch);
                                showToastNotification();
                               
                            } else {
                                showToast("Image must be filled out");
                            }
                        } else {
                            showToast("Steps must be filled out");
                        }
                    } else {
                        showToast("Ingredients must be filled out");
                    }
                } else {
                    showToast("Description must be filled out");
                }
            } else {
                showToast("Name must be filled out");
            }

        } else {
            console.log("data empty");
        }

        // await updateProduct(productId, product1, dispatch);
        // showToastNotification();
    }

    const showToastNotification = () => {
        toast.success('Updated successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1500,
        });

        setTimeout(() => {
            navigate(-1);
        }, 3000);
    }

    const showToast = (message) => {
        toast.warning(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: false
        });
    }

    const showToastError = (message) => {
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
            hideProgressBar: false
        });
    }

    useEffect(() => {
        uploadImageToFirebase();
    }, [file]);

    const uploadImageToFirebase = () => {

        if (file == null) {
            return;
        }

        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setIsLoading(true);

        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                setIsLoading(false);
                showToastError("Failed to load image!");
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInPuts(prev => {
                        return { ...prev}
                    });
                    setImageUrl(downloadURL);
                    setIsLoading(false);
                });
            }
        );
    }

    return (
        <div className="product">
            <Navbar title="Update recipe" />
            <ToastContainer />
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.img} key={product.img} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id: </span>
                            <span className="productInfoValue"> {product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales: </span>
                            <span className="productInfoValue"> 5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock: </span>
                            <span className="productInfoValue"> Yes</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Name :</label>
                        <input type="text" name="title" defaultValue={product.title} onChange={handleChange} placeholder="Ex: Shrug" />
                        <label>Description :</label>
                        <input type="text" name="desc" defaultValue={product.desc} onChange={handleChange} placeholder="Ex: Long and fancy" />
                        <label>Steps :</label>
                        <input type="text" name="steps" defaultValue={product.steps} onChange={handleChange} placeholder="Ex: Long and fancy" />
                        <label>ingredients :</label>
                        <input type="text" name="ingredients" defaultValue={product.ingredients} onChange={handleChange} placeholder="Ex: Long and fancy" />

                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                        {isLoading ? <LoadingSpinner /> : <img alt="" className="productUploadImg" src={imageUrl} />}
                            {/* <img alt="" className="productUploadImg" src={imageUrl} key={inputs.img}/> */}
                            <label htmlFor="file">
                                <PublishIcon style={{ color: "#f96747", fontSize: "40px", backgroundColor: "transparent" }} />
                            </label>
                            <input onChange={e => setFile(e.target.files[0])} type="file" id="file" style={{ display: "none" }} />
                        </div>
                        <button onClick={handleClick} className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateProduct