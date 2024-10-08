import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { URL } from '../url';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(UserContext);
    const [cat, setCat] = useState("");
    const [cats, setCats] = useState([]);
    const [fileName, setFileName] = useState("");

    const navigate = useNavigate();

    const deleteCategory = (i) => {
        let updatedCats = [...cats];
        updatedCats.splice(i, 1);
        setCats(updatedCats);
    };

    const addCategory = () => {
        let updatedCats = [...cats];
        updatedCats.push(cat);
        setCat("");
        setCats(updatedCats);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file ? file.name : "");
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!title || !desc || !cats.length) {
            toast.error("Please fill in all required fields!");
            return;
        }

        const post = {
            title,
            desc,
            username: user.username,
            userId: user._id,
            categories: cats,
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("img", filename);
            data.append("file", file);
            post.photo = filename;

            try {
                await axios.post(URL + "/api/upload", data);
            } catch (err) {
                console.log(err);
                toast.error("Image upload failed!");
                return;
            }
        }

        try {
            const res = await axios.post(URL + "/api/posts/create", post, { withCredentials: true });
            toast.success("Post created successfully!");
            navigate("/posts/post/" + res.data._id);
        } catch (err) {
            // console.log(err);
            toast.error("Failed to create post!");
        }
    };

    return (
        <div>
            <Navbar />
            <div className='px-6 md:px-[200px] mt-8'>
                <h1 className='font-bold md:text-2xl text-xl p-4'>Create a post</h1>
                <Toaster /> {/* This will show toast notifications */}
                <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4 p-4 rounded'>
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder='Enter post title'
                        className='px-4 py-2 outline-none'
                    />

                    {/* Custom File Input */}
                    <div className="flex items-center space-x-4">
                        <label className="cursor-pointer bg-[#360055] text-white px-4 py-2 rounded font-semibold hover:bg-gray-500">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                           Upload
                        </label>
                        <span className="text-gray-600">{fileName || "You can upload more than 1 file"}</span>
                    </div>

                    <div className='flex flex-col'>
                        <div className='flex items-center space-x-4 md:space-x-8'>
                            <input
                                value={cat}
                                onChange={(e) => setCat(e.target.value)}
                                className='px-4 py-2 outline-none'
                                placeholder='Enter post category'
                                type="text"
                            />
                            <div
                                onClick={addCategory}
                                className='bg-[#360055] text-white px-4 py-2 font-semibold cursor-pointer rounded'
                            >
                                Add +
                            </div>
                        </div>

                        {/* categories */}
                        <div className='flex px-4 mt-3'>
                            {cats?.map((c, i) => (
                                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                                    <p>{c}</p>
                                    <p
                                        onClick={() => deleteCategory(i)}
                                        className='text-white bg-[#C80036] rounded-full cursor-pointer p-1 text-sm'
                                    >
                                        <ImCross />
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <textarea
                        onChange={(e) => setDesc(e.target.value)}
                        rows={15}
                        cols={30}
                        className='px-4 py-2 outline-none'
                        placeholder='Enter post description'
                    />
                    <button
                        onClick={handleCreate}
                        className='bg-[#009b27] w-full md:w-[20%] mx-auto text-[#013b01] font-semibold px-4 py-2 md:text-xl text-lg rounded'
                    >
                        Publish
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default CreatePost;
