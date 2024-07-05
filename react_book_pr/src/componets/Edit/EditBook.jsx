import React, { useEffect, useState } from 'react';
import { Container, Form, Row, Button, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editBookAsync,  updateItem } from '../../services/action/action';


function EditBook() {
    const { id } = useParams();
    console.log("Id", id);
    const { book } = useSelector(state => state.Reducer);
    const [inputState, setInputState] = useState({
        id: 'id',
        title: '',
        author: '',
        genre: '',
        year: ''
    });

    const [isSubmit, setIsSubmit] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInputState({ ...inputState, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello", inputState);
        dispatch(editBookAsync(inputState));
        // setIsSubmit(true);
        // navigate('/');
    }

    useEffect(() => {
        if (book) {
            setInputState(book);
        } else {
            navigate('/')
        }
    }, [book]);

    return (
        <>
            <Container className=' justify-content-center d-flex mt-5'>
                <div className="form-card1 mt-5">
                    <div className="form-card2">
                        <form className="form" onSubmit={handleSubmit}>
                            <p className="form-heading">Edit Book</p>
                            <input type="hidden" value={inputState.id} name='id' />
                            <div className="form-field">
                                <input placeholder="Title" className="input-field" value={inputState.title}
                                    onChange={handleInput} type="text" name="title" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Author" className="input-field" value={inputState.author}
                                    onChange={handleInput} type="text" name="author" />
                            </div>

                            <div className="form-field">
                                <input placeholder="Genre" className="input-field" value={inputState.genre}
                                    onChange={handleInput} type="text" name="genre" />
                            </div>

                            <div className="form-field">
                                <input
                                    placeholder="Year" className="input-field" type="number" name="year"
                                    value={inputState.year} onChange={handleInput} />
                            </div>

                            <button className="sendMessage-btn mt-2" type='submit'>Edit</button>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default EditBook;
