    import React, { useState } from 'react'
    import "../styles/createcategory.scss"
    import {useDispatch, useSelector} from "react-redux"
    import EditIcon from '@material-ui/icons/Edit';
    import DeleteIcon from '@material-ui/icons/Delete';
    import EditBoxModal from '../components/EditBoxModal';
    import { addNewCategory, deleteCategory } from '../redux/actions/categoryActions';


    const CreateCategory = () => {
    const categories = useSelector(state => state.category.categories);
    const [isOpen,setIsOpen] = useState(false);
    const [currentCategory,setCurrentCategory] = useState({});
    const [newCategory,setNewCategory] = useState("")
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const openBoxModal = (category) => {
    setIsOpen(true);
    setCurrentCategory(category)
    }
    const deleteCategoryHandler = (category) => {
        dispatch(deleteCategory(category,auth))
    }
    const submitHandler = (e) => {
    e.preventDefault();
    setNewCategory("")
    dispatch(addNewCategory(newCategory,auth))
    }
    return (
    <div className='categories'>
    {
    isOpen && <EditBoxModal category={currentCategory} setIsOpen={setIsOpen}  />
    }
    <form onSubmit={submitHandler}>
    <input type="text" placeholder='add category' value={newCategory} onChange={e => setNewCategory(e.target.value)} />
    <button type='submit' className='btn'>Add</button>
    </form>
    <div className="category__list">
    {
    categories?.map(category => (    
    <div className="category" key={category._id}>
    <span>{category.name}</span>
    <div className="icons">
    <EditIcon className="icon" onClick={() => openBoxModal(category)} />
    <DeleteIcon className="icon" onClick={() => deleteCategoryHandler(category)} />
    </div>
    </div>
    ))
    }

    </div>
    </div>
    )
    }

    export default CreateCategory