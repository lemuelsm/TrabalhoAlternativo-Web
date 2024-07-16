import React, { useState, useEffect } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



const App = () => {

      const baseUrl = "https://localhost:7125/api/Tarefas";

      const [data, setData] = useState([]);
      const [dadosAtualizados, setDadosAtualizados] = useState(true);
      const [tarefaSalva, setTarefaSalva] = useState({
        id:'',
        descricao: ''
      })
      const [modalEditar, setModalEditar] = useState(false);
      const [modalExcluir, setModalExcluir] = useState(false);

      const abrirFecharModalEditar=()=>{
        setModalEditar(!modalEditar);
      }

      const abrirFecharModalExcluir=()=>{
        setModalExcluir(!modalExcluir);
      }

      const selecionarTarefa = (tarefa, opcao) => {
        setTarefaSalva(tarefa);
        (opcao === "Editar") ?
          abrirFecharModalEditar() : abrirFecharModalExcluir();
      }

      const handleChange = e=>{
        const {name, value} = e.target;
        setTarefaSalva({
          ...tarefaSalva, [name]:value
        });
        console.log(tarefaSalva);
      }

      const pedidoGet = async()=>{
        await axios.get(baseUrl)
        .then(response => {
          setData(response.data)
        }).catch(error=>{
          console.log(error);
        })
      }

      const pedidoPost = async()=>{


        delete tarefaSalva.id;

        await axios.post(baseUrl, tarefaSalva)
        .then(response => {
          setDadosAtualizados(true);
          setData(data.concat(response.data));
        }).catch(error=>{
          console.log(error);
        })
      }

      const pedidoPut = async() => {
        await axios.put(baseUrl+"/"+tarefaSalva.id, tarefaSalva)
        .then(response=>{
          var resposta = response.data;
          var dataAux = data;
          dataAux.forEach(tarefa=>{
            if(tarefa.id === tarefaSalva.id) {
              tarefa.descricao = resposta.descricao;
            }
          });
          setDadosAtualizados(true);
          abrirFecharModalEditar();
        }).catch(error=>{
          console.log(error);
        })
      }

      const pedidoDelete = async() => {
        await axios.delete(baseUrl+"/"+tarefaSalva.id)
        .then(response=>{
          setData(data.filter(tarefa => tarefa.id !== response.data));
          setDadosAtualizados(true);
          abrirFecharModalExcluir();
        }).catch(error => {
          console.log(error);
        })
      }



      useEffect(()=>{
        if (dadosAtualizados) {
          pedidoGet();
          setDadosAtualizados(false);
        }
      }, [dadosAtualizados]);

      

      return (
      
        <div>

          <h1>Lista de Tarefas</h1>
          <form>
              <input id="campoCriaTarefa" placeholder="Digite sua nova tarefa" 
                name="descricao"
                onChange={handleChange}
                
              ></input>
              <button 
                id="buttonCreate" 
                type="submit"
                onClick={pedidoPost}
                >Criar tarefa</button>

          </form>

          {/* Lista */}
          <div id="lista" className="lista">
              {data.map(tarefa=>(
                <div className='container'>
                  <div className='text'>{tarefa.descricao}</div>
                  <button className='btn-delete'onClick={()=>selecionarTarefa(tarefa, "Excluir")}>Apagar</button>
                  <button className='btn-edit' onClick={()=>selecionarTarefa(tarefa, "Editar")}>Editar</button>
                </div>
              ))}
          </div>

          <Modal isOpen={modalEditar} centered={true}>
            <ModalHeader>Editar tarefa</ModalHeader>
              <ModalBody>
                <div className='container-edit'>

                  <div>
                    <label>ID: </label>
                    <input type='text' readOnly value={tarefaSalva && tarefaSalva.id}></input>
                  </div>

                  <div>
                    <label>Descrição: </label>
                    <input type='text' className='input-edit' name='descricao' onChange={handleChange}
                    value={tarefaSalva && tarefaSalva.descricao}></input>
                  </div>
                  
                </div>
              </ModalBody>
              <ModalFooter>
                <button className='btn btn-primary' onClick={pedidoPut}>Editar</button>
                <button className='btn btn-danger' onClick={abrirFecharModalEditar}>Cancelar</button>
              </ModalFooter>
          </Modal>

          <Modal isOpen={modalExcluir} centered={true}>
            <ModalBody>
              Tem certeza que deseja excluir essa tarefa ?
            </ModalBody>
            <ModalFooter>
              <button className="buttonYes" onClick={()=>pedidoDelete()}>Sim</button>
              <button className="buttonNo" onClick={()=>abrirFecharModalExcluir()}>Não</button>
            </ModalFooter>
          </Modal>

        </div>

      );



};

export default App;
