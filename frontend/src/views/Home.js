import React from 'react'
import TopBar from '../components/layout/TopBar';
import ContentBox from '../components/layout/ContentBox';
import BottomBar from '../components/layout/BottomBar';

export default function HomeView() {
    return (
        <React.Fragment>
            <TopBar
                title="Home"
            />
            <ContentBox>
                <p>test</p>
            </ContentBox>
            <BottomBar/>
        </React.Fragment>
    )
}