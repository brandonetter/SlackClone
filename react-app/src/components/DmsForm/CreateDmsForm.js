import './CreateDmsForm.css'

import { useState } from 'react';
import { createDms } from '../../store/dms';
import { useSelector, useDispatch } from 'react-redux';


const CreateDmsForm = () => {

    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const createName = (e) => setName(e.target.value)

    const [error, setErrors] =useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        name,
        type,

    };

    const data = await dispatch(createDms(payload))
    if(data) setErrors(data.errors)
    console.log("DMS DATA", data)

}



const [show, setShow] = useState(false);

return sessionUser.id ? (
<>
<div>
    <button className="ExpandDmsBtn" onClick={() => setShow(!show)}>
    {show ? 'Direct Messages' : 'Direct Messages'}
    </button>
    {show && <hr />}
    {show &&

    <form className = "createDms" onSubmit={handleSubmit}>

   <div className='CreateDmError'>
        {error && error.map((error,i)=>{
            return <div key={i}>{error}</div>
        })}
     </div>

        <input className='createDmsName'
        type='text'
        placeholder='Dms Name'
        value ={name}
        onChange={createName}
        />

    <button className= 'CreateDmsBtn' type="submit">Open a direct Message</button>

    </form>
}
</div>
 </>

):
null;
}

export default CreateDmsForm
