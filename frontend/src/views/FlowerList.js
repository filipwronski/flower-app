import React from 'react'
import TopBar from '../components/layout/TopBar';
import ContentBox from '../components/layout/ContentBox';
import FlowerList from '../components/flower/List'
import BottomBar from '../components/layout/BottomBar';

export default function FlowerListView() {
    return (
        <React.Fragment>
            <TopBar
                title="Flower List"
            />
            <ContentBox>
                <FlowerList/>
            </ContentBox>
            <BottomBar/>
        </React.Fragment>
    )
}