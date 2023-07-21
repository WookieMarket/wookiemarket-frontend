import './App.css';
import './css/Variables.css';
import './css/Reset.css';
import Layout from './components/layout/Layout';
import AdvertsListPage from './components/adverts/AdvertsListPage';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <Layout>
            <div className='App'>Hola Mandalorians!</div>
            <Routes>
                <Route path='/adverts' element={<AdvertsListPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
