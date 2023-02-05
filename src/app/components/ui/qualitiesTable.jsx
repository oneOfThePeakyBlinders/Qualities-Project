import React from "react";
import Table from "../common/table";
const QualitiesTable = ({ data, onEdit, onDelete }) => {
    const columns = {
        name: {
            path: "name",
            name: "name",
        },
        color: {
            path: "color",
            name: "color",
        },
        edit: {
            component: (quality) => (
                <button
                    onClick={() => onEdit(quality._id)}
                    className='btn btn-success'
                >
                    Update
                </button>
            ),
        },
        delete: {
            component: (quality) => (
                <button
                    onClick={() => onDelete(quality._id)}
                    className='btn btn-danger'
                >
                    Delete
                </button>
            ),
        },
    };
    if (data.length > 0) return <Table columns={columns} data={data} />;
    return null;
};

export default QualitiesTable;
