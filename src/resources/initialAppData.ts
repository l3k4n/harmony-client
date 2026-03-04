import { createResource } from 'solid-js';
import { FetchCategoryList, FetchShowcaseList } from '@api/media';

export const [showcaseList] = createResource(async () => {
	const res = await FetchShowcaseList();
	if (!res.success) throw new Error(res.err);
	return res.data;
});

export const [categoryList] = createResource(async () => {
	const res = await FetchCategoryList();
	if (!res.success) throw new Error(res.err);
	return res.data;
});

export const initialAppDataLoaded = () => {
	return !showcaseList.loading && !categoryList.loading;
};
