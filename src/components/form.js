import React,{useState} from 'react';
import { navigate } from 'gatsby';
import { FiSend } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import '../styles/newsletter.scss';

const Form = () => {
    const [name, setName] = useState('');

    const handleInput = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        navigate('/success/', {state: {name}})
    }



    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <header>
                    <h2>Won't it be nice to get my content first?</h2>
                    <p>subscribe to my newsletter to get mails of new blog posts.</p>
                </header>
                <label htmlFor="name" className="sr-only">Name</label>
                <input type="text" name="name" id="name" placeholder="name" />
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter your email address" />
                <small id="emailHelp" className="form-text text-muted">it doesn't have to be said that your email stays safe with me.</small>
                <IconContext.Provider value={{ className: "form-icons"}}>
                <button type="submit" className="submit-btn">
                    Subscribe
                    <FiSend />
                </button>
                </IconContext.Provider>
            </div>
        </form>
    )
}

export default Form