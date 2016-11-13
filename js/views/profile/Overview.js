import Avatar from '../../components/Avatar';
import APStore from '../../stores/APStore';
import BorderButton from '../../components/BorderButton';
import CultureStore from '../../stores/CultureStore';
import DisAdvStore from '../../stores/DisAdvStore';
import Dropdown from '../../components/Dropdown';
import ELStore from '../../stores/ELStore';
import IconButton from '../../components/IconButton';
import OverviewConstSkills from './OverviewConstSkills';
import OverviewNameChange from './OverviewNameChange';
import ProfessionStore from '../../stores/ProfessionStore';
import ProfessionVariantStore from '../../stores/ProfessionVariantStore';
import RaceStore from '../../stores/RaceStore';
import PhaseStore from '../../stores/PhaseStore';
import ProfileActions from '../../actions/ProfileActions';
import ProfileStore from '../../stores/ProfileStore';
import React, { Component } from 'react';
import Scroll from '../../components/Scroll';
import TextField from '../../components/TextField';
import calcEL from '../../utils/calcEL';

class Overview extends Component {
	
	state = { 
		advActive: DisAdvStore.getActiveForView(true),
		disadvActive: DisAdvStore.getActiveForView(false),
		...(ProfileStore.getAll()),
		phase: PhaseStore.get(),
		editName: false
	};
	
	_updateProfileStore = () => this.setState(ProfileStore.getAll());
	_updatePhaseStore = () => this.setState({
		phase: PhaseStore.get()
	});
	
	componentDidMount() {
		PhaseStore.addChangeListener(this._updatePhaseStore );
		ProfileStore.addChangeListener(this._updateProfileStore );
	}
	
	componentWillUnmount() {
		PhaseStore.removeChangeListener(this._updatePhaseStore );
		ProfileStore.removeChangeListener(this._updateProfileStore );
	}

	showImageUpload = () => ProfileActions.showImageUpload();
	changeName = name => {
		ProfileActions.changeName(name);
		this.setState({ editName: false });
	};
	editName = () => this.setState({ editName: true });
	editNameCancel = () => this.setState({ editName: false });

	changeFamily = e => ProfileActions.changeFamily(e.target.value);
	changePlaceOfBirth = e => ProfileActions.changePlaceOfBirth(e.target.value);
	changeDateOfBirth = e => ProfileActions.changeDateOfBirth(e.target.value);
	changeAge = e => ProfileActions.changeAge(e.target.value);
	changeHaircolor = result => ProfileActions.changeHaircolor(result);
	changeEyecolor = result => ProfileActions.changeEyecolor(result);
	changeSize = e => ProfileActions.changeSize(e.target.value);
	changeWeight = e => ProfileActions.changeWeight(e.target.value);
	changeTitle = e => ProfileActions.changeTitle(e.target.value);
	changeSocialStatus = result => ProfileActions.changeSocialStatus(result);
	changeCharacteristics = e => ProfileActions.changeCharacteristics(e.target.value);
	changeOtherInfo = e => ProfileActions.changeOtherInfo(e.target.value);

	rerollHair = () => ProfileActions.rerollHair();
	rerollEyes = () => ProfileActions.rerollEyes();
	rerollSize = () => ProfileActions.rerollSize();
	rerollWeight = () => ProfileActions.rerollWeight();

	endCharacterCreation = () => ProfileActions.endCharacterCreation();
	deleteHero = () => ProfileActions.deleteHero();

