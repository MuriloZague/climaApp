import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { fetchWeather, getIconUrl } from '../api/weatherApi';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [greeting, setGreeting] = useState('');

  const updateGreeting = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
      setGreeting('Bom dia!');
    } else if (hours < 18) {
      setGreeting('Boa tarde!');
    } else {
      setGreeting('Boa noite!');
    }
  };

  useEffect(() => {
    updateGreeting();
    setInterval(updateGreeting, 600);
    
  }, []);

  const handleFetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#292A4E', '#715C77', '#C75C2E']}
    >
      <Text style={styles.title}>{greeting}</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {weather && (
        <View style={styles.weatherInfo}>
          
          <Image
            style={styles.icon}
            source={{ uri: getIconUrl(weather.weather[0].icon) }}
          />
          <Text style={styles.weatherTemp}>{weather.main.temp.toFixed(1)} °C</Text>
          <Text style={styles.weather}>Clima: {weather.weather[0].description}</Text>
          <Text style={styles.weather}>Umidade: {weather.main.humidity} %</Text>
          <Text style={styles.weather}>Velocidade do Vento: {weather.wind.speed} m/s</Text>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Insira a cidade"
        placeholderTextColor={'#fff'}
        value={city}
        onChangeText={setCity}
      />
      <TouchableOpacity onPress={handleFetchWeather} style={styles.button}>
        <Text style={{ color: '#fff' }}>Pesquisar</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 45,
  },
  weatherInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  weather: {
    color: '#fff',
    marginBottom: 5,
  },
  weatherTemp: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 40,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  icon: {
    width: 120,
    height: 105,
  },
  input: {
    marginTop: 25,
    textAlign: 'center',
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    width: '60%',
    color: 'white',
  },
  button: {
    backgroundColor: '#349',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default WeatherApp;