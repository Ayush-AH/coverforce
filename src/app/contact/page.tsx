import React from 'react'
import Hero from '@/components/contact/Hero'
import PageWrapper from '@/components/PageWrapper'
import ContactForm from '@/components/contact/ContactForm'

const ContactPage = () => {
  return (
    <>
      <PageWrapper>
        <Hero />
        <ContactForm />
      </PageWrapper>
    </>
  )
}

export default ContactPage