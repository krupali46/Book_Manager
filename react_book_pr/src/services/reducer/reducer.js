import { ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, SINGLE_BOOK, ADDBOOKSUC } from '../action/ActionType';
import { getData, setData } from '../helper';
import generateUniqueId from 'generate-unique-id';

const initialState = {
    books: [],
    book: null,
    isloading: false
};

export const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BOOK:
            let newBook = {
                ...action.payload,
                id: generateUniqueId({length: 4 , useLetters:false})
            };
            let newBooks = [...state.books, newBook];
            setData('books', newBooks);

            return {
                ...state,
                books: newBooks,
                isloading: false
            };

        case SINGLE_BOOK:
            return {
                ...state,
                book: action.payload,
            };

        case UPDATE_BOOK:
            let updatedBooks = state.books.map((bk) => {
                if (bk.id === state.book.id) {
                    return { ...bk, ...action.payload };
                } else {
                    return bk;
                }
            });
            setData('books', updatedBooks);

            return {
                ...state,
                books: updatedBooks,
                book: null
            };

        case DELETE_BOOK:
            const remainingBooks = state.books.filter(bk => bk.id !== action.payload);
            setData('books', remainingBooks);
            return {
                ...state,
                books: remainingBooks
            };

        case "loading":
            return {
                ...state,
                isloading: true
            };

        case ADDBOOKSUC:
            return {
                ...state,
                books: action.payload,
                isloading: false,
                book: null
            };

        default:
            return state;
    }
};
