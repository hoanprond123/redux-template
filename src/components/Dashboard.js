import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {increase} from '../redux/Test/testAction'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../contexts/AuthProvider";
import Navbar from "./Navbar";
import "antd/dist/antd.css";

import { Table, Button , Space } from "antd";
const Dashboard = () => {
  const { lists, handleDelete, handleEdit, setName, setEmail, setNumber, edit, handleSubmit, number, email, name, startDate, setStartDate } =
    useGlobalContext();
  const { Column } = Table;

  const numberIncrement = useSelector(state => state.test.numberIncrement)
  const dispatch = useDispatch()

  useEffect(() => {
    if(edit) {
      setName(edit.name);
      setNumber(edit.phone);
      setEmail(edit.email);
    } else {
      setName('');
      setNumber('');
      setEmail('');
    }
  },[edit, setName, setNumber, setEmail])
  


  return (
    <>
      <Navbar />
      <div className="form-sign-up">
            <div className="grid wide form-sign-up-inside">
                <div className="form-sign-up-container">
                    <h2>Add information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-sign-up-input">
                            <label>Your Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" value={name} placeholder="your name" required /> 
                        </div>
                        <div className="form-sign-up-input">
                            <label>Your number</label>
                            <input onChange={(e) => setNumber(e.target.value)} type="number" value={number} placeholder="your number" required /> 
                        </div>
                        <div className="form-sign-up-input">
                            <label>Your email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" value={email} placeholder="your email" required /> 
                        </div>
                        <div className="form-sign-up-input">
                            <label>Your date of birth</label>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> 
                        </div>
                        <button className="btn">{edit ? 'edit' : 'add'}</button>
                    </form>
                </div>
            </div>
        </div>
      <div className="lists">
        <div className="grid wide">
          <Table dataSource={lists} rowKey="id">
            <Column title="Name" dataIndex="name"  />
            <Column title="Phone number" dataIndex="phone" />
            <Column title="Email" dataIndex="email"  />
            <Column title="Date" dataIndex="date"  />
            <Column 
              title="Action"
              render={(text, record) => (
                <Space size="middle">
                  <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                  <Button onClick={() => handleEdit(record.id)}>Edit</Button>
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
