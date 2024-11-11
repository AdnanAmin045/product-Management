import React, { useState, useEffect } from 'react';

export default function Products() {
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        price: '',
        discount: '',
        description: '',
    });
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/products/');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            try {
                const response = await fetch(`http://localhost:5000/products/${editProductId}`, {
                    method: 'PUT',
                    body: JSON.stringify(productData),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 200) {
                    setSuccessMessage('Product updated successfully!');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                    fetchProducts();  // Refresh the product list
                    setIsEditing(false);
                    setProductData({
                        name: '',
                        category: '',
                        price: '',
                        discount: '',
                        description: '',
                    });
                } else {
                    setSuccessMessage('Failed to update product.');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 500);
                }
            } catch (error) {
                setSuccessMessage('An error occurred while updating the product.');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 500);
            }
        } else {
            // Handle Add Product
            try {
                const response = await fetch('http://localhost:5000/products/', {
                    method: 'POST',
                    body: JSON.stringify(productData),
                    headers: { 'Content-Type': 'application/json' },
                });

                if (response.status === 201) {
                    setSuccessMessage('Product added successfully!');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                    await fetchProducts();
                    setProductData({
                        name: '',
                        category: '',
                        price: '',
                        discount: '',
                        description: '',
                    });
                } else {
                    setSuccessMessage('Failed to add product.');
                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 500);
                }
            } catch (error) {
                setSuccessMessage('An error occurred while adding the product.');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 500);
            }
        }
    };

    const handleEdit = (product) => {
        setProductData({
            name: product.name,
            category: product.category,
            price: product.price,
            discount: product.discount,
            description: product.description,
        });
        setEditProductId(product._id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product._id !== id)
                );
            } else {
                console.error('Failed to delete the product');
            }
        } catch (error) {
            console.error('Error deleting the product:', error);
        }
    };

    return (
        <div className="mx-[2vw] mt-[1vw] bg-white shadow-md p-[1vw] rounded-lg flex flex-col gap-5">
            <h1 className="text-[1.1vw] font-semibold">{isEditing ? 'Edit Product' : 'Product Information'}</h1>
            <form onSubmit={handleSubmit} className="flex flex-wrap justify-between gap-4 mt-4">
                <div className="h-auto w-[48%] p-[1vw] border-[0.1vw] rounded-md">
                    <h1 className="text-[1vw] font-semibold">General Information</h1>
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex justify-between gap-4">
                            <div className="w-1/2 flex flex-col gap-1">
                                <h1 className="text-[0.8vw] text-[#adadad]">
                                    Product Name <span className="text-red-500">*</span>
                                </h1>
                                <input
                                    className="w-full h-[2.5vw] border-[0.1vw] text-[0.9vw] text-[#474747] p-[0.5vw] border-[#adadad] rounded-sm focus:outline-none"
                                    type="text"
                                    name="name"
                                    value={productData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter Product Name"
                                    maxLength="30"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-1">
                                <h1 className="text-[0.8vw] text-[#adadad]">
                                    Product Category <span className="text-red-500">*</span>
                                </h1>
                                <input
                                    className="w-full h-[2.5vw] border-[0.1vw] text-[0.9vw] text-[#474747] p-[0.5vw] border-[#adadad] rounded-sm focus:outline-none"
                                    type="text"
                                    name="category"
                                    value={productData.category}
                                    onChange={handleInputChange}
                                    placeholder="Enter Product Category"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="w-1/2 flex flex-col gap-1">
                                <h1 className="text-[0.8vw] text-[#adadad]">
                                    Product Price ($) <span className="text-red-500">*</span>
                                </h1>
                                <input
                                    className="w-full h-[2.5vw] border-[0.1vw] text-[0.9vw] text-[#474747] p-[0.5vw] border-[#adadad] rounded-sm focus:outline-none"
                                    type="text"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter Selling Price"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-1">
                                <h1 className="text-[0.8vw] text-[#adadad]">
                                    Discount (%) <span className="text-red-500">*</span>
                                </h1>
                                <input
                                    className="w-full h-[2.5vw] border-[0.1vw] text-[0.9vw] text-[#474747] p-[0.5vw] border-[#adadad] rounded-sm focus:outline-none"
                                    type="text"
                                    name="discount"
                                    value={productData.discount}
                                    onChange={handleInputChange}
                                    placeholder="Enter Discount"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-1 mt-4">
                        <h1 className="text-[0.8vw] text-[#adadad]">
                            Product Description <span className="text-red-500">*</span>
                        </h1>
                        <textarea
                            name="description"
                            className="w-full h-[6vw] border-[0.1vw] text-[0.9vw] text-[#474747] p-[0.5vw] border-[#adadad] rounded-sm focus:outline-none resize-none"
                            value={productData.description}
                            onChange={handleInputChange}
                            placeholder="Enter Product Description"
                            maxLength="100"
                        />
                    </div>

                    <div className="flex items-center gap-3 justify-end mt-4">
                        <button
                            type="submit"
                            className="bg-[#25bc4e] p-[1vw] h-[2.5vw] flex justify-center items-center rounded-sm text-[0.9vw] text-white"
                        >
                            {isEditing ? 'Update Product' : 'Add Product'}
                        </button>
                    </div>
                </div>
            </form>

            <div className="container mx-auto p-4">
                <h1 className="text-xl font-semibold mb-4">Product List</h1>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Product Name</th>
                            <th className="border-b px-4 py-2 text-left">Category</th>
                            <th className="border-b px-4 py-2 text-left">Price ($)</th>
                            <th className="border-b px-4 py-2 text-left">Discount (%)</th>
                            <th className="border-b px-4 py-2 text-left">Description</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id} className="border-b border-gray-200">
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.price}</td>
                                    <td className="px-4 py-2">{product.discount}</td>
                                    <td className="px-4 py-2">{product.description}</td>
                                    <td className="px-4 py-2 text-center">
                                        <button
                                            className="text-blue-500 mr-2"
                                            onClick={() => handleEdit(product)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center px-4 py-2">
                                    No products found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {successMessage && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
}
