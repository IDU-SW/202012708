import React, {Component} from 'react';

class Explanation extends Component {
    render() {
        return (
            <div className="explanation">
                <h1>202012708 양현규 <br/>기말프로젝트</h1>
                <h2>기능설명</h2>
                <p className="use">
                    라이트모드와 다크모드중에서 자신이 원하는 모드를 선택할 수 있습니다.<br />
                    일반적인 사칙연산 및 연산 순서에 맞게 연산을 하실 수 있습니다.
                </p>
                <h2>개발환경</h2>
                <p className="use">
                    리액트 Class Component
                </p>
            </div>
        );
    }
}


export default Explanation;