import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'

import * as S from './styles'
import { remover, editar, alteraStatus } from '../../store/reducers/tarefas'
import TarefaClass from '../../models/Tarefa' // A classe tem o mesmo nome da const do componente por isso renomear para TarefaClass
import { Botao, BotaoSalvar } from '../../styles'
import * as enums from '../../utils/enums/Tarefas'

type Props = TarefaClass

const Tarefa = ({
  descricao: descricaoOriginal,
  prioridade,
  status,
  titulo,
  id
}: Props) => {
  const dispatch = useDispatch() // Const para remover os itens
  const [estaEditando, setEstaEditando] = useState(false)
  const [descricao, setDescricao] = useState('')

  // _________________________Editar o Textarea
  useEffect(() => {
    if (descricaoOriginal.length > 0) {
      setDescricao(descricaoOriginal)
    }
  }, [descricaoOriginal])
  //_____________Cancelar a edição do Textarea quando o botão do Cancelar for ativado
  function cancelarEdicao() {
    setEstaEditando(false)
    setDescricao(descricaoOriginal)
  }

  function alteraStatusTarefa(evento: ChangeEvent<HTMLInputElement>) {
    console.log(evento.target.checked)
    dispatch(
      alteraStatus({
        id,
        finalizado: evento.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={titulo}>
        <input
          type="checkbox"
          id={titulo}
          checked={status === enums.Status.CONCLUIDA}
          onChange={alteraStatusTarefa}
        />
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {titulo}
        </S.Titulo>
      </label>
      <S.Tag $parametro="prioridade" $prioridade={prioridade}>
        {prioridade}
      </S.Tag>
      <S.Tag $parametro="status" $status={status}>
        {status}
      </S.Tag>
      <S.Decricao
        disabled={!estaEditando} //! negação = editar o textearea apenas quando o botão Editar for ativo.
        value={descricao}
        onChange={(evento) => setDescricao(evento.target.value)}
      />
      <S.BarrAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    descricao,
                    prioridade,
                    status,
                    titulo,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarrAcoes>
    </S.Card>
  )
}

export default Tarefa
