const getCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
}

const getProducts = async (product_id = null) => {
    let url = 'https://dummyjson.com/products';
    if (product_id != null) {
        url += `/${product_id}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    // When fetching by ID, dummyjson returns the product object directly (not nested)
    return product_id == null ? data.products : data;
}

export { getCategories, getProducts }