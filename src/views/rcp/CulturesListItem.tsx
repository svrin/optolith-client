import { get } from '../../stores/ListStore';
import * as CultureActions from '../../actions/CultureActions';
import * as React from 'react';
import BorderButton from '../../components/BorderButton';
import classNames from 'classnames';

interface Props {
	changeTab: (tab: string) => void;
	currentID: string | null;
	culture: CultureInstance;
	showDetails: boolean;
}

export default class CulturesListItem extends React.Component<Props, undefined> {
	selectCulture = () => CultureActions.selectCulture(this.props.culture.id);

	render() {
		const { changeTab, currentID, culture, showDetails } = this.props;

		const className = classNames({
			'active': culture.id === currentID
		});

		return (
			<li className={className}>
				<div className="left">
					<h2>{culture.name} ({culture.ap} AP)</h2>
					{
						showDetails ? (
							<div className="details">
								{
									culture.talents.map(talent => `${get(talent[0]).name} +${talent[1]}`).join(', ')
								}
							</div>
						) : null
					}
				</div>
				<div className="right">
					{
						culture.id === currentID ? (
							<BorderButton
								label="Weiter"
								onClick={changeTab}
								primary
								/>
						) : (
							<BorderButton
								label="Auswählen"
								onClick={this.selectCulture}
								/>
						)
					}
				</div>
			</li>
		);
	}
}
