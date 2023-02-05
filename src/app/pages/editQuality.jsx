import React from "react";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import QualityForm from "../components/ui/qualities/qualityForm";
import {useQualities} from "../hooks/useQualities";
import {useHistory} from "react-router-dom";

const EditQualityPage = () => {
    const id = useParams().id;
    const {updateQuality, getQuality} = useQualities();
    const quality = getQuality(id);
    const history = useHistory();
    const handleSubmit = (data) => {
        updateQuality(data)
        if(data) {
            history.push("/")
        }
            //.then(data => {if(data)history.push("/")});
    }

    return (
        <>
            <h1>Edit Quality Page</h1>
            <QualityForm data={quality} onSubmit={handleSubmit}/>
        </>
    );
};

export default EditQualityPage;
