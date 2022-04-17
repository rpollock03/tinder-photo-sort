import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import Main from "./Main/index"

export default function App() {
  return (
    <>
      <Main/>
      <StatusBar style="auto" />
    </>
  );
}

