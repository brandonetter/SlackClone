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


                    </div>
                    <div className='social-footer'>
                        <div>
                            <div className='social-item'>
                                <a href='https://github.com/brandonetter' target='_blank'>
                                    <img src='https://shields.io/badge/GitHub-Brandon%20Etter-400d40?logo=github&style=plastic' alt='github' />
                                </a>
                            </div>
                            <div className='social-item'>
                                <a href='https://github.com/ymao21' target='_blank' >
                                    <img src='https://shields.io/badge/GitHub-Yining%20Mao-400d40?logo=github&style=plastic' alt='github' />
                                </a>
                            </div>
                        </div>
                        <div>
                            <a href='https://github.com/brandonetter/SlackClone' target='_blank'>
                                <img src='https://shields.io/badge/GitHub-Sluck%20Repository-400d40?logo=github&style=for-the-badge' alt='github' />
                            </a>
                        </div>
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
