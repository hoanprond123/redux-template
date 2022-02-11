import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase } from "../redux/Test/testAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../contexts/AuthProvider";
import Navbar from "./Navbar";
import "antd/dist/antd.css";
import { Table, Button, Space } from "antd";
import { fetchLists } from "../redux/List/listAction";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {
  informationUser,
  informationUserDelete,
  inputName,
  inputNumber,
  inputEmail,
  inputDate,
  informationEdit,
  editItem,
  checkEdit
} from "../redux/List/listAction";
import { setUser } from "../redux/Login/loginAction";
import { auth } from "../firebase";

const Dashboard = () => {
  //-------------Sử dụng useContext--------------------//
  // const {
  //   lists,
  //   handleDelete,
  //   handleEdit,
  //   setName,
  //   setEmail,
  //   setNumber,
  //   edit,
  //   handleSubmit,
  //   number,
  //   email,
  //   name,
  //   startDate,
  //   setStartDate,
  // } = useGlobalContext();

  // useEffect(() => {
  //   if (edit) {
  //     setName(edit.name);
  //     setNumber(edit.phone);
  //     setEmail(edit.email);
  //   } else {
  //     setName("");
  //     setNumber("");
  //     setEmail("");
  //   }
  // }, [edit, setName, setNumber, setEmail]);

  //----------------Sử dụng redux-----------------------//
  const { Column } = Table;

  const numberIncrement = useSelector((state) => state.test.numberIncrement);
  let dispatch = useDispatch();

  const navigate = useNavigate();

  const listsUser = useSelector((state) => state.list.lists);

  const nameInput = useSelector((state) => state.list.name);
  const numberInput = useSelector((state) => state.list.number);
  const emailInput = useSelector((state) => state.list.email);
  const dateInput = useSelector((state) => state.list.date);
  const userEdit = useSelector((state) => state.list.userInfor);
  const editCheck = useSelector((state) => state.list.checkedEdit)



  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    if (!userEdit) {
      const addNew = {
        id: uuidv4(),
        name: nameInput,
        email: emailInput,
        phone: numberInput,
        date: dateInput,
        checked: editCheck
      };

      console.log(addNew.checked);

      dispatch(informationUser(addNew));
      navigate("/");
    } else {
      const updateList = {
        id: userEdit.id,
        name: nameInput,
        email: emailInput,
        phone: numberInput,
        date: dateInput,
      };
      dispatch(informationEdit(userEdit.id, updateList));
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  const handleDelete1 = (id) => {
    dispatch(informationUserDelete(id));
  };

  const handleEdit1 = (id) => {
    dispatch(editItem(id));
    console.log('xinchao')
  };

  return (
    <>
      <Navbar />
      <div className="form-sign-up">
        <div className="grid wide form-sign-up-inside">
          <div className="form-sign-up-container">
            <h2>Add information</h2>
            <form onSubmit={handleAdd}>
              <div className="form-sign-up-input">
                <label>Your Name</label>
                <input
                  onChange={(e) => dispatch(inputName(e.target.value))}
                  type="text"
                  value={nameInput}
                  placeholder="your name"
                  required
                />
              </div>
              <div className="form-sign-up-input">
                <label>Your number</label>
                <input
                  onChange={(e) => dispatch(inputNumber(e.target.value))}
                  type="number"
                  value={numberInput}
                  placeholder="your number"
                  required
                />
              </div>
              <div className="form-sign-up-input">
                <label>Your email</label>
                <input
                  onChange={(e) => dispatch(inputEmail(e.target.value))}
                  type="email"
                  value={emailInput}
                  placeholder="your email"
                  required
                />
              </div>
              <div className="form-sign-up-input">
                <label>Your date of birth</label>
                <DatePicker
                  selected={dateInput}
                  onChange={(date) => dispatch(inputDate(date))}
                />
              </div>
              <div className="form-sign-up-input">
                <label>Edit ?</label>
                <input checked={editCheck} type="checkbox" onChange={(e) => dispatch(checkEdit(e.target.checked))} value={editCheck} />
              </div>
              <button className="btn">{userEdit ? "edit" : "add"}</button>
            </form>
          </div>
        </div>
      </div>
      <div className="lists">
        <div className="grid wide">
          <Table dataSource={listsUser} rowKey="id">
            <Column title="Name" dataIndex="name" />
            <Column title="Phone number" dataIndex="phone" />
            <Column title="Email" dataIndex="email" />
            <Column title="Date" dataIndex="date" />
            <Column
              title="Action"
              render={(text, record) => (
                <Space size="middle">
                  <Button onClick={() => handleDelete1(record.id)}>
                    Delete
                  </Button>
                  <Button disabled={record.checked} onClick={() => handleEdit1(record.id) }>Edit</Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
      <Button onClick={() => dispatch(increase(2))}>Click</Button>
      <h2>Test number: {numberIncrement}</h2>
    </>
  );
};

export default Dashboard;
