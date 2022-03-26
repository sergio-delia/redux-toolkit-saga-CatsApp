import {call, put, takeEvery, take} from 'redux-saga/effects';
import {getCatsSuccess, getCatsFailed} from '../features/catSlice';

// IN REDUX SAGA ESISTONO 2 COMPONENTI PRINCIPALI: WATCHER E WORKER. 
// I WATCHER CONTROLLANO LA CHIAMATA E PASSANO AL WORKER

//WATCHER
function* watcherCat(){
    
    //TAKEEVERY CONTROLLA LA CHIAMATA E ESEGUE IL WORKER
    yield takeEvery('cats/getCatsFetched', workerGetCats)

}


//WORKER
function* workerGetCats(action){

    console.log(action.payload);
    const limit = action.payload.limite || 10;    
    const ricerca = action.payload.ricerca;
    const {randomCat} = action.payload;
    let formattedCats = [];
    let catsList = [];

    
    //    const cats = yield call(()=> fetch('https://api.thecatapi.com/v1/breeds'));
    //    const formattedCats = yield cats.json();
 
   
    //CON IL CALL FACCIAMO LA CHIAMATA API
    formattedCats = yield call(() => fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json() )
    );


    if (ricerca){

        catsList  = formattedCats.filter((cat) => cat.name.toLowerCase().indexOf(ricerca.toLowerCase()) >= 0);

    } else if(randomCat){

        const random = Math.floor(Math.random() * formattedCats.length);
        catsList.push(formattedCats[random]);

    }else {

        catsList = formattedCats.slice(0, limit);
    }   
    

    //INFINE INVIAMO CON PUT ALL'ACTION DI NOSTRO INTERESSE
    yield put(getCatsSuccess(catsList));


}





export default watcherCat;