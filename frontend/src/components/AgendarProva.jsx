import React, { useState } from "react";
import axios from 'axios';

const AgendarProva = ({ provas, isLoading, closeModal}) => {

    const handleClick = async (prova) => {
        try{
            //await axios.post('http://localhost:7777',prova)
            console.log(prova)
            closeModal()
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div >
            <div className="pb-6">Selecione a Prova a Agendar:</div>
            <table className=" w-80 max-w-4xl">
                <thead className="border-4 border-black bg-indigo-200">
                    <tr>
                        <th className="p-3 text-sm font-semibold tracking-wide center">Provas</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan="1" className="p-3 text-sm text-center">
                                Is Loading
                            </td>
                        </tr>   
                    ) : (
                        <>
                            {provas.map((provaItem, index) => (
                                <tr
                                    key={provaItem.id}
                                    className={`border bg-indigo-100 border-black cursor-pointer hover:bg-gray-200`}
                                    onClick={() => handleClick(provaItem)}
                                >
                                    <td title={provaItem.id} className="p-3 text-sm text-center">
                                        {provaItem.exam_identifier}
                                    </td>
                                </tr>
                            ))}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AgendarProva;
