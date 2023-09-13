import { Link, useNavigate } from 'react-router-dom';
import {
    APP_PUBLIC_URL,
    APP_ROUTE_DASHBOARD_PATH, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { getUsers } from '../../api/UserApi';
import { getBankAccounts } from '../../api/BankAccountApi';
import { addDematAccount, deleteDematAccount, getBrokers, getBrokersByDepositoryParticipantId, getDematAccounts, getDepositoryParticipants, updateDematAccount } from '../../api/DematApi';

const DematAccount = () => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add Demat Account');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [dematAccounts, setDematAccounts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [ddlUser, setDdlUser] = useState(0);

    const [bankAccounts, setBankAccounts] = useState([]);
    const [ddlBankAccount, setDdlBankAccount] = useState(0);

    const [depositoryParticipants, setDepositoryParticipants] = useState([]);
    const [ddlDepositoryParticipant, setDdlDepositoryParticipant] = useState(0);

    const [brokers, setBrokers] = useState([]);
    const [ddlBroker, setDdlBroker] = useState(0);
    const [refreshBrokerDdl, setRefreshBrokerDdl] = useState(false);

    const [ddlIsAadharCardLinked, setDdlIsAadharCardLinked] = useState(false);
    const [ddlIsPanCardLinked, setDdlIsPanCardLinked] = useState(false);

    const [formData, setFormData] = useState({
        id: 0,
        userId: 0,
        bankAccountId: 0,
        depositoryParticipantId: 0,
        brokerId: 0,
        firstHolder: '',
        secondHolder: '',
        nominee: '',
        customerId: '',
        boId: '',
        dematId: '',
        isAadharCardLinked: false,
        isPanCardLinked: false,
        createdBy: user ? user.userId : 1
    });

    const [errors, setErrors] = useState({
        firstHolder: '',
        secondHolder: '',
        nominee: '',
        customerId: '',
        boId: '',
    });

    useEffect(() => {

        if (refreshTable) {


            getUsers().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                    return;
                }


                var users = res.data;
                setUsers(users);

                if (users.length > 0) {

                    var userIdToFetchDependandAccounts = ddlUser == 0 ? users[0].userId : ddlUser;
                    setDdlUser(userIdToFetchDependandAccounts);

                    getDematAccounts(userIdToFetchDependandAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        setDematAccounts(res.data);
                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));

                    getBankAccounts(userIdToFetchDependandAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        var records = res.data;
                        if (records.length > 0) {
                            setDdlBankAccount(records[0].id);
                        }

                        setBankAccounts(records);
                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));

                }

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

                getBrokers(records[0].id);



            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
        }

        setRefreshTable(false)

    }, [refreshTable]);


    useEffect(() => {

        if (refreshBrokerDdl) {

            getBrokers(ddlDepositoryParticipant);

        }
        setRefreshBrokerDdl(false);

    }, [refreshBrokerDdl])


    const getBrokers = (depositoryParticipantId) => {
        getBrokersByDepositoryParticipantId(depositoryParticipantId).then((res) => {
            if (res.status != 200) {

                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                return;
            }

            var records = res.data;
            if (records.length > 0)
                setDdlBroker(records[0].id);
            else
                setDdlBroker(0);

            setBrokers(records);
        }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
    }


    const ddlUserChange = (e) => {
        setDdlUser(e.target.value);

        setHeader('Add Demat Account');
        resetForm();

        setRefreshTable(true);
    }

    const ddlBankAccountChange = (e) => {
        setDdlBankAccount(e.target.value);
    }

    const ddlDepositoryParticipantChange = (e) => {
        setDdlDepositoryParticipant(e.target.value);
        setRefreshBrokerDdl(true);
    }
    const ddlBrokerChange = (e) => {
        setDdlBroker(e.target.value);
    }

    const ddlAadharCardLinkedChange = (e) => {
        setDdlIsAadharCardLinked(e.target.value);
    }

    const ddlPanCardLinkedChange = (e) => {
        setDdlIsPanCardLinked(e.target.value);
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

            var dematId = '';

            var selectedDp = depositoryParticipants.find(a => a.id == ddlDepositoryParticipant);
            if (selectedDp) {
                dematId = `${selectedDp.depositoryParticipantId}${formData.boId}`
            }

            formData.userId = ddlUser;
            formData.bankAccountId = ddlBankAccount;
            formData.depositoryParticipantId = ddlDepositoryParticipant;
            formData.brokerId = ddlBroker;
            formData.dematId = dematId;
            formData.isAadharCardLinked = ddlIsAadharCardLinked;
            formData.isPanCardLinked = ddlIsPanCardLinked;

            if (formData.id == 0) {

                addDematAccount(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Demat Account added successfully');
                    resetPage();
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateDematAccount(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Demat Account updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            firstHolder: '',
            secondHolder: '',
            nominee: '',
            customerId: '',
            boId: '',
        };

        if (formData.firstHolder.trim() === '')
            newErrors.firstHolder = 'First Holder is required.';

        // if (formData.secondHolder.trim() === '')
        //     newErrors.secondHolder = 'Second Holder is required.';

        if (formData.nominee.trim() === '')
            newErrors.nominee = 'Nominee is required.';

        if (formData.customerId.trim() === '')
            newErrors.customerId = 'Customer Id is required.';

        if (formData.boId.trim() === '')
            newErrors.boId = 'Bo Id is required.';


        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update Demat Details')
        clearErrors();

        setFormData({
            id: obj.id,
            userId: obj.userId,
            firstHolder: obj.firstHolder,
            secondHolder: obj.secondHolder,
            nominee: obj.nominee,
            customerId: obj.customerId,
            boId: obj.boId,
            dematId: obj.dematId,
            createdBy: user ? user.userId : 1
        });

        setDdlBroker(obj.brokerId);
        setDdlDepositoryParticipant(obj.depositoryParticipantId);
        setDdlBankAccount(obj.bankAccountId);
        setDdlIsAadharCardLinked(obj.isAadharCardLinked);
        setDdlIsPanCardLinked(obj.isPanCardLinked);
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        deleteDematAccount(obj.id).then((res) => {

            if (res.status != 200) {
                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                return;
            }

            alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Demat account deleted successfully');

            setRefreshTable(true);

        }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {

        var defaultText = '';
        // var selectedUser = users.find(a=> a.userId == ddlUser);
        // if(selectedUser){
        //     defaultText = `${selectedUser.firstName} ${selectedUser.middleName} ${selectedUser.lastName}`
        // }

        // console.log('defaultText => ' + defaultText);

        setFormData({
            id: 0,
            userId: 0,
            bankAccountId: 0,
            depositoryParticipantId: 0,
            brokerId: 0,
            firstHolder: defaultText,
            secondHolder: '',
            nominee: '',
            customerId: '',
            boId: '',
            dematId: '',
            isAadharCardLinked: false,
            isPanCardLinked: false,
            createdBy: user ? user.userId : 1
        });




        setDdlBroker(0);
        setDdlDepositoryParticipant(0);
        setDdlBankAccount(0);
        setDdlIsAadharCardLinked(false);
        setDdlIsPanCardLinked(false);

        clearErrors();
    }

    const resetPage = () => {
        setHeader('Add Demat Account');

        resetForm();

        setRefreshTable(true);
    }

    const clearErrors = () => {
        const newErrors = {
            investorName: '',
            customerId: '',
            boId: '',
        };

        setErrors(newErrors);
    }

    const btnClearClick = () => {
        setHeader('Add Demat Account');
        resetForm();
    }


    return (

        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Demat Accounts</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>Demat Accounts</div>
                    </div>
                </div>

                <div className='section-body'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Demat Account</h4>
                                </div>
                                <div className='card-body'>

                                    <div className='form-group row'>
                                        <label className='col-sm-1 col-form-label'>Select User</label>
                                        <div className='col-sm-3'>
                                            <select name='ddlUser' value={ddlUser} onChange={(e) => ddlUserChange(e)} className='form-control selectric'>
                                                {users && users.length > 0 && users.map((user, index) => (

                                                    <option key={user.userId} value={user.userId}>{`${user.firstName} ${user.middleName} ${user.lastName}`}</option>
                                                ))}

                                                {users.length == 0 &&
                                                    <option key={ddlUser}>No User Found</option>
                                                }
                                            </select>
                                        </div>
                                    </div>

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
                                                    <label>Broker <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlBroker' value={ddlBroker} onChange={(e) => ddlBrokerChange(e)} className='form-control selectric'>
                                                        {brokers && brokers.length > 0 && brokers.map((obj, index) => (

                                                            <option key={obj.id} value={obj.id}>{`${obj.code} - ${obj.name}`}</option>
                                                        ))}

                                                        {brokers.length == 0 &&
                                                            <option key={ddlBroker}>No Broker Found</option>
                                                        }
                                                    </select>
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Bank Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlBankAccount' value={ddlBankAccount} onChange={(e) => ddlBankAccountChange(e)} className='form-control selectric'>
                                                        {bankAccounts && bankAccounts.length > 0 && bankAccounts.map((obj, index) => (

                                                            <option key={obj.id} value={obj.id}>{`${obj.shortName} - XXXXX${obj.accountNumber.substr(obj.accountNumber.length - 4, obj.accountNumber.length)}`}</option>
                                                        ))}

                                                        {bankAccounts.length == 0 &&
                                                            <option key={ddlBankAccount}>No Bank Found</option>
                                                        }
                                                    </select>
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>First Holder <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='firstHolder' placeholder='Enter First Holder' value={formData.firstHolder} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.firstHolder && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.firstHolder}</div>}
                                                </div>

                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='row'>

                                                <div className='col-md-3'>
                                                    <label>Second Holder </label>
                                                    <input type='text' name='secondHolder' placeholder='Enter Second Holder' value={formData.secondHolder} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.secondHolder && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.secondHolder}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Nominee <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='nominee' placeholder='Enter Nominee' value={formData.nominee} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.nominee && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.nominee}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Customer Id <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='customerId' placeholder='Enter Customer Id' value={formData.customerId} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.customerId && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.customerId}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>BO Id <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='boId' placeholder='Enter BO Id' value={formData.boId} onChange={handleNumberChange}
                                                        className='form-control' />
                                                    {errors.boId && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.boId}</div>}
                                                </div>

                                            </div>
                                        </div>

                                        <div className='form-group'>
                                            <div className='row'>

                                                <div className='col-md-3'>
                                                    <label>Aadhar card linked  <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlIsAadharCardLinked' value={ddlIsAadharCardLinked} onChange={(e) => ddlAadharCardLinkedChange(e)} className='form-control selectric'>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>PAN card linked  <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlIsPanCardLinked' value={ddlIsPanCardLinked} onChange={(e) => ddlPanCardLinkedChange(e)} className='form-control selectric'>
                                                        <option value='true'>Yes</option>
                                                        <option value='false'>No</option>
                                                    </select>
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
                                                    <th>Account Holders</th>
                                                    <th>Broker</th>
                                                    <th>Bank Name</th>
                                                    <th>DP Id</th>
                                                    <th>Bo Id</th>
                                                    <th>Demat Id</th>
                                                    <th>Customer Id</th>
                                                    <th>Aadhar Linked</th>
                                                    <th>PAN Linked</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dematAccounts && dematAccounts.length > 0 && dematAccounts.map((obj, index) => (
                                                    <tr key={obj.id}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td>
                                                            <img alt='image' src={APP_PUBLIC_URL + 'img/avatar/avatar-1.png'} className='rounded-circle' width='35' data-placement='bottom' data-toggle='tooltip' title={`FH: ${obj.firstHolder}`} />
                                                            <img alt='image' src={APP_PUBLIC_URL + 'img/avatar/avatar-4.png'} className='rounded-circle' width='35' data-placement='bottom' data-toggle='tooltip' title={`SH: ${obj.secondHolder}`} /> &nbsp;&nbsp;
                                                            <img alt='image' src={APP_PUBLIC_URL + 'img/avatar/avatar-5.png'} className='rounded-circle' width='35' data-placement='bottom' data-toggle='tooltip' title={`N: ${obj.nominee}`} />
                                                        </td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.broker}>{obj.broker}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.bank} >{obj.bank}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.depositoryParticipant} >{obj.depositoryParticipant}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.boId} >{obj.boId}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.dematId} >{obj.dematId}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.customerId} >{obj.customerId}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.isAadharCardLinked ? 'Yes' : 'No'}><div className={`badge ${obj.isAadharCardLinked ? 'badge-success' : 'badge-danger'}`}>{obj.isAadharCardLinked ? 'Yes' : 'No'}</div></td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.isPanCardLinked ? 'Yes' : 'No'}><div className={`badge ${obj.isPanCardLinked ? 'badge-success' : 'badge-danger'}`}>{obj.isPanCardLinked ? 'Yes' : 'No'}</div></td>
                                                        <td>
                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, obj)}><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, obj)}><i className='fas fa-times'></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {dematAccounts.length == 0 &&
                                                    <tr scope='row'>
                                                        <td colSpan='11' style={{ textAlign: 'center' }}>Please wait... We retriving the records</td>
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

export default DematAccount;