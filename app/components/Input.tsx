'use client'

// import {Roboto } from 'next/font/google'
// const roboto = Roboto({ subsets: ['latin'] })

import '@fontsource/roboto'

export default function Input() {
  return (
    <input 
    maxLength={1}
    className="h-14 w-14 border-2 border-white/20 bg-transparent text-center font-[Roboto] text-3xl font-bold uppercase text-white outline-none transition-transform duration-200 caret-transparent">
    </input>
  )
}
