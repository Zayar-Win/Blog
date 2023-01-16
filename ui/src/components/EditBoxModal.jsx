import React, { useState } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../redux/actions/categoryActions';
import { actionTypes } from '../redux/actionTypes';

const EditBoxModal = ({category,setIsOpen}) => {
  const [editCategory,setEditCategory] = useState(category)
  const [name,setName] = useState("")
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
   const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
   }
  const editCategoryHandler = (e) => {
    e.preventDefault();
    if(name === editCategory.name || name === "") return dispatch({type:actionTypes.ALERT,payload:{errors:"Change value is required"}}) ;
    const data = {...editCategory,name}
    dispatch(changeCategory(data,auth))
    setIsOpen(false)
  }
  return (
    <div className='box__container'>
        <div className="box">
            <CloseIcon className="close" onClick={(e) => closeModal(e)}  />
            <h1>Edit you category</h1>
            <input type="text" placeholder={category?.name} onChange={e => setName(e.target.value) } />
            <button className='button' onClick={(e) => editCategoryHandler(e)}>Change</button>
        </div>
    </div>
  )
}

export default EditBoxModal