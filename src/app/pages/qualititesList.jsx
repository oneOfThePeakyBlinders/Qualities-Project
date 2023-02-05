import React from "react";
import {useHistory} from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import {useQualities} from "../hooks/useQualities";

const QualitiesListPage = () => {
    const history = useHistory();
    //console.log(history.id)
    const {deleteQuality, qualities} = useQualities();

    const handleEdit = (param) => {
        console.log(param);
        history.push(`/edit/${param}`);
    };
    const handleDelete = (param) => {
        // const filter = qualities.filter((item) => {
        //     if (param !== item._id) {
        //         return item
        //     }
        // })
        // setQualities(filter);
        deleteQuality(param);
    }

    return (
        <>
            <h1>Qualitites List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
