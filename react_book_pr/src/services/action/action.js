import axios from 'axios';
import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, SINGLE_BOOK } from './ActionType';
import generateUniqueId from 'generate-unique-id';

export const addBook = (book) => {
    return {
        type: ADD_BOOK,
        payload: book
    };
};

export const deleteItem = (id) => {
    return {
        type: DELETE_BOOK,
        payload: id
    };
};

export const updateItem = (newRec) => {
    return {
        type: UPDATE_BOOK,
        payload: newRec
    };
};

export const singleBook = (data) => {
    return {
        type: SINGLE_BOOK,
        payload: data
    };
};

export const loading = () => {
    return {
        type: "loading",
        isloading: true
    };
};

const addBooksSuccess = (data) => {
    return {
        type: 'ADDBOOKSUC',
        payload: data
    };
};

export const addBookAsync = (book) => {
    console.log(book, "jen");
    return (dispatch) => {
        dispatch(loading());
        setTimeout(() => {
            book.id = generateUniqueId({length: 4 , useLetters:false});
            console.log("bindu");

            axios.post('http://localhost:3001/books',book).then((res) => {
                dispatch(getBooksAsync(res.data));
                console.log(res, "ok");
            })
            .catch((err) => {
                console.log("err", err);
            });
        }, 1000);
    };
};

export const getBooksAsync = () => {
    return (dispatch) => {
        dispatch(loading());
        setTimeout(() => {
            axios.get('http://localhost:3001/books').then((res) => {
                dispatch(addBooksSuccess(res.data));
                console.log(res, "suc");
            })
            .catch((err) => {
                console.log(err);
            });
        }, 1000);
    };
};

export const deleteBookAsync = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/books/${id}`).then((res) => {
            dispatch(getBooksAsync());
            console.log(res, "suc");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const singleBookAsync = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/books/${id}`).then((res) => {
            dispatch(singleBook(res.data));
            console.log(res.data, "bulbosour");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

export const editBookAsync = (book) => {
    return (dispatch) => {
        axios.put(`http://localhost:3001/books/${book.id}`, book)
        .then((res) => {
            dispatch(getBooksAsync(res.data));
            console.log(res.data, "oggey");
        })
        .catch((err) => {
            console.log(err);
        });
    };
};

// export const myThunkFunc = (book) => {
//     return (dispatch) => {
//         dispatch(loading());
//         setTimeout(() => {
//             dispatch(addBook(book));
//         }, 5000);
//     };
// };
