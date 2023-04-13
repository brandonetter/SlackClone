import './CreateDmsForm.css'

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDms } from '../../store/dms';


const CreateDmsForm = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [type, setType] = useState('')

    const createName = (e) => setName(e.target.value)
    const createType = (e) => setType(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

    const payload = {
        name,
        type,

    };

    dispatch(createDms(payload))

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

        <input className='createDmsName'
        type='text'
        placeholder='Dms Name'
        value ={name}
        onChange={createName}
        />

        <input className='createDmsType'
        type='text'
        placeholder='Dms Type'
        value ={type}
        onChange={createType}
        />

    <button className= 'CreateDmsBtn' type="submit">Open a direct Message</button>

    </form>

}

</div>

    </>

)

}

export default CreateDmsForm
