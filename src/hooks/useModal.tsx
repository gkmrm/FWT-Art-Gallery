import { useState } from 'react';

const useModal = () => {
  const [isShow, setIsShow] = useState(false);

  const onToggle = () => {
    setIsShow(!isShow);
  };

  return {
    isShow,
    onToggle,
  };
};

export default useModal;
