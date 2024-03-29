import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import {
    APP_ROUTE_BANK_ACCOUNT,
    APP_ROUTE_BANK_ACCOUNT_PATH,
    APP_ROUTE_BROKER,
    APP_ROUTE_BROKER_PATH,
    APP_ROUTE_DASHBOARD,
    APP_ROUTE_DASHBOARD_PATH,
    APP_ROUTE_DEMAT_ACCOUNT,
    APP_ROUTE_DEMAT_ACCOUNT_PATH,
    APP_ROUTE_DEPOSITORY_PARTICIPANT,
    APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH,
    APP_ROUTE_SCRIPT,
    APP_ROUTE_SCRIPT_PATH,
    APP_ROUTE_SCRIPT_TRANSACTION,
    APP_ROUTE_SCRIPT_TRANSACTION_PATH,
    APP_ROUTE_USERS,
    APP_ROUTE_USERS_PATH,
    APP_ROUTE_USER_SCRIPT,
    APP_ROUTE_USER_SCRIPT_PATH
} from '../../common/AppConstant';

const Sidebar = () => {

    const { user } = useSelector((state) => state.auth);

    const userShortName = user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'NU';

    //assigning location variable
    const location = useLocation();

    //destructuring pathname from location
    const { pathname } = location;

    //Javascript split method to get the name of the path in array
    const route = pathname.split("/")[1];

    return (
        <div className='main-sidebar sidebar-style-2'>
            <aside id='sidebar-wrapper'>
                <div className='sidebar-brand'>
                    <Link to={APP_ROUTE_DASHBOARD_PATH}>My Investment</Link>
                    {/* <Link to='/dashboard'>My Investment</Link> */}
                </div>
                <div className='sidebar-brand sidebar-brand-sm'>
                    <Link to={APP_ROUTE_DASHBOARD_PATH}>{userShortName}</Link>
                    {/* <Link to='/dashboard'>{userShortName}</Link> */}
                </div>
                <ul className='sidebar-menu'>
                    <li className='menu-header'>Dashboard</li>
                    <li className={`dropdown ${route === APP_ROUTE_DASHBOARD ? 'active' : ''}`}>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Dashboard</span></a>
                        <ul className='dropdown-menu' style={route === APP_ROUTE_DASHBOARD ? { display: 'block' } : { display: 'none' }}>
                            <li className={`${route === APP_ROUTE_DASHBOARD ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_DASHBOARD_PATH}>My Dashboard</Link></li>
                        </ul>
                    </li>

                    <li className='menu-header'>Accounts</li>
                    <li className={`dropdown ${route === APP_ROUTE_BANK_ACCOUNT ? 'active' : ''}`}>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Bank Accounts</span></a>
                        <ul className='dropdown-menu' style={route === APP_ROUTE_BANK_ACCOUNT ? { display: 'block' } : { display: 'none' }}>
                            <li className={`${route === APP_ROUTE_BANK_ACCOUNT ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_BANK_ACCOUNT_PATH}>Accounts</Link></li>
                        </ul>
                    </li>

                    <li className={`dropdown ${(route === APP_ROUTE_BROKER ||
                        route === APP_ROUTE_DEPOSITORY_PARTICIPANT ||
                        route === APP_ROUTE_DEMAT_ACCOUNT) ? 'active' : ''}`}>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Demat Accounts</span></a>
                        <ul className='dropdown-menu' style={(route === APP_ROUTE_BROKER ||
                            route === APP_ROUTE_DEPOSITORY_PARTICIPANT ||
                            route === APP_ROUTE_DEMAT_ACCOUNT) ? { display: 'block' } : { display: 'none' }}>
                            <li className={`${route === APP_ROUTE_DEMAT_ACCOUNT ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_DEMAT_ACCOUNT_PATH}>Demat Accounts</Link></li>
                            <li className={`${route === APP_ROUTE_BROKER ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_BROKER_PATH}>Brokers</Link></li>
                            <li className={`${route === APP_ROUTE_DEPOSITORY_PARTICIPANT ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_DEPOSITORY_PARTICIPANT_PATH}>Depository Participants</Link></li>
                        </ul>
                    </li>

                    <li className={`dropdown ${(route === APP_ROUTE_SCRIPT ||
                        route === APP_ROUTE_USER_SCRIPT ||
                        route === APP_ROUTE_SCRIPT_TRANSACTION) ? 'active' : ''}`}>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Script</span></a>
                        <ul className='dropdown-menu' style={(route === APP_ROUTE_SCRIPT ||
                            route === APP_ROUTE_USER_SCRIPT ||
                            route === APP_ROUTE_SCRIPT_TRANSACTION) ? { display: 'block' } : { display: 'none' }}>
                            <li className={`${route === APP_ROUTE_SCRIPT ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_SCRIPT_PATH}>Scripts</Link></li>
                            <li className={`${route === APP_ROUTE_USER_SCRIPT ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_USER_SCRIPT_PATH}>User Scripts</Link></li>
                            <li className={`${route === APP_ROUTE_SCRIPT_TRANSACTION ? 'active' : ''}`} ><Link className='nav-link' to={APP_ROUTE_SCRIPT_TRANSACTION_PATH}>Script Transation</Link></li>
                        </ul>
                    </li>

                    <li className='menu-header'>App Settings</li>
                    <li className={`dropdown ${route === APP_ROUTE_USERS ? 'active' : ''}`}>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Settings</span></a>
                        <ul className='dropdown-menu' style={route === APP_ROUTE_USERS ? { display: 'block' } : { display: 'none' }}>
                            <li className={`dropdown ${route === APP_ROUTE_USERS ? 'active' : ''}`}><Link to={APP_ROUTE_USERS_PATH} className='nav-link'>App Users</Link></li>
                        </ul>
                    </li>

                    {/* <li className='menu-header'>Dashboard</li>
                    <li>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Dashboard</span></a>
                        <ul className='dropdown-menu'>
                            <li><Link className='nav-link' to='/dashboard'>My Dashboard</Link></li>
                        </ul>
                    </li>

                    <li className='menu-header'>Bank Accounts</li>
                    <li>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Bank Accounts</span></a>
                        <ul className='dropdown-menu'>
                            <li><Link className='nav-link' to='/bank-accounts'>Accounts</Link></li>
                        </ul>
                    </li>

                    <li className='menu-header'>App Settings</li>
                    <li>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-fire'></i><span>Settings</span></a>
                        <ul className='dropdown-menu'>
                            <li><Link to='/users' className='nav-link'>App Users</Link></li>
                        </ul>
                    </li> */}

                    <li className='menu-header'>Starter</li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown' data-toggle='dropdown'><i className='fas fa-columns'></i> <span>Layout</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='layout-default.html'>Default Layout</a></li>
                            <li><a className='nav-link' href='layout-transparent.html'>Transparent Sidebar</a></li>
                            <li><a className='nav-link' href='layout-top-navigation.html'>Top Navigation</a></li>
                        </ul>
                    </li>
                    <li><a className='nav-link' href='blank.html'><i className='far fa-square'></i> <span>Blank Page</span></a></li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-th'></i> <span>Bootstrap</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='bootstrap-alert.html'>Alert</a></li>
                            <li><a className='nav-link' href='bootstrap-badge.html'>Badge</a></li>
                            <li><a className='nav-link' href='bootstrap-breadcrumb.html'>Breadcrumb</a></li>
                            <li><a className='nav-link' href='bootstrap-buttons.html'>Buttons</a></li>
                            <li><a className='nav-link' href='bootstrap-card.html'>Card</a></li>
                            <li><a className='nav-link' href='bootstrap-carousel.html'>Carousel</a></li>
                            <li><a className='nav-link' href='bootstrap-collapse.html'>Collapse</a></li>
                            <li><a className='nav-link' href='bootstrap-dropdown.html'>Dropdown</a></li>
                            <li><a className='nav-link' href='bootstrap-form.html'>Form</a></li>
                            <li><a className='nav-link' href='bootstrap-list-group.html'>List Group</a></li>
                            <li><a className='nav-link' href='bootstrap-media-object.html'>Media Object</a></li>
                            <li><a className='nav-link' href='bootstrap-modal.html'>Modal</a></li>
                            <li><a className='nav-link' href='bootstrap-nav.html'>Nav</a></li>
                            <li><a className='nav-link' href='bootstrap-navbar.html'>Navbar</a></li>
                            <li><a className='nav-link' href='bootstrap-pagination.html'>Pagination</a></li>
                            <li><a className='nav-link' href='bootstrap-popover.html'>Popover</a></li>
                            <li><a className='nav-link' href='bootstrap-progress.html'>Progress</a></li>
                            <li><a className='nav-link' href='bootstrap-table.html'>Table</a></li>
                            <li><a className='nav-link' href='bootstrap-tooltip.html'>Tooltip</a></li>
                            <li><a className='nav-link' href='bootstrap-typography.html'>Typography</a></li>
                        </ul>
                    </li>
                    <li className='menu-header'>Stisla</li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-th-large'></i> <span>Components</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='components-article.html'>Article</a></li>                <li><a className='nav-link beep beep-sidebar' href='components-avatar.html'>Avatar</a></li>                <li><a className='nav-link' href='components-chat-box.html'>Chat Box</a></li>                <li><a className='nav-link beep beep-sidebar' href='components-empty-state.html'>Empty State</a></li>                <li><a className='nav-link' href='components-gallery.html'>Gallery</a></li>
                            <li><a className='nav-link beep beep-sidebar' href='components-hero.html'>Hero</a></li>                <li><a className='nav-link' href='components-multiple-upload.html'>Multiple Upload</a></li>
                            <li><a className='nav-link beep beep-sidebar' href='components-pricing.html'>Pricing</a></li>                <li><a className='nav-link' href='components-statistic.html'>Statistic</a></li>                <li><a className='nav-link' href='components-tab.html'>Tab</a></li>
                            <li><a className='nav-link' href='components-table.html'>Table</a></li>
                            <li><a className='nav-link' href='components-user.html'>User</a></li>                <li><a className='nav-link beep beep-sidebar' href='components-wizard.html'>Wizard</a></li>              </ul>
                    </li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='far fa-file-alt'></i> <span>Forms</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='forms-advanced-form.html'>Advanced Form</a></li>
                            <li><a className='nav-link' href='forms-editor.html'>Editor</a></li>
                            <li><a className='nav-link' href='forms-validation.html'>Validation</a></li>
                        </ul>
                    </li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-map-marker-alt'></i> <span>Google Maps</span></a>
                        <ul className='dropdown-menu'>
                            <li><a href='gmaps-advanced-route.html'>Advanced Route</a></li>
                            <li><a href='gmaps-draggable-marker.html'>Draggable Marker</a></li>
                            <li><a href='gmaps-geocoding.html'>Geocoding</a></li>
                            <li><a href='gmaps-geolocation.html'>Geolocation</a></li>
                            <li><a href='gmaps-marker.html'>Marker</a></li>
                            <li><a href='gmaps-multiple-marker.html'>Multiple Marker</a></li>
                            <li><a href='gmaps-route.html'>Route</a></li>
                            <li><a href='gmaps-simple.html'>Simple</a></li>
                        </ul>
                    </li>            <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-plug'></i> <span>Modules</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='modules-calendar.html'>Calendar</a></li>
                            <li><a className='nav-link' href='modules-chartjs.html'>ChartJS</a></li>
                            <li><a className='nav-link' href='modules-datatables.html'>DataTables</a></li>
                            <li><a className='nav-link' href='modules-flag.html'>Flag</a></li>
                            <li><a className='nav-link' href='modules-font-awesome.html'>Font Awesome</a></li>
                            <li><a className='nav-link' href='modules-ion-icons.html'>Ion Icons</a></li>
                            <li><a className='nav-link' href='modules-owl-carousel.html'>Owl Carousel</a></li>
                            <li><a className='nav-link' href='modules-sparkline.html'>Sparkline</a></li>
                            <li><a className='nav-link' href='modules-sweet-alert.html'>Sweet Alert</a></li>
                            <li><a className='nav-link' href='modules-toastr.html'>Toastr</a></li>
                            <li><a className='nav-link' href='modules-vector-map.html'>Vector Map</a></li>
                            <li><a className='nav-link' href='modules-weather-icon.html'>Weather Icon</a></li>
                        </ul>
                    </li>
                    <li className='menu-header'>Pages</li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='far fa-user'></i> <span>Auth</span></a>
                        <ul className='dropdown-menu'>
                            <li><a href='auth-forgot-password.html'>Forgot Password</a></li>
                            <li><a href='auth-login.html'>Login</a></li>
                            <li><a href='auth-register.html'>Register</a></li>
                            <li><a href='auth-reset-password.html'>Reset Password</a></li>
                        </ul>
                    </li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-exclamation'></i> <span>Errors</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='errors-503.html'>503</a></li>
                            <li><a className='nav-link' href='errors-403.html'>403</a></li>
                            <li><a className='nav-link' href='errors-404.html'>404</a></li>
                            <li><a className='nav-link' href='errors-500.html'>500</a></li>
                        </ul>
                    </li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-bicycle'></i> <span>Features</span></a>
                        <ul className='dropdown-menu'>
                            <li><a className='nav-link' href='features-activities.html'>Activities</a></li>
                            <li><a className='nav-link' href='features-post-create.html'>Post Create</a></li>
                            <li><a className='nav-link' href='features-posts.html'>Posts</a></li>
                            <li><a className='nav-link' href='features-profile.html'>Profile</a></li>
                            <li><a className='nav-link' href='features-settings.html'>Settings</a></li>
                            <li><a className='nav-link' href='features-setting-detail.html'>Setting Detail</a></li>
                            <li><a className='nav-link' href='features-tickets.html'>Tickets</a></li>
                        </ul>
                    </li>
                    <li className='dropdown'>
                        <a href='#' className='nav-link has-dropdown'><i className='fas fa-ellipsis-h'></i> <span>Utilities</span></a>
                        <ul className='dropdown-menu'>
                            <li><a href='utilities-contact.html'>Contact</a></li>
                            <li><a className='nav-link' href='utilities-invoice.html'>Invoice</a></li>
                            <li><a href='utilities-subscribe.html'>Subscribe</a></li>
                        </ul>
                    </li>            <li><a className='nav-link' href='credits.html'><i className='fas fa-pencil-ruler'></i> <span>Credits</span></a></li>
                </ul>

                {/* <div className='mt-4 mb-4 p-3 hide-sidebar-mini'>
                    <a href='https://getstisla.com/docs' className='btn btn-primary btn-lg btn-block btn-icon-split'>
                        <i className='fas fa-rocket'></i> Documentation
                    </a>
                </div> */}
            </aside>
        </div>
    );

}

export default Sidebar;