import me from './me.png'
import './About.css'

const About = () => {



    return (
        <div className='About_outer' >
            <div className='About_left'>
                <img className='About_mainImg' src={me}></img>
                <div className='About_socials'>
                    <a target='_blank' href='https://www.linkedin.com/in/benwaldee/'>
                        <img className='icon social' src="https://skillicons.dev/icons?i=linkedin" />
                    </a>
                    <a target='_blank' href='https://github.com/benwaldee'>
                        <img className='icon social' src="https://skillicons.dev/icons?i=github" />
                    </a>
                </div>
            </div>
            <div className='About_right'>
                <h1 className='h1'> Hello world!</h1>
                <div className='About_subtitle lineheight'>My name is Ben and this is my first website. You can acess the repo
                    <span> <a href='https://github.com/benwaldee/AirBnBeep' target='_blank'>here!</a></span></div>

                <p className='lineheight'>
                    AirBnBeep is a web application designed to mimic AirBnb. It is a home for mobile vacation spots, such as RVs, Airstreams, sprinter-van conversions, and more!
                    Users can checkout spots as well as host their own. After clicking on a spot that a user is interested in, they can look at reviews, leave their own, and also book a spot for their travels.
                    There is also a search feature in the navigation bar to allow users to find spots based on their names.
                </p>
                <div className='About_subtitle'>This application was built using:</div>
                <div class="skill-grid">

                    <img className='icon' src="https://skillicons.dev/icons?i=javascript" />
                    <img className='icon' src="https://skillicons.dev/icons?i=react" />
                    <img className='icon' src="https://skillicons.dev/icons?i=redux" />
                    <img className='icon' src="https://skillicons.dev/icons?i=express" />
                    <img className='icon' src="https://skillicons.dev/icons?i=postgres" />
                    {/* <img className='icon' src="https://skillicons.dev/icons?i=heroku" /> */}
                    <img className='icon' src="https://skillicons.dev/icons?i=git" />
                    <img className='icon' src="https://skillicons.dev/icons?i=html" />
                    <img className='icon' src="https://skillicons.dev/icons?i=css" />

                    {/* <img class="icon" src={""}>React</img>
                    <img class="icon" src={""}>Redux</img>
                    <img class="icon" src={""}>Express</img>
                    <img class="icon" src={""}>PostgreSQL</img>
                    <img class="icon" src={""}>Sequelize</img>
                    <img class="icon" src={""}>Git</img>
                    <img class="icon" src={""}>HTML5</img>
                    <img class="icon" src={""}>CSS3</img> */}
                </div>
            </div>

        </div>
    )
}

export default About
