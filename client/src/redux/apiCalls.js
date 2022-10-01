import { publicRequest, userRequest } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess, registerFailure, registerStart, registerSuccess } from "./userRedux"


export const register = async (dispatch, user) => {
    dispatch(registerStart());

    try {
        const res = await publicRequest.post('/auth/register', user);
        dispatch(registerSuccess(res.data));
    } catch (err) {
        dispatch(registerFailure());
    }
}

export const login = async (dispatch, user) => {
    dispatch(loginStart());

    try {
        const res = await publicRequest.post('/auth/login', user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
}


export const addProducts = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/recipe`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        console.log("Errror while adding...", err);
        dispatch(addProductFailure());
    }
}

export const getAllProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/recipe");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
}


export const searchProducts = async (dispatch, key) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get(`/recipe/search/${key}`);
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
}

export const logout = async (dispatch) => {

    dispatch(logoutStart());

    try {
        dispatch(logoutSuccess());
    } catch (err) {
        dispatch(logoutFailure());
    }
}


export const deleteProduct = async (dispatch, key) => {
    dispatch(deleteProductStart());
    try {
        const res = await userRequest.delete(`/recipe/delete/${key}`);
        dispatch(deleteProductSuccess(res.data));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
}


export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const res = await userRequest.put(`/recipe/update/${id}`, product);
        dispatch(updateProductSuccess({ id: id, product: res.data }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
}
