import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themeChangerSlice';
import Button from './Button';

const ThemeSwitch = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.themeChanger.theme);

  const toggleThemeSwitch = useCallback(() => {
    console.log(theme);
    dispatch(toggleTheme());
  }, [dispatch]);

  return (
    <Button btnBgtype='btn-danger' onClick={toggleThemeSwitch}>Change Theme</Button>
  );
};

export default ThemeSwitch;
