import React from "react"
import { MdOutlineDeleteOutline, MdEditNote} from 'react-icons/md'
import axios from 'axios'


const Table = ({provas, setProvas, isLoading}) => {



    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:7200/api/prova/${id}/`)
            const newProvas = provas.filter( prova => prova.id != id)
            setProvas(newProvas)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="py-8">
        <table className=" w-11/12 max-w-4xl">
            <thead className="border-b-2 border-black">
                <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Provas</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Tipo Exame</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Duração</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">UC</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th>
                </tr>
            </thead>
            <tbody>
            {isLoading ? <div>Is Loading</div>:
            <>
            {provas.map( (provaItem, index) => {
                return (
            
                <tr key={provaItem.id} className="border-b border-black">
                    <td title={provaItem.id} className="p-3 text-sm text-left">{provaItem.exam_identifier}</td>
                    <td className="p-3 text-sm text-left">{provaItem.exam_type}</td>
                    <td className="p-3 text-sm text-left">{provaItem.duracao}</td>
                    <td className="p-3 text-sm text-left">{provaItem.UC}</td>
                    <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                        <span title='Não Implementado'  className="text-xl cursor-pointer"><MdEditNote /></span>
                        <span className="text-xl cursor-pointer"><MdOutlineDeleteOutline onClick={ () => handleDelete(provaItem.id)}/></span>
                    </td>
                </tr>
                )})
            }</>}
            </tbody>
        </table>

        </div>
    )
}

export default Table