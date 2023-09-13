import { Link, useNavigate } from 'react-router-dom';
import {
    APP_ROUTE_DASHBOARD_PATH, EMAIL_PATTERN, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { addBroker, deleteBroker, getBrokers, getDepositoryParticipants, updateBroker } from '../../api/DematApi';

const Broker = () => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add Broker Details');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [brokers, setBrokers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [depositoryParticipants, setDepositoryParticipants] = useState([]);
    const [ddlDepositoryParticipant, setDdlDepositoryParticipant] = useState(0);

    const [formData, setFormData] = useState({
        id: 0,
        code: '',
        name: '',
        depositoryParticipantId: 0,
        companyName: '',
        contactNumber: '',
        email: '',
        address: '',
        createdBy: user ? user.userId : 1
    });
    const [errors, setErrors] = useState({
        code: '',
        name: '',
        companyName: '',
        contactNumber: '',
        email: '',
        address: '',
    });

    useEffect(() => {

        if (refreshTable) {
            getBrokers().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                    return;
                }

                setBrokers(res.data);
            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));

            getDepositoryParticipants().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                    return;
                }


                var records = res.data;
                if (records.length > 0) {
                    setDdlDepositoryParticipant(records[0].id);
                }

                setDepositoryParticipants(records);
            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
        }

        setRefreshTable(false)

    }, [refreshTable]);

    const ddlDepositoryParticipantChange = (e) => {
        setDdlDepositoryParticipant(e.target.value);
    }


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

            formData.depositoryParticipantId = ddlDepositoryParticipant;

            if (formData.id == 0) {

                addBroker(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Broker added successfully');
                    resetPage();
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateBroker(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Broker updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            code: '',
            name: '',
            companyName: '',
            contactNumber: '',
            email: '',
            address: '',
        };

        if (formData.code.trim() === '')
            newErrors.code = 'Code is required.';

        if (formData.name.trim() === '')
            newErrors.name = 'Name is required.';

        if (formData.companyName.trim() === '')
            newErrors.companyName = 'Company Name is required.';

        if (formData.contactNumber.trim() === '')
            newErrors.contactNumber = 'Contact Number is required.';

        if (!formData.email.match(EMAIL_PATTERN))
            newErrors.email = 'Invalid email address.';

        if (formData.address.trim() === '')
            newErrors.address = 'Address is required.';


        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update Broker Details')
        clearErrors();

        setFormData({
            id: obj.id,
            code: obj.code,
            name: obj.name,
            companyName: obj.companyName,
            contactNumber: obj.contactNumber,
            email: obj.email,
            address: obj.address,
            createdBy: user ? user.userId : 1
        });

        setDdlDepositoryParticipant(obj.depositoryParticipantId);
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        deleteBroker(obj.id).then((res) => {

            if (res.status != 200) {
                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                return;
            }

            alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Broker deleted successfully');

            setRefreshTable(true);

        }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {
        setFormData({
            id: 0,
            code: '',
            name: '',
            depositoryParticipantId: 0,
            companyName: '',
            contactNumber: '',
            email: '',
            address: '',
            createdBy: user ? user.userId : 1
        });

        setDdlDepositoryParticipant(0);

        clearErrors();
    }

    const resetPage = () => {
        setHeader('Add Broker Details');

        resetForm();

        setRefreshTable(true);
    }

    const clearErrors = () => {
        const newErrors = {
            code: '',
            name: '',
            companyName: '',
            contactNumber: '',
            email: '',
            address: '',
        };

        setErrors(newErrors);
    }


    const btnClearClick = () => {
        setHeader('Add Broker Details');
        resetForm();
    }

    return (
        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Brokers</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>Brokers</div>
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
                                                    <label>Depository Participant <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlDepositoryParticipant' value={ddlDepositoryParticipant} onChange={(e) => ddlDepositoryParticipantChange(e)} className='form-control selectric'>
                                                        {depositoryParticipants && depositoryParticipants.length > 0 && depositoryParticipants.map((obj, index) => (

                                                            <option key={obj.id} value={obj.id}>{`${obj.depositoryParticipantId} - ${obj.depositoryParticipantName}`}</option>
                                                        ))}

                                                        {depositoryParticipants.length == 0 &&
                                                            <option key={ddlDepositoryParticipant}>No Depository Participant Found</option>
                                                        }
                                                    </select>
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Broker Code <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='code' placeholder='Enter Broker Code' value={formData.code} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.code && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.code}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Broer Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='name' placeholder='Enter Broker Vame' value={formData.name} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.name && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.name}</div>}
                                                </div>


                                                <div className='col-md-3'>
                                                    <label>Company Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='companyName' placeholder='Enter Company Name' value={formData.companyName} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.companyName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.companyName}</div>}
                                                </div>



                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='row'>

                                                <div className='col-md-3'>
                                                    <label>Contact Number <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='contactNumber' placeholder='Enter Contact Number' value={formData.contactNumber} onChange={handleNumberChange}
                                                        className='form-control' />
                                                    {errors.contactNumber && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.contactNumber}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Broker Email <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='email' placeholder='Enter Broker Email' value={formData.email} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.email && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.email}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Broker Address <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <textarea name='address' placeholder='Enter Adderess' value={formData.address} onChange={handleInputChange}
                                                        className='form-control'>

                                                    </textarea>

                                                    {errors.address && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.address}</div>}
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
                                                    <th>Code</th>
                                                    <th>Name</th>
                                                    <th>Depository Participant Name</th>
                                                    <th>Company Name</th>
                                                    <th>Contact Number</th>
                                                    <th>Email</th>
                                                    <th>Address</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {brokers && brokers.length > 0 && brokers.map((obj, index) => (
                                                    <tr key={obj.id}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.code}>{obj.code}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.name} >{obj.name}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.depositoryParticipantName}>{obj.depositoryParticipantName}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.companyName} >{obj.companyName}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.contactNumber} >{obj.contactNumber}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.email} >{obj.email}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.address} >{obj.address}</td>
                                                        <td>
                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, obj)}><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, obj)}><i className='fas fa-times'></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {brokers.length == 0 &&
                                                    <tr scope='row'>
                                                        <td colSpan='8' style={{ textAlign: 'center' }}>Please wait... We retriving the records</td>
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
    );

}

export default Broker