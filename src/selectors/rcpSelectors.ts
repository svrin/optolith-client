import { createSelector } from 'reselect';
import { Categories } from '../constants/Categories';
import { ActivatableNameCostActive, ActiveObjectWithId } from '../types/data';
import { CultureCombined, IncreasableView, MappedProfession, MappedProfessionVariant, ProfessionCombined, ProfessionVariantCombined, RaceCombined } from '../types/view';
import { Culture } from '../types/wiki';
import { getNameCostForWiki } from '../utils/activatableActiveUtils';
import { convertPerTierCostToFinalCost } from '../utils/activatableCostUtils';
import { isProfessionRequiringActivatable, isProfessionRequiringIncreasable } from '../utils/checkPrerequisiteUtils';
import { Just, List, ListElement, Maybe, Record } from '../utils/dataUtils';
import { filterAndSortObjects, FilterOptions } from '../utils/FilterSortUtils';
import { getCategoryById } from '../utils/IDUtils';
import { filterByAvailability, isEntryFromCoreBook } from '../utils/RulesUtils';
import { validateProfession } from '../utils/validatePrerequisitesUtils';
import { isCombatTechniquesSelection } from '../utils/WikiUtils';
import { getStartEl } from './elSelectors';
import { getRuleBooksEnabled } from './rulesSelectors';
import { getCulturesSortOptions, getProfessionsSortOptions, getRacesSortOptions } from './sortOptionsSelectors';
import { getCulturesFilterText, getCurrentCultureId, getCurrentProfessionId, getCurrentProfessionVariantId, getCurrentRaceId, getCurrentRaceVariantId, getLocaleAsProp, getLocaleMessages, getProfessionsFilterText, getRacesFilterText, getSex, getWiki, getWikiCultures, getWikiProfessions, getWikiProfessionVariants, getWikiRaces, getWikiRaceVariants, getWikiSkills } from './stateSelectors';
import { getCulturesVisibilityFilter, getProfessionsGroupVisibilityFilter, getProfessionsVisibilityFilter } from './uisettingsSelectors';

export const getCurrentRace = createSelector(
  getWikiRaces,
  getCurrentRaceId,
  (races, raceId) => raceId.bind(races.lookup)
);

export const getCurrentRaceVariant = createSelector(
  getWikiRaceVariants,
  getCurrentRaceVariantId,
  (raceVariants, raceVariantId) => raceVariantId.bind(raceVariants.lookup)
);

export const getCurrentCulture = createSelector(
  getWikiCultures,
  getCurrentCultureId,
  (cultures, cultureId) => cultureId.bind(cultures.lookup)
);

export const getCurrentProfession = createSelector(
  getWikiProfessions,
  getCurrentProfessionId,
  (professions, professionId) => professionId.bind(professions.lookup)
);

export const getCurrentProfessionVariant = createSelector(
  getWikiProfessionVariants,
  getCurrentProfessionVariantId,
  (professionVariants, professionVariantId) => professionVariantId.bind(professionVariants.lookup)
);

export const getAllRaces = createSelector(
  getWikiRaces,
  getWikiRaceVariants,
  getWikiCultures,
  (races, raceVariants, cultures) => {
    const filterCultures = Maybe.mapMaybe<string, string>(
      id => cultures.lookup(id).map(culture => culture.get('name'))
    );

    return races.elems().map<Record<RaceCombined>>(
      race => race
        .modify(filterCultures, 'commonCultures')
        .merge(Record.of({
          mappedVariants: Maybe.mapMaybe(raceVariants.lookup, race.get('variants'))
            .map(raceVariant => raceVariant.modify(filterCultures, 'commonCultures'))
        }))
    );
  }
);

export const getAvailableRaces = createSelector(
  getAllRaces,
  getRuleBooksEnabled,
  (list, maybeAvailablility) => maybeAvailablility.map(
    availablility => filterByAvailability(list, availablility)
  )
);

export const getFilteredRaces = createSelector(
  getAvailableRaces,
  getRacesFilterText,
  getRacesSortOptions,
  getLocaleAsProp,
  (maybeList, filterText, sortOptions, locale) => maybeList.map(
    list => filterAndSortObjects(list, locale.get('id'), filterText, sortOptions)
  )
);

export const getAllCultures = createSelector(
  getWikiCultures,
  getWikiSkills,
  (cultures, skills) =>
    cultures.elems().map<Record<CultureCombined>>(
      culture => culture
        .merge(Record.of({
          mappedCulturalPackageSkills: Maybe.mapMaybe(
            increaseSkill => skills.lookup(increaseSkill.get('id'))
              .map(
                skill => increaseSkill.merge(Record.of({
                  name: skill.get('name'),
                }))
              ),
            culture.get('culturalPackageSkills')
          )
        }))
    )
);

