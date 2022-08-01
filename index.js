import express from 'express';
// import { StatusCodes} from 'http-status-code;

// BOA PRÁTICA UTILIZAR STATUS CODE -  npm i http-status-code

// EXERCÍCIO - TRABALHANDO COM GET

const app = express();

const PORT = process.env.PORT || 8080;
const users = [
  {
    id: 1, name: 'Rafael', age: 22,
  },
  {
    id: 2, name: 'Andre', age: 28,
  }
];

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
  return response.send('<h1>Testando o servidor com express.</h1>');
});

app.get('/users', (request, response) => {
  return response.send(users);
});

app.get('/users/:userID', (request, response) => {
  const userID = request.params.userID;
  const user = users.find(user => {
    return (user.id === Number(userID));
  });
  return response.send(user);
});

// EXERCÍCIO - TRABALHANDO COM POST 

app.post('/users', (request, response) => {
  const newUser = request.body;

  users.push(newUser);

  return response.status(201).send(newUser);
  // boa pratica alterar o 201 para 'StatusCodes.CREATED'
});

// EXERCÍCIO - TRABALHANDO COM PUT

app.put('/users/:userID', (request, response) => {
  const userID = request.params.userID;
  const updateUser = request.body;

  users = users.map(user => {
    if (userID === user.id) {
      return updateUser;
    }
    return user;
  });

  return response.send(updateUser);

});

// EXERCÍCIO - TRABALHANDO COM DELETE

app.delete('/users/:userID'), (request, response) => {
  const userID = request.params.userID;
  const deleteUser = request.body;

  users = users.filter((user) => user.id !== Number(userID));

  return response.status(StatusCodes.NO_CONTENT.send());
};
