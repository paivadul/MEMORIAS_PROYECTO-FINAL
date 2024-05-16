import React from 'react';

const Anecdota = ({ titulo, fecha, descripcion, media }) => {
  return (
    <div className="anecdota">
      <img src={media} alt={titulo} className="anecdota-media" />
      <div className="anecdota-info">
        <h2>{titulo}</h2>
        <p>{fecha}</p>
        <p>{descripcion}</p>
      </div>
    </div>
  );
};

const AnecdotasList = ({ anecdotas }) => {
  return (
    <div className="anecdotas-list">
      {anecdotas.map((anecdota) => (
        <Anecdota key={anecdota._id} {...anecdota} />
      ))}
    </div>
  );
};

const App = () => {
  const [anecdotas, setAnecdotas] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/anecdotas')
      .then((response) => response.json())
      .then((data) => setAnecdotas(data));
  }, []);

  return (
    <div className="app">
      <h1>MEMORIAS</h1>
      <AnecdotasList anecdotas={anecdotas} />
    </div>
  );
};

export default App;
