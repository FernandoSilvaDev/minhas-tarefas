import { useSelector } from 'react-redux'
import Tarefa from '../../components/Tarefas'
import { MainContainer, Titulo } from '../../styles'

import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  // Fazer filtragem do Texto de busca
  const filtraTarefa = () => {
    let tarefasFiltradas = itens
    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        //toLowerCase - converter todos os caracteres de uma string para minúsculas. em se preocupar com letras maiúsculas ou minúsculas.
        (item) => item.titulo.toLowerCase().search(termo.toLowerCase()) >= 0
      )
      // refinamento da filtragem.
      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const exibeResultadoFiltrage = (quantidade: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: todas ${complementacao}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio}=${valor}`}" ${complementacao}`
    }
    return mensagem
  }

  const tarefas = filtraTarefa() // Contar o quantidade de tarefas
  const mensagem = exibeResultadoFiltrage(tarefas.length)

  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      {/* as="p" é para declarar como paragrafo, pois no Styles esta como h2 */}

      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              titulo={t.titulo}
              status={t.status}
              prioridade={t.prioridade}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
