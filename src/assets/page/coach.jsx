import { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import  PlayerHeight from "../img/icons8-height-100.png"                                                       
import  PlayerWeight from "../img/icons8-scale-100.png"      
import  Country from "../img/icons8-region-100.png"                                                 
import { Spin,Pagination , Space, Table, Tag } from 'antd';
import { Link } from 'react-router-dom';

function Coach () {
    const [data, setCoachData] = useState(null);
    const [country, setCountry] = useState( "Turkey");
    const { id , get , name ,teamID } = useParams();
    const coachURL = `https://api-football-v1.p.rapidapi.com/v3/coachs?team=${teamID}`
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'aab97a10efmsh009a93e544d35cap14d640jsn2f33093793fd',
          'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const getCoachData = async () => {
            try {
              const response = await fetch(coachURL, options);
              const result = await response.json();
              setCoachData(result)
              console.log(result);
            } catch (error) {
              console.error(error);
            }
          };
    
        getCoachData();
      },[country]);

    const coachSource = data ? (data.response[0].career.map((x,i) => {
    return({
        key:i,
        logo:x.team.logo,
        takim:x.team.name == null ? "TR":x.team.name,
        basla:x.start,
        bitis:x.end == null ? "DEVAM EDİYOR":x.end,

    })})):null

    const coachColumns = [
        {
            title:"TAKIM LOGO",
            dataIndex:"logo",
            render: (image) => <img style={{width:"64px"}} src={image} alt={image} />
        },
        {
            title:"TAKIM",
            dataIndex:"takim",
            key:"takim"
        },
        {
            title:"BAŞLANGIÇ",
            dataIndex:"basla",
            key:"basla"
        },
        {
            title:"BİTİŞ",
            dataIndex:"bitis",
            key:"bitis"
        }
      ]

    return (

        <>
            {data ? 
            (<div className="playerDetail">
                <div className="playerDetailHeader">
                    <img src={data.response[0].photo} alt="" />
                    <div className="playerInfo">
                        <div className="playerName">
                            <div className="firstLastName">
                                <h1>{data.response[0].firstname}</h1>
                                <h1>{data.response[0].lastname}</h1>
                            </div>
                            
                            <h5>{data.response[0].age} Yaşında</h5>
                        </div>
                        <div  className="playerWH">
                            <div className="playerWeight">
                                <h3>{data.response[0].weight}</h3>
                                <img src={PlayerWeight} alt="" />
                            </div>

                            <div className="playerHeight">
                                <h3>{data.response[0].height}</h3>
                                <img src={PlayerHeight} alt="" />
                            </div>

                            <div className="playerCountry">
                                <h3>{data.response[0].nationality}</h3>
                                <img src={Country} alt="" />
                            </div>
                        </div>
                           
                        
                    </div>
                </div>
                <div className="playerDetailTable">
                    <Table pagination={false} className="table" dataSource={coachSource} columns={coachColumns} />
                </div>
            </div>
            

            ):<div className='loading'>
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
                </div>}
        </>
    )

}

export default Coach