declare module "draft-js-import-html" {
	import { ContentState } from "draft-js";

	export function stateFromHTML(html: string): ContentState;
}
