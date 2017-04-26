import { ReceiveInitialDataAction } from '../actions/FileActions';
import { CreateHeroAction, LoadHeroAction } from '../actions/HerolistActions';
import * as ActionTypes from '../constants/ActionTypes';
import { AppDispatcher } from '../dispatcher/AppDispatcher';
import { ExperienceLevel } from '../types/data.d';
import { RawExperienceLevel } from '../types/rawdata.d';
import { Store } from './Store';

type Action = CreateHeroAction | LoadHeroAction | ReceiveInitialDataAction;

class ELStoreStatic extends Store {
	private byId: { [id: string]: ExperienceLevel } = {};
	private allIds: string[];
	private start = 'EL_0';
	readonly dispatchToken: string;

	constructor() {
		super();
		this.dispatchToken = AppDispatcher.register((action: Action) => {
			switch (action.type) {
				case ActionTypes.CREATE_HERO:
					this.update(action.payload.el);
					break;

				case ActionTypes.LOAD_HERO:
					this.update(action.payload.data.el);
					break;

				case ActionTypes.RECEIVE_INITIAL_DATA:
					this.init(action.payload.tables.el);
					break;

				default:
					return true;
			}
			this.emitChange();
			return true;
		});
	}

	get(id: string) {
		return this.byId[id];
	}

	getAll() {
		return this.byId;
	}

	getStartID() {
		return this.start;
	}

	getStart() {
		return this.get(this.getStartID());
	}

	private init(el: { [id: string]: RawExperienceLevel }) {
		this.allIds = Object.keys(el);
		this.allIds.forEach(e => {
			const {
				id,
				name,
				ap,
				max_attr,
				max_skill,
				max_combattech,
				max_attrsum,
				max_spells_liturgies,
				max_unfamiliar_spells,
			} = el[e];
			this.byId[e] = {
				id,
				name,
				ap,
				maxAttributeValue: max_attr,
				maxCombatTechniqueRating: max_combattech,
				maxSkillRating: max_skill,
				maxSpellsLiturgies: max_spells_liturgies,
				maxTotalAttributeValues: max_attrsum,
				maxUnfamiliarSpells: max_unfamiliar_spells,
			};
		});
	}

	private update(el: string) {
		this.start = el;
	}
}

export const ELStore = new ELStoreStatic();
