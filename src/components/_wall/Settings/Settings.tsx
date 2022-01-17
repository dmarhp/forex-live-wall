import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setTimeFrame } from '../../../store/settingSlice';

const Settings = () => {
  console.log('<Settings />');
  const dispatch = useAppDispatch();

  const options = [1, 3, 5, 10, 999999];

  return (
    <div>
      {options.map((option) => (
        <button onClick={() => dispatch(setTimeFrame(option))} key={option}>
          {`${option} sec`}
        </button>
      ))}
    </div>
  );
};

export default Settings;
