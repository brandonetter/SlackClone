import './DmsDetail.css'
import { useSelector, useDispatch } from 'react-redux';
import {  useEffect } from 'react';
import { getUsersInRoom } from '../../store/channel';
import { useParams } from 'react-router-dom';
import { getDms } from '../../store/dms';

const DmsDetail = () => {

    const {dmsId} = useParams();
    const dispatch = useDispatch();
    const dmsobj = useSelector(state => state.dms)
    const dmsInfo = dmsobj[parseInt(dmsId)]

    useEffect(() => {
        dispatch(getDms())
    },[dispatch])

    return (
        <>
        <div className= 'dmsDetails'>
         {(dmsInfo) && (
            <div>
              Name: {dmsInfo.name}
              <br/>
              Created By: {dmsInfo.createdby}
              <br/>
             </div>
         )}
      </div>
        </>
    )
}
export default DmsDetail
