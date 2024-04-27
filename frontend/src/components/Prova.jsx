import React, { useState } from "react"
import { MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md'
import axios from 'axios'

const Prova = ({setProvas, fetchData, closeModal}) => {

  //const [questoes, setQuestoes] = useState([{ id: 1, opcoes: [{ id: 1, isChecked: false }] }]);


  const [questoes, setQuestoes] = useState([
    {
      id: 1,
      pergunta: '',
      opcoes: [{ id: 1, texto: '', isChecked: false }],
      cotacao: 0
    },
  ]);



  const [dadosProva, setDadosProva] = useState({
    'exam_type': 'enunciado',
    "exam_identifier": '',
    "duracao": '',
    "UC": '',
  });




  const handleToggleCheckbox = (questaoId, opcaoId) => {
    const updatedQuestoes = questoes.map((q) => {
      if (q.id === questaoId) {
        return {
          ...q,
          opcoes: q.opcoes.map((opcao) => {
            if (opcao.id === opcaoId) {
              return { ...opcao, isChecked: !opcao.isChecked };
            }
            return opcao;
          }),
        };
      }
      return q;
    });
    setQuestoes(updatedQuestoes);
  };

  const handleChange = (e,fieldName) => {
    setDadosProva(prev => ({
      ...prev,
      [fieldName]: e.target.value
    }))
  }

  const handleAddQuestao = () => {
    const novaQuestao = {
      id: questoes.length + 1,
      pergunta: '', // Inclua o texto da pergunta aqui
      opcoes: [{ id: 1, texto: '', isChecked: false }], // Inclua o texto da opção aqui
      cotacao: 0,
    };
    const newQuestoes = [...questoes, novaQuestao];
    setQuestoes(newQuestoes);
  };



  const handlePerguntaChange = (e, questaoId, campo) => {
    const updatedQuestoes = questoes.map((q) => {
      if (q.id === questaoId) {
        return {
          ...q,
          [campo]: campo === "cotacao" ? parseInt(e.target.value, 10) : e.target.value,
        };
      }
      return q;
    });
    setQuestoes(updatedQuestoes);
  };






  const handleAddOpcaoParaQuestao = (questaoId) => {
    const updatedQuestoes = questoes.map((q) => {
      if (q.id === questaoId) {
        return {
          ...q,
          opcoes: [
            ...q.opcoes,
            { id: q.opcoes.length + 1, texto: '', isChecked: false },
          ],
        };
      }
      return q;
    });
    setQuestoes(updatedQuestoes);
  };


  const handleOpcaoChange = (e, questaoId, opcaoId) => {
    const updatedQuestoes = questoes.map((q) => {
      if (q.id === questaoId) {
        return {
          ...q,
          opcoes: q.opcoes.map((opcao) => {
            if (opcao.id === opcaoId) {
              return {
                ...opcao,
                texto: e.target.value,
              };
            }
            return opcao;
          }),
        };
      }
      return q;
    });
    setQuestoes(updatedQuestoes);
  };






  const handleCriarProva = async () => {

    // Cria um objeto JSON com os dados da prova
    const newProva = {
      "exam_type": dadosProva.exam_type,
      "exam_identifier": dadosProva.exam_identifier,
      "duracao": dadosProva.duracao + " minutos",
      "UC": dadosProva.UC,
      "questions": questoes.map((questao) => {
        const opcoes = questao.opcoes.map((opcao) => opcao.texto);
        const opcaoCorreta = questao.opcoes.find((opcao) => opcao.isChecked);
    
        return {
          type: "multiple_choice",
          question_text: questao.pergunta,
          options: opcoes,
          correct_answer: opcaoCorreta ? opcaoCorreta.texto : null,
          grading_value : questao.cotacao,
        };
      }),
    };

    try {
      await axios.post('http://127.0.0.1:7200/api/prova/', newProva)
      setProvas( prevProvas => [...prevProvas, newProva])
      fetchData()
      closeModal()
    } catch (error) {
      console.log(error);
    }



    // Adicione lógica para salvar ou processar o JSON conforme necessário
    console.log(newProva);
  };




  


  





    return (
<div class="w-full max-w-lg ">
  <div class="flex flex-wrap -mx-3 mb-6">
    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-first-name">
        Nome Prova
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" 
              onChange={(e) => handleChange(e, "exam_identifier")}value={dadosProva.nomeProva}
              />
    </div>

    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-state">
        Tipo
      </label>
      <div class="relative">
        <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Enunciado</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>

  <div class="flex flex-wrap -mx-3 mb-2">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" for="grid-city">
        UC
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="ex. Matemática" 
      onChange={(e) => handleChange(e, "UC")}value={dadosProva.UC}/>
    </div>

    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-ss font-bold mb-2" for="grid-zip">
        Duração
      </label>
      <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90" 
      onChange={(e) => handleChange(e, "duracao")}value={dadosProva.duracao}/>
      <p class="text-gray-600 text-xs italic">Tempo em minutos</p>
    </div>
  </div>


  {questoes.map((questao, index) => (
  <div className="flex flex-wrap -mx-3 mb-2 bg-indigo-300 rounded p-3 mt-8">
      <div key={questao.id} class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2" htmlFor={`questao-${questao.id}`}>
            Questão {index + 1}
          </label>
          <div class="w-full py-2 px-3 md:mb-0">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Tipo Questão
                </label>
                <div class="relative">
                    <select class="block appearance-none w-auto bg-gray-200 border border-gray-200 text-gray-700 py-3 px-10 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                        <option>Escolha Múltipla</option>
                    </select>
                    
                    <div class="pointer-events-none absolute inset-y-0 left-auto flex items-center px-2 text-gray-700">
                        <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                <div className="mt-5 ">
                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                    Cotação
                </label>
                <input class="appearance-none block w-20 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="number"
                       value={questao.cotacao}
                       onChange={(e) => handlePerguntaChange(e, questao.id, "cotacao")} />
                </div>
          </div>
      
          <div className="px-3 py-2">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                  pergunta
              </label>
              <input class="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" 
                       value={questao.pergunta}
                       onChange={(e) => handlePerguntaChange(e, questao.id, "pergunta")} />
              <p class="text-gray-600 text-xs italic w-80">A resposta correta deverá ser a opção com a caixa assinalada</p>
          </div>
          <div className="flex flex-wrap px-3 py-2 w-96" >
            {/* Renderizando campos de opção dinamicamente */}
            {questao.opcoes.map((opcao, opcaoIndex) => (
              <div key={opcao.id} className="flex flex-wrap px-3 py-2 w-96">

                <span className="inline-block cursor-pointer"onClick={() => handleToggleCheckbox(questao.id, opcao.id)}>
                {opcao.isChecked ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                </span>
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 px-1" htmlFor={`grid-city-${opcao.id}`}>
                {`Opção ${opcaoIndex + 1}`}
                </label>
                <input className="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id={`grid-city-${opcao.id}`} type="text" 
                       value={opcao.texto}
                       onChange={(e) => handleOpcaoChange(e, questao.id, opcao.id)}/>
              </div>
            ))}
          </div>
          <button className="bg-gray-200 hover:bg-gray-100 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-2 mt-5 ml-2" onClick={() => handleAddOpcaoParaQuestao(questao.id)}>
              +
          </button>
      </div>
  </div>
  ))}


  <div class=" py-4">
    <button class="bg-gray-200 hover:bg-gray-100 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={handleAddQuestao}>
        Nova Questão
    </button>
  </div>

  <div class="py-10">
    <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={handleCriarProva}>
        Criar Prova
    </button>
  </div>

</div>
    )
}

export default Prova