export const getCommonCultures = createSelector(
  getCurrentRace,
  getCurrentRaceVariant,
  (maybeRace, maybeRaceVariant) => {
    const raceCultures = maybeRace.map(
      race => race.get('commonCultures')
    );

    const raceVariantCultures = maybeRaceVariant.map(
      raceVariant => raceVariant.get('commonCultures')
    );

    return List.of<string>(
      ...Maybe.fromMaybe(List.of<string>(), raceCultures),
      ...Maybe.fromMaybe(List.of<string>(), raceVariantCultures),
    );
  }
);

export const getAvailableCultures = createSelector(
  getAllCultures,
  getRuleBooksEnabled,
  getCommonCultures,
  getCulturesVisibilityFilter,
  (list, maybeAvailablility, commonCultures, visibility) =>
    maybeAvailablility.map(
      availablility => visibility === 'common'
        ? filterByAvailability(list.filter(e => commonCultures.elem(e.get('id'))), availablility)
        : filterByAvailability(list, availablility)
    )
);

export const getFilteredCultures = createSelector(
  getAvailableCultures,
  getCulturesFilterText,
  getCulturesSortOptions,
  getLocaleAsProp,
  (maybeList, filterText, sortOptions, locale) => maybeList.map(
    list => filterAndSortObjects(list, locale.get('id'), filterText, sortOptions)
  )
);

interface SkillGroupLists {
  physicalSkills: List<Record<IncreasableView>>;
  socialSkills: List<Record<IncreasableView>>;
  natureSkills: List<Record<IncreasableView>>;
  knowledgeSkills: List<Record<IncreasableView>>;
  craftSkills: List<Record<IncreasableView>>;
}

const getGroupSliceKey = (gr: number): keyof SkillGroupLists => {
  if (gr === 1) {
    return 'physicalSkills';
  }
  else if (gr === 2) {
    return 'socialSkills';
  }
  else if (gr === 3) {
    return 'natureSkills';
  }
  else if (gr === 4) {
    return 'knowledgeSkills';
  }
  else {
    return 'craftSkills';
  }
};

