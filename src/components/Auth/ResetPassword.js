import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { resetPassword } from '../../api/AuthApi';
import { APP_PUBLIC_URL, CURRENT_YEAR, EMAIL_PATTERN } from '../../common/AppConstant';

const ResetPassword = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();


    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });


    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsPending(true);

            var obj = new Object();
            obj.email = email;
            obj.password = password;
            obj.confirmPassword = confirmPassword;

            resetPassword(obj).then((res) => {

                setIsPending(false);

                if (res.status != 200) {
                    alert(res.message);
                    return;
                }

                navigate.push('/login')

            }).catch((err) => { setIsPending(false); alert(err) })
        }
    }

    const isValid = () => {

        const newErrors = {
            email: '',
            password: '',
            confirmPassword: '',
        };

        if (!email.match(EMAIL_PATTERN))
            newErrors.email = 'Invalid email address.';

        if (password.trim().length < 8)
            newErrors.password = 'Password must be at least 8 character long';

        if (confirmPassword.trim() != password.trim())
            newErrors.confirmPassword = 'Confirm password must be same as password';

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
                                <img src={APP_PUBLIC_URL + 'img/stisla-fill.svg'} alt='logo' width='100' className='shadow-light rounded-circle' />
                            </div>

                            <div className='card card-primary'>
                                <div className='card-header'><h4>Reset Password</h4></div>

                                <div className='card-body'>
                                    {/* <p className='text-muted'>We will send a link to reset your password</p> */}
                                    <form onSubmit={resetPasswordSubmit} className='needs-validation' autoComplete='off'>
                                        <div className='form-group'>
                                            <label >Email <span style={{ color: '#dc3545' }}>*</span></label>
                                            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' name='email' autoFocus />
                                            {errors.email && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.email}</div>}
                                        </div>

                                        <div className='form-group'>
                                            <label >New Password <span style={{ color: '#dc3545' }}>*</span></label>
                                            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' name='password' />
                                            {errors.password && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.password}</div>}
                                        </div>

                                        <div className='form-group'>
                                            <label>Confirm Password <span style={{ color: '#dc3545' }}>*</span></label>
                                            <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-control' name='confirmPassword' />
                                            {errors.confirmPassword && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.confirmPassword}</div>}
                                        </div>

                                        <div className='form-group'>
                                            {isPending && <button className='btn disabled btn-primary btn-lg btn-block' disabled>Reseting Password...</button>}
                                            {!isPending && <button className='btn btn-primary btn-lg btn-block'>Reset Password</button>}
                                        </div>
                                        <div className='float-right'>
                                            <span className='text-small'>Alredy done? <Link to='/login'>Login here</Link></span>
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
    )
}

export default ResetPassword;