import { Link } from 'react-router-dom'
import {
    APP_PUBLIC_URL,
    APP_ROUTE_DASHBOARD_PATH, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { addBankAccount, deleteBankAccount, getBankAccounts, updateBankAccount } from '../../api/BankAccountApi';
import { getUsers } from '../../api/UserApi';



const BankAccount = () => {


    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add Bank Account');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [ddlUser, setDdlUser] = useState(0);
    const [ddlIsAadharCardLinked, setDdlIsAadharCardLinked] = useState(false);
    const [ddlIsPanCardLinked, setDdlIsPanCardLinked] = useState(false);

    const [formData, setFormData] = useState({
        id: 0,
        userId: 0,
        bankName: '',
        accountNumber: '',
        accountType: '',
        firstHolder: '',
        secondHolder: '',
        nominee: '',
        ifscCode: '',
        address: '',
        isAadharCardLinked: false,
        isPanCardLinked: false,
        micrCode: '',
        createdBy: user ? user.userId : 1
    });
    const [errors, setErrors] = useState({
        bankName: '',
        accountNumber: '',
        accountType: '',
        firstHolder: '',
        secondHolder: '',
        nominee: '',
        ifscCode: '',
        address: '',
        micrCode: '',
    });

    useEffect(() => {

        if (refreshTable) {


            getUsers().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                    return;
                }


                var users = res.data;
                setUsers(users);

                if (users.length > 0) {

                    var userIdToFetchBankAccounts = ddlUser == 0 ? users[0].userId : ddlUser;
                    setDdlUser(userIdToFetchBankAccounts);

                    getBankAccounts(userIdToFetchBankAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        setAccounts(res.data);
                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
                }

            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));


        }

        setRefreshTable(false)

    }, [refreshTable]);

    const ddlUserChange = (e) => {
        setDdlUser(e.target.value);

        setHeader('Add Bank Account');
        resetForm();

        setRefreshTable(true);
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

            formData.userId = ddlUser;
            formData.isAadharCardLinked = ddlIsAadharCardLinked;
            formData.isPanCardLinked = ddlIsPanCardLinked;

            if (formData.id == 0) {

                addBankAccount(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Bank Account added successfully');
                    resetPage();
                    setRefreshTable(true);
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateBankAccount(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Bank Account updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            bankName: '',
            accountNumber: '',
            accountType: '',
            firstHolder: '',
            secondHolder: '',
            nominee: '',
            ifscCode: '',
            address: '',
            micrCode: '',
        };

        if (formData.bankName.trim() === '')
            newErrors.bankName = 'Bank Name is required.';

        if (formData.accountNumber.length > 8)
            newErrors.accountNumber = 'Account number must be grater than 8 chracters';

        if (formData.accountType.trim() === '')
            newErrors.accountType = 'Account type is required.';

        if (formData.firstHolder.trim() === '')
            newErrors.firstHolder = 'First holder is required.';

        if (formData.secondHolder.trim() === '')
            newErrors.secondHolder = 'Second holder is required.';

        if (formData.nominee.trim() === '')
            newErrors.nominee = 'Nominee is required.';

        if (formData.ifscCode.trim() === '')
            newErrors.ifscCode = 'IFSC Code is required.';

        if (formData.address.trim() === '')
            newErrors.address = 'Address is required.';

        if (formData.micrCode.trim() === '')
            newErrors.micrCode = 'MICR Code is required.';


        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update Bank Details')
        const newErrors = {
            bankName: '',
            accountNumber: '',
            accountType: '',
            firstHolder: '',
            secondHolder: '',
            nominee: '',
            ifscCode: '',
            address: '',
            micrCode: '',
        };

        setErrors(newErrors);

        setFormData({
            id: obj.id,
            userId: obj.userId,
            bankName: obj.bankName,
            accountNumber: obj.accountNumber,
            accountType: obj.accountType,
            firstHolder: obj.firstHolder,
            secondHolder: obj.secondHolder,
            nominee: obj.nominee,
            ifscCode: obj.ifscCode,
            address: obj.address,
            isAadharCardLinked: obj.isAadharCardLinked,
            isPanCardLinked: obj.isPanCardLinked,
            micrCode: obj.micrCode,
            createdBy: user ? user.userId : 1
        });

        setDdlIsAadharCardLinked(obj.isAadharCardLinked);
        setDdlIsPanCardLinked(obj.isPanCardLinked);
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        deleteBankAccount(obj.id).then((res) => {

            if (res.status != 200) {
                if (res.status == 401) { UnAuthorisedUserHandler(dispatch, history); return; }

                alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                return;
            }

            alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Bank deleted successfully');

            setRefreshTable(true);

        }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {
        setFormData({
            id: 0,
            userId: 0,
            bankName: '',
            accountNumber: '',
            accountType: '',
            firstHolder: '',
            secondHolder: '',
            nominee: '',
            ifscCode: '',
            address: '',
            isAadharCardLinked: false,
            isPanCardLinked: false,
            micrCode: '',
            createdBy: user ? user.userId : 1
        });
        setDdlIsAadharCardLinked(false);
        setDdlIsPanCardLinked(false);
    }

    const resetPage = () => {
        setHeader('Add Bank Account');

        resetForm();

        setRefreshTable(true);
    }

    const btnClearClick = () => {
        setHeader('Add Bank Account');
        resetForm();
    }


    return (

        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Bank Accounts</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>Bank Accounts</div>
                    </div>
                </div>

                <div className='section-body'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-12'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Bank Account</h4>
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
                                                    <label>Bank Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='bankName' placeholder='Enter Bank name' value={formData.bankName} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.bankName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.bankName}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Account Number <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='accountNumber' placeholder='Enter Account number' value={formData.accountNumber} onChange={handleNumberChange}
                                                        className='form-control' />
                                                    {errors.accountNumber && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.accountNumber}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>Account Type <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='accountType' placeholder='Enter Account type' value={formData.accountType} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.accountType && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.accountType}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>First Holder <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='firstHolder' placeholder='Enter First holder' value={formData.firstHolder} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.firstHolder && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.firstHolder}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-group'>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    <label>Second Holder <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='secondHolder' placeholder='Enter Second holder' value={formData.secondHolder} onChange={handleInputChange}
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
                                                    <label>MICR Code <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='micrCode' placeholder='Enter MICR Code' value={formData.micrCode} onChange={handleNumberChange}
                                                        className='form-control' />
                                                    {errors.micrCode && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.micrCode}</div>}
                                                </div>

                                                <div className='col-md-3'>
                                                    <label>IFSC Code <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='ifscCode' placeholder='Enter IFSC Code' value={formData.ifscCode} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.ifscCode && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.ifscCode}</div>}
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

                                                <div className='col-md-3'>
                                                    <label>Bank Address <span style={{ color: '#dc3545' }}>*</span></label>
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
                                                    <th>BankName</th>
                                                    <th>AccountNumber</th>
                                                    <th>AccountType</th>
                                                    <th>Account Holders</th>
                                                    <th>Aadhar Linked</th>
                                                    <th>PAN Linked</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {accounts && accounts.length > 0 && accounts.map((account, index) => (
                                                    <tr key={user.userId}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={account.bankName}>{account.bankName}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={account.accountNumber} >{account.accountNumber}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={account.accountType} >{account.accountType}</td>
                                                        <td>
                                                            <img alt='image' src={APP_PUBLIC_URL + 'img/avatar/avatar-1.png'} className='rounded-circle' width='35' data-placement='bottom' data-toggle='tooltip' title={account.firstHolder} />
                                                            <img alt='image' src={APP_PUBLIC_URL + 'img/avatar/avatar-4.png'} className='rounded-circle' width='35' data-placement='bottom' data-toggle='tooltip' title={account.secondHolder} /> &nbsp;&nbsp;
                                                            <img alt='image' src={APP_PUBLIC_URL + 'img/avatar/avatar-5.png'} className='rounded-circle' width='35' data-placement='bottom' data-toggle='tooltip' title={`N: ${account.nominee}`} />
                                                        </td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={account.isAadharCardLinked ? 'Yes' : 'No'}><div className={`badge ${account.isAadharCardLinked ? 'badge-success' : 'badge-danger'}`}>{account.isAadharCardLinked ? 'Yes' : 'No'}</div></td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={account.isPanCardLinked ? 'Yes' : 'No'}><div className={`badge ${account.isPanCardLinked ? 'badge-success' : 'badge-danger'}`}>{account.isPanCardLinked ? 'Yes' : 'No'}</div></td>
                                                        <td>
                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, account)}><i class="far fa-edit"></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, account)}><i class="fas fa-times"></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {accounts.length == 0 &&
                                                    <tr scope='row'>
                                                        <td colSpan='9' style={{ textAlign: 'center' }}>Please wait... We retriving the accounts</td>
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

export default BankAccount;