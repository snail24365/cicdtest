import React, { Suspense } from 'react';
import { RecoilRoot, atomFamily, selectorFamily, useRecoilValue } from 'recoil';

export default function Todo() {
    return (
        <RecoilRoot>
            <div>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
                <TodoItem></TodoItem>
            </div>
            <Suspense fallback={<div>Wating....</div>}>
                <SelecotrFamillyUsingComp />
            </Suspense>
            <ElementListItem></ElementListItem>
        </RecoilRoot>
    );
}
function SelecotrFamillyUsingComp() {
    const userName = useRecoilValue(userNameQuery(999));
    return <div>{userName}</div>;
}

function TodoItem() {
    return <div>Todo Item</div>;
}

const userNameQuery = selectorFamily({
    key: 'UserName',
    get: (userID) => async () => {
        const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('userName::' + userID);
            }, 2000);
        });
        return response;
    },
});

const elementPositionStateFamily = atomFamily({
    key: 'ElementPosition',
    default: [0, 0],
});

function ElementListItem({ elementID }) {
    const position = useRecoilValue(elementPositionStateFamily(elementID));
    return (
        <div>
            Element: {elementID}
            Position: {position}
        </div>
    );
}
