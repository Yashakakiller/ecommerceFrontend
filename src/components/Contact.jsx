import React from 'react'

const Contact = () => {
  return (
    <>
        <section className='contact_container'>
    
    <div class="section-header">
      <div class="container">
        <h2>Contact Us</h2>
        <p>Welcome to Meena Cloth House!<br/>

We're delighted that you've chosen to reach out to us. Whether you have a question, a comment, or you simply want to share your shopping experience, our team is here to assist you. </p>
      </div>
    </div>
    
    <div class="container">
      <div class="row">
        
        <div class="contact-info">
          <div class="contact-info-item">
            <div class="contact-info-icon">
              <i class="fas fa-home"></i>
            </div>
            
            <div class="contact-info-content">
              <h4>Address</h4>
              <p>44 Jawahar Colony,<br/> Tonk Road Jaipur, <br/>302015</p>
            </div>
          </div>
          
          <div class="contact-info-item">
            <div class="contact-info-icon">
              <i class="fas fa-phone"></i>
            </div>
            
            <div class="contact-info-content">
              <h4>Phone</h4>
              <p>+91 0000000000</p>
            </div>
          </div>
          
          <div class="contact-info-item">
            <div class="contact-info-icon">
              <i class="fas fa-envelope"></i>
            </div>
            
            <div class="contact-info-content">
              <h4>Email</h4>
             <p>yashakakiller@gmail.com</p>
            </div>
          </div>
        </div>
        
        <div class="contact-form">
          <form action="" id="contact-form">
            <h2>Send Message</h2>
            <div class="input-box">
              <input type="text" required="true" name="" />
              <span>Full Name</span>
            </div>
            
            <div class="input-box">
              <input type="email" required="true" name="" />
              <span>Email</span>
            </div>
            
            <div class="input-box">
              <textarea required="true" name=""></textarea>
              <span>Type your Message...</span>
            </div>
            
            <div class="input-box">
              <input type="submit" value="Send" name="" />
            </div>
          </form>
        </div>
        
      </div>
    </div>
   </section>
    </>
  )
}

export default Contact