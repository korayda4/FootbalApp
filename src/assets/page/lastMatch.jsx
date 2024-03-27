import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';                                              
import { Spin,Pagination , Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

const lastMatch = () => {
    const [data, setData] = useState(null);
    const [data2 , setData2] = useState(null);
    const [standings ,setStandings] = useState(null);
    const [country, setCountry] = useState( "Turkey");
    const { id , get , name ,teamID } = useParams();
   
    const teamStandings = `https://api-football-v1.p.rapidapi.com/v3/standings?season=2023&league=${id}&team=${teamID}`
    const teamInfoURL = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${id}&season=2023&team=${teamID}`
    const urlPlayer = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2023&team=${teamID}&last=20`;
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'aab97a10efmsh009a93e544d35cap14d640jsn2f33093793fd',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const loadingDiv = (
    <div className='loading'>
        <Spin
            indicator={
            <LoadingOutlined
                style={{
                fontSize: 24,
                }}
                spin
            />
            }
        />
        </div>)

    useEffect(() => {
        const getLastMatch = async () => {
            try {
                const response = await fetch(urlPlayer, options);
                const result = await response.json();
                setData(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };

        const getTeamInfo = async () => {
            try {
                const response = await fetch(teamInfoURL, options);
                const result = await response.json();
                setData2(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };

        const getTeamStandings = async () => {
            try {
                const response = await fetch(teamStandings, options);
                const result = await response.json();
                setStandings(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        };
          
        getTeamStandings()
        getTeamInfo()  
        getLastMatch();
    },[country]);

    return (
        <>
            <div className="lastMatchs">
                <div className="lastMatchHeader">
                    <div className="name-logo">
                        <img src={data2 ? data2.response.team.logo:loadingDiv} alt="" />
                        <h1>{name} Son maçlar</h1> 
                    </div>
                    <div className="infoHead">
                        <h2>{standings ? standings.response[0].league.standings[0][0].points:loadingDiv} Puan ile {standings ? standings.response[0].league.standings[0][0].rank:loadingDiv}. Sırada</h2>
                        <p>{standings ? standings.response[0].league.standings[0][0].all.win:loadingDiv} Maç Kazandı</p>
                        <p>{standings ? standings.response[0].league.standings[0][0].all.lose:loadingDiv} Maç Kaybetti</p>
                        <p>{standings ? standings.response[0].league.standings[0][0].all.draw:loadingDiv} Maç berabere Kaldı</p>
                    </div>
                </div>
                {data ? (data.response.map((x,i) => {
                    return(
                        <div key={i} className={`match ${x.teams.home.winner}`} >
                            <div className="matchLogo">
                                <img src={x.league.logo} alt="LeagueLogo" />
                                <h5>90 DK</h5>
                                <img src={x.league.flag} alt="LeagueFlag" />
                            </div>
                            <div className="teams">
                                <div className="home">
                                    <img src={x.teams.home.logo} alt="TeamLogo" />    
                                    
                                </div>
                                <div className="score">
                                    <h1>{x.goals.home}</h1>
                                    <h1>:</h1>
                                    <h1>{x.goals.away}</h1>
                                </div>
                                <div className="away">
                                    
                                    <img src={x.teams.away.logo} alt="TeamLogo" />    
                                </div>
                                
                            </div>
                        </div>
                    )
                })):loadingDiv}
            </div>
        </>
    )
}

export default lastMatch