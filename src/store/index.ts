import { configureStore } from '@reduxjs/toolkit'

import tarefasReducer from './reducers/tarefas'
import filtroReducer from './reducers/filtro'

const store = configureStore({
  reducer: {
    tarefas: tarefasReducer,
    filtro: filtroReducer
  }
})

export type RootReducer = ReturnType<typeof store.getState>
//- Atualização automática: Se você adicionar ou remover reducers do combineReducers, o tipo de RootReducer se adapta sem precisar mexer no código.
// Essa tipagem é automática e inferida pelo TypeScript.

export default store
