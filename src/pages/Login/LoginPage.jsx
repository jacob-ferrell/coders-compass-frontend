import LoginForm from './LoginForm';
import axiosInstance from '../../axios';

const LoginPage = props => {

    return (
        <div className="flex justify-center bg-gray-200 rounded-xl shadow border">
            <LoginForm />
        </div>
    );
}

export default LoginPage;