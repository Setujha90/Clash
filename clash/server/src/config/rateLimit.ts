// ratelimit configuration is used to limit the repeated requests like public APIs, password attempts, etc. tp prevernt unauthorized access or brute force attacks.

import rateLimit from "express-rate-limit";

export const appLimiter = rateLimit({ // this limit is set for the application as a whole, it is used to limit the number of requests from a single IP address to prevent abuse.
	windowMs: 60 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

export const authLimiter = rateLimit({ // this limit is set for the authentication routes, it is used to limit the number of login attempts from a single IP address to prevent brute force attacks.
	windowMs: 60 * 60 * 1000, 
	limit: 30, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

//it is basically middleware that can be used in the routes to limit the number of requests from a single IP address.
