import { StatusBar } from 'expo-status-bar';
import WeatherApp from './src/screens/weatherApp';

export default function App() {
  return (
    <>
      <WeatherApp/>
      <StatusBar style="light" />
    </>
  );
}