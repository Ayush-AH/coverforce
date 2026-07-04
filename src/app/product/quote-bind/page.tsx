import React from 'react'
import WhyCoverforce from '@/components/home/WhyCoverforce'
import Review from '@/components/home/Review'
import Hero from '@/components/product/quote/Hero'
import CarrierMatch from '@/components/product/quote/CarrierMatch'
import QuoteWorkFlow from '@/components/product/quote/QuoteWorkFlow'
import PageWrapper from '@/components/PageWrapper'

const QuoteBindPage = () => {
    return (
        <>
            <PageWrapper>
                <Hero />
                <CarrierMatch />
                <QuoteWorkFlow />
                <WhyCoverforce paddingTop={true} />
                <Review />
            </PageWrapper>
        </>
    )
}

export default QuoteBindPage