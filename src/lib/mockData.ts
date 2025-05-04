// Mock data for the application

// Symptom checker API mock response
export const mockSymptomCheck = (symptoms: string[]) => {
  // Simple fallback dictionary for symptom-based replies
  const symptomsMap: Record<string, any> = {
    "headache": [
      { name: "Tension Headache", probability: 0.8, description: "A common type of headache that causes mild to moderate pain." },
      { name: "Migraine", probability: 0.6, description: "A headache that can cause severe throbbing pain or a pulsing sensation." },
      { name: "Sinusitis", probability: 0.4, description: "Inflammation of the sinuses, often caused by infection." }
    ],
    "fever": [
      { name: "Common Cold", probability: 0.7, description: "A viral infection affecting the upper respiratory tract." },
      { name: "Influenza", probability: 0.65, description: "A contagious respiratory illness caused by influenza viruses." },
      { name: "COVID-19", probability: 0.5, description: "A respiratory illness caused by the SARS-CoV-2 virus." }
    ],
    "cough": [
      { name: "Bronchitis", probability: 0.7, description: "Inflammation of the lining of the bronchial tubes." },
      { name: "Common Cold", probability: 0.6, description: "A viral infection affecting the upper respiratory tract." },
      { name: "Pneumonia", probability: 0.3, description: "An infection that inflames the air sacs in one or both lungs." }
    ],
    "sore throat": [
      { name: "Pharyngitis", probability: 0.8, description: "Inflammation of the pharynx, resulting in a sore throat." },
      { name: "Tonsillitis", probability: 0.5, description: "Inflammation of the tonsils, two lymph nodes at the back of the throat." },
      { name: "Strep Throat", probability: 0.4, description: "A bacterial infection causing inflammation and pain in the throat." }
    ],
    "runny nose": [
      { name: "Common Cold", probability: 0.9, description: "A viral infection affecting the upper respiratory tract." },
      { name: "Allergic Rhinitis", probability: 0.7, description: "An allergic response causing cold-like symptoms." },
      { name: "Sinusitis", probability: 0.4, description: "Inflammation of the sinuses, often caused by infection." }
    ],
    "fatigue": [
      { name: "Anemia", probability: 0.6, description: "A condition marked by a deficiency of red blood cells or hemoglobin." },
      { name: "Depression", probability: 0.5, description: "A mental health disorder characterized by persistently depressed mood." },
      { name: "Chronic Fatigue Syndrome", probability: 0.3, description: "A disorder characterized by extreme fatigue that can't be explained by an underlying medical condition." }
    ],
    "nausea": [
      { name: "Gastroenteritis", probability: 0.7, description: "Inflammation of the stomach and intestines." },
      { name: "Food Poisoning", probability: 0.6, description: "An illness caused by consuming contaminated food or drink." },
      { name: "Pregnancy", probability: 0.2, description: "Early stage of pregnancy in women of childbearing age." }
    ],
    "dizziness": [
      { name: "Vertigo", probability: 0.7, description: "A sensation of feeling off balance or dizzy." },
      { name: "Low Blood Pressure", probability: 0.5, description: "Blood pressure that is lower than normal." },
      { name: "Anemia", probability: 0.4, description: "A condition marked by a deficiency of red blood cells or hemoglobin." }
    ],
    "chest pain": [
      { name: "Angina", probability: 0.6, description: "Chest pain caused by reduced blood flow to the heart." },
      { name: "Costochondritis", probability: 0.5, description: "Inflammation of the cartilage that connects a rib to the breastbone." },
      { name: "Heart Attack", probability: 0.3, description: "Occurs when blood flow to the heart is blocked." }
    ],
    "shortness of breath": [
      { name: "Asthma", probability: 0.7, description: "A condition in which airways narrow and swell and produce extra mucus." },
      { name: "Anxiety", probability: 0.6, description: "Intense, excessive and persistent worry and fear about everyday situations." },
      { name: "Heart Failure", probability: 0.3, description: "A chronic condition in which the heart doesn't pump blood as well as it should." }
    ]
  };

  // Generate response based on symptoms
  const possibleConditions: any[] = [];
  
  // Process each symptom
  symptoms.forEach(symptom => {
    const lowerSymptom = symptom.toLowerCase();
    
    // Find matching symptoms in our map
    Object.keys(symptomsMap).forEach(key => {
      if (lowerSymptom.includes(key) || key.includes(lowerSymptom)) {
        symptomsMap[key].forEach(condition => {
          // Check if condition already exists in possibleConditions
          const existingCondition = possibleConditions.find(c => c.name === condition.name);
          if (existingCondition) {
            // Increase probability slightly if multiple symptoms match
            existingCondition.probability = Math.min(existingCondition.probability + 0.1, 1.0);
          } else {
            possibleConditions.push({ ...condition });
          }
        });
      }
    });
  });

  // If no matches found, provide generic response
  if (possibleConditions.length === 0) {
    return {
      possibleConditions: [
        { 
          name: "Unknown Condition", 
          probability: 0.5, 
          description: "Based on the symptoms provided, we couldn't determine a specific condition. Please consult a healthcare professional for proper diagnosis." 
        }
      ]
    };
  }

  // Sort by probability
  possibleConditions.sort((a, b) => b.probability - a.probability);

  // Return top conditions (maximum 5)
  return {
    possibleConditions: possibleConditions.slice(0, 5)
  };
};

