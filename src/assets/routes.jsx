import { createBrowserRouter } from "react-router-dom";
import Leagues from "../assets/page/leagues"
import Teams from "../assets/page/teams"
import MainLayout from "../assets/layouts/mainLayouts"
import Team from "../assets/page/team"
import Player from "../assets/page/player"
import Coach from "../assets/page/coach"

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { 
                index: true, 
                element: <Leagues/>,
            },
            {
                path: ':get/:country/Teams/:id/:name',
                element: <Teams />,
            },
            { 
                path: ':get/:season/Team/:id/:name/:teamID', 
                element: <Team /> 
            },
            { 
                path: ":name/Player/:playerID", 
                element: <Player /> 
            },
            { 
                path: "coach/:teamID/:coachID", 
                element: <Coach /> 
            },
            { 
                path: "lastMatch/:id/:name/:teamID", 
                element: <Coach /> 
            }
        ]
    }
])