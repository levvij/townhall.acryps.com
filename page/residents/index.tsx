import { Component } from "@acryps/page";
import { LifeService, ResidentSummaryModel } from "../managed/services";
import { toSimulatedAge, toSimulatedTime } from "../../interface/time";

export class ResidentsPage extends Component {
	residents: ResidentSummaryModel[];

	page = 0;
	loadingNextPage = false;

	loadMoreTracker: HTMLElement = <ui-load-more></ui-load-more>;

	async onload() {
		this.residents = await new LifeService().listResidents(0);
	}

	async loadNextPage() {
		if (this.loadingNextPage) {
			return;
		}

		this.loadingNextPage = true;
		this.page++;

		const nextPage = await new LifeService().listResidents(this.page);

		if (nextPage.length == 0) {
			return;
		}

		this.residents.push(...nextPage);

		setTimeout(() => {
			this.loadingNextPage = false;

			this.checkLoading();
		}, 250);

		this.update();
	}

	checkLoading() {
		if (this.loaded) {
			if (this.loadMoreTracker.getBoundingClientRect().y < innerHeight * 2) {
				this.loadNextPage();
			}
		}
	}

	render() {
		document.addEventListener('scroll', () => this.checkLoading());

		return <ui-residents>
			{this.residents.map(resident => <ui-resident ui-href={`/resident/${resident.tag}`}>
				<img src={`/resident/image/${resident.tag}`} />

				<ui-name>
					<ui-given-name>
						{resident.givenName}
					</ui-given-name>

					<ui-family-name>
						{resident.familyName}
					</ui-family-name>
				</ui-name>

				<ui-age>
					{toSimulatedAge(resident.birthday)} years old
				</ui-age>
			</ui-resident>)}

			{this.loadMoreTracker}
		</ui-residents>
	}
}
