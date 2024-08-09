

const Footer = () => {
  return (
    <>
<div className="mt-8 w-full bg-[#0C1844] px-8 md:px-[300px] flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-sm md:text-md py-8 ">
       <div className="flex flex-col text-white">
         <a href="#">Featured Blogs</a>
         <a href="#">Most viewed</a >
         <a href="#">Readers Choice</a>
       </div>

       <div className="flex flex-col text-white">
         <a href="#">Forum</a >
         <a href="#">Support</a>
         <a href="#">Recent Posts</a>
       </div>

       <div className="flex flex-col text-white">
         <a href="#">Privacy Policy</a>
         <a href="#">About Us</a >
         <a href="#">Terms & Conditions</a>
         <a href="#">Terms of Service</a>
       </div>
    </div>
    <p className="py-2 pb-6 text-center text-white bg-[#C80036] text-sm">All rights reserved | @BLOGiq {new Date().getFullYear()}</p>
    </>
    
  )
}

export default Footer