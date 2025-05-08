import {useEffect, useState} from 'react';
import {Alert, Text, Button, Modal, View} from 'react-native';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import {initializeApp} from 'firebase/app';
import DeviceInfo from 'react-native-device-info';
import {firebaseConfig} from '../../../config/firebaseConfig/firebaseConfig';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const Checker = () => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const currentVersion = DeviceInfo.getVersion();
        const versionRef = doc(firestore, 'app_version', 'latest_version');
        const versionDoc = await getDoc(versionRef);

        if (versionDoc.exists()) {
          const firebaseVersion = versionDoc.data()?.version;
          if (firebaseVersion && currentVersion !== firebaseVersion) {
            setModalVisible(true);
          }
        }
      } catch (error) {
        console.error('Error al verificar la actualización:', error);
      }
    };

    checkForUpdate();
  }, []);

  const handleUpdate = () => {
    Alert.alert('Por favor, actualiza la app', '', [
      {
        text: 'Ir a la tienda',
        onPress: () => {
          // Redirigir a tienda (usa Linking si quieres)
        },
      },
    ]);
    setModalVisible(false);
  };

  // 🔒 Si no hay actualización, no renderiza nada
  if (!modalVisible) return null;

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        <View
          style={{
            width: 300,
            backgroundColor: '#ff0066',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            ¡Actualización disponible!
          </Text>
          <Text
            style={{marginVertical: 20, color: 'white', textAlign: 'center'}}>
            ¡Por favor, actualiza para continuar!
          </Text>
          <Button title="Actualizar ahora" onPress={handleUpdate} />
        </View>
      </View>
    </Modal>
  );
};

export default Checker;