	render() {

		const { age, avatar, characteristics, editName, eyecolor, dateofbirth, family, haircolor, name, otherinfo, placeofbirth, size, socialstatus, title, weight, phase } = this.state;

		const hairArr = RaceStore.getCurrent() ? ProfileStore.getHaircolorTags().map((e,i) => [ e, i + 1 ]).filter(e =>
			RaceStore.getCurrent().hair.indexOf(e[1]) > -1
		) : [];

		const eyesArr = RaceStore.getCurrent() ? ProfileStore.getEyecolorTags().map((e,i) => [ e, i + 1 ]).filter(e =>
			RaceStore.getCurrent().eyes.indexOf(e[1]) > -1
		) : [];

		const socialstatusArr = CultureStore.getCurrent() ? ProfileStore.getSocialstatusTags().map((e,i) => [ e, i + 1 ]).filter(e =>
			CultureStore.getCurrent().social.indexOf(e[1]) > -1
		) : [];

		const sex = this.state.sex === 'm' ? 'Männlich' : 'Weiblich';

		const ap = APStore.get();
		const currentEL = calcEL(ap);

		const nameElement = editName ? (
			<OverviewNameChange
				cancel={this.editNameCancel}
				change={this.changeName}
				name={name} />
		) : (
			<h1>
				{name}
				<IconButton icon="&#xE254;" onClick={this.editName} />
			</h1>
		);

		return (
			<div className="page" id="overview">
				<Scroll>
					<div className="title-wrapper">
						<Avatar src={avatar} onClick={this.showImageUpload} wrapper />
						<div className="text-wrapper">
							{nameElement}
							<div className="rcp">
								{ sex } &middot; {
									RaceStore.getCurrent() !== undefined ? RaceStore.getCurrent().name : null
								} &middot; {
									CultureStore.getCurrent() !== undefined ? CultureStore.getCurrent().name : null
								} &middot; {
									ProfessionStore.getCurrentID() === 'P_0' ? 'Eigene Profession' : ProfessionStore.getCurrent() !== undefined ? (ProfessionVariantStore.getCurrentID() !== null ? `${ProfessionStore.getCurrent().name} (${ProfessionVariantStore.getCurrent().name})`: ProfessionStore.getCurrent().name) : null
								}
							</div>
							<div className="el">
								{ELStore.get(currentEL).name} &middot; {ap} AP
							</div>
						</div>
					</div>
					<h3>Persönliche Daten</h3>
					<div className="personal-data">
						<div>
							<TextField
								labelText="Familie"
								value={family}
								onChange={this.changeFamily}
								/>
						</div>
						<div>
							<TextField
								labelText="Geburtsort"
								value={placeofbirth}
								onChange={this.changePlaceOfBirth}
								/>
						</div>
						<div>
							<TextField
								labelText="Geburtsdatum"
								value={dateofbirth}
								onChange={this.changeDateOfBirth}
								/>
						</div>
						<div>
							<TextField
								labelText="Alter"
								value={age}
								onChange={this.changeAge}
								/>
						</div>
						<div className="reroll">
							<Dropdown
								label="Haarfarbe"
								value={haircolor}
								onChange={this.changeHaircolor}
								options={hairArr}
								/>
							<IconButton icon="&#xE863;" onClick={this.rerollHair} />
						</div>
						<div className="reroll">
							<Dropdown
								label="Augenfarbe"
								value={eyecolor}
								onChange={this.changeEyecolor}
								options={eyesArr}
								/>
							<IconButton icon="&#xE863;" onClick={this.rerollEyes} />
						</div>
						<div className="reroll">
							<TextField
								labelText="Körpergröße"
								value={size}
								onChange={this.changeSize}
								/>
							<IconButton icon="&#xE863;" onClick={this.rerollSize} />
						</div>
						<div className="reroll">
							<TextField
								labelText="Gewicht"
								value={weight}
								onChange={this.changeWeight}
								/>
							<IconButton icon="&#xE863;" onClick={this.rerollWeight} />
						</div>
						<div>
							<TextField
								labelText="Titel"
								value={title}
								onChange={this.changeTitle}
								/>
						</div>
						<div>
							<Dropdown
								label="Sozialstatus"
								value={socialstatus}
								onChange={this.changeSocialStatus}
								options={socialstatusArr}
								/>
						</div>
						<div>
							<TextField
								labelText="Charakteristika"
								value={characteristics}
								onChange={this.changeCharacteristics}
								/>
						</div>
						<div>
							<TextField
								labelText="Sonstiges"
								value={otherinfo}
								onChange={this.changeOtherInfo}
								/>
						</div>
					</div>
					{
						phase === 2 ? (
							<div>
								<BorderButton
									className="end-char-creation"
									label="Heldenerstellung beenden"
									onClick={this.endCharacterCreation}
									primary
									/>
							</div>
						) : null
					}
					{
						phase === 3 ? (
							<div>
								<h3>Vorteile</h3>
								<OverviewConstSkills list={this.state.advActive} />
								<h3>Nachteile</h3>
								<OverviewConstSkills list={this.state.disadvActive} />
								<BorderButton
									className="delete-char"
									label="Held löschen"
									onClick={this.deleteHero}
									/>
							</div>
						) : null
					}
				</Scroll>
			</div>
		);
	}
}

export default Overview;