import { Link } from "react-router-dom";


const Header = () => {


    return (
        <header className="site-header">
            <div className="container">
                <h1><Link to={''}>Restaurante</Link></h1>
                
            </div>
        </header>
    )
}

export default Header;