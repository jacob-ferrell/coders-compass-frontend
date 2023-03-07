import LogoutButton from "./LogoutButton";
import { Link } from "react-router-dom";

const Header = props => {

    return(
        <header className="fixed top-0 left-0 right-0 flex justify-between bg-gray-200 w-full">
            <Link to="/">
                <div>Shopathon</div>
            </Link>
            <div className="flex">
                <button className="bg-purple-500">Cart</button>
                <LogoutButton />
            </div>
        </header>
    );
}

export default Header;