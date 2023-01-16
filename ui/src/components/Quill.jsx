import React, { useCallback, useEffect, useRef } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useDispatch } from 'react-redux';
import { checkFile, imageUpload } from '../utils/checkFile';
import {actionTypes} from '../redux/actionTypes'

const Quill = ({setBody,blog,body}) => {
    let modules = { toolbar : container}
    const quillRef = useRef()
   

    const dispatch = useDispatch()

    const imageChangeHandler = useCallback(() => {
         const input = document.createElement("input")
         input.type = "file";
         input.accept = "image/*"
         input.click()

         input.onchange = async () => {
             const files = input.files;
             if(!files) return dispatch({type:actionTypes.ALERT , payload: { errors : "file doesn't exist"}})
             const file = files[0]
            const check = checkFile(file)

            if(check) dispatch({type:actionTypes.ALERT , payload :{errors: check}})

            dispatch({type:actionTypes.ALERT , payload : {loading:true}})
            const photo = await imageUpload(file);
            
            dispatch({type:actionTypes.ALERT , payload: {loading:false}})
            const quill = quillRef.current;
            const range = quill?.getEditor().getSelection()?.index

            if(range !== undefined) {
              quill?.getEditor()?.insertEmbed(range,'image',`${photo.data.secure_url}`)
            }
         }
    },[])

    
    useEffect(() => {
       if(blog){
      setBody(blog.content)
    }
        const quill = quillRef.current;
        if(!quill) return;

        let toolbar = quill.getEditor().getModule("toolbar");
        toolbar.addHandler("image",imageChangeHandler)


    },[imageChangeHandler])

  return (
    <div className='editor'>
        <ReactQuill modules={modules} value={body}  ref={quillRef} onChange={e => setBody(e)} />
    </div>
  )
}

let container = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean','link','image','video']            
]

export default Quill