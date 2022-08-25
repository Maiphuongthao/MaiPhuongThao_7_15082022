//limit numbers of request per 15 mns to avoide froce hacking
//returning error too many request when the limit is reached


const rateLimit = require('express-rate-limit');
// add ratelimit to limit the repeated request 
const ratelimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 6, // Limit each IP to 6 requests per `window` (here, per 15 minutes)
    message:"You have reached maximum retries. Please try again in 15 mns",
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = ratelimiter;