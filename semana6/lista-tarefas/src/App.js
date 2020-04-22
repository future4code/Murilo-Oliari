import React from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({completa}) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

class App extends React.Component {
  state = {
    tarefas: [{
      id: Date.now(),
      texto: "Texto da tarefa",
      completa: false}],
      inputValue: '',
      filter: ''
    }

  componentDidUpdate() {
    localStorage.setItem("tarefa", JSON.stringify(this.state.tarefas))
  };
  
  componentDidMount() {
    this.setState({tarefas: JSON.parse(localStorage.getItem("tarefa"))})
  };

  onChangeInput = (event) => {
    this.setState({inputValue: event.target.value})
  }
  
  criaTarefa = () => {
    const adicionandoTarefa = this.state.tarefas
    const novaTarefa = {
      id: Date.now(),
      texto: this.state.inputValue,
      completa: false
    }
    adicionandoTarefa.push(novaTarefa)
    this.setState({tarefas: adicionandoTarefa}) 
  }
  
  selectTarefa = (id) => {
    const selecionaTarefa = this.state.tarefas.filter((tarefa) => {
      if(id === tarefa.id) {
        return this.setState({tarefa: tarefa.completa = !tarefa.completa}), true
      } else {
        return true
      }
    })
    this.setState({tarefas: selecionaTarefa})
  }
  
  onChangeFilter = (event) => {
    this.setState({filter: event.target.value})
  }
  
  render() {
    const listaFiltrada = this.state.tarefas
    .filter(tarefa => {
      switch (this.state.filter) {
        case 'pendentes':
          return !tarefa.completa
          case 'completas':
            return tarefa.completa
            default:
              return true
      }
    })
  
    return (  
      <div className="App">
        <h1>Lista de tarefas</h1>
        <InputsContainer>
          <input value={this.state.inputValue} onChange={this.onChangeInput}/>
          <button onClick={this.criaTarefa}>Adicionar</button>
        </InputsContainer>
        <br/>

        <InputsContainer>
          <label>Filtro</label>
          <select value={this.state.filter} onChange={this.onChangeFilter}>
            <option value="">Nenhum</option>
            <option value="pendentes">Pendentes</option>
            <option value="completas">Completas</option>
          </select>
        </InputsContainer>
        <TarefaList>
          {listaFiltrada.map(tarefa => {
            return (
              <Tarefa
                completa={tarefa.completa}
                onClick={() => this.selectTarefa(tarefa.id)}
              >
                {tarefa.texto}
              </Tarefa>
            )
          })}
        </TarefaList>
      </div>
    )
  }
}

export default App
