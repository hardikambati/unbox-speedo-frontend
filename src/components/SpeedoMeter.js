import React from "react";
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
} from 'react-speedometer';
import extractTime from "../utils/helper";


export default function SpeedoMeter() {
    

    const [status, setStatus] = React.useState(false);
    const [data, setData] = React.useState({
        speed: 0,
        timestamp: 0,
    });


    React.useEffect(() => {
        const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setStatus(true);
        };
        
        ws.onmessage = (event) => {
            const wsData = JSON.parse(event.data);
            console.log('Message received from server:', wsData);

            if (wsData.speed) {
                setData({
                    speed: wsData?.speed,
                    timestamp: extractTime(wsData?.timestamp),
                })
            }
        };
        
        ws.onclose = () => {
            console.log('WebSocket disconnected');
            setStatus(false);
        };

        return () => {
            ws.close();
        };
    }, [])


    return (
        <div>
            <div className="data-container">
                <div id="websocket">
                    Websocket Connection Status : &nbsp;
                    {status ? 
                        <div id="success">Connected</div>: <div id="failure">Disonnected</div>
                    }
                </div>
                <div id="time">
                    Last Fetched Time : &nbsp;
                    {data.timestamp}
                </div>
            </div>

            <div className="meter-container">
                <Speedometer
                        value={data.speed}
                        fontFamily='helvetica'
                        min={0}
                        max={59}
                        width={450}
                    >
                    <Background />
                    <Arc/>
                    <Needle/>
                    <Progress/>
                    <Marks step={2} />
                    <Indicator/>
                </Speedometer>
            </div>
        </div>
    );
}
