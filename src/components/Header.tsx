import { Link } from 'react-router-dom';
import classes from './Header.module.css';

const Header = () => (
    <div className={classes.header}>
        <h1>Changedit</h1>
        <div className={classes.headerActions}>
            <Link to="/sign-up">
                <button>Sign up</button>
            </Link>
            <Link to="/sign-in">
                <button>Sign in</button>
            </Link>
        </div>
    </div>
)

export default Header;