import './SpotIDPage.css'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { getSpotByIDThunk } from '../../store/spots'

const SpotIDPage = () => {

    let { spotID } = useParams()
    spotID = parseInt(spotID)

    const dispatch = useDispatch()


    useEffect(() => {

        dispatch(getSpotByIDThunk(spotID))

    }, [])


    return (
        <div className='spotIDOuterDiv'>
            <div className='spotIDInnerDiv'>
                <div className='spotIDTitle'></div>
            </div>
        </div>
    )
}

export default SpotIDPage
