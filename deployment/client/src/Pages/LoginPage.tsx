import InfoCard from '../components/InfoCard';
import "../styles/loginPageStyle.css"
import loginPageProps from '../types/loginPageProps';

const LoginPage : React.FC<loginPageProps> = ({loginPromptFunction}) => {
    loginPromptFunction();
    return (
        <>
            <div id="google-one-tap-button">
                <InfoCard content="Hello there, please login to continue" />
            </div>
        </>
    );
};

export default LoginPage;