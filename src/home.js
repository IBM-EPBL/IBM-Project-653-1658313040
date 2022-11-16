import { useEffect, useState } from 'react';
import React from "react";

function Home() {
    const [showModal, setShowModal] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [getUsers, setUsers] = useState([]);
    const [product, setProduct] = useState([]);
    const [update, setupdate] = useState({});

    //inputs
    const [id, setId] = useState(update.PRODUCT_ID);
    const [prodName, setProdName] = useState(update.PRODUCTNAME);
    const [prodDetails, setProdDetails] = useState(update.PRODUCTDETAILS);
    const [whLocation, setWhLocation] = useState(update.WAREHOUSE_LOCATION);
    const [qty, setQty] = useState(update.QUANTITY);
    const [pricing, setPricing] = useState(update.PRICE);

    console.log(update);
    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        await fetch('http://127.0.0.1:5000/get-products')
            .then(res => res.json())
            .then(res => setProduct(res.data))
        console.log("1");
    }
  
    const addProduct = async () => {
        const postData ={
            product_id: id,
            productname: prodName,
            productdetails: prodDetails,
            warehouse_location: whLocation,
            quantity:qty,
            price:pricing
        }
        console.log(postData);
      const response = await fetch('http://127.0.0.1:5000/add-products',
            {
                method: 'post',
                body: JSON.stringify(postData),
                headers: { 
                    'content-type': 'application/Json',
                    "Access-Control-Allow-Origin":"http://127.0.0.1:5000"
                }
            })
        await getProduct();
        setShowModal(false)
    }
   

    const deleteProduct = async (DeleteId) => {
        const postData ={
            product_id: DeleteId,
        }
      await fetch('http://127.0.0.1:5000/delete-products',
            {
                method: 'post',
                body: JSON.stringify(postData),
                headers: { 'content-type': 'application/Json' }
            })
        await getProduct();
    }
    //validation
    // const showmodel = async (id) => {
    //     const response = await fetch(`http://localhost:3000/students/${id}`,
    //         {
    //             method: "get",
    //             headers: { 'Content-Type': 'application/json' },
    //         })
    //     const data = await response.json()
    //     const getUsers = data.result
    //     setUsers(getUsers)
    //     console.log(getUsers);
    // };
    //post and put method
    const updateProduct = async () => {
        const postData ={
            product_id: id,
            productname: prodName,
            productdetails: prodDetails,
            warehouse_location: whLocation,
            quantity:qty,
            price:pricing
        }
        console.log(postData);
      const response = await fetch('http://127.0.0.1:5000/update-product',
            {
                method: 'post',
                body: JSON.stringify(postData),
                headers: { 'content-type': 'application/Json' }
            })
        await getProduct();
        setShowModal(false)
    }


    //update method
    const openUpdateModel = (items) => {
        console.log(items,"items");
        setupdate(items)
        setShowModal(true)
        console.log(update);
    }
    const cancel = () => {
        setShowModal(false)
        window.location.reload();
    }
    const OpenaddProdctModel = () => {
        setShowModal(true)
    }

    return (
        <div >
            <div className="navbar bg-neutral">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl text-white">Inventry Management For IBM</a>
                </div>
                <div className="flex-none">

                    <ul className="menu menu-horizontal mr-6">
                        <li tabIndex={0} >
                            <a className='text-white'>Options </a>
                            <ul className="bg-base-100 p-3">
                                <button
                                    className="text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                    type="button"
                                    >
                                    Logout
                                </button>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className=" flex justify-end mr-6 mt-6">
                <button className="bg-green-700 text-white active:bg-green-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => OpenaddProdctModel()}>
                    Add product
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-0 border-b border-solid border-slate-200 rounded-t">
                                    {update.PRODUCT_ID ?
                                        <h3 className="mt-6 flex justify-center text-3xl font-semibold p-5">Update Product</h3> :
                                        <h3 className="mt-6 flex justify-center text-3xl font-semibold p-5">Add Product</h3>
                                    }
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">

                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <form className="p-3">
                                    <div>
                                        <div className="mb-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Id</label>
                                            <input type=" id" onChange={(e)=>setId(e.target.value)} id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Id"
                                                defaultValue={update.PRODUCT_ID ? update.PRODUCT_ID : null} />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Name</label>
                                            <input type="text" id="string" onChange={(e)=>setProdName(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Name"
                                                defaultValue={update.PRODUCT_ID ? update.PRODUCTNAME : null} />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Product Details</label>
                                            <input type="text" onChange={(e)=>setProdDetails(e.target.value)} id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Details"
                                                defaultValue={update.PRODUCT_ID ? update.PRODUCTDETAILS : ""} />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">WareHouse Location\</label>
                                            <input type="text" id="number" onChange={(e)=>setWhLocation(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Warehouse Location"
                                                defaultValue={update.PRODUCT_ID ? update.WAREHOUSE_LOCATION : null} />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                                            <input type="number" id="string" onChange={(e)=>setQty(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Quantity"
                                                defaultValue={update.PRODUCT_ID ? update.QUANTITY : null} />
                                        </div>
                                        <div className="mb-1">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                                            <input type="number" id="string" onChange={(e)=>setPricing(e.target.value)} className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Price"
                                                defaultValue={update.PRODUCT_ID ? update.PRICE : null} />
                                        </div>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                            type="button"
                                            onClick={() => cancel()}>
                                            cancel
                                        </button>
                                        {update.PRODUCT_ID ?
                                            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                type="button"
                                                onClick={updateProduct}
                                            >Update</button> :
                                            <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                type="button"
                                                onClick={addProduct}
                                            >Save</button>
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}


            <div className="mt-5 flex justify-center">
                <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-neutral dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 text-white px-6">
                                Id
                            </th>
                            <th scope="col" className="py-3 text-white px-6">
                                Product Name
                            </th>
                            <th scope="col" className="py-3 text-white px-6">
                                Product Details
                            </th>
                            <th scope="col" className="py-3 text-white px-6">
                                Warehouse Locations
                            </th>
                            <th scope="col" className="py-3 text-white px-6">
                                Quantity
                            </th>
                            <th scope="col" className="py-3 text-white px-6">
                                Price
                            </th>
                            <th scope="col" className="py-3 text-white px-6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {product.map(item => (
                        <tbody key={item.PRODUCT_ID}>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="py-4 px-6">
                                    {item.PRODUCT_ID}
                                </td>
                                <td className="py-4 px-6">
                                    {item.PRODUCTNAME}
                                </td>
                                <td className="py-4 px-6">
                                    {item.PRODUCTDETAILS}
                                </td>
                                <td className="py-4 px-6">
                                    {item.WAREHOUSE_LOCATION}
                                </td>
                                <td className="py-4 px-6">
                                    {item.QUANTITY}
                                </td>
                                <td className="py-4 px-6">
                                    {item.PRICE}
                                </td>
                                <td className="py-4 px-6">
                                    <div></div>
                                    <button type="button" className="focus:outline-none text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => openUpdateModel(item)}>Edit</button>
                                    <button type="button" className="text-white bg-red-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => deleteProduct(item.PRODUCT_ID)} >Delete</button>

                                    {showModal1 &&
                                        <div id="toast-top-left" class="flex fixed top-5 left-5 items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                                            <div class="text-sm font-normal">delete data confirm</div>
                                            <div>
                                                <a href="#" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" onClick={() => setShowModal1(false)}>Not now</a>
                                            </div>
                                            <div>
                                                <a href="#" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Confirm</a>
                                            </div>
                                        </div>
                                    }
                                </td>
                            </tr>

                        </tbody>
                    ))}
                </table>
            </div>
        </div>)
}
export default Home;