import { TiEdit } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";

const formatNumber = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export const MyPlanesForm = ({object, name_object, length_route, 
    diametr_route, amount_work, percentage, start_work, finish_work,
    executor,updatingInInput, deletePlan}) => {
    return(
        <tr>
        <td>{object}</td>
        <td>{name_object}</td>
        <td>{formatNumber(length_route)}</td>
        <td>{diametr_route}</td>
        <td>{formatNumber(amount_work)}</td>
        <td>{percentage}</td>
        <td>{start_work}</td>
        <td>{finish_work}</td>
        <td>{executor}</td>
        <td>
            <TiEdit onClick={updatingInInput} />
            <RiDeleteBin2Line onClick={deletePlan} />
        </td>
    </tr>
    )
}
