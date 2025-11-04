// Debug script to test signup directly
const testSignup = async () => {
  const userData = {
    name: 'Test User Debug',
    email: 'debug@test.com',
    password: 'test123456',
    location: 'Test City',
    phone: '9876543210'
  };

  try {
    console.log('🚀 Testing signup with:', userData);
    
    const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);
    
    const data = await response.json();
    console.log('📦 Response data:', data);
    
    if (response.ok) {
      console.log('✅ Signup successful!');
    } else {
      console.log('❌ Signup failed:', data.msg);
    }
  } catch (error) {
    console.error('💥 Error:', error);
  }
};

// Run in browser console
console.log('Run: testSignup()');
window.testSignup = testSignup;