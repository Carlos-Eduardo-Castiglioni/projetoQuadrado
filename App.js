import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function App() {
  // Define estados para armazenar os valores dos lados e os resultados
  const [lado1, setLado1] = useState('');
  const [lado2, setLado2] = useState('');
  const [lado3, setLado3] = useState('');
  const [lado4, setLado4] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Função para lidar com o cálculo de quadrado/retângulo
  const handleCalculation = async () => {
    try {
      setError(null); // Reseta o estado de erro
      // Faz a requisição para o servidor com os parâmetros dos quatro lados
      const response = await fetch(
        `http://172.16.7.3:3030/quadrado?lado1=${lado1}&lado2=${lado2}&lado3=${lado3}&lado4=${lado4}`
      );
      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) {
        setResult(data.result); // Se a resposta for bem-sucedida, define o resultado
      } else {
        setError(data.error); // Se houver um erro, define o estado de erro
        setResult(null); // Reseta o resultado
      }
    } catch (err) {
      setError('Erro de rede ou servidor!'); // Define o erro de rede ou servidor
      setResult(null); // Reseta o resultado
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calcular Área de Quadrado/Retângulo</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 1"
        value={lado1}
        onChangeText={setLado1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 2"
        value={lado2}
        onChangeText={setLado2}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 3"
        value={lado3}
        onChangeText={setLado3}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 4"
        value={lado4}
        onChangeText={setLado4}
      />

      <Button title="Calcular Área" onPress={handleCalculation} />

      {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});
