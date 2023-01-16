import React from 'react'
import { useSelector } from 'react-redux'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const CreateForm = ({setBlog,blog}) => {
    const categories = useSelector(state => state.category.categories);
    const changeHandler = (e) => {
        setBlog({...blog,[e.target.name] : e.target.value})
    }

    const thumbnailHandler = (e) =>  {
        const file = e.target.files[0];
        setBlog({...blog,thumbnail : file})
    }

  return (
    <div className='blog__form'>
        <div className="form__input">
            <label htmlFor="title">Blog Title</label>
            <input type="text" placeholder='Title' value={blog?.title} id="title" name="title" onChange={e => changeHandler(e)} />
        </div>
        <div className="form__input">
            <label htmlFor="thumbnail">Blog Thumbnail<br></br> <CloudUploadIcon className='icon' /></label>
            <input type="file" placeholder='Thumbnail' name="thumbnail" id="thumbnail" style={{ display:"none" }} onChange={e => thumbnailHandler(e)}  />
        </div>
        <div className="form__input">
            <label htmlFor="title">Blog Description</label>
            <input type="text" placeholder='Blog Description' value={blog?.description} id="description" name="description" onChange={e => changeHandler(e)} />
        </div>
        <div className="form__input">
            <label htmlFor="">Category</label>
            <select value={blog.category} name="category" onChange={e => changeHandler(e)}>
                <option value="">Choose Your Category</option>
                {
                    categories?.map(category => (
                        <option value={category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </div>
    </div>
  )
}

export default CreateForm