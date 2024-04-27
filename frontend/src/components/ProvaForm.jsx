import React, { useState } from 'react';
import Prova from './Prova';
import AgendarProva from './AgendarProva';

const ProvaForm = ({setProvas, fetchData, isLoading, provas}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openAgendarModal, setOpenAgendarModal] = useState(false); 

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  const handleOpenAgendarModal = () => {
    setOpenAgendarModal(true);
  };

  const handleCloseAgendarModal = () => {
    setOpenAgendarModal(false);
  };

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };


  const contentContainerStyle = {
    maxHeight: '90vh', // Defina uma altura máxima para o conteúdo
    overflowY: 'auto', // Adicione a propriedade overflowY para permitir rolagem vertical se necessário
  };
  
  const contentStyle = {
    background: 'white',
    padding: '80px', // Ajuste o valor do padding para o tamanho desejado
    width: '100%', // Ajuste o valor da largura para o tamanho desejado
    maxWidth: '1000px', // Adicione uma largura máxima para evitar que o modal fique muito largo
    borderRadius: '8px',
    boxShadow: '0 0 100px rgba(0, 0, 0, 0.3)',
  };
  
  const closeButtonStyle = {
    position: 'relative',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };



  const modalStyle1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };


  const contentContainerStyle1 = {
    maxHeight: '90vh', // Defina uma altura máxima para o conteúdo
    overflowY: 'auto', // Adicione a propriedade overflowY para permitir rolagem vertical se necessário
  };
  
  const contentStyle1 = {
    background: 'white',
    padding: '30px', // Ajuste o valor do padding para o tamanho desejado
    width: '100%', // Ajuste o valor da largura para o tamanho desejado
    maxWidth: '1000px', // Adicione uma largura máxima para evitar que o modal fique muito largo
    borderRadius: '8px',
    boxShadow: '0 0 100px rgba(0, 0, 0, 0.3)',
  };
  
  const closeButtonStyle1 = {
    position: 'relative',
    top: '0px',
    right: '0px',
    cursor: 'pointer',
  };

  return (
    <div>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleOpenModal}
      >
        Criar Prova
      </button>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-8" onClick={handleOpenAgendarModal}> Agendar Prova </button>

      {openModal && (
        <div style={modalStyle}>
        <div style={contentContainerStyle}>
          <div style={contentStyle}>
            <button className='mb-10 bg-red-200  text-red-400 font-semibold py-1 px-3 rounded' style={closeButtonStyle} onClick={handleCloseModal} >
              X
            </button>
            <Prova
              setProvas = {setProvas}
              fetchData = {fetchData}
              closeModal={handleCloseModal}/>
          </div>
          </div>
        </div>
      )}

      {openAgendarModal && (
        <div style={modalStyle1}>
        <div style={contentContainerStyle1}>
          <div style={contentStyle1}>
            <button className='mb-10 bg-red-200  text-red-400 font-semibold py-1 px-3 rounded' style={closeButtonStyle1} onClick={handleCloseAgendarModal} >
              X
            </button>
            <AgendarProva
             provas={provas}
             isLoading={isLoading}
             closeModal={handleCloseAgendarModal}
            />
          </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProvaForm;


