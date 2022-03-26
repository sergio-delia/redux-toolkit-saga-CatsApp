import logo from './logo.svg';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { getCatsFetched } from './features/catSlice';

function App() {

  const [labelInput, setLabelInput] = useState('');
  const [ricercaEffettuata, setRicercaEffettuata] = useState(false);
  const [randomCat, setRandomCat] = useState(false);
  const [ricerca, setRicerca] = useState('');
  const [limit, setLimit] = useState(10);
  const cats = useSelector((state) => state.cats.cats);
  const dispatch = useDispatch();

  console.log('Ricerca effettuata -> ', ricercaEffettuata);
  console.log('RandomCat ->', randomCat);

  useEffect(() => {

    setRandomCat(false);
    dispatch(getCatsFetched({limite: limit}));

  }, [limit]);
  
useEffect(() =>{
  if(!ricerca){
    setLimit(10);
    setRicercaEffettuata(false);
    dispatch(getCatsFetched({limite:limit}))
  }
}, [ricerca])


 console.log(cats);

 const cercaRazza = (nome) => {
   if(nome.length < 4){
     setLabelInput('Inserisci almeno 4 caratteri')
   } else {
     setLabelInput('');
     setRandomCat(false);
     setRicercaEffettuata(true);
     dispatch(getCatsFetched({ricerca: nome}));
   }
    
  }


  const getRandom = () => {

      setRandomCat(true); 
      dispatch(getCatsFetched({randomCat: true}))
      
  }

 
  const mostraTutti = () => {

    setLimit(10);
    setRandomCat(false);
    dispatch(getCatsFetched({limite: limit}));

  }
 
 
  return (
    <div className="App">
  
      <h1>Applicazione gatta</h1>
      <p>Scopri tutte le razze di gatto.</p>
      <hr />
      <p>{labelInput}</p>
      <input className="ricercaInput" type="text" value={ricerca} onChange={(e) => setRicerca(e.target.value)} />
      <button className="bottoneRicerca" onClick={()=> ricerca ? cercaRazza(ricerca) : console.log('Nessun parametro inserito')}>Cerca</button>
      <div className='Gallery'>
        {cats.map((cat) =>(
          <div key={cat.id} className="row">
            <div className='col-md-3 column column-left'>
              <img alt={cat.name} src={cat?.image?.url} width='200' height='200' />
            </div>
            <div className='col-md-9 column column-right'>
              <h2>{cat.name}</h2>
              <h5> Temperament: {cat.temperament} </h5>
              <p> {cat.description} </p>
            </div>
          </div>
        ) )}
      </div>
      {(!ricercaEffettuata && !randomCat) ? (
      <button onClick={()=> setLimit(limit+10)}>MOSTRA ANCORA</button>
      ) : 
      <button onClick={()=> mostraTutti()}>MOSTRA TUTTI</button> }
      <button onClick={()=> getRandom()}>SCOPRI LA TUA RAZZA</button>
    </div>
  );
}

export default App;
