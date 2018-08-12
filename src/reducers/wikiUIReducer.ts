import { SetTabAction } from '../actions/LocationActions';
import { SetWikiCategory1Action, SetWikiCategory2Action, SetWikiCombatTechniquesGroupAction, SetWikiFilterAction, SetWikiFilterAllAction, SetWikiItemTemplatesGroupAction, SetWikiLiturgicalChantsGroupAction, SetWikiProfessionsGroupAction, SetWikiSkillsGroupAction, SetWikiSpecialAbilitiesGroupAction, SetWikiSpellsGroupAction } from '../actions/WikiActions';
import { ActionTypes } from '../constants/ActionTypes';

type Action =
  SetTabAction |
  SetWikiCategory1Action |
  SetWikiCategory2Action |
  SetWikiFilterAction |
  SetWikiFilterAllAction |
  SetWikiCombatTechniquesGroupAction |
  SetWikiItemTemplatesGroupAction |
  SetWikiLiturgicalChantsGroupAction |
  SetWikiProfessionsGroupAction |
  SetWikiSkillsGroupAction |
  SetWikiSpecialAbilitiesGroupAction |
  SetWikiSpellsGroupAction;

export interface UIWikiState {
  filter: string;
  filterAll: string;
  category1?: string;
  category2?: string;
  professionsGroup?: number;
  skillsGroup?: number;
  combatTechniquesGroup?: number;
  specialAbilitiesGroup?: number;
  spellsGroup?: number;
  liturgicalChantsGroup?: number;
  itemTemplatesGroup?: number;
}

const initialState: UIWikiState = {
  filter: '',
  filterAll: ''
};

export function wikiUIReducer(state: UIWikiState = initialState, action: Action): UIWikiState {
  switch (action.type) {
    case ActionTypes.SET_WIKI_CATEGORY_1:
      return {
        ...state,
        category1: action.payload.category,
        category2: undefined,
        filter: ''
      };

    case ActionTypes.SET_WIKI_CATEGORY_2:
      return {
        ...state,
        category2: action.payload.category
      };

    case ActionTypes.SET_WIKI_FILTER:
      return {
        ...state,
        filter: action.payload.filterText
      };

    case ActionTypes.SET_WIKI_FILTER_ALL:
      return {
        ...state,
        filterAll: action.payload.filterText
      };

    case ActionTypes.SET_WIKI_COMBAT_TECHNIQUES_GROUP:
      return {
        ...state,
        combatTechniquesGroup: action.payload.group
      };

    case ActionTypes.SET_WIKI_ITEM_TEMPLATES_GROUP:
      return {
        ...state,
        itemTemplatesGroup: action.payload.group
      };

    case ActionTypes.SET_WIKI_LITURGICAL_CHANTS_GROUP:
      return {
        ...state,
        liturgicalChantsGroup: action.payload.group
      };

    case ActionTypes.SET_WIKI_PROFESSIONS_GROUP:
      return {
        ...state,
        professionsGroup: action.payload.group
      };

    case ActionTypes.SET_WIKI_SKILLS_GROUP:
      return {
        ...state,
        skillsGroup: action.payload.group
      };

    case ActionTypes.SET_WIKI_SPECIAL_ABILITIES_GROUP:
      return {
        ...state,
        specialAbilitiesGroup: action.payload.group
      };

    case ActionTypes.SET_WIKI_SPELLS_GROUP:
      return {
        ...state,
        spellsGroup: action.payload.group
      };

    default:
      return state;
  }
}