import './index.css';

const DisplayColors = ({
    colors
}) => (
    <ul className='display-color'>
        {
            colors.map((item) => (
                <div className='pill-cont'>
                    <li className='pills' style={{ backgroundColor: `#${item.color}` }}></li>
                    <p>#{item.color}</p>
                </div>
            ))
        }
    </ul>
)

export default DisplayColors;