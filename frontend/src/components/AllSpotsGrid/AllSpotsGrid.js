import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import SpotCard from './SpotCard'

const AllSpotsGrid = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllSpotsThunk())
    }, [])

    let spotArr = useSelector((state) => state.spots.Spots)

    return (
        <div id='outerAllSpotsDiv'>
            <div id='innerAllSpotsDiv'>
                {spotArr.map((spot) => {
                    return (
                        <SpotCard spot={spot} />
                    )
                })}
            </div>
        </div>
    )
}

export default AllSpotsGrid
