import React from 'react'

export default function BtnViewAll() {
  return (
    <>
    <button className="flex items-center gap-2 text-lg font-semibold leading-8 transition-all duration-500 border-none text-primary outline-0 group hover:text-primary-hover me-7 font-body">
                  View All
                  <svg
                    className="transition-all duration-500 group-hover:translate-x-2 text-inherit"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 22 22"
                    fill="none"
                  >
                    <path
                      d="M12.7757 5.5L18.3319 11.0562M18.3319 11.0562L12.7757 16.6125M18.3319 11.0562L1.83203 11.0562"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

    </>
  )
}
