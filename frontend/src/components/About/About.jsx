import React from 'react'
import './About.css'

export default function About() {
  return (
    <div className="container my-5 aboutContainer">
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            About Visual Vault
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Welcome to Visual Vault, your secure haven for storing and safeguarding your cherished memories through images
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Our Mission
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            At Visual Vault, our mission is simple yet profound: to provide a seamless, private, and reliable space for users to preserve their visual narratives
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            Privacy and Security
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Your privacy is our utmost priority
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
            User-Centric Experience
          </button>
        </h2>
        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            We strive to create an intuitive and user-friendly experience for our community
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
            Community Engagement
          </button>
        </h2>
        <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Visual Vault isn't just a repository for images; it's a vibrant community of like-minded individuals passionate about visual storytelling
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
            Our Commitment to Innovation
          </button>
        </h2>
        <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            In a rapidly evolving digital landscape, Visual Vault remains at the forefront of innovation
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
            Join Visual Vault Today
          </button>
        </h2>
        <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Embark on your journey of visual preservation with Visual Vault
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
