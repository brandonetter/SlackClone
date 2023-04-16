import './CreateDmsForm.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDms } from '../../store/dms';



const CreateDmsForm = () => {

    const dispatch = useDispatch();

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
    if(data) setErrors(data.error)

}



const [show, setShow] = useState(false);

return (
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

)}

export default CreateDmsForm
