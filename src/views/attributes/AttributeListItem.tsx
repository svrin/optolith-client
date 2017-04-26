import * as React from 'react';
import * as AttributesActions from '../../actions/AttributesActions';
import { IconButton } from '../../components/IconButton';
import { NumberBox } from '../../components/NumberBox';
import { ELStore } from '../../stores/ELStore';
import { AttributeInstance } from '../../types/data.d';
import { isDecreasable, isIncreasable } from '../../utils/AttributeUtils';
import { AttributeBorder } from './AttributeBorder';

export interface AttributeListItemProps {
	attribute: AttributeInstance;
	phase: number;
}

export class AttributeListItem extends React.Component<AttributeListItemProps, {}> {
	addPoint = () => AttributesActions.addPoint(this.props.attribute.id);
	removePoint = () => AttributesActions.removePoint(this.props.attribute.id);

	render() {
		const { attribute, phase } = this.props;
		const { id, short, name, value, mod } = attribute;

		const el = ELStore.getStart();

		const valueHeader = phase === 2 ? `${value} / ${el.maxAttributeValue + mod}` : value;

		return (
			<AttributeBorder className={id} label={short} value={value} tooltip={<div className="calc-attr-overlay">
					<h4><span>{name}</span><span>{valueHeader}</span></h4>
				</div>} tooltipMargin={11}>
				{ phase === 2 ? <NumberBox max={el.maxAttributeValue + mod} /> : null }
				<IconButton className="add" icon="&#xE145;" onClick={this.addPoint} disabled={!isIncreasable(attribute)} />
				{ phase === 2 ? (
					<IconButton className="remove" icon="&#xE15B;" onClick={this.removePoint} disabled={!isDecreasable(attribute)} />
				) : null }
			</AttributeBorder>
		);
	}
}
