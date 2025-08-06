export class CreateCoinResDto {
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly symbol: string,
		public readonly createdAt: Date,
		public readonly updatedAt: Date,
	) {}
}