export const getAllProfessions = createSelector(
  getWiki,
  getLocaleMessages,
  (wiki, locale) => {
    return wiki.get('professions').elems().map<Record<ProfessionCombined>>(
      profession => {
        const {
          physicalSkills,
          socialSkills,
          natureSkills,
          knowledgeSkills,
          craftSkills,
        } = profession.get('skills').foldl<SkillGroupLists>(
          objByGroups => increasableObj => {
            const maybeSkill = wiki.get('skills').lookup(increasableObj.get('id'));

            return Maybe.fromMaybe(
              objByGroups,
              maybeSkill.map(
                skill => {
                  const key = getGroupSliceKey(skill.get('gr'));

                  return {
                    ...objByGroups,
                    [key]: objByGroups[key].append(
                      increasableObj.merge(
                        Record.of({
                          name: skill.get('name'),
                        })
                      )
                    )
                  };
                }
              )
            );
          },
          {
            physicalSkills: List.of(),
            socialSkills: List.of(),
            natureSkills: List.of(),
            knowledgeSkills: List.of(),
            craftSkills: List.of(),
          }
        );

        const filteredVariants = Maybe.mapMaybe(
          wiki.get('professionVariants').lookup,
          profession.get('variants')
        );

        return profession.merge(
          Record.of<MappedProfession>({
            mappedPrerequisites: Maybe.catMaybes(
              profession.get('prerequisites').imap<
                Maybe<ListElement<MappedProfession['mappedPrerequisites']>>
              >(
                index => e => {
                  if (isProfessionRequiringActivatable(e)) {
                    return getNameCostForWiki(
                      e.merge(Record.of({ index })) as any as Record<ActiveObjectWithId>,
                      wiki,
                      locale
                    )
                      .map(convertPerTierCostToFinalCost(locale))
                      .map(
                        obj => obj.merge(Record.of({
                          active: e.get('active')
                        })) as Record<ActivatableNameCostActive>
                      );
                  }

                  return Just(e);
                }
              )
            ),
            mappedSpecialAbilities: Maybe.catMaybes(
              profession.get('specialAbilities').imap(
                index => e => getNameCostForWiki(
                  e.merge(Record.of({ index })) as any as Record<ActiveObjectWithId>,
                  wiki,
                  locale
                )
                  .map(convertPerTierCostToFinalCost(locale))
                  .map(
                    obj => obj.merge(Record.of({
                      active: e.get('active')
                    })) as Record<ActivatableNameCostActive>
                  )
              )
            ),
            selections: profession.get('selections').map(e => {
              if (isCombatTechniquesSelection(e)) {
                return e.modify(
                  sid => Maybe.mapMaybe(
                    id => wiki.get('combatTechniques').lookup(id)
                      .map(entry => entry.get('name')),
                    sid
                  ),
                  'sid'
                );
              }

              return e;
            }),
            mappedCombatTechniques: Maybe.mapMaybe(
              e => wiki.get('combatTechniques')
                .lookup(e.get('id'))
                .map(
                  wikiEntry => e.merge(Record.of({
                    name: wikiEntry.get('name'),
                  }))
                ),
              profession.get('combatTechniques')
            ),
            mappedPhysicalSkills: physicalSkills,
            mappedSocialSkills: socialSkills,
            mappedNatureSkills: natureSkills,
            mappedKnowledgeSkills: knowledgeSkills,
            mappedCraftSkills: craftSkills,
            mappedSpells: Maybe.mapMaybe(
              e => wiki.get('spells')
                .lookup(e.get('id'))
                .map(
                  wikiEntry => e.merge(Record.of({
                    name: wikiEntry.get('name'),
                  }))
                ),
              profession.get('spells')
            ),
            mappedLiturgicalChants: Maybe.mapMaybe(
              e => wiki.get('liturgicalChants')
                .lookup(e.get('id'))
                .map(
                  wikiEntry => e.merge(Record.of({
                    name: wikiEntry.get('name'),
                  }))
                ),
              profession.get('liturgicalChants')
            ),
            mappedVariants: filteredVariants.map<Record<ProfessionVariantCombined>>(
              professionVariant => professionVariant.merge(
                Record.of<MappedProfessionVariant>({
                  mappedPrerequisites: Maybe.catMaybes(
                    professionVariant.get('prerequisites').imap<
                      Maybe<ListElement<MappedProfession['mappedPrerequisites']>>
                    >(
                      index => e => {
                        if (isProfessionRequiringActivatable(e)) {
                          return getNameCostForWiki(
                            e.merge(Record.of({ index })) as any as Record<ActiveObjectWithId>,
                            wiki,
                            locale
                          )
                            .map(convertPerTierCostToFinalCost(locale))
                            .map(
                              obj => obj.merge(Record.of({
                                active: e.get('active')
                              })) as Record<ActivatableNameCostActive>
                            );
                        }

                        return Just(e);
                      }
                    )
                  ),
                  mappedSpecialAbilities: Maybe.catMaybes(
                    professionVariant.get('specialAbilities').imap(
                      index => e => getNameCostForWiki(
                        e.merge(Record.of({ index })) as any as Record<ActiveObjectWithId>,
                        wiki,
                        locale
                      )
                        .map(convertPerTierCostToFinalCost(locale))
                        .map(
                          obj => obj.merge(Record.of({
                            active: e.get('active')
                          })) as Record<ActivatableNameCostActive>
                        )
                    )
                  ),
                  selections: professionVariant.get('selections').map(e => {
                    if (isCombatTechniquesSelection(e)) {
                      return e.modify(
                        sid => Maybe.mapMaybe(
                          id => wiki.get('combatTechniques').lookup(id)
                            .map(entry => entry.get('name')),
                          sid
                        ),
                        'sid'
                      );
                    }

                    return e;
                  }),
                  mappedCombatTechniques: Maybe.mapMaybe(
                    e => wiki.get('combatTechniques')
                      .lookup(e.get('id'))
                      .map(
                        wikiEntry => e.mergeMaybe(Record.of({
                          name: wikiEntry.get('name'),
                          previous: profession.get('combatTechniques')
                            .find(a => a.get('id') === e.get('id'))
                            .map(a => a.get('value'))
                        })) as Record<IncreasableView>
                      ),
                    professionVariant.get('combatTechniques')
                  ),
                  mappedSkills: Maybe.mapMaybe(
                    e => wiki.get('skills')
                      .lookup(e.get('id'))
                      .map(
                        wikiEntry => e.mergeMaybe(Record.of({
                          name: wikiEntry.get('name'),
                          previous: profession.get('skills')
                            .find(a => a.get('id') === e.get('id'))
                            .map(a => a.get('value'))
                        })) as Record<IncreasableView>
                      ),
                    professionVariant.get('skills')
                  ),
                  mappedSpells: Maybe.mapMaybe(
                    e => wiki.get('spells')
                      .lookup(e.get('id'))
                      .map(
                        wikiEntry => e.mergeMaybe(Record.of({
                          name: wikiEntry.get('name'),
                          previous: profession.get('spells')
                            .find(a => a.get('id') === e.get('id'))
                            .map(a => a.get('value'))
                        })) as Record<IncreasableView>
                      ),
                    professionVariant.get('spells')
                  ),
                  mappedLiturgicalChants: Maybe.mapMaybe(
                    e => wiki.get('liturgicalChants')
                      .lookup(e.get('id'))
                      .map(
                        wikiEntry => e.mergeMaybe(Record.of({
                          name: wikiEntry.get('name'),
                          previous: profession.get('liturgicalChants')
                            .find(a => a.get('id') === e.get('id'))
                            .map(a => a.get('value'))
                        })) as Record<IncreasableView>
                      ),
                    professionVariant.get('liturgicalChants')
                  ),
                })
              )
            ),
          })
        )
      }
    );
  }
);

