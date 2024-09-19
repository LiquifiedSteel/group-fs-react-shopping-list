import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';
import ItemForm from '../ItemForm/ItemForm.jsx';
import ItemList from '../ItemList/ItemList.jsx';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);


    function fetchItems(){
        axios({
            method: 'GET',
            url: '/api/items'
        }).then(response => {
            setItems(response.data);
        }).catch(err => console.error('Error getting items.',err));
    }

    useEffect(fetchItems,[]);
    return (
        <div className="App">
            <Header />
            <main>
                {items.length>0?<></>:<p>Under Construction...</p>}
            </main>
            <ItemForm fetchItems={fetchItems}/>
            <ItemList items={items} fetchItems={fetchItems} />
        </div>
    );
}

export default App;