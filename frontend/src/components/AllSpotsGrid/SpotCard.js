import { getAllSpotsThunk } from "../../store/spots"
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';


const SpotCard = ({ spot }) => {

    return (
        <div id='outerSpotCardDiv'>
            <div id='innerSpotCardDiv'>
                {spot.name}
            </div>
        </div>
    )
}

export default SpotCard
