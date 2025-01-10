import { validationResult } from "express-validator";

function validateResult(req, res, next){
	const errors = validationResult(req);	
	if(!errors.isEmpty()){
		return res.status(400).send({
			message: "Invalid request",
			errors: errors.array()
		});
	}
	next();
}

export default validateResult;
