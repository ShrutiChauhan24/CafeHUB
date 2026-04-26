import React from 'react'
import ContactHero from '../components/ContactHero'
import ContactInfo from '../components/ContactInfo'
import OperatingHoursContact from '../components/OperatingHoursContact'
import ContactCTA from '../components/ContactCTA'
import CafeContactForm from '../components/CafeContactForm'
import LocationSection from '../components/LocationSection'

const ContactPage = () => {
  return (
    <div>
      <ContactHero/>
      <div className='space-y-0'>
      <ContactInfo/>
      <OperatingHoursContact/>
      <ContactCTA/>
      <CafeContactForm/>
      <LocationSection/>
      </div>
    </div>
  )
}

export default ContactPage
