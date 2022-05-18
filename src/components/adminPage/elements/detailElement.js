import React from "react";
import PropTypes from 'prop-types';

DetailElement.propTypes = {
    element: PropTypes.object.isRequired
}

function DetailElement(props) {
    return (
        <>
            <h1>{props.element.name_zh}</h1>
            <h2>{props.element.name_en}</h2>
            <h3>{props.element.location}</h3>
            <h3>{props.element.year}</h3>
            <h3>{props.element.author}</h3>
        </>
    );
}

export default DetailElement;