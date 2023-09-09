import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from 'react';
import { addUser, deleteUser, getUsers, updateUser } from '../../api/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import {
    APP_ROUTE_DASHBOARD_PATH, EMAIL_PATTERN,
    SWAL_TITLE_ERROR, SWAL_TITLE_SUCCESS,
    SWAL_TYPE_ERROR, SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { forgotPassword } from '../../api/AuthApi';
import { useHistory } from 'react-router-dom'
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';

const User = () => {

    const { user } = useSelector((state) => state.auth);
    const [header, setHeader] = useState('Add User');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    //Retrive users
    const [users, setUsers] = useState([]);

    useEffect(() => {

        if (refreshTable) {
            getUsers().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                    alert(res.message)
                    return;
                }

                setUsers(res.data);
            }).catch((err) => alert(SWAL_TITLE_ERROR, SWAL_TITLE_ERROR, err.message));
        }

        setRefreshTable(false)

    }, [refreshTable]);


    const [formData, setFormData] = useState({
        id: 0,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        aadharNumber: '',
        panNumber: '',
        createdBy: user ? user.userId : 1
    });
    const [errors, setErrors] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        aadharNumber: '',
        panNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const userSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsPending(true);

            if (formData.id == 0) {
                addUser(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'User added successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })
            }
            else {

                updateUser(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'User updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })
            }


        }

    }

    const isValid = () => {

        const newErrors = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            aadharNumber: '',
            panNumber: '',
        };

        if (formData.firstName.trim() === '')
            newErrors.firstName = 'First Name is required.';

        if (formData.middleName.trim() === '')
            newErrors.middleName = 'Middle Name is required.';

        if (formData.lastName.trim() === '')
            newErrors.lastName = 'Last Name is required.';

        if (!formData.email.match(EMAIL_PATTERN))
            newErrors.email = 'Invalid email address.';

        if (formData.phone.length != 10)
            newErrors.phone = 'Phone number must be 10 characters.';

        if (formData.dateOfBirth.trim() === '')
            newErrors.dateOfBirth = 'Date of birth is required.';

        if (formData.aadharNumber.length != 12)
            newErrors.aadharNumber = 'Aadhar number must be 12 characters.';

        if (formData.panNumber.trim() === '')
            newErrors.panNumber = 'PAN number is required.';


        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update User')

        const newErrors = {
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            aadharNumber: '',
            panNumber: '',
        };
        setErrors(newErrors);

        setFormData({
            id: obj.userId,
            firstName: obj.firstName,
            middleName: obj.middleName,
            lastName: obj.lastName,
            email: obj.email,
            phone: obj.phone,
            dateOfBirth: obj.dateOfBirth,
            aadharNumber: obj.aadharNumber,
            panNumber: obj.panNumber,
            createdBy: user ? user.userId : 1
        });
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();


        deleteUser(obj.userId).then((res) => {

            if (res.status != 200) {
                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                alert(res.message)
                return;
            }

            alert(SWAL_TITLE_SUCCESS, SWAL_TITLE_SUCCESS, 'User deleted successfully');

            setRefreshTable(true);

        }).catch((err) => alert(SWAL_TITLE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetPasswordClick = (e, user) => {
        e.preventDefault();

        var obj = new Object();
        obj.email = user.email;

        forgotPassword(obj).then((res) => {

            if (res.status != 200) {
                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                alert(res.message)
                return;
            }

            alert(SWAL_TITLE_SUCCESS, SWAL_TITLE_SUCCESS, 'Password has been reset. Default Password is sent to your regesitered email address.');

        }).catch((err) => alert(SWAL_TITLE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {
        setFormData({
            id: 0,
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            aadharNumber: '',
            panNumber: '',
            createdBy: user ? user.userId : 1
        });
    }

    const resetPage = () => {
        setHeader('Add User');
        resetForm();

        setRefreshTable(true);
    }

    const btnClearClick = () => {
        setHeader('Add User');
        resetForm();
    }

    return (


        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>My Investment Users</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>Users</div>
                    </div>
                </div>

                <div className='section-body'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-12'>
                            <div className='card'>
                                <form onSubmit={userSubmit} className='needs-validation' autoComplete='off'>
                                    <div className='card-header'>
                                        <h4>{header}</h4>
                                    </div>
                                    <div className='card-body'>
                                        <div className='form-group'>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    <label>First Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='firstName' placeholder='Enter First name' value={formData.firstName} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.firstName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.firstName}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>Middle Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='middleName' placeholder='Enter Middle name' value={formData.middleName} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.middleName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.middleName}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>Last Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='lastName' placeholder='Enter Last name' value={formData.lastName} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.lastName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.lastName}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>Email <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='email' name='email' placeholder='Enter Email address' value={formData.email} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.email && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.email}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    <label>Contact No. <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='phone' placeholder='Enter Mobile number' value={formData.phone} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.phone && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.phone}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>Date of Birth <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='dateOfBirth' placeholder='yyyy-MM-dd' value={formData.dateOfBirth} onChange={handleChange}
                                                        className='form-control datepicker' />
                                                    {errors.dateOfBirth && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.dateOfBirth}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>Aadhar Number <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='number' name='aadharNumber' placeholder='Enter Aadhar number' value={formData.aadharNumber} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.aadharNumber && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.aadharNumber}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>PAN Number <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='panNumber' placeholder='Enter PAN number' value={formData.panNumber} onChange={handleChange}
                                                        className='form-control' />
                                                    {errors.panNumber && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.panNumber}</div>}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className='card-footer text-right'>
                                        <div className='buttons'>
                                            <button type='button' onClick={() => btnClearClick()} className='btn btn-light'>Clear</button>
                                            {isPending && <button className='btn disabled btn-primary' disabled>Saving...</button>}
                                            {!isPending && <button className='btn btn-primary'>Save</button>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>


                <div className='section-body'>

                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Users</h4>
                                </div>
                                <div className='card-body'>
                                    <div className='table-responsive'>
                                        <table className='table table-striped table-md'>
                                            <thead>
                                                <tr>
                                                    <th>Sr. No</th>
                                                    <th>Full Name</th>
                                                    <th>DOB</th>
                                                    <th>Aadhar</th>
                                                    <th>PAN</th>
                                                    <th>Email</th>
                                                    <th>Phone</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users && users.length > 0 && users.map((user, index) => (
                                                    <tr key={user.userId}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={`${user.firstName} ${user.middleName} ${user.lastName}`} >{`${user.firstName} ${user.middleName} ${user.lastName}`}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={user.dateOfBirth} >{user.dateOfBirth}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={user.aadharNumber} >{user.aadharNumber}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={user.panNumber} >{user.panNumber}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={user.email} >{user.email}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={user.phone} >{user.phone}</td>
                                                        <td>

                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, user)}><i class="far fa-edit"></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, user)}><i class="fas fa-times"></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-secondary' href='#' data-toggle='tooltip' data-placement='bottom' title='Reset Password' onClick={(e) => resetPasswordClick(e, user)}><i class="fa fa-key"></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {users.length == 0 &&
                                                    <tr scope='row'>
                                                        <td colSpan='9' style={{ textAlign: 'center' }}>Please wait... We retriving the users</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='card-footer text-right'>
                                    <nav className='d-inline-block'>
                                        {/* <ul className='pagination mb-0'>
                                            <li className='page-item disabled'>
                                                <a className='page-link' href='#'><i className='fas fa-chevron-left'></i></a>
                                            </li>
                                            <li className='page-item active'><a className='page-link' href='#'>1 <span className='sr-only'>(current)</span></a></li>
                                            <li className='page-item'>
                                                <a className='page-link' href='#'>2</a>
                                            </li>
                                            <li className='page-item'><a className='page-link' href='#'>3</a></li>
                                            <li className='page-item'>
                                                <a className='page-link' href='#'><i className='fas fa-chevron-right'></i></a>
                                            </li>
                                        </ul> */}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    );


}

export default User;