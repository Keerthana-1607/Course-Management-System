import './index.css'
import { useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()

    return (
        <div className="about-page">

            {/* =========================
                About Hero
            ========================= */}

            <section className="about-hero">

                <div className="about-hero-content">

                    <p className="about-label">
                        ABOUT OUR PLATFORM
                    </p>

                    <h1>
                        Learn Today.
                        <br />
                        <span>Build Tomorrow.</span>
                    </h1>

                    <p className="about-hero-description">
                        We are a learning platform focused on helping
                        students develop practical technology skills,
                        build real projects, and prepare for their
                        professional journey.
                    </p>

                    <button
                        className="about-hero-button"
                        onClick={() => navigate('/courses')}
                    >
                        Explore Our Courses →
                    </button>

                </div>

                <div className="about-hero-visual">

                    <div className="about-main-card">

                        <div className="about-big-icon">
                            🎓
                        </div>

                        <h3>
                            Learn. Build. Grow.
                        </h3>

                        <p>
                            Your journey toward better skills
                            starts here.
                        </p>

                    </div>

                    <div className="about-floating-card about-card-one">
                        💻 Practical Learning
                    </div>

                    <div className="about-floating-card about-card-two">
                        🚀 Career Focused
                    </div>

                </div>

            </section>


            {/* =========================
                Mission Section
            ========================= */}

            <section className="mission-section">

                <div className="mission-content">

                    <p className="section-label">
                        OUR MISSION
                    </p>

                    <h2>
                        Making Technology Learning
                        <span> Practical & Accessible</span>
                    </h2>

                    <p>
                        Our mission is to make technology education
                        simple, practical and accessible for everyone.
                        We believe that learning becomes more meaningful
                        when students can apply their knowledge to
                        real-world problems.
                    </p>

                    <p>
                        Instead of focusing only on theory, our platform
                        encourages learners to understand concepts,
                        practice them and build projects that demonstrate
                        their skills.
                    </p>

                </div>

                <div className="mission-highlight">

                    <div className="mission-icon">
                        🎯
                    </div>

                    <h3>
                        Learn With Purpose
                    </h3>

                    <p>
                        Build knowledge that you can actually use
                        in real-world applications.
                    </p>

                </div>

            </section>


            {/* =========================
                What We Offer
            ========================= */}

            <section className="offer-section">

                <div className="section-heading-center">

                    <p className="section-label">
                        WHAT WE OFFER
                    </p>

                    <h2>
                        Everything You Need to Learn
                    </h2>

                    <p>
                        From fundamentals to practical projects,
                        we provide a structured learning experience.
                    </p>

                </div>


                <div className="offer-grid">

                    <div className="offer-card">

                        <div className="offer-icon">
                            📚
                        </div>

                        <h3>
                            Quality Courses
                        </h3>

                        <p>
                            Learn popular technologies through
                            structured and easy-to-follow courses.
                        </p>

                    </div>


                    <div className="offer-card">

                        <div className="offer-icon">
                            💻
                        </div>

                        <h3>
                            Practical Projects
                        </h3>

                        <p>
                            Apply your knowledge by working on
                            practical projects and applications.
                        </p>

                    </div>


                    <div className="offer-card">

                        <div className="offer-icon">
                            🧭
                        </div>

                        <h3>
                            Structured Learning
                        </h3>

                        <p>
                            Follow a clear learning path from
                            beginner concepts to advanced skills.
                        </p>

                    </div>


                    <div className="offer-card">

                        <div className="offer-icon">
                            🚀
                        </div>

                        <h3>
                            Career Growth
                        </h3>

                        <p>
                            Develop skills that can help you
                            prepare for your professional journey.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================
                Why Choose Us
            ========================= */}

            <section className="about-why-section">

                <div className="section-heading-center">

                    <p className="section-label">
                        WHY CHOOSE US
                    </p>

                    <h2>
                        Learning Designed Around You
                    </h2>

                </div>


                <div className="why-list">

                    <div className="why-item">

                        <div className="why-number">
                            01
                        </div>

                        <div>
                            <h3>
                                Beginner Friendly
                            </h3>

                            <p>
                                Start with the fundamentals and
                                gradually build your technical skills.
                            </p>
                        </div>

                    </div>


                    <div className="why-item">

                        <div className="why-number">
                            02
                        </div>

                        <div>
                            <h3>
                                Hands-On Experience
                            </h3>

                            <p>
                                Learn by doing through practical
                                exercises and project-based learning.
                            </p>
                        </div>

                    </div>


                    <div className="why-item">

                        <div className="why-number">
                            03
                        </div>

                        <div>
                            <h3>
                                Industry-Relevant Skills
                            </h3>

                            <p>
                                Focus on technologies and skills
                                commonly used in modern development.
                            </p>
                        </div>

                    </div>


                    <div className="why-item">

                        <div className="why-number">
                            04
                        </div>

                        <div>
                            <h3>
                                Learn at Your Own Pace
                            </h3>

                            <p>
                                Continue learning according to
                                your own schedule and goals.
                            </p>
                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                Statistics
            ========================= */}

            <section className="about-stats">

                <div className="about-stat">
                    <h2>10K+</h2>
                    <p>Students</p>
                </div>

                <div className="about-stat">
                    <h2>50+</h2>
                    <p>Courses</p>
                </div>

                <div className="about-stat">
                    <h2>100+</h2>
                    <p>Projects</p>
                </div>

                <div className="about-stat">
                    <h2>4.8/5</h2>
                    <p>Average Rating</p>
                </div>

            </section>


            {/* =========================
                CTA
            ========================= */}

            <section className="about-cta">

                <div>

                    <h2>
                        Start Your Learning Journey
                    </h2>

                    <p>
                        Explore our courses and start building
                        skills for your future.
                    </p>

                </div>

                <button
                    onClick={() => navigate('/courses')}
                >
                    Explore Courses →
                </button>

            </section>

        </div>
    )
}

export default About