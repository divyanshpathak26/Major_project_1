import { motion } from 'framer-motion';
import '../css/EmergencyContactsPage.css';

export default function EmergencyContactsPage() {
  const emergencyContacts = [
    {
      category: "Police & Crime Reporting",
      icon: "🚔",
      color: "blue",
      contacts: [
        { name: "Police Emergency", number: "100", desc: "National Police Helpline" },
        { name: "Cyber Crime Helpline", number: "1930", desc: "Report cyber crimes" },
        { name: "Crime Stoppers", number: "1090", desc: "Anonymous tip line" },
        { name: "Women Helpline", number: "1091", desc: "All India women helpline" }
      ]
    },
    {
      category: "Medical & Health Emergency",
      icon: "🚑",
      color: "red",
      contacts: [
        { name: "Ambulance", number: "108", desc: "Medical Emergency" },
        { name: "National Health Helpline", number: "1075", desc: "Health information" },
        { name: "AIIMS Emergency (Delhi)", number: "011-26588700", desc: "AIIMS hospital emergency" }
      ]
    },
    {
      category: "Fire & Disaster Response",
      icon: "🚒",
      color: "orange",
      contacts: [
        { name: "Fire Brigade", number: "101", desc: "Fire emergency services" },
        { name: "Disaster Management", number: "1078", desc: "Natural disaster helpline" },
        { name: "NDRF", number: "011-24363260", desc: "National Disaster Response Force" }
      ]
    },
    {
      category: "Women & Child Protection",
      icon: "👶",
      color: "pink",
      contacts: [
        { name: "Child Helpline", number: "1098", desc: "Child protection services" },
        { name: "Domestic Violence", number: "181", desc: "Domestic violence helpline" },
        { name: "Women Commission", number: "7827170170", desc: "National Commission for Women" }
      ]
    },
    {
      category: "Traffic & Road Safety",
      icon: "🚦",
      color: "green",
      contacts: [
        { name: "Road Accident Helpline", number: "1073", desc: "MoRTH accident helpline" },
        { name: "Highway Patrol", number: "1033", desc: "National Highways patrol" }
      ]
    },
    {
      category: "Mental Health Support",
      icon: "🧠",
      color: "purple",
      contacts: [
        { name: "AASRA Suicide Prevention", number: "9820466726", desc: "24/7 suicide prevention" },
        { name: "Snehi Helpline", number: "9582208181", desc: "Mental health support" },
        { name: "NIMHANS Helpline", number: "080-46110007", desc: "Mental health services" }
      ]
    }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="emergency-page">
      <motion.div 
        className="emergency-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>🆘 Emergency Contacts</h1>
        <p>Essential emergency services and helplines across India</p>
      </motion.div>

      <motion.div 
        className="panic-section"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <button 
          className="main-panic-button"
          onClick={() => handleCall('112')}
        >
          🚨 EMERGENCY 112
        </button>
        <p>India's unified emergency number - Police, Fire, Medical</p>
      </motion.div>

      <div className="emergency-categories">
        {emergencyContacts.map((category, index) => (
          <motion.div
            key={category.category}
            className={`emergency-category ${category.color}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            <div className="category-title">
              <span className="category-icon">{category.icon}</span>
              <h2>{category.category}</h2>
            </div>
            
            <div className="emergency-contacts-list">
              {category.contacts.map((contact, i) => (
                <motion.div 
                  key={i} 
                  className="emergency-contact-card"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="contact-details">
                    <h3>{contact.name}</h3>
                    <p>{contact.desc}</p>
                    <span className="contact-number">{contact.number}</span>
                  </div>
                  <button 
                    className="emergency-call-btn"
                    onClick={() => handleCall(contact.number)}
                  >
                    📞 Call
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}