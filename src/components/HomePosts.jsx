/* eslint-disable react/prop-types */
import {IF} from '../url'


const HomePosts = ({post}) => {
  return (
    <div className="w-full flex mt-[8%] text-black space-x-4 bg-[#dfdfeb33] p-8">
    {/* left */}
    <div className="w-[35%] h-[200px] flex justify-center items-center">
    <img src={IF+post.photo} alt="" className="h-[110%] w-[70%] object-cover"/>
    </div>
    {/* right */}
    <div className="flex flex-col w-[65%]">
      <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl p-4"> - {''}
      {post.title}
      </h1>
      <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
       <p><span className='txt'>@</span>{post.username}</p>
       <div className="flex space-x-2 text-sm">
       <p>{new Date(post.updatedAt).toString().slice(0,20)}</p>
       <p>{new Date(post.updatedAt).toString().slice(21,24)}</p>
       </div>
      </div>
      <p className="text-sm md:text-lg">{post.desc.slice(0,200)+" ...Read more"}</p>
    </div>

    </div>
  )
}

export default HomePosts

