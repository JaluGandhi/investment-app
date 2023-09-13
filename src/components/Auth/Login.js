
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
    APP_ENVIRONMENT, APP_PUBLIC_URL,
    CURRENT_YEAR, EMAIL_PATTERN,
    REDUX_AUTH_LOGIN, SESSION_TOKENS, SESSION_USER, SWAL_TITLE_ERROR,
    SWAL_TYPE_ERROR
} from '../../common/AppConstant';
import { login } from "../../api/AuthApi";
import { useDispatch } from "react-redux";
import { alert } from "../../common/AppCommon";


const Login = () => {

    //JS Code will be here
    const defaultEmail = APP_ENVIRONMENT == 'development' ? 'jaygandhi942@gmail.com' : '';
    const defaultPassword = APP_ENVIRONMENT == 'development' ? 'MyInvetment@123' : '';

    const [email, setEmail] = useState(defaultEmail);
    const [password, setPassword] = useState(defaultPassword);
    const [isPending, setIsPending] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });



    const loginSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsPending(true);

            var obj = new Object();
            obj.userName = email;
            obj.password = password;


            login(obj).then((res) => {
                setIsPending(false);
                if (res.status != 200) {
                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                    return;
                }

                if (res.status == 200 && res.data.isResetPassword) {

                    navigate.push('/reset-password', { email: email })
                    // navigate.push({
                    //     pathname: '/reset-password',
                    //     state: {email: email},
                    //   });
                    return;
                }

                localStorage.removeItem(SESSION_USER);
                localStorage.removeItem(SESSION_TOKENS);
                localStorage.setItem(SESSION_USER, JSON.stringify(res.data));
                localStorage.setItem(SESSION_TOKENS, JSON.stringify(res.data.tokens));

                dispatch({ type: REDUX_AUTH_LOGIN, payload: res.data });

                // navigate.push('/dashboard')
                window.location.href = '/dashboard';

            }).catch((err) => { setIsPending(false); alert(SWAL_TITLE_ERROR, SWAL_TITLE_ERROR, err) })
        }
    }

    const isValid = () => {

        const newErrors = {
            email: '',
            password: '',
        };

        if (!email.match(EMAIL_PATTERN))
            newErrors.email = 'Invalid email address.';

        if (password.trim().length < 8)
            newErrors.password = 'Password must be at least 8 character long';

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }


    return (

        <div id='app'>
            <section className='section'>
                <div className='container mt-5'>
                    <div className='row'>
                        <div className='col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
                            <div className='login-brand'>
                                <img src={APP_PUBLIC_URL + 'img/stisla-fill.svg'} alt='logo' width='100' className='shadow-light rounded-circle'></img>
                            </div>

                            <div className='card card-primary'>
                                <div className='card-header'><h4>Login</h4></div>

                                <div className='card-body'>
                                    <form onSubmit={loginSubmit} className='needs-validation' autoComplete="off">
                                        <div className='form-group'>
                                            <label>Email <span style={{ color: '#dc3545' }}>*</span></label>
                                            <input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' name='email' />
                                            {errors.email && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.email}</div>}
                                        </div>

                                        <div className='form-group'>
                                            <div className='d-block'>
                                                <label className='control-label'>Password <span style={{ color: '#dc3545' }}>*</span></label>
                                                {/* <div className='float-right'>
                                                    <Link to='forgot-password' className='text-small'>
                                                        Forgot Password?
                                                    </Link>
                                                </div> */}
                                            </div>
                                            <input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' name='password' />
                                            {errors.password && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.password}</div>}
                                        </div>

                                        <div className='form-group'>
                                            {errors.server && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.server}</div>}
                                        </div>

                                        <div className='form-group'>
                                            {isPending && <button className='btn disabled btn-primary btn-lg btn-block' disabled>Login...</button>}
                                            {!isPending && <button className='btn btn-primary btn-lg btn-block'>Login</button>}
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='simple-footer'>
                                Copyright &copy; {CURRENT_YEAR}. Developed and maintain by <b>My Investment</b>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Login;