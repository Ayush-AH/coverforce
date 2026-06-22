import React from 'react'
import Explore from '@/components/home/Explore'
import Review from '@/components/home/Review'
import WhyCoverforce from '@/components/home/WhyCoverforce'
import Hero from '@/components/product/submission/Hero'

const IntelligencePage = () => {
    return (
        <>
            <Hero />
            <WhyCoverforce paddingTop={true} />
            <Review />
            <Explore />
        </>
    )
}

export default IntelligencePage
