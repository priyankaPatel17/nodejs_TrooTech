const responseStatusCode = require('./responseCode')
exports.successResponse = (data, res) => {
    return res.status(responseStatusCode.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: (res.message)?res.message:'Your request is successfully executed',
        DATA: data
    });
}

exports.inValidParam = (message, res) => {
    message = message.replace(/\"/g, "");
    res.MESSAGE = message
    return res.status(responseStatusCode.validationError).json({
      STATUS: 'FAILURE',
      MESSAGE: message,
    })
}


exports.failureResponse = (data, res) => {
    let i = 0;
    if (data.name === "ValidationError") {
        Object.keys(data.errors).forEach(key => {
            if (i !== 1) {
                data.message = data.errors[key].message;
            }
            i++;
        });
    }
    res.MESSAGE = data.message;
    return res.status(responseStatusCode.validationError).json({
      STATUS: 'FAILURE',
      MESSAGE: data.message?data.message:data,
    })
}
