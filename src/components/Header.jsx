import LogoutButton from "./LogoutButton";

const Header = props => {

    return(
        <div className="fixed top-0 left-0 right-0 flex justify-between bg-gray-200 w-full">
            <div>Header</div>
            <LogoutButton />
        </div>
    );
}

export default Header;