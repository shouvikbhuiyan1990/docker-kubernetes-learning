import DisplayColors from '../displayColor';
import './index.css';

const RecentlyViewed = ({
    colors
}) => (
    <div className='recently-viewed'>
        <h3>Recently Viewed</h3>
        <DisplayColors colors={colors} />
    </div>
)

export default RecentlyViewed;