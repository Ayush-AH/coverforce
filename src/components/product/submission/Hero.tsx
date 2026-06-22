import React from 'react'
import Container from '@/components/common/Container'

const Hero = () => {
  return (
    <section className="h-screen bg-[#121C49] text-white">
      <Container borderColor="#53535380" borderBottom={true}>
        <div className="grid h-screen grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex h-full flex-col justify-center space-y-8">
            <h1 className="max-w-xl text-3xl font-heading font-normal tracking-normal text-[#0a143b] md:text-4xl lg:text-[3.5rem] lg:leading-none">
              Submission Intake
            </h1>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Hero
