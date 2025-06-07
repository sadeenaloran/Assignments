import profilePic from '../assets/profile-pic.jpg';
import styles from './Card.module.css';
import propTypes from 'prop-types';

function Card({name, disc, age, isStaff}) {
    // or function Card({ name="Hussam", disc="This is a description of the card.", age=30, isStaff=true }) {
   
   
   return (<div className={isStaff? styles.cardstaff: styles.card}>
        <img src={profilePic} alt="Profile" className={styles.profilePic} />
        <div className={styles.cardContent}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.disc}>{disc}</p>
            <p className={styles.age}>Age: {age}</p>
            <p className={styles.isStaff}>Staff: {isStaff ? 'Yes' : 'No'}</p> // Conditional rendering based on isStaff prop
        </div>
    </div>);
  
}

// function Card({props}) {
//     return (<div className={styles.card}>
//         <img src={profilePic} alt="Profile" className={styles.profilePic} />
//         <div className={styles.cardContent}>
//             <h2 className={styles.name}>{props.name}</h2>
//             <p className={styles.disc}>{props.disc}</p>
//             <p className={styles.age}>Age: {props.age}</p>
//             <p className={styles.isStaff}>Staff: {props.isStaff ? 'Yes' : 'No'}</p> // Conditional rendering based on isStaff prop
//         </div>
//     </div>);
// }

Card.propTypes = {
    name: propTypes.string.isRequired,
    disc: propTypes.string.isRequired,
    age: propTypes.number.isRequired,
    isStaff: propTypes.bool.isRequired
};
export default Card;