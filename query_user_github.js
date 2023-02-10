const usuario = "fagner-fmlo";
const url = `https://api.github.com/users/${usuario}`;

fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Não foi possível obter informações sobre o usuário especificado.');
  })
  .then(responseJson => {
    const nome = responseJson.name || 'Desconhecido';
    const idUsuario = responseJson.id;
    let dataCriacao = responseJson.created_at || '';
    const match = dataCriacao.match(/\d{4}-\d{2}-\d{2}/);
    dataCriacao = match ? match[0] : '';
    const texto = `Olá, ${nome}! Seu ID de usuário é ${idUsuario} e sua conta foi criada em ${dataCriacao}`;
    console.log(texto);
  })
  .catch(error => console.error(error));
