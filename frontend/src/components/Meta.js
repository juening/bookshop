import React from 'react';
import {Helmet} from 'react-helmet';

const Meta = ({title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    )
}



Meta.defaultProps = {
    title:'Welcome to Little Read | Home',
    description:'Best Books for low price',
    keywords:'books, best books, cheap'
}

export default Meta
