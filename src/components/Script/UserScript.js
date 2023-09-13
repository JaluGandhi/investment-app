import { Link, useNavigate } from 'react-router-dom';
import {
    APP_ROUTE_DASHBOARD_PATH, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { getUsers } from '../../api/UserApi';
import { addUserScript, getScripts, getUserScripts, updateUserScript } from '../../api/ScriptApi';
import { getDematAccounts } from '../../api/DematApi';


const UserScript = () => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add User Script');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [userScripts, setUserScripts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [ddlUser, setDdlUser] = useState(0);

    const [dematAccounts, setDematAccounts] = useState([]);
    const [ddlDematAccount, setDdlDematAccount] = useState(0);

    const [scripts, setScripts] = useState([]);
    const [ddlScript, setDdlScript] = useState(0);

    const [formData, setFormData] = useState({
        id: 0,
        userId: 0,
        scriptId: 0,
        dematAccountId: 0,
        totalQty: 0,
        avgPrice: 0.00.toFixed(2),
        investedAmount: 0.00.toFixed(2),
        createdBy: user ? user.userId : 1
    });

    const [errors, setErrors] = useState({
        // firstHolder: '',
        // secondHolder: '',
        // nominee: '',
        // customerId: '',
        // boId: '',
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

                    getUserScripts(userIdToFetchDependandAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        var resords = res.data;
                        setUserScripts(resords);

                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));

                    getDematAccounts(userIdToFetchDependandAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        var resords = res.data;
                        setDematAccounts(resords);

                        if (resords.length > 0)
                            setDdlDematAccount(resords[0].id);

                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
                }

            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));


            getScripts().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                    return;
                }

                var resords = res.data;
                setScripts(resords);

                if (resords.length > 0)
                    setDdlScript(resords[0].id);

            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
        }

        setRefreshTable(false)

    }, [refreshTable]);


    const ddlUserChange = (e) => {
        setDdlUser(e.target.value);

        setHeader('Add User Script');
        resetForm();

        setRefreshTable(true);
    }

    const ddlDematAccountChange = (e) => {
        setDdlDematAccount(e.target.value);
    }

    const ddlScriptChange = (e) => {
        setDdlScript(e.target.value);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const formSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsPending(true);


            formData.userId = ddlUser;
            formData.scriptId = ddlScript;
            formData.dematAccountId = ddlDematAccount;

            if (formData.id == 0) {

                addUserScript(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'User script added successfully');
                    resetPage();
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateUserScript(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'User script updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            // firstHolder: '',
            // secondHolder: '',
            // nominee: '',
            // customerId: '',
            // boId: '',
        };

        // if (formData.firstHolder.trim() === '')
        //     newErrors.firstHolder = 'First Holder is required.';

        // if (formData.secondHolder.trim() === '')
        //     newErrors.secondHolder = 'Second Holder is required.';

        // if (formData.nominee.trim() === '')
        //     newErrors.nominee = 'Nominee is required.';

        // if (formData.customerId.trim() === '')
        //     newErrors.customerId = 'Customer Id is required.';

        // if (formData.boId.trim() === '')
        //     newErrors.boId = 'Bo Id is required.';


        //setErrors(newErrors);

        //return Object.values(newErrors).every((error) => error === '');

        return true;
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update User Script')
        clearErrors();

        setFormData({
            id: obj.id,
            userId: obj.userId,
            scriptId: obj.scriptId,
            dematAccountId: obj.dematAccountId,
            totalQty: obj.totalQty,
            avgPrice: obj.avgPrice.toFixed(2),
            investedAmount: obj.investedAmount.toFixed(2),
            createdBy: user ? user.userId : 1
        });

        setDdlScript(obj.scriptId);
        setDdlDematAccount(obj.dematAccountId);
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        // deleteDematAccount(obj.id).then((res) => {

        //     if (res.status != 200) {
        //         if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

        //         alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
        //         return;
        //     }

        //     alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'User script deleted successfully');

        //     setRefreshTable(true);

        // }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
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
            scriptId: 0,
            dematAccountId: 0,
            totalQty: 0,
            avgPrice: 0.00.toFixed(2),
            investedAmount: 0.00.toFixed(2),
            createdBy: user ? user.userId : 1
        });


        setDdlScript(0);
        setDdlDematAccount(0);

        clearErrors();
    }

    const resetPage = () => {
        setHeader('Add User Script');

        resetForm();

        setRefreshTable(true);
    }

    const clearErrors = () => {
        const newErrors = {
            // investorName: '',
            // customerId: '',
            // boId: '',
        };

        setErrors(newErrors);
    }

    const btnClearClick = () => {
        setHeader('Add User Script');
        resetForm();
    }

    return (


        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Demat Accounts</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>User Scripts</div>
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
                                                    <label>Demat Account <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlDematAccount' value={ddlDematAccount} onChange={(e) => ddlDematAccountChange(e)} className='form-control selectric'>
                                                        {dematAccounts && dematAccounts.length > 0 && dematAccounts.map((obj, index) => (

                                                            <option key={obj.id} value={obj.id}>{obj.dematDetail}</option>
                                                        ))}

                                                        {dematAccounts.length == 0 &&
                                                            <option key={ddlDematAccount}>No Demat Account Found</option>
                                                        }
                                                    </select>
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Broker <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <select name='ddlScript' value={ddlScript} onChange={(e) => ddlScriptChange(e)} className='form-control selectric'>
                                                        {scripts && scripts.length > 0 && scripts.map((obj, index) => (

                                                            <option key={obj.id} value={obj.id}>{obj.shortName}</option>
                                                        ))}

                                                        {scripts.length == 0 &&
                                                            <option key={ddlScript}>No Broker Found</option>
                                                        }
                                                    </select>
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Total Qty. <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='totalQty' placeholder='Enter Total Qty.' value={formData.totalQty} onChange={handleInputChange}
                                                        className='form-control' disabled />
                                                    {errors.totalQty && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.totalQty}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Avg Price <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='avgPrice' placeholder='Enter Avg. Price' value={formData.avgPrice} onChange={handleInputChange}
                                                        className='form-control' disabled />
                                                    {errors.avgPrice && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.avgPrice}</div>}
                                                </div>

                                            </div>
                                        </div>


                                        <div className='form-group'>
                                            <div className='row'>

                                                <div className='col-md-3'>
                                                    <label>Invested Amount <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='investedAmount' placeholder='Enter Invested Amount' value={formData.investedAmount} onChange={handleInputChange}
                                                        className='form-control' disabled />
                                                    {errors.investedAmount && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.investedAmount}</div>}
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
                                                    <th>Demat Account</th>
                                                    <th>Script Name</th>
                                                    <th>Total Qty.</th>
                                                    <th>Avg. Price</th>
                                                    <th>Invested Amount</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {userScripts && userScripts.length > 0 && userScripts.map((obj, index) => (
                                                    <tr key={obj.id}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.dematAccount}>{obj.dematAccount}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.scriptName} >{obj.scriptName}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.totalQty} >{obj.totalQty}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.avgPrice} >{obj.avgPrice.toFixed(2)}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.investedAmount} >{obj.investedAmount.toFixed(2)}</td>
                                                        <td>
                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, obj)}><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, obj)}><i className='fas fa-times'></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {userScripts.length == 0 &&
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


    )




}

export default UserScript