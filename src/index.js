import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';

/*
 * Action
 */
const INCREMENT = "INCREMENT";

function increase(diff) {
	return {
		type: INCREMENT, //필수 - action 형태 정의
		addBy: diff
	};
}

/*
 * Reducer
 */
const initialState = {
	value: 0
};

const counterReducer = (state = initialState, action) => {
	switch(action.type) {
		case INCREMENT:
			// state 를 변경시키지 않고, 복사 후 복사된 객체 반환
			return Object.assign({}, state, {
				value: state.value + action.addBy
			});
		default:
			return state;
	}
}

const store = createStore(counterReducer);
class App extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	render() {

		let centerStyle = {
			position: 'fixed',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			WebkitUserSelect: 'none',
			MozUserSelect: 'none',
			MsUserSelect:'none',
			userSelect: 'none',
			cursor: 'pointer'
		};

		// 현재 스토어에 있는 데이터 를 반환
		return (
			<div
				onClick={ this.onClick }
				style={ centerStyle }
			>

				<h1> {this.props.store.getState().value} </h1>
			</div>
		)
	}

	onClick() {
		// store.dispatch(ACTION) 상태값을 수정할때 사용되는 메소드 - 인수로는 action 이 전달됨
		this.props.store.dispatch(increase(1));
	}
}


const render = () => {

	const appElement = document.getElementById('app');
	ReactDOM.render(
		<App store={store}/>,
		appElement
	);
};

// dispatch 메소드가 실행되면 리스너 함수가 실행됨
// 데이터 변뎡이 있때마다 리렌더링함
store.subscribe(render);
render();
