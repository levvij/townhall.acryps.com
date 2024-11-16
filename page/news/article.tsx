import { Component } from "@acryps/page";
import { ArticleViewModel, PublicationService } from "../managed/services";
import { linkText } from "../linked-text";

export class ArticePage extends Component {
	declare parameters: { id };

	article: ArticleViewModel;

	async onload() {
		this.article = await new PublicationService().getArticle(this.parameters.id);
	}

	render() {
		return <ui-article>
			<ui-title>
				{this.article.title}
			</ui-title>

			<ui-detail>
				<ui-publication ui-href={`../publication/${this.article.publication.tag}`}>
					{this.article.publication.name}
				</ui-publication>

				<ui-date>
					{this.article.published.toLocaleDateString()}
				</ui-date>
			</ui-detail>

			<ui-body>
				{linkText(this.article.body)}
			</ui-body>

			{this.article.images.map(image => <ui-image>
				<img src={`/article/image/${image.id}`} />

				{image.caption && <ui-caption>
					{image.caption}
				</ui-caption>}
			</ui-image>)}
		</ui-article>;
	}
}