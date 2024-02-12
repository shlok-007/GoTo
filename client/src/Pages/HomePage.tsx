import InfoCard from "../components/InfoCard"
import { useNavigate } from "react-router-dom";
import "../styles/homePageStyle.css"

export default function HomePage({name}: {name:string}) {
    const navigate = useNavigate();
    return (
        <>
            <InfoCard content={`Hello ${name}, let's`} />
            <div className="center-btn">
                <button onClick={()=>navigate("/selectDestination")}>Get Started!</button>
            </div>
        </>
    )
}