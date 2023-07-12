import React from 'react'
import { DBLeftSections, DBRightSection } from '../components'

const Dashbrd = () => {
  return (
    <div className='w-screen h-screen flex items-center bg-primary'>
      <DBLeftSections/>
      <DBRightSection/>
    </div>
  )
}

export default Dashbrd