// Mock Articles
export const mockArticles = [
  {
    id: 1,
    title: "Understanding the Importance of Regular Exercise",
    summary: "Regular physical activity offers numerous benefits for both physical and mental health. Learn how incorporating exercise into your daily routine can improve your overall wellbeing.",
    content: `
      <p>Regular exercise is one of the best things you can do for your health. In fact, studies have shown that being physically active can help you live longer and reduce the risk of many chronic diseases.</p>
      
      <h3>Benefits of Regular Exercise</h3>
      <ul>
        <li><strong>Weight Control:</strong> Exercise helps prevent excess weight gain and helps maintain weight loss.</li>
        <li><strong>Health Condition Prevention:</strong> Regular exercise helps prevent or manage many health problems including stroke, metabolic syndrome, high blood pressure, type 2 diabetes, depression, anxiety, many types of cancer, and arthritis.</li>
        <li><strong>Mood Improvement:</strong> Physical activity stimulates brain chemicals that leave you feeling happier and more relaxed.</li>
        <li><strong>Energy Boost:</strong> Regular exercise can improve muscle strength and boost endurance.</li>
        <li><strong>Better Sleep:</strong> Exercise can help you fall asleep faster and deepen your sleep.</li>
      </ul>
      
      <h3>How Much Exercise Do You Need?</h3>
      <p>The Department of Health and Human Services recommends these exercise guidelines:</p>
      <p><strong>Aerobic activity:</strong> Get at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous aerobic activity a week, or a combination of moderate and vigorous activity.</p>
      <p><strong>Strength training:</strong> Do strength training exercises for all major muscle groups at least twice a week.</p>
      
      <p>Even small amounts of physical activity are helpful, and accumulated activity throughout the day adds up to provide health benefits. Walking is an excellent place to start for many people.</p>
      
      <h3>Getting Started with Exercise</h3>
      <p>Start slowly and build up gradually. If you haven't been active in a while, start with 5-10 minutes of activity and gradually increase as you become stronger.</p>
      <p>Remember to:</p>
      <ul>
        <li>Warm up with dynamic stretches</li>
        <li>Drink plenty of fluids</li>
        <li>Listen to your body and take breaks when needed</li>
        <li>Cool down with stretches</li>
      </ul>
      
      <p>Always consult with a healthcare provider before starting any new exercise regimen, especially if you have chronic health conditions or concerns about your fitness.</p>
    `,
    author: "Dr. Sarah Mitchell",
    date: "April 15, 2025",
    category: "fitness",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "The Science Behind a Good Night's Sleep",
    summary: "Sleep is crucial for overall health, yet many people struggle with getting quality rest. Discover the science behind sleep and practical tips for improving your sleep quality.",
    content: `
      <p>Sleep is an essential function that allows your body and mind to recharge, leaving you refreshed and alert when you wake up. Healthy sleep also helps the body remain healthy and stave off diseases.</p>
      
      <h3>The Sleep Cycle</h3>
      <p>Sleep cycles are divided into four stages:</p>
      <ol>
        <li><strong>NREM Stage 1:</strong> Light sleep where you drift in and out of sleep.</li>
        <li><strong>NREM Stage 2:</strong> Body temperature drops and heart rate slows.</li>
        <li><strong>NREM Stage 3:</strong> Deep sleep stage essential for feeling refreshed.</li>
        <li><strong>REM Sleep:</strong> Brain activity increases, most dreaming occurs, and body becomes temporarily paralyzed.</li>
      </ol>
      
      <h3>Benefits of Good Sleep</h3>
      <ul>
        <li><strong>Improved cognitive function</strong> including concentration, productivity, and performance</li>
        <li><strong>Reduced risk</strong> of heart disease, stroke, and diabetes</li>
        <li><strong>Enhanced immune function</strong></li>
        <li><strong>Better emotional regulation</strong> and mental health</li>
        <li><strong>Weight management</strong> support</li>
      </ul>
      
      <h3>Tips for Better Sleep</h3>
      <p><strong>Create a sleep schedule:</strong> Go to bed and wake up at the same times each day, including weekends.</p>
      <p><strong>Optimize your bedroom:</strong> Keep it cool (around 65°F or 18°C), quiet, and dark.</p>
      <p><strong>Limit screen time:</strong> Avoid screens (phones, tablets, computers) for at least an hour before bedtime.</p>
      <p><strong>Watch your diet:</strong> Avoid large meals, caffeine, and alcohol close to bedtime.</p>
      <p><strong>Exercise regularly:</strong> But not too close to bedtime.</p>
      <p><strong>Manage stress:</strong> Try relaxation techniques like deep breathing, meditation, or gentle stretching before bed.</p>
      
      <h3>When to Seek Help</h3>
      <p>If you consistently have trouble sleeping or feel excessively tired during the day despite getting enough sleep, consider speaking with a healthcare provider. Sleep disorders like insomnia, sleep apnea, and restless legs syndrome are common and treatable.</p>
    `,
    author: "Dr. Michael Thompson",
    date: "March 22, 2025",
    category: "wellness",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "Nutrition Fundamentals: Building a Balanced Diet",
    summary: "Understanding the basics of nutrition is essential for maintaining good health. Learn about the different food groups and how to create a balanced diet.",
    content: `
      <p>Nutrition is the process of consuming food and having the body use it as fuel for growth and development. Good nutrition means getting the right amount of nutrients from healthy foods in the right combinations.</p>
      
      <h3>The Key Components of a Healthy Diet</h3>
      
      <h4>1. Macronutrients</h4>
      <p><strong>Carbohydrates:</strong> The body's main source of energy. Choose complex carbohydrates like whole grains, fruits, and vegetables over simple carbohydrates like refined sugar.</p>
      <p><strong>Proteins:</strong> Essential for building and repairing tissues. Good sources include lean meats, poultry, fish, beans, eggs, and nuts.</p>
      <p><strong>Fats:</strong> Required for energy, cell health, and nutrient absorption. Focus on healthy fats from sources like olive oil, avocados, nuts, and fatty fish.</p>
      
      <h4>2. Micronutrients</h4>
      <p><strong>Vitamins:</strong> Organic compounds required in small quantities for normal functioning. Different vitamins serve different functions, from supporting the immune system to helping with blood clotting.</p>
      <p><strong>Minerals:</strong> Inorganic elements needed for functions like building strong bones, transmitting nerve impulses, and maintaining a healthy heartbeat.</p>
      
      <h4>3. Fiber and Water</h4>
      <p><strong>Fiber:</strong> Helps with digestion, keeps you feeling full, and can help lower cholesterol.</p>
      <p><strong>Water:</strong> Essential for virtually all bodily functions, from regulating temperature to removing waste.</p>
      
      <h3>Building a Balanced Plate</h3>
      <p>A balanced meal should include:</p>
      <ul>
        <li><strong>Half your plate:</strong> Fruits and vegetables</li>
        <li><strong>Quarter of your plate:</strong> Whole grains</li>
        <li><strong>Quarter of your plate:</strong> Protein source</li>
        <li><strong>Small amount:</strong> Healthy fats</li>
        <li><strong>On the side:</strong> Dairy or dairy alternative</li>
      </ul>
      
      <h3>Practical Tips for Healthy Eating</h3>
      <ul>
        <li>Eat a variety of foods to get all nutrients</li>
        <li>Choose whole, minimally processed foods most often</li>
        <li>Pay attention to portion sizes</li>
        <li>Stay hydrated by drinking water throughout the day</li>
        <li>Limit intake of added sugars, sodium, and unhealthy fats</li>
        <li>Plan meals ahead to make healthy choices easier</li>
      </ul>
      
      <p>Remember that individual nutritional needs vary based on factors like age, sex, activity level, and health status. Consider consulting a registered dietitian for personalized advice.</p>
    `,
    author: "Emma Rodriguez, RD",
    date: "February 8, 2025",
    category: "nutrition",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3",
    readTime: "8 min read"
  },
  {
    id: 4,
    title: "Mental Health: Strategies for Stress Management",
    summary: "Stress is a normal part of life, but too much can affect your health. Learn effective strategies to manage stress and improve your mental wellbeing.",
    content: `
      <p>Stress is your body's response to any demand or challenge. While some stress can motivate you to meet deadlines or avoid danger, chronic stress can have negative effects on your physical and mental health.</p>
      
      <h3>The Science of Stress</h3>
      <p>When you encounter a stressor, your body releases hormones like adrenaline and cortisol, triggering the "fight-or-flight" response. This increases your heart rate, elevates your blood pressure, and boosts energy supplies.</p>
      <p>In short bursts, this response is beneficial. However, when stressors are constant and you feel stressed regularly, the fight-or-flight reaction stays turned on, putting your health at serious risk.</p>
      
      <h3>Signs You May Be Experiencing Too Much Stress</h3>
      <ul>
        <li><strong>Physical symptoms:</strong> Headaches, muscle tension, digestive issues, sleep problems</li>
        <li><strong>Emotional symptoms:</strong> Anxiety, irritability, feeling overwhelmed, lack of motivation</li>
        <li><strong>Behavioral symptoms:</strong> Changes in eating habits, procrastination, increased use of alcohol or drugs</li>
        <li><strong>Cognitive symptoms:</strong> Racing thoughts, constant worry, difficulty concentrating</li>
      </ul>
      
      <h3>Effective Stress Management Techniques</h3>
      
      <h4>1. Physical Activity</h4>
      <p>Exercise releases endorphins, which are natural stress fighters. Even a 20-minute walk can help clear your mind and reduce stress levels.</p>
      
      <h4>2. Mindfulness and Meditation</h4>
      <p>Practicing mindfulness helps you stay grounded in the present moment rather than worrying about the past or future. Start with just 5 minutes daily and gradually increase.</p>
      
      <h4>3. Deep Breathing Exercises</h4>
      <p>Try the 4-7-8 technique: Inhale for 4 seconds, hold for 7 seconds, and exhale for 8 seconds. Repeat several times when feeling stressed.</p>
      
      <h4>4. Healthy Lifestyle Choices</h4>
      <ul>
        <li>Maintain a balanced diet</li>
        <li>Get adequate sleep</li>
        <li>Limit caffeine and alcohol</li>
        <li>Stay hydrated</li>
      </ul>
      
      <h4>5. Social Connection</h4>
      <p>Sharing your concerns with trusted friends or family members can provide perspective and emotional support.</p>
      
      <h4>6. Time Management</h4>
      <p>Prioritize tasks, break large projects into smaller steps, and don't be afraid to say "no" to additional responsibilities when you're at capacity.</p>
      
      <h3>When to Seek Professional Help</h3>
      <p>If stress is significantly affecting your daily life or if you're experiencing symptoms of anxiety or depression, consider speaking with a mental health professional. They can provide additional strategies and support tailored to your specific situation.</p>
      
      <p>Remember that managing stress is a skill that improves with practice. Be patient with yourself as you develop your personal stress management toolkit.</p>
    `,
    author: "Dr. James Wilson",
    date: "January 15, 2025",
    category: "mental health",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3",
    readTime: "9 min read"
  },
  {
    id: 5,
    title: "Preventative Healthcare: The Power of Early Detection",
    summary: "Regular check-ups and screenings can detect health problems before they start. Learn about essential preventative healthcare measures for different age groups.",
    content: `
      <p>Preventative healthcare focuses on measures taken to prevent diseases rather than curing them or treating their symptoms. The goal is to protect, promote, and maintain health and well-being while preventing disease, disability, and death.</p>
      
      <h3>Why Preventative Care Matters</h3>
      <p>Many of the leading causes of death and disability—including heart disease, cancer, and diabetes—are preventable or can be treated more effectively when caught early. Regular screenings and check-ups can:</p>
      <ul>
        <li>Identify issues before they become serious</li>
        <li>Detect diseases in their earliest, most treatable stages</li>
        <li>Help establish baselines for future care</li>
        <li>Save money by avoiding expensive treatments for advanced disease</li>
      </ul>
      
      <h3>Essential Preventative Measures by Age Group</h3>
      
      <h4>For All Adults:</h4>
      <ul>
        <li>Annual physical examination</li>
        <li>Blood pressure screening</li>
        <li>Cholesterol screening</li>
        <li>Diabetes screening (if at risk)</li>
        <li>Immunizations (including annual flu vaccine)</li>
        <li>Skin cancer checks</li>
        <li>Vision and hearing tests</li>
        <li>Dental check-ups every 6 months</li>
      </ul>
      
      <h4>Additional Screenings for Adults 40+:</h4>
      <ul>
        <li>Colorectal cancer screening (starting at 45-50)</li>
        <li>Lung cancer screening (if history of smoking)</li>
        <li>Osteoporosis screening (especially for women)</li>
      </ul>
      
      <h4>For Women:</h4>
      <ul>
        <li>Pap smears and HPV tests</li>
        <li>Mammograms (typically starting at age 40-50)</li>
        <li>Pelvic exams</li>
      </ul>
      
      <h4>For Men:</h4>
      <ul>
        <li>Prostate cancer screening (discuss with doctor, typically starting at age 50)</li>
        <li>Testicular exams</li>
      </ul>
      
      <h3>Lifestyle as Preventative Medicine</h3>
      <p>Beyond screenings, these lifestyle factors play a crucial role in preventing disease:</p>
      <ul>
        <li><strong>Nutrition:</strong> Eating a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats</li>
        <li><strong>Physical activity:</strong> Aiming for at least 150 minutes of moderate exercise weekly</li>
        <li><strong>Sleep:</strong> Getting 7-9 hours of quality sleep per night</li>
        <li><strong>Stress management:</strong> Practicing stress reduction techniques</li>
        <li><strong>Avoiding tobacco and limiting alcohol:</strong> Quitting smoking and keeping alcohol consumption moderate</li>
      </ul>
      
      <h3>Working with Your Healthcare Provider</h3>
      <p>Develop a preventative care plan with your healthcare provider based on your:</p>
      <ul>
        <li>Age</li>
        <li>Sex</li>
        <li>Current health status</li>
        <li>Family history</li>
        <li>Risk factors</li>
      </ul>
      
      <p>Remember: Early detection through preventative care gives you the best chance for effective treatment and positive outcomes.</p>
    `,
    author: "Dr. Lisa Chen",
    date: "May 3, 2025",
    category: "prevention",
    imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3",
    readTime: "10 min read"
  },
  {
    id: 6,
    title: "Boosting Your Immune System Naturally",
    summary: "Your immune system is your body's defense against infections and illnesses. Discover natural ways to strengthen it for better health.",
    content: `
      <p>Your immune system is a complex network of cells, tissues, and organs that work together to defend your body against harmful pathogens. While there's no magic pill to instantly boost immunity, there are evidence-based approaches to support immune function.</p>
      
      <h3>Nutrition and Immunity</h3>
      <p>What you eat plays a crucial role in supporting your immune system:</p>
      <ul>
        <li><strong>Vitamin C:</strong> Found in citrus fruits, bell peppers, strawberries, and broccoli, this vitamin supports cellular functions of the immune system.</li>
        <li><strong>Vitamin D:</strong> Known as the "sunshine vitamin," it helps regulate immune response. Sources include sunlight, fatty fish, and fortified foods.</li>
        <li><strong>Zinc:</strong> This mineral supports immune cell development and communication. Find it in oysters, beef, pumpkin seeds, and lentils.</li>
        <li><strong>Probiotics:</strong> These beneficial bacteria support gut health, where much of your immune system resides. Sources include yogurt, kefir, sauerkraut, and kimchi.</li>
        <li><strong>Antioxidants:</strong> These compounds help protect cells from damage. Colorful fruits and vegetables are excellent sources.</li>
      </ul>
      
      <h3>Lifestyle Factors That Impact Immunity</h3>
      
      <h4>1. Sleep</h4>
      <p>During sleep, your immune system releases proteins called cytokines, some of which help promote sleep. Certain cytokines need to increase when you have an infection or inflammation. Sleep deprivation may decrease production of these protective cytokines. Aim for 7-9 hours of quality sleep each night.</p>
      
      <h4>2. Physical Activity</h4>
      <p>Regular, moderate exercise can boost immune function by:</p>
      <ul>
        <li>Promoting good circulation, allowing immune cells to move through the body more efficiently</li>
        <li>Temporarily raising body temperature, which may help kill pathogens</li>
        <li>Reducing stress hormones</li>
      </ul>
      <p>Aim for at least 150 minutes of moderate activity per week.</p>
      
      <h4>3. Stress Management</h4>
      <p>Chronic stress exposes your body to a steady stream of stress hormones that suppress immune function. Effective stress-reduction techniques include:</p>
      <ul>
        <li>Meditation and mindfulness</li>
        <li>Deep breathing exercises</li>
        <li>Yoga</li>
        <li>Spending time in nature</li>
        <li>Engaging in hobbies you enjoy</li>
      </ul>
      
      <h4>4. Hydration</h4>
      <p>Proper hydration supports all of your body's functions, including immune response. Water helps in the production of lymph, which carries white blood cells and other immune system cells.</p>
      
      <h3>Herbs and Supplements</h3>
      <p>Some herbs and supplements may help support immune function:</p>
      <ul>
        <li><strong>Elderberry:</strong> Has antiviral properties and may shorten the duration of colds and flu</li>
        <li><strong>Echinacea:</strong> May help increase the number of white blood cells</li>
        <li><strong>Garlic:</strong> Contains compounds that may enhance immune cell function</li>
      </ul>
      <p><em>Note: Always consult with a healthcare provider before starting any new supplement regimen.</em></p>
      
      <h3>When to Seek Medical Attention</h3>
      <p>While supporting your immune system naturally is beneficial, it's important to recognize when to seek medical help. Contact a healthcare provider if you experience:</p>
      <ul>
        <li>Frequent or unusually severe infections</li>
        <li>Slow-healing wounds</li>
        <li>Persistent fatigue that doesn't improve with rest</li>
        <li>Symptoms that don't resolve or worsen over time</li>
      </ul>
    `,
    author: "Dr. Rachel Green",
    date: "April 28, 2025",
    category: "immunity",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3",
    readTime: "8 min read"
  }
];

