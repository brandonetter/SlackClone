import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, signUp } from '../../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
function LoginModal({ type, closeSelf }) {
    const dispatch = useDispatch();
    let title;
    switch (type) {
        case 'Login':
            title = 'Log in';
            break;
        case 'Register':
            title = 'Register';
            break;
        case 'Demo':
            title = 'Demo';
            break;
    }

    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
            return;
        }
        closeSelf();
        setRedirect(true);
    };
    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        console.log(username, email, password, firstName, lastName);
        if (password === confirmPassword) {
            const data = await dispatch(signUp(username, email, password, firstName, lastName));
            if (data) {
                setErrors(data);
            } else {
                closeSelf();
            }
        } else {
            setErrors([
                "Confirm Password field must be the same as the Password field",
            ]);
        }
    };
    const cleanErrors = (error) => {
        let error_type = error.split(':')[0].trim();
        let error_message = error.split(':')[1];
        switch (error_type) {
            case 'username':
                return <><span className='error-token'>Username</span> {error_message}</>;
            case 'email':
                return <><span className='error-token'>Email </span>{error_message}</>;
            case 'password':
                return <><span className='error-token'>Password </span>{error_message}</>;
            case 'confirmPassword':
                return <><span className='error-token'>Confirm Password </span>{error_message}</>;
            case 'firstName':
                return <><span className='error-token'>First Name </span>{error_message}</>;
            case 'lastName':
                return <><span className='error-token'>Last Name </span>{error_message}</>;
            default:
                return error;


        }
    };
    const demoLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'));
        if (data) {
            setErrors(data);
            return;
        }
        closeSelf();
        setRedirect(true);
    };
    const content = () => {
        switch (type) {
            case 'Login':
                return <div className='login-modal-content'>
                    <div className='login-modal-input-container'>
                        <span>Email</span>
                        <input type="text" placeholder="Email" className='login-modal-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='login-modal-input-container'>
                        <span>Password</span>
                        <input type="password" placeholder="Password" className='login-modal-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='login-modal-input-container'>
                        <button className='login-modal-button' onClick={handleSubmit}>Log in</button>
                    </div>
                    <div className='login-modal-errors'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{cleanErrors(error)}</div>
                        ))}
                    </div>

                </div>
            case 'Register':
                return <div className='login-modal-content'>
                    <div className='login-modal-input-container'>
                        <span>Email</span>
                        <input type="text" placeholder="Email" className='login-modal-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='login-modal-input-container'>
                        <span>Username</span>
                        <input type="text" placeholder="Username" className='login-modal-input' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='login-modal-input-container-wide'>
                        <div className='login-modal-input-container'>
                            <span>First Name</span>
                            <input type="text" placeholder="FirstName" className='login-modal-input' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='login-modal-input-container'>
                            <span>Last Name</span>
                            <input type="text" placeholder="LastName" className='login-modal-input' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                    </div>
                    <div className='login-modal-input-container-wide'>
                        <div className='login-modal-input-container'>
                            <span>Password</span>
                            <input type="password" placeholder="Password" className='login-modal-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='login-modal-input-container'>
                            <span>Confirm Password</span>
                            <input type="password" placeholder="Confirm Password" className='login-modal-input' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className='login-modal-input-container'>
                        <button className='login-modal-button' onClick={handleSubmitRegister}>Sign up</button>
                    </div>
                    <div className='login-modal-errors'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{cleanErrors(error)}</div>
                        ))}
                    </div>
                </div>
            default:
                return <div className='login-modal-content'>

                    <div className='login-modal-input-container'>
                        <span >Login with Demo Credentials</span>
                        <div className='login-modal-button' onClick={demoLogin}>Demo User</div>
                    </div>
                </div >
        }
    }
    return (
        <>

            <div className="login-modal-pop-down">
                <div className="login-modal-x-button" onClick={closeSelf}>
                    <FontAwesomeIcon icon={faXmarkSquare} />
                </div>
                <div className='login-modal-title'>
                    <h2>{title}</h2>
                </div>
                {content()}

            </div></>
    )
}
export default LoginModal;
