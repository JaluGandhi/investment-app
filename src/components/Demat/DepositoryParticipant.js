import { Link, useNavigate } from 'react-router-dom';
import {
    APP_ROUTE_DASHBOARD_PATH, EMAIL_PATTERN, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { addDepositoryParticipant, deleteDepositoryParticipant, getDepositoryParticipants, updateDepositoryParticipant } from '../../api/DematApi';


const DepositoryParticipant = () => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add Depository Participant');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [depositoryParticipants, setDepositoryParticipants] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        id: 0,
        depositoryParticipantName: '',
        depositoryName: '',
        depositoryParticipantId: '',
        loginPin: '',
        loginPassword: '',
        createdBy: user ? user.userId : 1
    });
    const [errors, setErrors] = useState({
        depositoryParticipantName: '',
        depositoryName: '',
        depositoryParticipantId: '',
        loginPin: '',
        loginPassword: '',
    });

    useEffect(() => {

        if (refreshTable) {
            getDepositoryParticipants().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                    return;
                }

                setDepositoryParticipants(res.data);
            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
        }

        setRefreshTable(false)

    }, [refreshTable]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const handleNumberChange = (e) => {

        const { name, value } = e.target;

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setFormData({ ...formData, [name]: value, });
        }

    };

    const formSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsPending(true);

            if (formData.id == 0) {

                addDepositoryParticipant(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Depository Participant added successfully');
                    resetPage();
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateDepositoryParticipant(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Depository Participant updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            depositoryParticipantName: '',
            depositoryName: '',
            depositoryParticipantId: '',
            loginPin: '',
            loginPassword: '',
        };

        if (formData.depositoryParticipantName.trim() === '')
            newErrors.depositoryParticipantName = 'Depository ParticipantName is required.';

        if (formData.depositoryName.trim() === '')
            newErrors.depositoryName = 'Depository Name is required.';

        if (formData.depositoryParticipantId.trim() === '')
            newErrors.depositoryParticipantId = 'Depository Participant Id is required.';

        if (formData.loginPin.trim() === '')
            newErrors.loginPin = 'Login Pin is required.';

        if (formData.loginPassword.length < 7)
            newErrors.loginPassword = 'Login Password must be 8 characters long.';


        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update Depository Participant')
        clearErrors();

        setFormData({
            id: obj.id,
            depositoryParticipantName: obj.depositoryParticipantName,
            depositoryName: obj.depositoryName,
            depositoryParticipantId: obj.depositoryParticipantId,
            loginPin: obj.loginPin,
            loginPassword: obj.loginPassword,
            createdBy: user ? user.userId : 1
        });
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        deleteDepositoryParticipant(obj.id).then((res) => {

            if (res.status != 200) {
                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                return;
            }

            alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Depository Participant deleted successfully');

            setRefreshTable(true);

        }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {
        setFormData({
            id: 0,
            depositoryParticipantName: '',
            depositoryName: '',
            depositoryParticipantId: '',
            loginPin: '',
            loginPassword: '',
            createdBy: user ? user.userId : 1
        });

        clearErrors();
    }

    const resetPage = () => {
        setHeader('Add Depository Participant');

        resetForm();

        setRefreshTable(true);
    }

    const clearErrors = () => {
        const newErrors = {
            depositoryParticipantName: '',
            depositoryName: '',
            depositoryParticipantId: '',
            loginPin: '',
            loginPassword: '',
        };

        setErrors(newErrors);
    }


    const btnClearClick = () => {
        setHeader('Add Depository Participant');
        resetForm();
    }

    return (
        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Brokers</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>Depository Participants</div>
                    </div>
                </div>

                <div className='section-body'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Broker</h4>
                                </div>
                                <div className='card-body'>

                                    <div className='section-title mt-0'>{header}</div>
                                    <form onSubmit={formSubmit} className='needs-validation' autoComplete='off'>
                                        <div className='form-group'>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    <label>Depository Participant Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='depositoryParticipantName' placeholder='Enter Depository Participant Name' value={formData.depositoryParticipantName} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.depositoryParticipantName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.depositoryParticipantName}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Depository Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='depositoryName' placeholder='Enter Depository Vame' value={formData.depositoryName} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.depositoryName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.depositoryName}</div>}
                                                </div>


                                                <div className='col-md-3'>
                                                    <label>Depository Participant Id <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='depositoryParticipantId' placeholder='Enter Depository Participant Id' value={formData.depositoryParticipantId} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.depositoryParticipantId && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.depositoryParticipantId}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Login Pin <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='loginPin' placeholder='Enter Login Pin' value={formData.loginPin} onChange={handleNumberChange}
                                                        className='form-control' />
                                                    {errors.loginPin && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.loginPin}</div>}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='row'>

                                                <div className='col-md-3'>
                                                    <label>Login Password <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='loginPassword' placeholder='Enter Login Password' value={formData.loginPassword} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.loginPassword && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.loginPassword}</div>}
                                                </div>

                                            </div>
                                        </div>

                                        <div className='text-right'>
                                            <div className='buttons'>
                                                <button type='button' onClick={() => btnClearClick()} className='btn btn-light'>Clear</button>
                                                {isPending && <button className='btn disabled btn-primary' disabled>Saving...</button>}
                                                {!isPending && <button className='btn btn-primary'>Save</button>}
                                            </div>
                                        </div>

                                    </form>

                                    <div className='section-title mt-0'>Accounts</div>
                                    <div className='table-responsive'>
                                        <table className='table table-striped table-md'>
                                            <thead>
                                                <tr>
                                                    <th>Sr. No</th>
                                                    <th>Depository Participant Name</th>
                                                    <th>Depository Name</th>
                                                    <th>Depository Participant Id</th>
                                                    <th>Login Pin</th>
                                                    <th>Login Password</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {depositoryParticipants && depositoryParticipants.length > 0 && depositoryParticipants.map((obj, index) => (
                                                    <tr key={obj.id}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.depositoryParticipantName}>{obj.depositoryParticipantName}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.depositoryName} >{obj.depositoryName}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.depositoryParticipantId} >{obj.depositoryParticipantId}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.loginPin} >{obj.loginPin}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.loginPassword} >{obj.loginPassword}</td>
                                                        <td>
                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, obj)}><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, obj)}><i className='fas fa-times'></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {depositoryParticipants.length == 0 &&
                                                    <tr scope='row'>
                                                        <td colSpan='7' style={{ textAlign: 'center' }}>Please wait... We retriving the records</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )

}

export default DepositoryParticipant;