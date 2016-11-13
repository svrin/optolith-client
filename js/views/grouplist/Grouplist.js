import BorderButton from '../../components/BorderButton';
import RadioButtonGroup from '../../components/RadioButtonGroup';
import React, { Component } from 'react';
import Scroll from '../../components/Scroll';
import TabActions from '../../actions/TabActions';
import TextField from '../../components/TextField';

class Grouplist extends Component {

	filter = event => event.target.value;
	openGroup = () => TabActions.showSection('group');

	render() {
		return (
			<section id="about">
				<div className="page">
					<div className="options">
						<TextField hint="Suchen" value={''} onChange={this.filter} fullWidth disabled />
						<BorderButton label="Erstellen" disabled />
					</div>
					<Scroll className="list">
						<BorderButton label="Gruppe laden" onClick={this.openGroup} />
					</Scroll>
				</div>
			</section>
		);
	}
}

export default Grouplist;