from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer,ChatterBotCorpusTrainer

bot = ChatBot("chatbot",
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
    database_uri="sqlite:///database.sqlite3",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            "default_response": "Sorry, I don't understand that.",
            "max_similarity_threshold": 0.9
        }
    ]
)

list_of_qa = [
       "What career options are available after a degree in Computer Science?",
      "Career options include Software Developer, Data Scientist, Cybersecurity Analyst, Product Manager, Machine Learning Engineer, Cloud Engineer, and UI/UX Designer.",

     "What helped you most in landing your first job?",
      "Building strong projects, networking through LinkedIn, attending coding contests, and practicing mock interviews helped me the most.",

     "Is a master's degree worth it in your field?",
     "It depends on your goals. If you want to specialize (e.g., AI, Data Science, Research) or shift career tracks, a master's degree can be very valuable.",

     "How did you get your internship?",
     "I applied through LinkedIn and company career portals. Also, attending college placement drives helped me secure my first internship.",

    
     "Which companies hire freshers from our college?",
      "Top companies like Infosys, Wipro, TCS, Accenture, Capgemini, Deloitte, Cognizant, Amazon, and ZS Associates frequently hire freshers from our college.",

    
     "Can you refer me to your company?",
      "Sure! Please share your latest resume and LinkedIn profile link. I'll forward it internally for referral consideration.",

    
        "What skills should I focus on for a career in data science?",
     "Focus on Python programming, Machine Learning, Statistics, SQL, Data Visualization (Tableau/PowerBI), and cloud basics (AWS, Azure).",

    
     "Which online courses helped you the most?",
      "Courses on Coursera (Machine Learning by Andrew Ng), edX (CS50 by Harvard), and Udemy (Python for Data Science) helped me a lot.",

    
      "Which universities are good for MS in the US?",
     "Top universities include Stanford, MIT, Carnegie Mellon University, UC Berkeley, University of Michigan, and Georgia Tech.",

    
     "How do I prepare for GRE/IELTS/TOEFL?",
      "Start early, practice vocabulary daily, solve mock tests regularly, and take coaching if needed. Resources like Magoosh, ETS Official Guide, and Kaplan are excellent.",

    
     "Can you review my resume?",
      "Yes! Please send your latest resume via email or upload it through the platform, and I’ll review it and share feedback.",

    
        "What were the toughest questions in your interview?",

"Behavioral questions like 'Tell me about a failure and how you handled it,' and technical questions on Data Structures, System Design, and DBMS were the toughest.",

    
     "How can I mentor students?",

"You can volunteer through our alumni portal. Register as a mentor, and students can reach out to you directly for career guidance.",

    
     "Can I post a job/internship opportunity?",
      "Yes, absolutely! You can post job or internship opportunities by logging into your alumni dashboard and selecting 'Post an Opportunity'.",

    
     "Are there any upcoming alumni events?",
      "Yes, an Alumni Meet 2025 is scheduled for July 20, 2025, along with virtual webinars on career growth planned monthly.",

    
        "How can I connect with my old batchmates?",
     "Use the 'Find Batchmates' feature on the alumni portal by searching with their graduation year and department.",

    
        "What's new on campus?",
     "The campus has launched a new AI Research Lab, upgraded the central library, and opened a new Innovation and Entrepreneurship Center.",

    
        "Who is the current Head of Department?",
     "The current Head of the Computer Science Department is Dr. Rakesh Sharma (as of 2025).",

    
     "Who are alumni working at Google?",
      "Several alumni like Rahul Mehra (Batch 2018, Software Engineer) and Priya Kulkarni (Batch 2017, Product Manager) are currently working at Google.",

    
     "Can you connect me with a 2018 CS graduate?",
      "Sure! Please use the alumni search feature or request a connection through the platform, and we'll notify 2018 graduates for mentoring.",

    
     "What events are coming up?",
      "The Annual Alumni Meet, Hackathons, Industry Panel Discussions, and a Cultural Fest are lined up in the next six months.",

    
     "How do I register for the alumni meet?",
      "Login to the alumni portal, go to 'Events,' select 'Annual Alumni Meet 2025,' and click on 'Register Now'.",

    
     "How do I update my profile?",
      "After logging in, navigate to 'My Profile' and click on 'Edit Profile' to update your contact, education, or work details.",

      "I forgot my password. What should I do?",
      "Click on 'Forgot Password' on the login page, enter your registered email, and follow the password reset instructions."

]
trainer=ChatterBotCorpusTrainer(bot)
trainer.train('chatterbot.corpus.english')
trainer = ListTrainer(bot)
trainer.train(list_of_qa)

print("Training completed.")
