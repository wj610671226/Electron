import { Redirect } from "react-router-dom";
import Favorites from "../pages/favorites";
import FilePage from "../pages/file";
import Photo from "../pages/photo";
import Recycle from "../pages/recyclebin";
import Safe from "../pages/safe";
import Share from "../pages/share";
import TransmissionList from "../pages/transmission-list";
import Setting from "../pages/setting";

const routes = [
    {
        path: "/favorites",
        component: Favorites
    },
    {
        path: "/file",
        component: FilePage
    },
    {
        path: "/photo",
        component: Photo
    },
    {
        path: "/recyclebin",
        component: Recycle
    },
    {
        path: "/safe",
        component: Safe
    },
    {
        path: "/share",
        component: Share
    },
    {
        path: "/transmission",
        component: TransmissionList
    },
    {
        path: "/setting",
        component: Setting
    }
]

export default routes;