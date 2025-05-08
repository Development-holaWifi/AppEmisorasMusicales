import {useEffect, useState} from 'react';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {getApp, initializeApp} from 'firebase/app';
import DeviceInfo from 'react-native-device-info';
import {firebaseConfig} from '../../config/firebaseConfig/firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const useCheckVersion = () => {
  const [isOutdated, setIsOutdated] = useState(false);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const currentVersion = DeviceInfo.getVersion();
        const versionRef = doc(firestore, 'app_version', 'latest_version');
        const versionDoc = await getDoc(versionRef);

        if (versionDoc.exists()) {
          const firebaseVersion = versionDoc.data()?.version;
          if (firebaseVersion && currentVersion !== firebaseVersion) {
            setIsOutdated(true);
          }
        }
      } catch (error) {
        console.error('Error al verificar versión:', error);
      }
    };

    checkForUpdate();
  }, []);

  return isOutdated;
};
