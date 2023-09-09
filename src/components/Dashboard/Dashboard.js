import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

const Dasshboard = () => {

    // const { user, isAuthenticated } = useSelector((state) => state.auth);


    // const history = useHistory();

    // if (!isAuthenticated) {
    //     history.push('/')
    // }

    return (

        <div className='main-content'>
            <section className='section'>
                <div className='section-header'>
                    <h1>Blank Page</h1>
                </div>

                <div className='section-body'>
                </div>
            </section>
        </div>

    );

}

export default Dasshboard;