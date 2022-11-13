import { useEffect, useState } from 'react';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

function
  Home() {

  const [user, setUser] = useState([]);
  // console.log(user);

  // get method
  useEffect(() => {
    test1();
  }, []);

  const test1 = async () => {
    await fetch('http://localhost:3000/students')
      .then(res => res.json())
      .then(res => setUser(res.result))
    console.log("1");
  }
  // add key feild
  let arr = user;
  for (let i = 0; i < arr.length; i++) {
    arr[i].slno = i + 1;
  }
  //delete method

  const deleteById = async (id) => {
    await fetch(`http://localhost:3000/students/${id}`, { method: "delete" })
    setShowModal1(false);
    await test1(id)
    console.log(user, 'del');

  }
  //validation
  const userValidation = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required(),
    age: yup.number().required(),
    phonenumber: yup.number().required(),
    address: yup.string().required(),

  });
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userValidation),
  });

  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);


  const [getUsers, setUsers] = useState({});

  const showmodel = async (id) => {

    const response = await fetch(`http://localhost:3000/students/${id}`,
      {
        method: "get",
        headers: { 'Content-Type': 'application/json' },
      })
    const data = await response.json()
    const getUsers = data.result
    setUsers(getUsers)

    console.log(getUsers);

  };
  //post and put method
  const updateById = async (val) => {
    const putrecord = { id: val.id, name: val.name, age: val.age, phonenumber: val.phonenumber, address: val.address }
    await fetch(`http://localhost:3000/students/${update._id}`,
      {
        method: 'put',
        body: JSON.stringify(putrecord),
        headers: { 'content-type': 'application/Json' }

      })
    await test1();
    setShowModal(false)
    reset()

  }




  const add = async (val) => {
    const postrecord = { id: val.id, name: val.name, age: val.age, phonenumber: val.phonenumber, address: val.address }
    console.log(postrecord);
    await fetch('http://localhost:3000/students',
      {
        method: 'post',
        body: JSON.stringify(postrecord),
        headers: { 'content-type': 'application/Json' }
      })
    await test1();
    setShowModal(false)
    reset()

  }

  //update method
  const [update, setupdate] = useState([]);

  const edit = (items) => {
    setupdate(items)
    console.log(items);
    setShowModal(true)

  }
  const cancel = () => {
    reset()
    setShowModal(false)
    window.location.reload();
  }
  const addmodule = () => {
    setShowModal(true)
  }


  return (
    <div >
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <a href="#" className="flex items-center">
            <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="mobile-menu-2" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
              </li>
              <li>
                <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg className="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>
                {/* <!-- Dropdown menu --> */}
                <div id="dropdownNavbar" className="hidden z-10 w-44 font-normal bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                    </li>
                  </ul>
                  <div className="py-1">
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Sign out</a>
                  </div>
                </div>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="mt-24 flex justify-center">
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => addmodule()}
        >
          Add User
        </button>
      </div>
      {
        showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-1 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-0 border-b border-solid border-slate-200 rounded-t">
                    {update._id ?
                      <h3 className="mt-6 flex justify-center text-3xl font-semibold p-5">Update users</h3> :
                      <h3 className="mt-6 flex justify-center text-3xl font-semibold p-5">Add Form</h3>
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
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> id</label>
                        <input {...register("id")} type=" id" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="id"
                          defaultValue={update._id ? update.id : null} />
                      </div>
                      <div className="mb-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Name</label>
                        <input {...register("name")} type="text" id="string" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"
                          defaultValue={update._id ? update.name : null} />
                      </div>
                      <div className="mb-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Age</label>
                        <input {...register("age")} type="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age"
                          defaultValue={update._id ? update.age : ""} />
                      </div>
                      <div className="mb-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phonenumber</label>
                        <input {...register("phonenumber")} type="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phonenumber"
                          defaultValue={update._id ? update.phonenumber : null} />
                      </div>
                      <div className="mb-1">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Address</label>
                        <input {...register("address")} type="text" id="string" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="address"
                          defaultValue={update._id ? update.address : null} />
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
                      {update._id ?
                        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          type="button"
                          onClick={handleSubmit(updateById)}
                        >Update</button> :
                        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          type="button"
                          onClick={handleSubmit(add)}
                        >Save</button>

                      }
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null
      }


      <div className="mt-5 flex justify-center">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                slno
              </th>
              <th scope="col" className="py-3 px-6">
                Id
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Age
              </th>
              <th scope="col" className="py-3 px-6">
                Phonenumber
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          {user.map(item => (
            <tbody key={item._id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.slno}
                </th>
                <td className="py-4 px-6">
                  {item.id}
                </td>
                <td className="py-4 px-6">
                  {item.name}
                </td>
                <td className="py-4 px-6">
                  {item.age}
                </td>
                <td className="py-4 px-6">
                  {item.phonenumber}
                </td>
                <td className="py-4 px-6">
                  {item.address}
                </td>
                <td className="py-4 px-6">
                  <div></div>
                  <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => edit(item)}>Edit</button>
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setShowModal1(true)} >Delete</button>

                  {showModal1 &&
                    <div id="toast-top-left" class="flex fixed top-5 left-5 items-center p-4 space-x-4 w-full max-w-xs text-gray-500 bg-white rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                      <div class="text-sm font-normal">delete data confirm</div>
                      <div>
                        <a href="#" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" onClick={() => setShowModal1(false)}>Not now</a>
                      </div>
                      <div>
                        <a href="#" class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800" onClick={() => deleteById(item._id)}>Confirm</a>
                      </div>
                    </div>
                  }
                </td>
              </tr>

            </tbody>
          ))}
        </table>
      </div>
    </div >

  )


}


export default Home;