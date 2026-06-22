import React from 'react'
import WhyCoverforce from '@/components/home/WhyCoverforce'
import Review from '@/components/home/Review'
import Explore from '@/components/home/Explore'
import CarrierResults from '@/components/home/CarrierResults'

const PricingPage = () => {
    return (
        <>
            <WhyCoverforce paddingTop={true} />
            <Review />
            <CarrierResults />
            <Explore />
        </>
    )
}

export default PricingPage