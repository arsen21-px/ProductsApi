import axios from "../axios";

class ProductApi {
    async getProducts() {
        try {
            const res = await axios.get('/products');
            return res.data;
        } catch (error) {
            console.log(error, "ERROR");

        }
    }
    async getCategories() {
        try {
            const res = await axios.get('/categories');
            return res.data;
        } catch (error) {
            console.log(error, "ERROR");

        }
    }
    async getProductsByCategory(id) {
        try {
            const res = await axios.get(`/categories/${id}/products`);
            return res.data;
        } catch (error) {
            console.log(error, "ERROR");

        }
    }
    async getProductById(id) {
        try {
            const res = await axios.get(`/products/${ id }`);
            return res.data;
        } catch (error) {
            console.log(error, "ERROR");
        }
    }
}

export const apiProduct = new ProductApi();