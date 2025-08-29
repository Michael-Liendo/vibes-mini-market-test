export interface ISResponse<T> {
	success: boolean;
	message: string;
	data: T;
	pagination?: IPaginationResponse;
}

export interface IPaginationResponse {
	page: number;
	limit: number;
	total: number;
	total_pages: number;
}

export interface IFindDatabase<T> {
	data: T[];
	count: number;
}

export interface ISReplyFindAll<T> {
	data: T[];
	pagination: IPaginationResponse;
}

export type TOrder = "asc" | "desc";
