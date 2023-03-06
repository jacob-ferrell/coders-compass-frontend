import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const Logout = props => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) return navigate('/login');
        axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
        navigate('/login');
    })

    return (
        <div>Logout</div>
    );
}

export default Logout;