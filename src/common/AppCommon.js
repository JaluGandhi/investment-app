import axios from "axios";
import { API_BASE_URL, API_CONTENT_TYPE, REDUX_AUTH_LOGOUT } from "./AppConstant";
import swal from "sweetalert";


// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   // withCredentials: true,

// });

export const api = axios.create({
  baseURL: API_BASE_URL,
  // withCredentials: true,
  headers: {
    common: { "Content-Type": API_CONTENT_TYPE }
  }

});


export function AppendJS(url, isAssync) {
  const script = document.createElement('script');
  script.src = url;
  script.async = isAssync;
  script.type = 'text/javascript'
  document.body.appendChild(script);
}

export const UnAuthorisedUserHandler = (dispatch, navigate) => {
  dispatch({ type: REDUX_AUTH_LOGOUT });
  navigate('/login');
  return;
}

export const alert = (type = '', title = '', text = '',) => {
  swal({
    title: title,
    text: text,
    icon: type,
    allowOutsideClick: false,
    allowEscapeKey: false,
    closeOnClickOutside: false,
    buttons: {
      confirm: { text: 'OK', className: 'btn-lg btn-primary' },
    },
  })
}
