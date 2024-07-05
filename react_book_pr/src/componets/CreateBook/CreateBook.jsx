import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../services/helper';
import { useDispatch, useSelector } from 'react-redux';
import { addBookAsync } from '../../services/action/action';
import './CreateBook.css';

const CreateBook = () => {
    const [inputState, setInputState] = useState({
        id: '',
        title: '',
        author: '',
        genre: '',
        year: ''
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const [myBooks, setMyBooks] = useState(getData('books'));
    const isLoading = useSelector(state => state.Reducer.isloading);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({
            ...inputState,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBookAsync(inputState));

        // Redirect to the home page
        setIsSubmit(true);
        setInputState({
            id: '',
            title: '',
            author: '',
            genre: '',
            year: ''
        });
    };

    useEffect(() => {
        if (isSubmit && !isLoading) {
            navigate('/');
        }
    }, [isSubmit, navigate, isLoading]);

    return (
        <Container className="mt-5 custom-container">
            <Row>
                <div className="form-card1 justify-content-center d-flex mt-5">
                    <div className="form-card2">
                        <form className="form" onSubmit={handleSubmit}>
                            <p className="form-heading">Create Book</p>

                            <div className="form-field">
                                <input
                                    placeholder="Title"
                                    className="input-field"
                                    value={inputState.title}
                                    onChange={handleInput}
                                    type="text"
                                    name="title"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Author"
                                    className="input-field"
                                    value={inputState.author}
                                    onChange={handleInput}
                                    type="text"
                                    name="author"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Genre"
                                    className="input-field"
                                    value={inputState.genre}
                                    onChange={handleInput}
                                    type="text"
                                    name="genre"
                                />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Year"
                                    className="input-field"
                                    type="number"
                                    name="year"
                                    value={inputState.year}
                                    onChange={handleInput}
                                />
                            </div>

                            <button type="submit" className="sendMessage-btn mt-2">
                                {isLoading ? (
                                    <div className="spinner-grow" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Submit'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default CreateBook;
