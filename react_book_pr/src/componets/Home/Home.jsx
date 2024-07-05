import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../services/helper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookAsync, getBooksAsync, singleBookAsync } from '../../services/action/action';
import './Home.css';


const Home = () => {
    const { book, books } = useSelector(state => state.Reducer);
    const [search, setSearch] = useState('');
    const [viewBooks, setViewBooks] = useState([]);
    const [recid, setRecId] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(books, "pokemon");

    const handleEdit = (id) => {
        console.log("dinosour", id);
        setRecId(id);
        dispatch(singleBookAsync(id));
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
        let data = getData('books');
        const searchResult = data.filter((book) => {
            return book.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setViewBooks(searchResult);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = getData('books');
        const searchResult = data.filter((book) => {
            return book.title.toLowerCase().includes(search.toLowerCase());
        });
        setViewBooks(searchResult);
    }

    const handleDelete = (id) => {
        dispatch(deleteBookAsync(id));
    };

    const handleSort = (key, order = 'asc') => {
        let sortedData;
        if (order === 'asc') {
            sortedData = [...viewBooks].sort((a, b) => a[key].localeCompare(b[key]));
        } else {
            sortedData = [...viewBooks].sort((a, b) => b[key].localeCompare(a[key]));
        }
        setViewBooks(sortedData);
    };

    useEffect(() => {
        if (book) {
            navigate(`/edit/${recid}`);
        }
    }, [book, navigate, recid]);

    useEffect(() => {
        dispatch(getBooksAsync());
        console.log("jenu");
    }, [dispatch]);

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    {/* Table */}

                    <h3 className='text-center pb-5 fw-bold text-white-50'>Library Management</h3>
                    <table className='text-center'>
                        <thead >
                            <tr>
                                <th>Id</th>
                                <th onClick={() => handleSort('title', 'asc')}>Title</th>
                                <th onClick={() => handleSort('author', 'asc')}>author</th>
                                <th onClick={() => handleSort('genre', 'asc')}>Genre</th>
                                <th onClick={() => handleSort('year', 'asc')}>year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.year}</td>
                                    <td>
                                        <Button className='me-2 btn' onClick={() => handleEdit(book.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                            </svg>

                                        </Button>
                                        <Button className='btnsecond' onClick={() => handleDelete(book.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                            </svg>

                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                </Col>
            </Row>
        </Container>
    );
};

export default Home;
