import { useState, useEffect} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
export default function EditBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(''); 
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {id} = useParams();
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/books/${id}`).then((res) => {
            setTitle(res.data.title);
            setAuthor(res.data.author);
            setPublishYear(res.data.publishYear);
            setLoading(false);
        }).catch((err) => {
            alert('An error has occurred, please try again later.');
            console.log(err);
            setLoading(false);
        });
    }, []);
    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        }
        setLoading(true);
        axios.put(`http://localhost:5000/books/${id}`, data).then((res) => {
            setLoading(false);
            navigate('/');
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            alert('An error has occurred, please try again later.');
        });
    }
    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3x1 my-4'>Edit Book</h1>
            {loading ? <Spinner /> : (
                <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-x1 mr-4 text-gray-500'>Title</label>
                            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
                    </div>
                    <div className='my-4'>
                        <label className='text-x1 mr-4 text-gray-500'>Author</label>
                            <input type='text' value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
                    </div>
                    <div className='my-4'>
                        <label className='text-x1 mr-4 text-gray-500'>Publish Year</label>
                            <input type='text' value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full'/>
                    </div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
                </div>
            )};
        </div>
    );
};

EditBook.propTypes = {
    // Define your prop types here
};