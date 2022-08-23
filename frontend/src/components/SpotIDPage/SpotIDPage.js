import './SpotIDPage.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllSpotsThunk } from '../../store/spots'

const SpotIDPage = () => {

    let { spotID } = useParams()
    spotID = parseInt(spotID)

    const dispatch = useDispatch()
    let oneSpot;

    useEffect(() => {
        dispatch(getAllSpotsThunk())
        // dispatch(getSpotByIDThunk(spotID))
    }, [])

    // const oneSpot = useSelector((state) => state.spots?.oneSpot)
    const findSpot = useSelector((state) => state.spots?.allSpots)

    if (findSpot) { oneSpot = findSpot[spotID] }



    return (
        <div className='spotIDOuterDiv'>
            <div className='spotIDInnerDiv'>
                <div className='spotIDTitle'> {oneSpot?.name}</div>
            </div>
        </div>
    )
}

export default SpotIDPage
