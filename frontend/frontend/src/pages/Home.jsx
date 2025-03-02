import React from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
const Home = () => {
    const [books, setBooks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [showType, setShowType] = React.useState('table');
    React.useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);
    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3x1 my-8'>Books List</h1>
                <Link to='/books/create'>
                    <MdOutlineAddBox className='text-sky-900 text-4x1 size-10'/>

                </Link>
            </div>
            {loading ? (
                <Spinner />
            ): (
                <BooksTable books={books} />
            )}
        </div>
    );
};

export default Home;