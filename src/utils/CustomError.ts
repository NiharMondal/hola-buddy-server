class CustomError extends Error {
	public statusCode;
	constructor(statusCode: number, message: string | undefined, stack = "") {
		super(message);
		this.statusCode = statusCode;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}


export default CustomError;