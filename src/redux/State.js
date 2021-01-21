import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Context} from './context';
import {rootReducer} from './rootReducer';

export const State = ({children}) => {
	const dispatch = useDispatch();

	const pickedTiles = useSelector(state => state.pickedTiles);
	const matchedTiles = useSelector(state => state.matchedTiles);
	const win = useSelector(state => state.win);
	const round = useSelector(state => state.round);
	const matches = useSelector(state => state.matches);
	const tiles = useSelector(state => state.tiles);

	const showWin = () => dispatch({type: 'APP/WIN'});

	const nextRound = () => dispatch({type: 'APP/NEXT_ROUND'});

	const addMatch = () => dispatch({type: 'APP/ADD_MATCH'});

	const appReset = () => dispatch({type: 'APP/RESET'});

	const pickTile = id => dispatch({type: 'TILE/PICK', payload: id});

	const unpickTiles = () => dispatch({type: 'TILE/UNPICK'});

	const matchTiles = (id1, id2) => dispatch({type: 'TILE/MATCH', payload: [id1, id2]});

	const handleClick = id => {
		if (pickedTiles.length === 2) {
			return;
		}

		pickTile(id);

		if (pickedTiles.length) {
			const tile1_id = pickedTiles[0];
			const tile2_id = id;
			const tile1_color = tile1_id.split('-')[1];
			const tile2_color = id.split('-')[1];

			if (tile1_color === tile2_color) {
				setTimeout(() => {
					matchTiles(tile1_id, tile2_id);
					if (matchedTiles.length === 14) {
						showWin();
					}
					addMatch();
				}, 1000);
			} else {
				setTimeout(() => {
					unpickTiles();
					nextRound();
				}, 2000);
			}
		}
	};

	return (
		<Context.Provider value={{
			win,
			round,
			matches,
			appReset,
			pickedTiles,
			matchedTiles,
			tiles,
			handleClick
		}}>
			{children}
		</Context.Provider>
	);
}
