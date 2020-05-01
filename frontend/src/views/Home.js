import React from 'react'
import TopBar from '../components/layout/TopBar';
import ContentBox from '../components/layout/ContentBox';

export default function HomeView() {
    return (
        <React.Fragment>
            <TopBar
                title="Home"
            />
            <ContentBox>
                <p>test</p>
            </ContentBox>
        </React.Fragment>
    )
}