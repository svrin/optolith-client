import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { close, createOverlay } from '../utils/createOverlay';
import { Overlay } from './Overlay';

export interface TooltipToggleProps {
	content: React.ReactNode;
	margin?: number;
	position?: 'top' | 'bottom' | 'left' | 'right';
}

export class TooltipToggle extends React.Component<TooltipToggleProps, {}> {
	triggerRef: Element;
	node?: HTMLDivElement;

	componentWillUnmount() {
		if (this.node) {
			close(this.node);
		}
	}

	open = () => {
		const { content, margin, position = 'top' } = this.props;
		this.node = createOverlay(<Overlay className="tooltip" position={position} trigger={this.triggerRef} margin={margin}>
			{content}
		</Overlay>);
	}

	close = () => {
		if (this.node) {
			close(this.node);
			this.node = undefined;
		}
	}

	render() {
		const { children } = this.props;
		return React.cloneElement(React.Children.only(children), {
			onMouseOver: this.open,
			onMouseOut: this.close,
			ref: (node: Element) => {
				if (node !== null && node.nodeType !== 1) {
					this.triggerRef = findDOMNode(node);
				}
				else {
					this.triggerRef = node;
				}
			}
		});
	}
}
