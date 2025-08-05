// rrd imports 
import { useLoaderData } from 'react-router-dom';

//helper functions
import { fetchData } from '../helpers';

// loader
export function aboutLoader() {
    const userName = fetchData("userName");
    return { userName };
}

const About = () => {
    const { userName }  = useLoaderData()

    /// !-------------------------------- Cook o phan nay ----------------------------------- ///
    return (
    <div>
      <h2>The Story Behind Verthena</h2>
      <br />
      <div>
        <p>Once upon a time, amidst the dry numbers and complex financial jargon, <strong>Ngoc</strong>, a person with a burning passion for helping others better understand money, noticed a significant gap. Too many people felt overwhelmed and powerless when facing important financial decisions.</p>
        <br />
        <p>With a vision for a friendly and accessible financial platform, Ngoc shared her idea with <strong>Tai</strong>, a brilliant tech mind always seeking new challenges. Tai was immediately captivated by this noble mission, and together, they set out to build [Your Financial Website Name].</p>
        <br />
        <p>The early days were full of challenges. They worked tirelessly in a small room; Ngoc diligently crafted easy-to-understand content, while Tai focused on building a robust and intuitive platform. They believed that no matter how profound financial knowledge might be, simple and approachable communication would be the key to unlocking financial freedom for everyone.</p>
        <br />
        <p>Overcoming countless obstacles and listening to community feedback, [Your Financial Website Name] grew steadily, becoming a reliable source of information and a trusted companion on the financial journey of thousands. Ngoc and Tai's story is proof that with passion, perseverance, and a meaningful goal, all difficulties can be overcome, and seemingly dry financial knowledge can become surprisingly relatable and inspiring.</p>
      </div>

      <div>
        <br />
        <p><strong>CEO:</strong> Ngoc - The inspiring force behind financial literacy.</p>
        <p><strong>CTO:</strong> Tai - The architect of a robust technological foundation.</p>
      </div>
    </div>
  );
}  /// -------------------------------- Cook o phan nay -----------------------------------! ///
export default About;