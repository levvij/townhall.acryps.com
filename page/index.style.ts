import { child, fontFamily, root } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { bold, boldItalic, regular, regularItalic } from "./assets/font/index.style";
import { boroughStyle } from "./borough/index.style";
import { bannerStyle, createBannerStyle } from "./banner/index.style";
import { iconFont, icons } from "./assets/icons/managed";
import { articleStyle, newsStyle } from "./news/index.style";
import { residentsStyle } from "./residents/index.style";
import { residentStyle } from "./resident/index.style";

export const pageStyle = () => root(
	bold,
	boldItalic,
	regular,
	regularItalic,

	iconFont,
	icons(),

	fontFamily(regular.name),

	bannerStyle(),

	child('body',
		child('ui-page',
			homeStyle(),

			boroughStyle(),

			newsStyle(),
			articleStyle(),

			residentStyle(),
			residentsStyle(),

			createBannerStyle()
		)
	)
)