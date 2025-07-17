import React, { useState, useEffect } from 'react';
import './App.css';

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/contacts');
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch (error) {
      console.error('Error cargando contactos:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccessMessage('¡Contacto enviado exitosamente!');
        setFormData({ name: '', email: '', message: '' });
        fetchContacts();
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error enviando contacto:', error);
      alert('Error conectando con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>📝 Formulario de Contacto</h1>
        <p>Job Sample - AI Fullstack Developer Jr</p>
      </header>

      <main className="main-content">
        {/* Formulario de Contacto */}
        <section className="form-section">
          <h2>Enviar Mensaje</h2>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={loading}
                rows={4}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Contacto'}
            </button>
          </form>
        </section>

        {/* Lista de Contactos */}
        <section className="contacts-section">
          <h2>Contactos Enviados ({contacts.length})</h2>
          
          {contacts.length === 0 ? (
            <p className="no-contacts">No hay contactos aún. ¡Envía el primer mensaje!</p>
          ) : (
            <div className="contacts-list">
              {contacts.map((contact) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <h3>{contact.name}</h3>
                    <span className="contact-date">
                      {new Date(contact.created_at).toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  <p className="contact-email">📧 {contact.email}</p>
                  <p className="contact-message">💬 {contact.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>🚀 Backend: http://localhost:3001 | Frontend: http://localhost:3000</p>
      </footer>
    </div>
  );
}

export default App;