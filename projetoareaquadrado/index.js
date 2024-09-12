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
        const {base, altura} = req.query;

        

        // Verifica se todos os parâmetros estão presentes
        if (base === undefined || altura === undefined) {
            throw new Error('Parâmetros insuficientes!');
        }

        // Converte os parâmetros para números
        const bas = parseFloat(base);
        const alt = parseFloat(altura);
        

        // Verifica se os parâmetros são números válidos
        if (isNaN(bas) || isNaN(alt)) {
            throw new Error('Parâmetros inválidos!');
        }

        let result;
        
        let area
        area = bas * alt;

        //se base for igual a altura 
        if (bas == alt){
            result= `A base ${bas} vezes a altura ${alt} é um quadrado, com a área de ${area}`
        } 
        //também se base não é igual a altura
        else if(bas != alt) {
            result = `A base ${bas} vezes a altura ${alt} é um retângulo, com a área de ${area}`
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
    console.log(`API rodando em http://192.168.15.14:${port}`);
});