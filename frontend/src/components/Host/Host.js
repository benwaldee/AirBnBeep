import './Host.css'
import { getUserSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import AddSpotForm from './AddSpotForm'
import SmallSpotCard from './SmallSpotCard';
import { Modal, useModalContext } from '../../context/Modal';
import EditSpotForm from './EditSpotForm';

const Host = () => {
    const { showLoginFormHost, setShowLoginFormHost } = useModalContext();
    const [showAddSpot, setShowAddSpot] = useState(false)
    const [renderToggle, setRenderToggle] = useState(false)
    const [clickedEdit, setClickedEdit] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserSpotsThunk())
    }, [showAddSpot])

    useEffect(() => {
        setShowLoginFormHost(false)
    }, [])

    const addSpotFunc = () => {
        setClickedEdit(false)
        setShowAddSpot(!showAddSpot)
    }


    let userSpotObj = useSelector((state) => state?.spots?.allUserSpots)

    let userSpotArr
    if (userSpotObj) { userSpotArr = Object.values(userSpotObj) }

    return (
        <>
            <div className="addSpotOuter">
                <div className='addSpotInner'>
                    <div className="today">Start today.</div>
                    <div className="hostSoon">List your mobile spot today! Just add a few details to create a dream getaway. </div>
                    <div className='listingButton' onClick={addSpotFunc}>Add a listing</div>
                </div>
            </div>
            {showAddSpot && < AddSpotForm
                showAddSpot={showAddSpot}
                setShowAddSpot={setShowAddSpot}

            />}
            {clickedEdit && <EditSpotForm
                clickedEdit={clickedEdit}
                setClickedEdit={setClickedEdit}
                setRenderToggle={setRenderToggle}
                renderToggle={renderToggle}
                showAddSpot={showAddSpot}
                setShowAddSpot={setShowAddSpot}
            />}
            <div className='userSpotsTitleOuter'>
                <div className='userSpotsTitle'> Your listings</div>
            </div>
            <div className='userSpotsOuter'>
                <div className='userSpotsInner'>
                    {userSpotArr?.map((spot) => {
                        return (
                            <SmallSpotCard
                                key={spot.id}
                                spot={spot}
                                setRenderToggle={setRenderToggle}
                                renderToggle={renderToggle}
                                clickedEdit={clickedEdit}
                                setClickedEdit={setClickedEdit}
                                showAddSpot={showAddSpot}
                                setShowAddSpot={setShowAddSpot}

                            />
                        )
                    })}
                </div>
            </div>



        </>
    )
}

export default Host
