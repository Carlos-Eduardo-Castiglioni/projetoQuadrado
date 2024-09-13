// Importa React e useState para gerenciar estado
import React, { useState } from 'react';
// Importa componentes do React Native
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// Define o componente principal App
export default function App() {
  // Define estados para armazenar os valores de base, altura, resultado e erro
  const [base, setBase] = useState('');
  const [altura, setAlturaQuad] = useState('');
  const [quadResult, setQuadResult] = useState(null);
  const [quadError, setQuadError] = useState(null);

  // Função para lidar com o cálculo do quadrado/retângulo
  const handleQuadrado = async () => {
    try {
      setQuadError(null); // Reseta o estado de erro
      // Faz a requisição para o servidor com os parâmetros base e altura
      const response = await fetch(
        `http://192.168.15.14:3030/quadrado?base=${base}&altura=${altura}`
      );
      const data = await response.json(); // Converte a resposta para JSON

      if (response.ok) {
        setQuadResult(data.result); // Se a resposta for bem-sucedida, define o resultado
      } else {
        setQuadError(data.error); // Se houver um erro, define o estado de erro
        setQuadResult(null); // Reseta o resultado
      }
    } catch (err) {
      setQuadError('Erro de rede ou servidor!'); // Define o erro de rede ou servidor
      setQuadResult(null); // Reseta o resultado
    }
  };

  return (
     // Contêiner principal da aplicação
    <View style={styles.container}>
      <Text style={styles.title}>Calcular Área de Quadrado/Retângulo</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Base"
        value={base}
        onChangeText={setBase}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Altura"
        value={altura}
        onChangeText={setAlturaQuad}
      />

      <Button title="Calcular Área" onPress={handleQuadrado} />

      {quadResult !== null && <Text style={styles.result}>Resultado: {quadResult}</Text>}
      {quadError && <Text style={styles.error}>Erro: {quadError}</Text>}
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
