const express = require('express');
const morgan = require('morgan');
const { swaggerUi, specs } = require('./swagger'); // Importe a configuração do Swagger
const app = express();
const port = 3030;

// Middleware para parsing de parâmetros de consulta
app.use(express.json());

// Configuração personalizada do morgan para incluir o IP do cliente
morgan.format('custom', ':remote-addr :method :url :status :response-time ms');
app.use(morgan('custom')); // Usa o formato personalizado para o log

app.get('/quadrado', (req, res, next) => {
    try {
        const { lado1, lado2, lado3, lado4 } = req.query;

        // Verifica se todos os parâmetros estão presentes
        if (lado1 === undefined || lado2 === undefined || lado3 === undefined || lado4 === undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const lad1 = parseFloat(lado1);
        const lad2 = parseFloat(lado2);
        const lad3 = parseFloat(lado3);
        const lad4 = parseFloat(lado4);

        // Verifica se os parâmetros são números válidos
        if (isNaN(lad1) || isNaN(lad2) || isNaN(lad3) || isNaN(lad4)) {
            throw new Error('Parâmetros inválidos!');
        }

        let result;

        if (lad1 === lad2 && lad2 === lad3 && lad3 === lad4) {
            // Quadrado
            const area = lad1 * lad1;
            result = `O quadrado com lado de ${lad1} tem uma área de ${area}.`;
        } else if (lad1 === lad3 && lad2 === lad4) {
            // Retângulo
            const area = lad1 * lad2;
            result = `O retângulo com base ${lad1} e altura ${lad2} tem uma área de ${area}.`;
        } else {
            result = 'Os lados fornecidos não formam um quadrado nem um retângulo.';
        }

        res.json({ result });
    } catch (error) {
        next(error); // Passa o erro para o middleware de tratamento
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack); // Log do erro
    res.status(400).json({ error: err.message }); // Responde com a mensagem de erro
});

app.listen(port, () => {
    console.log(`API rodando em http://172.16.7.3:${port}`);
});