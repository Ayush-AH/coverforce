import React from 'react'
import WhyCoverforce from '@/components/home/WhyCoverforce'
import Hero from '@/components/product/intelligence/Hero'
import IntelligenceWorkFlow from '@/components/product/intelligence/IntelligenceWorkFlow'
import Appetite from '@/components/product/intelligence/Appetite'
import ExplorePlatform from '@/components/product/intelligence/ExplorePlatform'
import CommingSoon from '@/components/product/intelligence/CommingSoon'

const IntelligencePage = () => {
    return (
        <>
            <Hero />
            <IntelligenceWorkFlow />    
            <Appetite />
            <ExplorePlatform />
            <WhyCoverforce paddingTop={true} />
            <CommingSoon />
        </>
    )
}

export default IntelligencePage
