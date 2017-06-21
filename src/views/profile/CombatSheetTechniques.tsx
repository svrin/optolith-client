import * as React from 'react';
import { TextBox } from '../../components/TextBox';
import { CombatTechniquesStore } from '../../stores/CombatTechniquesStore';
import { get } from '../../stores/ListStore';
import { AttributeInstance } from '../../types/data.d';
import { getAt, getPa } from '../../utils/CombatTechniqueUtils';
import { translate } from '../../utils/I18n';
import { sort } from '../../utils/FilterSortUtils';

export function CombatSheetTechniques() {
	return (
		<TextBox label={translate('charactersheet.combat.combattechniques.title')} className="combat-techniques">
			<table>
				<thead>
					<tr>
						<th className="name">{translate('charactersheet.combat.combattechniques.headers.name')}</th>
						<th className="primary">{translate('charactersheet.combat.combattechniques.headers.primaryattribute')}</th>
						<th className="ic">{translate('charactersheet.combat.combattechniques.headers.ic')}</th>
						<th className="value">{translate('charactersheet.combat.combattechniques.headers.ctr')}</th>
						<th className="at">{translate('charactersheet.combat.combattechniques.headers.atrc')}</th>
						<th className="pa">{translate('charactersheet.combat.combattechniques.headers.pa')}</th>
					</tr>
				</thead>
				<tbody>
					{
						sort(CombatTechniquesStore.getAll()).map(e => (
							<tr key={e.id}>
								<td className="name">{e.name}</td>
								<td className="primary">{e.primary.map(attr => (get(attr) as AttributeInstance).short).join('/')}</td>
								<td className="ic">{['A', 'B', 'C', 'D'][e.ic - 1]}</td>
								<td className="value">{e.value}</td>
								<td className="at">{getAt(e)}</td>
								<td className="pa">{getPa(e)}</td>
							</tr>
						))
					}
				</tbody>
			</table>
		</TextBox>
	);
}
