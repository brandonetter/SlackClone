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
                <>
                <div className='landingpage'>
                <h1 className='welcomeback'>Welcome Back</h1>

                    <h1 className='landingfirsth'>One Platform For Your Team and Your Work</h1>
                    <h2 className='landingsecondh'>All the features work together so you can too.</h2>

                    <h1 className='landingthirdh'>Discover a new way of working</h1>
                    <h2 className='landingfourthh'>Bring the right people and information together in channels. Share ideas, make decisions and move work forward with a common purpose and place.</h2>

                    <h1 className='landingfifthh'>Login to Discover</h1>

                    </div>
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
