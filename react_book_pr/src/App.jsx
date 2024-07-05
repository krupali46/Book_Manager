// import Create from './componets/Create/Create';
import { Route, Routes } from 'react-router-dom';
import Home from './componets/Home/Home.jsx';
import CreateBook from './componets/CreateBook/CreateBook.jsx';
import EditBook from './componets/Edit/EditBook.jsx';
import Header from './componets/Header/Header.jsx';



function App() {

  return (
    <>

    <Header/>

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateBook />} />
        <Route path='/edit/:id' element={<EditBook />} />

      </Routes>
    </>
  )
}

export default App;
