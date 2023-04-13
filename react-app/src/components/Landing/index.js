import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';
function Landing() {
    const user = useSelector(state => state.session.user);
    const [redirect, setRedirect] = useState(false);
    const demoData = () => {
        if (user)
            return (
                <>
                    {redirect && <Redirect to="/chat" />}
                    <div className='landing-demo-room-container'>
                        <div className='landing-demo-room'>
                            <div className='landing-demo-room-title'>Demo Server</div>
                            <div className='landing-demo-room-description'>This is a demo server</div>
                            <div className='landing-demo-room-enter-button' onClick={() => setRedirect(true)}>Enter</div>
                        </div>
                    </div>
                </>
            );
        if (!user)
            return (
                <><h1>Landing</h1>
                    <div>Show off app here. Landing Page</div>
                    <div>asdas</div>
                </>
            );
    }

    return (
        <div>

            {demoData()}
            {/* {user && <Redirect to="/chat" />} */}
        </div>
    )
}
export default Landing;
