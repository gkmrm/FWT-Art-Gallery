import { useEffect, useState } from 'react';

import { getFingerprint } from '@utils/functions/getFingerprint';

export const useFingerprint = () => {
  const [fingerprintHash, setFingerprintHash] = useState('');

  useEffect(() => {
    const setFingerprint = async () =>
      setFingerprintHash(await getFingerprint());
    setFingerprint();
  }, []);

  return fingerprintHash;
};
