

import React from 'react';
import {
  
  Link, NavLink} from 'react-router-dom'
import "./CSS/css.css"

import logo from '../assets/logo.png';
import { FiGrid } from "react-icons/fi";

import {FiUser} from "react-icons/fi";
import {VscGraph} from "react-icons/vsc"
// import Manager from "./manager"
import {FaRegMoneyBillAlt} from "react-icons/fa"
import {FiLogOut} from "react-icons/fi"
import {AiOutlineFile} from "react-icons/ai"
import {MdAdd} from "react-icons/md"
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions';

function AdminNav() {
  const dispatch = useDispatch()

   const Name= useSelector(state=>state.userName)
  const Role= useSelector(state=>state.userRole)

  
  const logOut=()=>{
    dispatch(logout())
  }
  return (
    <div style={{display:"flex"}}>
  <div className='topbar'>
  
   <div style={{paddingRight:"40px", display:"flex"}}>
        <div className="circle">
        <p className="initial">{Name&&Name.substring(0,1)}</p>
        </div>
    <div className='ANusercontainer'>
      
    <p className='NAname'>{Name}</p>
    <p className='NArole'>{Role}</p>
    </div>
    <button onClick={()=>logOut()} style={{backgroundColor:"transparent", borderWidth:"0px"}}>
    <FiLogOut size="20px" className='NAicon'  style={{alignSelf:"center"}}/></button>

  </div>
  </div>
  
  <div className="sidebar">
      <img className="image" src={logo} alt={"logo"}/>
      <div className="NAcontainer">
      <NavLink className="icons" to='/'activeClassName='NAavtive'exact  >
       <FiGrid className="NAicon"   color="#868ba5" activeClassName='NAactive'  />
      </NavLink>
      </div>
      <span/>
      <div className="NAcontainer">
      <NavLink className="icons" to='/payments'activeClassName='NAavtive' >
       <FaRegMoneyBillAlt className="NAicon"  color="#868ba5"  />
      </NavLink>
      </div>
      <div className="NAcontainer">
      <NavLink className="icons" to='/producers'activeClassName='NAavtive'>
       <FiUser className="NAicon" size="20px"  color="#868ba5"/>
     </NavLink></div>
     <span/>
     <div className="NAcontainer">
      <NavLink  className="icons" to='/report'activeClassName='NAavtive'>
      <VscGraph className="NAicon" size="20px" color="#868ba5" />
     </NavLink></div>
     <span/>
     
     
     
     
     <div className="NAcontainer">
      <NavLink  className="icons" to='/addquote'activeClassName='NAavtive'>
      <AiOutlineFile className="NAicon" size="20px" color="#868ba5" />
     </NavLink></div>
     <span/>
     
     <div className="NAcontainer">
      <NavLink  className="icons" to='/Manager'activeClassName='NAavtive'>
      <MdAdd className="NAicon" size="25px" color="#868ba5" />
     </NavLink></div>

      
     
    </div></div>
  );
};

export default AdminNav

