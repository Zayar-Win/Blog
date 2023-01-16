import React, { useState } from 'react'

const Input = ({auth,callback,type,comment}) => {

    const [body,setBody] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        callback(body)
        setBody("")
    }

    const btn = (type) => {
        if(type === "Reply"){
            return "Reply"
        }else if(type === "Update"){
            return "Update"
        }else{
            return "Comment"
        }
    }

  return (
    <form onSubmit={submitHandler}>
        <div className="comment__input">
            <div className="image">
                <img src={auth.user.avatar} alt="" />
            </div>
            <input type="text" placeholder={comment ? "Update " + comment +" to..."  : 'Add a comment...'} value={body} onChange={e => setBody(e.target.value)} />
        </div>
        <button type="submit" className="btn">{btn(type)}</button>
    </form>
  )
}

export default Input