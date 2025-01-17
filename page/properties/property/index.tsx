import { Application } from "../../index";
import { BoroughViewModel, HistoricListingGradeViewModel, HistoricListingModifierViewModel, HistoricListingService, MapService, PropertyService, PropertyTypeViewModel, PropertyViewModel } from "../../managed/services";
import { Component } from "@acryps/page";
import { MapComponent } from "../../shared/map";
import { Point } from "../../../interface/point";
import { toSimulatedAge } from "../../../interface/time";
import { addIcon } from "../../assets/icons/managed";

export class PropertyPage extends Component {
	declare parameters: { id: string };

	property: PropertyViewModel;

	types: PropertyTypeViewModel[];
	boroughs: BoroughViewModel[];
	grades: HistoricListingGradeViewModel[];
	modifiers: HistoricListingModifierViewModel[];

	async onload() {
		this.property = await new MapService().getProperty(this.parameters.id);

		this.types = await new MapService().getPropertyTypes();
		this.boroughs = await new MapService().getBoroughs();

		this.grades = await new HistoricListingService().getGrades();
		this.modifiers = await new HistoricListingService().getModifiers();
	}

	render() {
		return <ui-property>
			<ui-name>
				{this.property.name || `Property #${this.property.id.substring(0, 8)}`}
			</ui-name>

			{new MapComponent().highlight(Point.unpack(this.property.bounds))}

			<ui-field>
				<label>Name</label>

				<input $ui-value={this.property.name} ui-change={() => new MapService().saveProperty(this.property)}></input>
			</ui-field>

			<ui-field>
				<label>Type</label>

				<select $ui-value={this.property.type} ui-change={() => new MapService().saveProperty(this.property)}>
					{this.types.map(type => <option ui-value={type}>
						{type.name} ({type.code.toUpperCase()})
					</option>)}
				</select>
			</ui-field>

			<ui-field>
				<label>Borough</label>

				<select $ui-value={this.property.borough} ui-change={() => new MapService().saveProperty(this.property)}>
					<option ui-value={null}>No borough assigned</option>

					{this.boroughs.map(borough => <option ui-value={borough}>
						{borough.name}
					</option>)}
				</select>
			</ui-field>

			<ui-field>
				<label>Owner</label>

				<select $ui-value={this.property.owner} ui-change={() => new MapService().saveProperty(this.property)}>
					<option ui-value={null}>Unclaimed</option>

					{Application.players.map(player => <option ui-value={player}>
						{player.username}
					</option>)}
				</select>
			</ui-field>

			<ui-dwellings>
				{this.property.dwellings.map(dwelling => <ui-dwelling>
					<ui-name>
						Dwelling #{dwelling.id.split('-')[0]}
					</ui-name>

					{dwelling.tenants.length ? <ui-tenants>
						{dwelling.tenants.map(tenant => <ui-tenant ui-left={!!tenant.end} ui-href={`/resident/${tenant.inhabitant.tag}`}>
							<img src={`/resident/image/${tenant.inhabitant.tag}`} />

							<ui-name>
								{tenant.inhabitant.givenName} {tenant.inhabitant.familyName}
							</ui-name>
						</ui-tenant>)}
					</ui-tenants> : <ui-vacant>
						<ui-header>
							Vacant
						</ui-header>

						<ui-hint>
							Residents will move in automatically, but it might take some time.
						</ui-hint>
					</ui-vacant>}
				</ui-dwelling>)}

				<ui-action ui-click={async () => {
					this.property.dwellings.push(await new PropertyService().createDwelling(this.property.id));
					this.update();
				}}>
					{addIcon()} Create Dwelling
				</ui-action>
			</ui-dwellings>

			<ui-historic-listing>
				<ui-header>Historic Listing</ui-header>

				{this.property.historicListingRegisteredAt && <ui-date>
					This item was registered as a historic item at {this.property.historicListingRegisteredAt.toLocaleDateString()}
				</ui-date>}

				<ui-field>
					<label>Listing Grade</label>

					<select $ui-value={this.property.historicListingGrade} ui-change={async () => {
						await new HistoricListingService().addListing(this.property, this.property.historicListingGrade);

						this.update();
					}}>
						<option ui-value={null}>Not listed</option>

						{this.grades.map(grade => <option ui-value={grade}>
							{grade.grade} - {grade.name}
						</option>)}
					</select>

					{this.property.historicListingGrade && <ui-hint>
						{this.property.historicListingGrade.description}
					</ui-hint>}
				</ui-field>

				{this.property.historicListingGrade && this.modifiers.map(modifier => {
					const link = this.property.historicListingModifiers.find(source => source.historicListingModifier.id == modifier.id);
					let value = !!link;

					return <ui-modifier>
						<ui-field>
							<input type="checkbox" $ui-value={value} ui-change={async value => {
								if (value) {
									this.property.historicListingModifiers.push(await new HistoricListingService().addModifier(this.property.id, modifier.id));
								} else {
									this.property.historicListingModifiers = this.property.historicListingModifiers.filter(existing => existing != link);

									await new HistoricListingService().removeModifier(link.id);
								}

								this.update();
							}}></input>

							<label>{modifier.name}</label>
						</ui-field>

						<ui-grade>
							{modifier.description}
						</ui-grade>
					</ui-modifier>
				})}
			</ui-historic-listing>
		</ui-property>
	}
}
