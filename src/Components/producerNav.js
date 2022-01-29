import React, { useEffect } from 'react';
import {
  Route,
  Link} from 'react-router-dom'
  import "./CSS/css.css"

import logo from '../assets/logo.png';
import { FiGrid } from "react-icons/fi";
import {MdCreditScore} from "react-icons/md"
import {FiUser} from "react-icons/fi";
import {VscGraph} from "react-icons/vsc"
import {BiAddToQueue} from "react-icons/bi"
import { useSelector } from 'react-redux';

function ProducerNav({onSearch}) {

  const Name= useSelector(state=>state.userName)
  const Role= useSelector(state=>state.userRole)


  return (
   <div >
     <div className="logo">
     <img className="image" src={logo} />
     <div className="profile">
        <div>
        <p className="name">{Name}</p>
        <p className="role">{Role}</p>
        </div>
        <div className="circle">
        <p className="initial">{Name}</p>
        </div>
      </div>
     </div>
   
    <nav className="sidebar">
      <div className="container">
      <Link className="icons" to='/'>
      <div className="center"> <FiGrid className="icon"  color="#969CBA"  /> </div>
      </Link>
      </div>
      <span/>
      <div className="container">
      <Link className="icons" to='/payments'>
      <div className="center"> <FiUser className="icon"  color="#969CBA"/> </div>
     </Link></div>
     <span/>
     <div className="container">
      <Link  className="icons" to='/myquotes'>
      <div  className="center"><MdCreditScore className="icon" color="#969CBA" /> </div>
     </Link></div>
     <span/>
     <div className="container">
      <Link  className="icons" to='/add'>
      <div  className="center"><VscGraph className="icon" color="#969CBA" /> </div>
     </Link></div>
     <span/>
     <div className="container">
      <Link  className="icons" to='/manager'>
      <div  className="center"><BiAddToQueue className="icon" color="#969CBA" /> </div>
     </Link></div>

      
     
    </nav></div>
  );
};

export default ProducerNav

