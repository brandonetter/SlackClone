import './EditDmsForm.css'
import { editDms } from '../../store/dms'
import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';

const EditDmsForm = () => {

    const dispatch = useDispatch();
    const {dmsId} = useParams()

   const parsedId = parseInt(dmsId)

   const dms = useSelector(state => state.dms)
   let DmsName;
   let DmsType;

   if (Object.keys(dms).length){

    DmsName = dms[parsedId]
    DmsType = dms[parsedId]
 }
 const [name, setName] = useState(DmsName.name)
 const [type, setType] = useState(DmsType.type)
 const updateDmsName = (e) => setName(e.target.value)
 const updateDmsType = (e) => setType(e.target.value)
 const sessionUser = useSelector((state) => state.session.user);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        dmsId,
        name,
        type
    }

    dispatch(editDms(payload))

}

return sessionUser.is ? (
    <form className = "Editdms" onSubmit={handleSubmit}>

    <input className='EditdmsName'
    type='text'
    value ={name}
    onChange={updateDmsName}
    />

<button className= 'UpdateDmsBttn' type="submit">Update Dms</button>

</form>

):
null;

}

export default EditDmsForm
