import React,{useState} from 'react';
import { navigate } from 'gatsby';
import { FiSend, FiMail } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import '../styles/newsletter.scss';

const Form = ({location}) => {
    // const [sending, setSending] = useState(false);
 
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setSending(true)
    //     const data = new FormData(event.target)
    //     fetch('/netlify/functions/subscribe', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             name: data.get('name'),
    //             email: data.get('email')
    //         })
    //     })
    //     .then(res => {
    //         if(res.status === 200 && res.redirected === true){
    //             // location.href = res.url
    //             console.log(res.url)
    //             navigate(res.url, {state: data.get('name')})
    //         }
    //     })
    //     .catch(error => {
    //         alert(error)
    //     })
    // }



    return(
        // add onSubmit={handleSubmit} listner on form
        <form className="email-form" name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field">
            <div className="form-group">
                <header>
                    <h2>Won't it be nice to get my content first?</h2>
                    <p>subscribe to my newsletter and be one of he first to get a new post in your inbox.</p>
                </header>
                <div className="email-form-control">
                <div hidden aria-hidden="true">
                    <label htmlfor="">
                        don't fill this if you are human:
                        <input name="bot-field" />
                    </label>
                </div>
                <div className="input-wrapper">
                <label htmlFor="name" className="sr-only">Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder="enter your name..." 
                    required
                    // disabled={sending}
                    />
                    </div>
                <div className="input-wrapper">
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter your email address" 
                    required 
                    // disabled={sending}
                    />
                    </div>

                <small id="claimer" className="form-text text-muted">it doesn't have to be said that your email stays safe with me.</small>
                <IconContext.Provider value={{ className: "form-icons"}}>
                <button 
                    type="submit" 
                    className="submit-btn"
                    // disabled={sending}
                    >
                    {/* {sending ? <IconContext.Provider value={{className: 'sending'}}>
                                    <FiSend />
                                </IconContext.Provider> : 
                            <IconContext.Provider value={{className: 'subscribe'}}>
                                <FiMail /> Subscribe
                            </IconContext.Provider>}    */}
                            <IconContext.Provider value={{className: 'sending'}}>
                                    <FiSend />
                                </IconContext.Provider>                
                </button>
                </IconContext.Provider>
                </div>
            </div>
        </form>
    )
}

export default Form