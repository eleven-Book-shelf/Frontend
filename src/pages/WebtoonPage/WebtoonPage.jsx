import React, { useState, useEffect } from 'react';
import ContentPage from '../../tool/ContentPage/ContentPage';
import ContentTopPage from "../../tool/ContentTopPage/ContentTopPage";

const WebtoonPage = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const storedTags = localStorage.getItem('tags');
        const genresArray = storedTags ? storedTags.split('#').filter(tag => tag !== "") : [];

        const generatedGenres = [
            { name: '전체', subGenres: [] },
            { name: '설정 및 테그', subGenres: genresArray }
        ];

        setGenres(generatedGenres);
    }, []);

    return (
        <div className="content-page">
            <ContentTopPage
                type="/type/COMICS"
                title="웹툰 상위 10"
                tabs={['리디', '카카오페이지', '문피아']}
            />
            <ContentPage
                type="/type/COMICS"
                title="웹툰"
                genres={genres}
                tabs={['리디', '카카오페이지', '문피아']}
            />
        </div>
    );
}

export default WebtoonPage;
