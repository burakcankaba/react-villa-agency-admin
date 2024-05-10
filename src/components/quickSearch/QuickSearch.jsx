import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import "./quicksearch.scss"
const QuickSearch = () => {
    const [searchItem, setSearchItem] = useState("");
    return (
        <div className='quickSearch'>
            <input type="text" placeholder="Search for anything..." className="navSearchBar" onChange={(e) => setSearchItem(e.target.value)} />
            <button>
                <BiSearch/>
            </button>
        </div>
    )
}

export default QuickSearch