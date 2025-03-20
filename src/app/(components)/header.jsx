import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../page';

export default function Header({ handleTheme }) {
  const theme = useContext(ThemeContext);
  return (
    <div className='w-full bg-amber-600 text-3xl text-amber-100 font-bold p-5 rounded-2xl flex justify-between items-center'>
        <h1>Todo App</h1>
        <button className='w-10 h-full cursor-pointer' onClick={() => handleTheme()}><FontAwesomeIcon icon={(theme === 'light') ? faMoon : faSun} /></button>
    </div>
  )
}
