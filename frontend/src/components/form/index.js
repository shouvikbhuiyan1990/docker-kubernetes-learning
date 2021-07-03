import { useState } from 'react';
import './index.css';

const ColorForm = ({
    recentSearch,
    search
}) => {
    const [value, setValue] = useState('');
    const colorSearch = (e) => {
        e.preventDefault();
        search(value);
    }
    return (
        <form className='input-container'>
            <input onChange={(e) => setValue(e.target.value)} type='text' pattern="/^[0-9A-F]{6}$/" maxLength="7" placeholder="color code e.g. #000000" title="Format should be a valid color hex code" />
            <div className='btn-container'>
                <button type="submit" className='btn' onClick={colorSearch}>Search</button>
                <button type="button" className='btn' onClick={recentSearch}>View Recent Search</button>
            </div>
        </form>
    )
}

export default ColorForm;