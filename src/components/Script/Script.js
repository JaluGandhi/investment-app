import { Link, useNavigate } from 'react-router-dom';
import {
    APP_ROUTE_DASHBOARD_PATH, SWAL_TITLE_ERROR,
    SWAL_TITLE_SUCCESS, SWAL_TYPE_ERROR,
    SWAL_TYPE_SUCCESS
} from '../../common/AppConstant';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { UnAuthorisedUserHandler, alert } from '../../common/AppCommon';
import { addScript, getScripts, updateScript } from '../../api/ScriptApi';

const Script = () => {

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const [header, setHeader] = useState('Add Script');
    const [isPending, setIsPending] = useState(false);
    const [refreshTable, setRefreshTable] = useState(true);
    const [scripts, setScripts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        id: 0,
        name: '',
        shortName: '',
        createdBy: user ? user.userId : 1
    });

    const [errors, setErrors] = useState({
        name: '',
        shortName: '',
    });

    useEffect(() => {

        if (refreshTable) {


            getScripts().then((res) => {
                if (res.status != 200) {

                    if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                    alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message);
                    return;
                }

                setScripts(res.data);

            }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message));

            setRefreshTable(false)

        }
    }, [refreshTable]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value, });
    };

    const formSubmit = (e) => {
        e.preventDefault();

        if (isValid()) {
            setIsPending(true);

            if (formData.id == 0) {

                addScript(formData).then((res) => {

                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Script added successfully');
                    resetPage();
                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
            else {

                updateScript(formData).then((res) => {
                    setIsPending(false);

                    if (res.status != 200) {
                        if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

                        alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
                        return;
                    }

                    alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Script updated successfully');
                    resetPage();

                }).catch((err) => { setIsPending(false); alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message) })

            }
        }

    }

    const isValid = () => {

        const newErrors = {
            name: '',
            shortName: '',
        };

        if (formData.name.trim() === '')
            newErrors.name = 'Name is required.';

        if (formData.shortName.trim() === '')
            newErrors.shortName = 'Short Name is required.';

        setErrors(newErrors);

        return Object.values(newErrors).every((error) => error === '');
    }

    const editClick = (e, obj) => {
        e.preventDefault();
        setHeader('Update Demat Details')
        clearErrors();

        setFormData({
            id: obj.id,
            name: obj.name,
            shortName: obj.shortName,
            createdBy: user ? user.userId : 1
        });
    }

    const deleteClick = (e, obj) => {
        e.preventDefault();

        // deleteDematAccount(obj.id).then((res) => {

        //     if (res.status != 200) {
        //         if (res.status == 401) { UnAuthorisedUserHandler(dispatch, navigate); return; }

        //         alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, res.message)
        //         return;
        //     }

        //     alert(SWAL_TYPE_SUCCESS, SWAL_TITLE_SUCCESS, 'Script deleted successfully');

        //     setRefreshTable(true);

        // }).catch((err) => alert(SWAL_TYPE_ERROR, SWAL_TITLE_ERROR, err.message))
    }

    const resetForm = () => {

        setFormData({
            id: 0,
            name: '',
            shortName: '',
            createdBy: user ? user.userId : 1
        });

        clearErrors();
    }

    const resetPage = () => {
        setHeader('Add Script');

        resetForm();

        setRefreshTable(true);
    }

    const clearErrors = () => {
        const newErrors = {
            name: '',
            shortName: '',
        };

        setErrors(newErrors);
    }

    const btnClearClick = () => {
        setHeader('Add Script');
        resetForm();
    }

    return (
        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Scripts</h1>
                    <div className='section-header-breadcrumb'>
                        <div className='breadcrumb-item active'><Link to={APP_ROUTE_DASHBOARD_PATH}>Dashboard</Link></div>
                        <div className='breadcrumb-item'>Scripts</div>
                    </div>
                </div>

                <div className='section-body'>
                    <div className='row'>
                        <div className='col-12 col-md-6 col-lg-12'>
                            <div className='card'>
                                <form onSubmit={formSubmit} className='needs-validation' autoComplete='off'>
                                    <div className='card-header'>
                                        <h4>{header}</h4>
                                    </div>
                                    <div className='card-body'>
                                        <div className='form-group'>
                                            <div className='row'>
                                                <div className='col-md-3'>
                                                    <label>Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='name' placeholder='Enter Name' value={formData.name} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.name && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.name}</div>}
                                                </div>
                                                <div className='col-md-3'>
                                                    <label>Short Name <span style={{ color: '#dc3545' }}>*</span></label>
                                                    <input type='text' name='shortName' placeholder='Enter Short name' value={formData.shortName} onChange={handleInputChange}
                                                        className='form-control' />
                                                    {errors.shortName && <div className='invalid-feedback' style={{ display: 'block' }}>{errors.shortName}</div>}
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
                                                    <th>Name</th>
                                                    <th>Short Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {scripts && scripts.length > 0 && scripts.map((obj, index) => (
                                                    <tr key={obj.id}>
                                                        <th scope='row'>{index + 1}</th>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.name} >{obj.name}</td>
                                                        <td data-toggle='tooltip' data-placement='bottom' title={obj.shortName} >{obj.shortName}</td>
                                                        <td>
                                                            <a href='#' className='btn btn-icon btn-sm btn-primary' data-toggle='tooltip' data-placement='bottom' title='Edit' onClick={(e) => editClick(e, user)}><i className='far fa-edit'></i></a>&nbsp;&nbsp;&nbsp;<a className='btn btn-icon btn-sm btn-danger' href='#' data-toggle='tooltip' data-placement='bottom' title='Delete' onClick={(e) => deleteClick(e, user)}><i className='fas fa-times'></i></a>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {scripts.length == 0 &&
                                                    <tr scope='row'>
                                                        <td colSpan='8' style={{ textAlign: 'center' }}>Please wait... We retriving the records</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='card-footer text-right'>
                                    <nav className='d-inline-block'>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section >
        </div >
    )



}

export default Script