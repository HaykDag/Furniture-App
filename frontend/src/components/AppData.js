
const BASE_URL = "http://localhost:4000/"
export const AppUrl = {
    Categories: BASE_URL + "categories/",
    Items: BASE_URL + "items/",
    Images: BASE_URL + "images/",
    Orders: BASE_URL + "orders/",
    Basket: BASE_URL + "basket/",
    Users: {
        base: BASE_URL + "users/",
        verifyUser: BASE_URL + "users/verify/",
        loginUser: BASE_URL + "users/login/",
        logoutUser: BASE_URL + "users/logout/",
        signupUser: BASE_URL + "users/signup/",
    },
    Cloudinary_upload:
        "https://api.cloudinary.com/v1_1/furnitureappimages/image/upload",
};

export const pageSize = 12;
