import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import PublishIcon from "@mui/icons-material/Publish";
import { useNavigate } from "react-router-dom";
import "../styles/newProduct.css";
import { addProducts } from "../redux/apiCalls";
import Navbar from "./Navbar";
import bgCover from "../images/batter_placeholder.png";
import { ToastContainer, toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";


export default function NewReciepe() {
  const [inputs, setInPuts] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(bgCover);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  var { products, isFetching, error } = useSelector((state) => state.recipe);
  const { currentUser } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);


  const TOKEN = localStorage.getItem("persist:root") ? (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken : "") : "";

  console.log("Add recipe TOKEN: " , TOKEN);
  const handleArrayChange = (e) => {
    setInPuts((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
    setData(inputs);
  };

  const handleChange = (e) => {
    setInPuts((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setData(inputs);
  };

  useEffect(() => {
    uploadImageToFirebase();
  }, [file]);

  const showToastError = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      hideProgressBar: false
    });
  }

  const uploadImageToFirebase = () => {

    if (file == null) {
      return;
    }

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    setIsLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {

        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log("error while uploading image ", error);
        setIsLoading(false);
        showToastError("Failed to load image!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const products = {
            ...inputs,
            img: downloadURL,
            user_id: currentUser._id,
          };
          console.log("User id : ", currentUser, currentUser._id);

          setData(products);
          setImageUrl(downloadURL);
          setIsLoading(false);
        });
      }
    );
  };

  const showToast = (message) => {
    toast.warning(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
        hideProgressBar: false
    });
}

  const showToastSuccess = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
      hideProgressBar: false
    });
  }

  const handleClick = async (e) => {
    e.preventDefault();

    if (data) {
      if (inputs.title && inputs.title !== "") {
        if (inputs.desc && inputs.desc !== "") {
          if (inputs.ingredients && inputs.ingredients !== "") {
            if (inputs.steps && inputs.steps !== "") {
              if (data.img && data.img !== "") {
                await addProducts(data, dispatch);
                showToastSuccess("Product added successfully");
                setTimeout(() => {
                  navigate(-1);
                }, 2000);
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
  };

  return (
    <>
      <Navbar title="Add Recipe" />
      <ToastContainer />
      <div className="product">

        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Name :</label>
              <input
                type="text"
                autoComplete="off"
                name="title"
                onChange={handleChange}
                placeholder="Ex: Takos"
              />
              <label>Description :</label>
              <input
                type="text"
                name="desc"
                autoComplete="off"
                onChange={handleChange}
                placeholder="Ex: You will love it "
              />
              <label>ingredients :</label>
              <input
                type="text"
                name="ingredients"
                autoComplete="off"
                onChange={handleArrayChange}
                placeholder="Ex: Vegitables, Meda"
              />
              <label>Steps :</label>
              <input
                type="text"
                autoComplete="off"
                name="steps"
                onChange={handleArrayChange}
                placeholder="Ex: Chop vegies, Fry it"
              />
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                {/* <div className="productUploadImg"> */}
                {isLoading ? <LoadingSpinner /> : <img alt="" className="productUploadImg" src={imageUrl} />}
                {/* </div> */}

                <label htmlFor="file">
                  <PublishIcon
                    style={{
                      color: "#FF5733",
                      fontSize: "40px",
                      backgroundColor: "transparent",
                    }}
                  />
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <button onClick={handleClick} className="productButton">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
