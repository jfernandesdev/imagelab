import React from 'react'

interface IHeader {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: IHeader ) => {
  return (
    <>
      <h3 className="h3-semibold text-dark-600">{title}</h3>
      {subtitle && <p className="p-16-regular mt-1">{subtitle}</p>}
    </>
  )
}

export default Header