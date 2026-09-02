const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let conexoes = [
    { id: 1, nome: "ZeroEsquerdo", email: "ZeroEsquerda@gamil.com", foto: "assets/images/unnamed.zerojpg", cargo: "Membro", subtexto:""},
    { id: 3, nome: "PiorAinda", email: "piorainda@email.com", foto: "assets/images/placeholder_perfil3.png", cargo: "Membro", subtexto: "Th3usツ" },
  { id: 4, nome: "SabeNada", email: "sabenada@email.com", foto: "assets/images/placeholder_perfil4.png", cargo: "Membro", subtexto: "deus_supremo" },
  { id: 5, nome: "FazNada", email: "faznada@email.com", foto: "assets/images/placeholder_perfil5.png", cargo: "Membro", subtexto: "moon" }

];

app.get('/api/conexoes', (req, res) => {
    const novaConexao = { id: Date.now(), ...req.body};
    conexoes.push(novaConexao);
    res.status(201).json(novaConexao);
});

app.delete('/api/conexoes/:id', (req, res) => {
  const id = Number(req.params.id);
  conexoes = conexoes.filter(item => item.id !== id);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