const isCustomProfession = (e: Record<ProfessionCombined>) => e.get('id') === 'P_0';

export const getCommonProfessions = createSelector(
  getAllProfessions,
  getStartEl,
  getCurrentRaceId,
  getCurrentCulture,
  getSex,
  getProfessionsGroupVisibilityFilter,
  getProfessionsVisibilityFilter,
  (
    professions,
    maybeStartEl,
    currentRaceId,
    currentCulture,
    maybeSex,
    groupVisibility,
    visibility
  ) =>
    Maybe.fromMaybe(
      professions,
      maybeSex.bind(
        sex => maybeStartEl.map(
          startEl => {
            const filterProfession = (
              e: Record<ProfessionCombined> | Record<ProfessionVariantCombined>
            ): boolean => {
              const isProfessionValid = validateProfession(
                e.get('dependencies'),
                sex,
                currentRaceId,
                currentCulture.map(culture => culture.get('id')),
              );

              const attributeCategory = Just(Categories.ATTRIBUTES);

              return isProfessionValid && e.get('prerequisites').all(d => {
                if (isProfessionRequiringIncreasable(d)) {
                  const category = getCategoryById(d.get('id'));

                  const isAttribute = category.equals(attributeCategory);
                  const isGreaterThanMax = d.get('value') > startEl.get('maxAttributeValue');

                  return isAttribute && isGreaterThanMax;
                }

                return true;
              });
            };

            const filterProfessionExtended = (
              culture: Record<Culture>,
              e: Record<ProfessionCombined>
            ): boolean => {
              const maybeCommonList = culture.get('commonProfessions').subscript(e.get('gr') - 1);

              const commonVisible =
                visibility === 'all'
                || isCustomProfession(e)
                || Maybe.fromMaybe(
                  false,
                  maybeCommonList.map(
                    commonList => typeof commonList === 'boolean'
                      ? (commonList === true && isEntryFromCoreBook(e))
                      : commonList.get('list').elem(e.get('subgr'))
                        ? (commonList.get('list').elem(e.get('subgr')) !== commonList.get('reverse')
                          && isEntryFromCoreBook(e))
                        : commonList.get('reverse') === true
                          ? !commonList.get('list').elem(e.get('id')) && isEntryFromCoreBook(e)
                          : commonList.get('list').elem(e.get('id'))
                  )
              );

              /**
               * const commonVisible = visibility === 'all' || e.id === 'P_0'
               * || (typeof typicalList === 'boolean' ? typicalList === true :
               * (typicalList.list.includes(e.subgr) ? typicalList.list.includes(e.subgr)
               * !== typicalList.reverse : typicalList.list.includes(e.id)
               * !== typicalList.reverse));
              */

              const groupVisible =
                groupVisibility === 0
                || isCustomProfession(e)
                || groupVisibility === e.get('gr');

              return groupVisible && commonVisible;
            };

            return professions
              .filter(
                Maybe.fromMaybe(
                  filterProfession,
                  currentCulture.map(
                    culture => (e: Record<ProfessionCombined>) =>
                      filterProfession(e) && filterProfessionExtended(culture, e)
                  )
                )
              )
              .map(
                e => e.modify(
                  variants => variants.filter(filterProfession),
                  'mappedVariants'
                )
              );
          }
        )
      )
    )
);

export const getAvailableProfessions = createSelector(
  getCommonProfessions,
  getRuleBooksEnabled,
  getProfessionsVisibilityFilter,
  (list, maybeAvailablility, visibility) =>
    Maybe.maybe(
      list,
      availablility => visibility === 'all'
        ? filterByAvailability(list, availablility, isCustomProfession)
        : list,
      maybeAvailablility
    )
);

export const getFilteredProfessions = createSelector(
  getAvailableProfessions,
  getProfessionsFilterText,
  getProfessionsSortOptions,
  getLocaleAsProp,
  getSex,
  (list, filterText, sortOptions, locale, maybeSex) =>
    Maybe.fromMaybe(
      list,
      maybeSex.map(
        sex => {
          const filterOptions: FilterOptions<ProfessionCombined> = {
            addProperty: 'subname',
            keyOfName: sex
          };

          return filterAndSortObjects(
            list,
            locale.get('id'),
            filterText,
            sortOptions,
            filterOptions,
          );
        }
      )
    )
);
