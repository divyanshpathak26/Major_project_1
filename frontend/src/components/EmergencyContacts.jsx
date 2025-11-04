import { motion } from 'framer-motion';
import '../css/EmergencyContacts.css';

export default function EmergencyContacts() {
  const emergencyContacts = [
    {
      category: "Police & Crime",
      icon: "🚔",
      color: "blue",
      contacts: [
        { name: "Police Emergency", number: "100" },
        { name: "Cyber Crime", number: "1930" },
        { name: "Women Helpline", number: "1091" }
      ]
    },
    {
      category: "Medical Emergency",
      icon: "🚑",
      color: "red",
      contacts: [
        { name: "Ambulance", number: "108" },
        { name: "Health Helpline", number: "1075" }
      ]
    },
    {
      category: "Fire & Disaster",
      icon: "🚒",
      color: "orange",
      contacts: [
        { name: "Fire Brigade", number: "101" },
        { name: "Disaster Management", number: "1078" }
      ]
    },
    {
      category: "Child & Women Safety",
      icon: "👶",
      color: "pink",
      contacts: [
        { name: "Child Helpline", number: "1098" },
        { name: "Domestic Violence", number: "181" }
      ]
    }
  ];

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="emergency-contacts">
      <div className="emergency-header">
        <h2>🆘 Emergency Contacts</h2>
        <p>Quick access to essential emergency services in India</p>
      </div>
      
      <div className="contacts-grid">
        {emergencyContacts.map((category, index) => (
          <motion.div
            key={category.category}
            className={`contact-category ${category.color}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="category-header">
              <span className="category-icon">{category.icon}</span>
              <h3>{category.category}</h3>
            </div>
            
            <div className="contacts-list">
              {category.contacts.map((contact, i) => (
                <div key={i} className="contact-item">
                  <div className="contact-info">
                    <span className="contact-name">{contact.name}</span>
                    <span className="contact-number">{contact.number}</span>
                  </div>
                  <button 
                    className="call-btn"
                    onClick={() => handleCall(contact.number)}
                  >
                    📞
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="panic-button-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <button 
          className="panic-button"
          onClick={() => handleCall('112')}
        >
          🚨 EMERGENCY 112
        </button>
        <p>India's unified emergency number</p>
      </motion.div>
    </div>
  );
}