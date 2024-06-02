import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { tripRoutes } from "../modules/trip/trip.routes";
import { buddyRoutes } from "../modules/buddyRequest/buddyRequest.routes";
import { profileRoutes } from "../modules/profile/profile.routes";
import { metaRoutes } from "../modules/meta-data/meta-data.routes";

export const routerArray = [
	{
		path: "/user",
		routes: userRoutes,
	},
	{
		path: "/auth",
		routes: authRoutes,
	},
	{
		path: "/trips",
		routes: tripRoutes,
	},

	{
		path: "/buddy",
		routes: buddyRoutes,
	},
	{
		path: "/profile",
		routes: profileRoutes,
	},
	{
		path: "/meta-data",
		routes: metaRoutes,
	},
];
