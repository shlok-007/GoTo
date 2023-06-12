import InfoCard from '../components/InfoCard';
import "../styles/loginPageStyle.css"
import loginPageProps from '../types/loginPageProps';

const LoginPage : React.FC<loginPageProps> = ({loginPromptFunction}) => {
    loginPromptFunction();
    return (
        <>
            <InfoCard content="Hello there, please login to continue" />
            <div id="google-one-tap-button"></div>
        </>
    );
};

export default LoginPage;