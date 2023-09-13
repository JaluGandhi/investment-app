import { Link, useNavigate } from 'react-router-dom';
import {
    APP_ROUTE_DASHBOARD_PATH, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS,
    TRANSACTION_TYPE
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { getUsers } from '../../api/UserApi';
import { addScriptTransation, getScriptTransactions, getUserScripts, updateScriptTransation } from '../../api/ScriptApi';

const ScriptTransaction = () => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add User Script');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [userTransactions, setUserTransactions] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [users, setUsers] = useState([]);
    const [ddlUser, setDdlUser] = useState(0);

    const [userScripts, setUserScripts] = useState([]);
    const [ddlUserScript, setDdlUserScript] = useState(0);

    const [ddlTransactionType, setTransactionType] = useState(TRANSACTION_TYPE.BUY);

    const [formData, setFormData] = useState({
        id: 0,
        userScriptId: 0,
        quantity: 0,
        price: 0.00.toFixed(2),
        totalAmount: 0.00.toFixed(2),
        type: TRANSACTION_TYPE.BUY,
        remarks: '',
        createdBy: user ? user.userId : 1
    });

    const [errors, setErrors] = useState({
        quantity: '',
        price: '',
        totalAmount: '',
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

                    getScriptTransactions(userIdToFetchDependandAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        var resords = res.data;
                        setUserTransactions(resords);

                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));

                    getUserScripts(userIdToFetchDependandAccounts).then((res) => {
                        if (res.status != 200) {

                            if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                            alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                            return;
                        }

                        var resords = res.data;
                        setUserScripts(resords);

                        if (resords.length > 0)
                            setDdlUserScript(resords[0].id);

                    }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
                }

            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));
        }

        setRefreshTable(false)

    }, [refreshTable]);

    const ddlUserChange = (e) => {
        setDdlUser(e.target.value);

        setHeader('Add Demat Account');
        resetForm();

        setRefreshTable(true);
    }

    const ddlUserScriptChange = (e) => {
        setDdlUserScript(e.target.value);
    }

    const ddlTypeChange = (e) => {
        setTransactionType(e.target.value);
    }

    const handleSetTotalAmount = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });

        var totalAmount = (formData.quantity * formData.price).toFixed(2);

        setFormData({ ...formData, ['totalAmount']: totalAmount, });

    };

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


            formData.userScriptId = ddlUserScript;

            if (formData.id == 0) {

                addScriptTransation(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Transaction added successfully');
                    resetPage();
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateScriptTransation(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Transaction updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            quantity: '',
            price: '',
            totalAmount: '',
        };

        if (formData.quantity.trim() === '')
            newErrors.quantity = 'Quantity is required.';

        if (formData.price.trim() === '')
            newErrors.price = 'Price is required.';

        if (formData.totalAmount.trim() === '')
            newErrors.totalAmount = 'Total Amount is required.';

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');

    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update Script Transaction')
        clearErrors();

        setFormData({
            id: obj.id,
            userScriptId: obj.userScriptId,
            price: obj.price.toFixed(2),
            totalAmount: obj.totalAmount.toFixed(2),
            type: obj.type,
            remarks: obj.remarks,
            createdBy: user ? user.userId : 1
        });

        setDdlUserScript(obj.userScriptId);
        setTransactionType(obj.type);
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        // deleteDematAccount(obj.id).then((res) => {

        //     if (res.status != 200) {
        //         if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

        //         alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
        //         return;
        //     }

        //     alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Transaction deleted successfully');

        //     setRefreshTable(true);

        // }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {

        setFormData({
            id: 0,
            userScriptId: 0,
            quantity: 0,
            price: 0.00.toFixed(2),
            totalAmount: 0.00.toFixed(2),
            type: TRANSACTION_TYPE.BUY,
            remarks: '',
            createdBy: user ? user.userId : 1
        });


        setDdlUserScript(0);
        setTransactionType(0);

        clearErrors();
    }

    const resetPage = () => {
        setHeader('Add Script Transaction');

        resetForm();

        setRefreshTable(true);
    }

    const clearErrors = () => {
        const newErrors = {
            quantity: '',
            price: '',
            totalAmount: '',
        };

        setErrors(newErrors);
    }

    const btnClearClick = () => {
        setHeader('Add Script Transaction');
        resetForm();
    }


    // return()

}

export default ScriptTransaction