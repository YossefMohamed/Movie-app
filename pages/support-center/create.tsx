import React, { useEffect, useState } from "react";
import {  AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Post from "../../components/Post";
import Tag from "../../components/Tag";

export default function Create(props) {
    const [ tag , setTag] = useState("")
    const [suggestions , setSuggestions] = useState([])
    const [tags , setTags] = useState([])
  const genres =  [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
  ]

  useEffect(() => {
    setSuggestions(genres.filter(genre => {
        if(genre.name.toLowerCase().includes(tag.toLowerCase()) && tag.length > 0) {
            return genre.id
        }
    }
    ))
}, [tag])
  
  const addTag = (tag) => {
    setTags([...tags, tag])
    setTag("")
  }
  return (
    <div className="my-20">
        
    <div className="text-5xl font-bold">Create A Post : </div>
<form className="my-20 flex flex-col">


<div className="text-4xl font-bold">Post Content : </div>
<textarea className="my-10 w-full bg-secondary-dark py-5 px-10 outline-none text-3xl h-48"></textarea>

<div className="text-4xl font-bold">Post Tages : </div>

<div className="flex flex-col justify-start">
<input className="mt-10 w-full bg-secondary-dark py-5 px-10 outline-none text-3xl" value={tag} onChange={e => setTag(e.target.value)}/>

{suggestions.length ? <div className="drop-down border-y border-primary-dark py-3 px-3 bg-secondary-dark">

{suggestions.map(suggestion => <div className="py-2 px-10" id={suggestion.id} onClick={() => addTag(suggestion.name)}>
        {suggestion.name}
    </div>)} 

</div> : null
}
</div>

<div className="flex mt-3">
    
{tags.map(tag => <Tag name={tag} />)}

</div>



<button className="my-10  bg-secondary-dark py-5 px-10 outline-none text-3xl w-fit">Create Post</button>
</form>

    </div>
  );
}
