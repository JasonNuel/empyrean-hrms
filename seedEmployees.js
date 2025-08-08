import { createClient } from '@supabase/supabase-js';

// Replace with your actual Supabase details
const supabaseUrl = 'https://ptzxnqkqdetlherqzvco.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0enhucWtxZGV0bGhlcnF6dmNvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDE3MDI1MSwiZXhwIjoyMDY5NzQ2MjUxfQ.nFhvfceABOOz5Oh8KUGnEV6-c0_rwdLwsFVaLwjzWuI';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dummyEmployees = [
  { name: 'Favour Joseph', role: 'HR Manager', email: 'favyteddy@empyrean.com', salary_paid: true },
  { name: 'John Smith', role: 'Developer', email: 'john@empyrean.com', salary_paid: false },
  { name: 'Alice Brown', role: 'Designer', email: 'alice@empyrean.com', salary_paid: true },
  { name: 'Divine Okoye', role: 'Designer', email: 'divyy@empyrean.com', salary_paid: true },
  { name: 'Chioma Mary', role: 'Customer Care', email: 'chimary@empyrean.com', salary_paid: true },
  { name: 'Maureen Obi', role: 'Developer', email: 'maureen@empyrean.com', salary_paid: true },
  { name: 'Michael Obi', role: 'Developer', email: 'mikey@empyrean.com', salary_paid: true },
  { name: 'Ezekiel Okpako', role: 'Cybersecurity', email: 'zeke@empyrean.com', salary_paid: true },
  { name: 'Ezechukwu Joseph', role: 'Cybersecurity', email: 'emekajoe@empyrean.com', salary_paid: true },
  { name: 'Chieki David', role: 'Designer', email: 'dvd@empyrean.com', salary_paid: true },
  { name: 'Josiah Benneth', role: 'General Manager', email: 'josie@empyrean.com', salary_paid: true },
  { name: 'Naomi Okorie', role: 'Planner', email: 'naomiokorie@empyrean.com', salary_paid: true },
];

async function seedEmployees() {
  const { data, error } = await supabase.from('employees').insert(dummyEmployees);

  if (error) {
    console.error('Error inserting employees:', error);
  } else {
    console.log('Employees added:', data);
  }
}

seedEmployees();
