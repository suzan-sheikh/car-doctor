import UseAuth from "../Hook/UseAuth";

const About = () => {

    const {user} = UseAuth()



    return (
        <div>
            <h2>{user?.email}</h2>            
        </div>
    );
};

export default About;