// Health tips
export const healthTips = [
  {
    text: "Aim for at least 30 minutes of moderate physical activity most days of the week."
  },
  {
    text: "Stay hydrated by drinking at least 8 glasses of water daily."
  },
  {
    text: "Include a variety of colorful fruits and vegetables in your diet to get diverse nutrients."
  },
  {
    text: "Limit processed foods and those high in added sugars, salt, and unhealthy fats."
  },
  {
    text: "Practice good sleep hygiene by maintaining a consistent sleep schedule and creating a restful environment."
  },
  {
    text: "Take breaks from sitting every 30 minutes to reduce the health risks of prolonged sedentary behavior."
  },
  {
    text: "Practice mindfulness or meditation for at least 10 minutes daily to reduce stress."
  },
  {
    text: "Wash your hands frequently with soap and water to prevent the spread of germs."
  },
  {
    text: "Schedule regular check-ups with your healthcare provider, even when you feel healthy."
  },
  {
    text: "Protect your skin from sun damage by using sunscreen with at least SPF 30."
  },
  {
    text: "Maintain social connections, as strong relationships contribute to better health and longevity."
  },
  {
    text: "Practice proper posture, especially when sitting at a desk or using electronic devices."
  }
];

// Motivational quotes
export const motivationalQuotes = [
  {
    text: "The greatest wealth is health.",
    source: "Virgil"
  },
  {
    text: "Take care of your body. It's the only place you have to live.",
    source: "Jim Rohn"
  },
  {
    text: "Health is not valued until sickness comes.",
    source: "Thomas Fuller"
  },
  {
    text: "The first wealth is health.",
    source: "Ralph Waldo Emerson"
  },
  {
    text: "He who has health has hope, and he who has hope has everything.",
    source: "Arabian Proverb"
  },
  {
    text: "A healthy outside starts from the inside.",
    source: "Robert Urich"
  },
  {
    text: "Your body hears everything your mind says.",
    source: "Naomi Judd"
  },
  {
    text: "Health is a state of complete harmony of the body, mind, and spirit.",
    source: "B.K.S. Iyengar"
  },
  {
    text: "The greatest of wealth is the richness of the soul.",
    source: "Muhammad"
  },
  {
    text: "Happiness is nothing more than good health and a bad memory.",
    source: "Albert Schweitzer"
  }
];
