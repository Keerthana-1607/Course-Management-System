import './index.css'
import { getFirstname } from '../../api'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const firstname = getFirstname()
    const navigate = useNavigate()

    const recommendedCourses = [
        {
            id: 1,
            name: 'Python Full Stack',
            description: 'Learn Python, Django, React and build full-stack applications.',
            rating: '4.8',
            students: '2.5K+',
            icon: '🐍'
        },
        {
            id: 2,
            name: 'Java Full Stack',
            description: 'Build modern web applications using Java and full-stack technologies.',
            rating: '4.7',
            students: '2.1K+',
            icon: '☕'
        },
        {
            id: 3,
            name: 'Data Science',
            description: 'Learn Python, data analysis, visualization and machine learning.',
            rating: '4.9',
            students: '1.8K+',
            icon: '📊'
        },
        {
            id: 4,
            name: 'AWS Cloud',
            description: 'Learn cloud computing, AWS services and deployment fundamentals.',
            rating: '4.8',
            students: '1.5K+',
            icon: '☁️'
        }
    ]

    return (
        <div className="home-page">

            {/* Hero Section */}
            <section className="hero-section">

                <div className="hero-content">

                    <p className="welcome-text">
                        Welcome back, {firstname || 'Learner'} 👋
                    </p>

                    <h1>
                        Learn Skills.
                        <br />
                        <span>Build Your Future.</span>
                    </h1>

                    <p className="hero-description">
                        Learn in-demand technology skills through practical
                        courses, hands-on projects and structured learning
                        designed to help you grow your career.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-button"
                            onClick={() => navigate('/courses')}
                        >
                            Explore Courses →
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate('/about')}
                        >
                            Learn More
                        </button>

                    </div>

                    <div className="hero-features">
                        <span>✓ Practical Learning</span>
                        <span>✓ Real Projects</span>
                        <span>✓ Career Focused</span>
                    </div>

                </div>

                <div className="hero-visual">

                    <div className="hero-card main-card">
                        <div className="hero-card-icon">
                            🚀
                        </div>

                        <h3>
                            Start Learning
                        </h3>

                        <p>
                            Build skills that matter
                        </p>
                    </div>

                    <div className="floating-card card-one">
                        ⭐ 4.8 Rating
                    </div>

                    <div className="floating-card card-two">
                        🎓 10K+ Students
                    </div>

                </div>

            </section>


            {/* Statistics Section */}
            <section className="stats-section">

                <div className="stat-item">
                    <h2>10K+</h2>
                    <p>Students</p>
                </div>

                <div className="stat-item">
                    <h2>50+</h2>
                    <p>Courses</p>
                </div>

                <div className="stat-item">
                    <h2>100+</h2>
                    <p>Projects</p>
                </div>

                <div className="stat-item">
                    <h2>4.8/5</h2>
                    <p>Average Rating</p>
                </div>

            </section>


            {/* Recommended Courses */}
            <section className="recommended-section">

                <div className="section-heading">

                    <div>
                        <p className="section-label">
                            KEEP LEARNING
                        </p>

                        <h2>
                            Recommended Courses
                        </h2>

                        <p>
                            Explore courses designed to help you build
                            practical skills and become job-ready.
                        </p>
                    </div>

                    <button
                        className="view-all-button"
                        onClick={() => navigate('/courses')}
                    >
                        View All Courses →
                    </button>

                </div>


                <div className="course-grid">

                    {recommendedCourses.map(course => (

                        <div
                            className="recommended-card"
                            key={course.id}
                        >

                            <div className="course-icon">
                                {course.icon}
                            </div>

                            <div className="course-card-content">

                                <h3>
                                    {course.name}
                                </h3>

                                <p className="course-description">
                                    {course.description}
                                </p>

                                <div className="course-meta">

                                    <span>
                                        ⭐ {course.rating}
                                    </span>

                                    <span>
                                        👥 {course.students}
                                    </span>

                                </div>

                                <button
                                    className="course-button"
                                    onClick={() => navigate('/courses')}
                                >
                                    View Course
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* Why Choose Us */}
            <section className="why-section">

                <div className="section-title-center">

                    <p className="section-label">
                        WHY CHOOSE US
                    </p>

                    <h2>
                        Everything You Need to Grow
                    </h2>

                    <p>
                        Learn, practice and build your way toward
                        your career goals.
                    </p>

                </div>


                <div className="benefits-grid">

                    <div className="benefit-card">
                        <div className="benefit-icon">
                            🎯
                        </div>

                        <h3>
                            Career Focused
                        </h3>

                        <p>
                            Learn skills that are relevant to
                            today's technology industry.
                        </p>
                    </div>


                    <div className="benefit-card">
                        <div className="benefit-icon">
                            💻
                        </div>

                        <h3>
                            Practical Projects
                        </h3>

                        <p>
                            Apply what you learn by building
                            real-world projects.
                        </p>
                    </div>


                    <div className="benefit-card">
                        <div className="benefit-icon">
                            📚
                        </div>

                        <h3>
                            Structured Learning
                        </h3>

                        <p>
                            Follow a clear learning path from
                            fundamentals to practical skills.
                        </p>
                    </div>


                    <div className="benefit-card">
                        <div className="benefit-icon">
                            🚀
                        </div>

                        <h3>
                            Learn at Your Pace
                        </h3>

                        <p>
                            Learn whenever you want and continue
                            at your own pace.
                        </p>
                    </div>

                </div>

            </section>


            {/* Learning Journey */}
            <section className="journey-section">

                <div className="section-title-center">

                    <p className="section-label">
                        HOW IT WORKS
                    </p>

                    <h2>
                        Your Learning Journey
                    </h2>

                </div>


                <div className="journey-grid">

                    <div className="journey-item">
                        <div className="journey-number">
                            01
                        </div>

                        <h3>
                            Choose a Course
                        </h3>

                        <p>
                            Find a course that matches your
                            career goals.
                        </p>
                    </div>


                    <div className="journey-item">
                        <div className="journey-number">
                            02
                        </div>

                        <h3>
                            Learn the Concepts
                        </h3>

                        <p>
                            Understand concepts through structured
                            lessons and examples.
                        </p>
                    </div>


                    <div className="journey-item">
                        <div className="journey-number">
                            03
                        </div>

                        <h3>
                            Build Projects
                        </h3>

                        <p>
                            Turn your knowledge into practical
                            projects.
                        </p>
                    </div>


                    <div className="journey-item">
                        <div className="journey-number">
                            04
                        </div>

                        <h3>
                            Grow Your Career
                        </h3>

                        <p>
                            Use your skills to prepare for
                            real-world opportunities.
                        </p>
                    </div>

                </div>

            </section>


            {/* Final CTA */}
            <section className="cta-section">

                <div>
                    <h2>
                        Ready to Start Learning?
                    </h2>

                    <p>
                        Take the next step toward building your
                        skills and achieving your career goals.
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

export default Home